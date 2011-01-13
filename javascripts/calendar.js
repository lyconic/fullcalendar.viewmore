// "View More Button" Plugin for FullCalendar
// Version 0.01 Alpha
// Written by Scott Greenfield, A.K.A. jquery.fun@gmail.com
// Updates and tutorial *will* be found here:  http://www.lyconic.com

Calendar = Class.create((function(){
  var instance = {
    options: {
      context: undefined,
      maxEvents: {
        monthView: 4
      }
    }
  };

  instance.initialize = function (context) {
    instance.options.context = context;
  };
  
  instance.observers = function () {
    var selector = instance.options.context;
    
    $(document).mouseup(function(e){  //deselect when clicking outside of calendar or formbubble
      var target = $(e.target)
      var isFormBubble = target.parents('.form-bubble').length || target.hasClass('form-bubble');
      var isInsideOfCalendar = target.parents('.fc-content').length || target.hasClass('fc-content');

      if (!isInsideOfCalendar && !isFormBubble) instance.calendar.fullCalendar('unselect');
    });

    $(selector).delegate('.fc-event','mousedown',function(){ //close currently open form bubbles when user clicks an existing event
      $.fn.formBubble.close();
    });
    
    $(selector).delegate('.fc-button-agendaWeek, .fc-button-agendaDay', 'click', function(){
      resetEventsRangeCounts();
    });
  };

  instance.loadCalendar = function(){
    var selector = instance.options.context;
    
    instance.calendar = $(selector).fullCalendar({
      height: 760,
      weekMode: 'variable',
      header: {
        left: 'prev,next month,agendaWeek,agendaDay',
        center: 'title',
        right: ''
      },
      unselectAuto: false,
      selectable: true,
      selectHelper: false,
      editable: true,      
      eventDrop: function(event,dayDelta,minuteDelta,allDay,revertFunc){
        resetEventsRangeCounts();
      },
      eventResize: function(event){
        resetEventsRangeCounts();
      },
      viewDisplay: function(view){
        $.fn.formBubble.close();
      },
      events: function(start, end, callback) {
        resetEventsRangeCounts(); //for view more buttons
        
        $.ajax({
          url: '/test/get-events',
          dataType: 'json',
          success: function(data){
            callback(data);
          }
        });   
      },
      eventRender: function(event, element){
        var currentView = instance.calendar.fullCalendar('getView').name,
            dateFormat = (event.allDay) ? 'MM/dd/yyyy' : 'hh:mmtt',
            startDateLink = $.fullCalendar.formatDate(event.start, dateFormat),
            endDateLink = $.fullCalendar.formatDate(event.end, dateFormat),
            maxEvents = instance.options.maxEvents,
            allEvents = instance.calendar.fullCalendar('clientEvents'),
            eventDate = $.fullCalendar.formatDate(event.end || event.start,'MM/dd/yy'),
            td, viewMoreButton;

        event.element = element;
        event.startDateLink = startDateLink;
        event.endDateLink = endDateLink;

        if (currentView ==='month'){
            doEventsRangeCount(event); //add event quantity to range for event and day
            td = getCellFromDate(eventDate);

            if (td.data('apptCount') > maxEvents.monthView){
                if (!td.find('.events-view-more').length){
                    viewMoreButton = $('<div class="events-view-more"><a href="#view-more"><span>View More</span></a></div>')
                    .appendTo(td)
                    .click(function(){
                        viewMore(td);
                        return false;
                    });
                }
                
                return false; //prevents event from being rendered
            }
        }
        
        return true; //renders event
      }
    });    
  };

  function doEventsRangeCount(event){
    var eventStart = event._start,
        eventEnd = event._end || event._start,
        dateRange = $R(eventStart,eventEnd).collect();
    
    var eventElement = event.element;
    
    $(dateRange).each(function(i){
        var td = getCellFromDate($.fullCalendar.formatDate(dateRange[i],'MM/dd/yy')),
                currentCount = (td.data('apptCount') || 0) + 1;

        td.data('apptCount', currentCount);
        
        if (td.data().appointments === undefined) td.data().appointments = [event];
        else td.data().appointments.push(event);
    });
  }
  
  function resetEventsRangeCounts(){
    $('.fc-view-month td').each(function(i){
        $(this).find('.events-view-more').remove();

        jQuery.removeData(this, "apptCount");
        jQuery.removeData(this, "appointments");
    });
  }
  
  function viewMore(day){
    var appointments = day.data('appointments'),
        elemWidth = day.outerWidth() + 1;
    
    day.formBubble({
      graphics: {
        close: true,
        pointer: false
      },
      offset: {
        x: -elemWidth,
        y: 0
      },
      animation: {
          slide: false,
          speed: 0
      },
      callbacks: {
        onOpen: function(){
          var bubble = $.fn.formBubble.bubbleObject;
          
          bubble.addClass('overlay');
        },
        onClose: function(){
          instance.calendar.fullCalendar('unselect');
        }
      },
      content: function(){
        var startDate =  getDateFromCell(day),
            startDateLabel = startDate.toString("MMM dS"),
            dayValue = parseInt(day.find('.fc-day-number').text()),
            eventList=$('<ul></ul>').prepend('<li><h5>' + startDateLabel + '</h5></li>');
            
        elemWidth = elemWidth - 30;

        $(appointments).each(function(){
            var apptStartDay = parseInt($.fullCalendar.formatDate(this.start,'d')), //should be comparing date instead of day (bug with gray dates) <-- fix
                    apptEndDay = parseInt($.fullCalendar.formatDate(this.end,'d')),
                    event = this.element.clone(false).attr('style', '').css('width', elemWidth);

            if (apptStartDay < dayValue) $(event).addClass('arrow-left');
            if (apptEndDay > dayValue) $(event).addClass('arrow-right');
            
            event.appendTo(eventList).wrap('<li>');
        });
        
        eventList.wrap('<div>');
        return eventList.parent('div').html();
      }
    });
  }
  
  function getCellFromDate(thisDate){ //ties events to actual table cells, and also differentiates between "gray" dates and "black" dates
    var start = $('#calendar').fullCalendar('getView').start,
            end = $('#calendar').fullCalendar('getView').end,
            td;

    thisDate = Date.parse(thisDate);
            
    td = $('.fc-day-number').filter(function(){
      return $(this).text()===$.fullCalendar.formatDate(thisDate,'d')
    }).parent('td');
            
    if (thisDate < start){ //date is in last month
        td = td.filter(':first');
    }else if (thisDate >= end){  //date is in next month
        td = td.filter(':last');
    }else{ //date is in this month
        td = td.filter(function(){
            return $(this).hasClass('fc-other-month')===false;
        });
    }
    
    return td;
  }
  
  function getDateFromCell(td){
    var cellPos = {
        row: td.parent().parent().children().index(td.parent()),
        col: td.parent().children().index(td)
    };

    return $('#calendar').fullCalendar('getView').cellDate(cellPos);
  }

  return instance;
})());