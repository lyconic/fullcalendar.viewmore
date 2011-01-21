// "View More Button" Plugin for FullCalendar
// Version 0.03 Alpha
// Written by Scott Greenfield, A.K.A. jquery.fun@gmail.com
// Updates and tutorial *will* be found here:  http://www.lyconic.com
function ViewMore (context) {
  if (!(this instanceof arguments.callee)) return new arguments.callee(context);
  this.options = {
    context: context,
    maxEvents: {
      monthView: 4
    }
  }
}

(function ($, undefined) {
  this.observers = function(){
    var selector = this.options.context,
        self = this;

    $(document).mouseup(function(e){  //deselect when clicking outside of calendar or formbubble
      var $target = $(e.target),
          isFormBubble = $target.parents('.form-bubble').length || $target.hasClass('form-bubble'),
          isInsideOfCalendar = $target.parents('.fc-content').length || $target.hasClass('fc-content');

      if (!isInsideOfCalendar && !isFormBubble) self.calendar.fullCalendar('unselect');
    });

    $(selector).delegate('.fc-event','mousedown', function(){ //close currently open form bubbles when user clicks an existing event
      $.fn.formBubble.close();
    });
    
    $(selector).delegate('.fc-button-agendaWeek, .fc-button-agendaDay', 'click', function(){
      resetEventsRangeCounts();
    });
  };

  this.extendCallbacks = function(calendar){
    var selector = this.options.context,
        self = this,
        opt = $(selector).fullCalendar('getView').calendar.options,
        _eventRender = opt.eventRender,
        _eventDrop = opt.eventDrop,
        _eventResize = opt.eventResize,
        _viewDisplay = opt.viewDisplay,
        _events = opt.events;
        
        self.observers();
      
      $.extend(opt, {
          eventRender: function(event, element){
              var currentView = calendar.fullCalendar('getView').name,
                  dateFormat = (event.allDay) ? 'MM/dd/yyyy' : 'hh:mmtt',
                  startDateLink = $.fullCalendar.formatDate(event.start, dateFormat),
                  endDateLink = $.fullCalendar.formatDate(event.end, dateFormat),
                  maxEvents = self.options.maxEvents,
                  allEvents = calendar.fullCalendar('clientEvents'),
                  eventDate = $.fullCalendar.formatDate(event.end || event.start,'MM/dd/yy'),
                  td, viewMoreButton;
      
              event.element = element;
              event.startDateLink = startDateLink;
              event.endDateLink = endDateLink;
      
              if (currentView === 'month') {
                  doEventsRangeCount(event, calendar); //add event quantity to range for event and day
                  td = getCellFromDate(eventDate, calendar);
      
                  if (td.data('apptCount') > maxEvents.monthView) {
                      if (!td.find('.events-view-more').length) {
                          viewMoreButton = $('<div class="events-view-more"><a href="#view-more"><span>View More</span></a></div>')
                          .appendTo(td)
                          .click(function () {
                              viewMore(td, calendar);
                              return false;
                          });
                      }
                      if ($.isFunction(_eventRender)) _eventRender(event, element);
                      return false; //prevents event from being rendered
                  }
              }
              if ($.isFunction(_eventRender)) _eventRender(event, element);
              return true; //renders event
          },
          eventDrop: function (event, dayDelta, minuteDelta, allDay, revertFunc) {
            resetEventsRangeCounts();
            if ($.isFunction(_eventDrop)) _eventDrop(event, dayDelta, minuteDelta, allDay, revertFunc);
          },
          eventResize: function(event){
            resetEventsRangeCounts();
            if ($.isFunction(_eventResize)) _eventResize(event);
          },
          viewDisplay: function(view){
            $.fn.formBubble.close();
            if ($.isFunction(_viewDisplay)) _viewDisplay(view);
          },
          events: function(start, end, callback) {
            resetEventsRangeCounts();
            if ($.isFunction(_events)) _events(start, end, callback);
          }
      });
  };
  
  function doEventsRangeCount(event, calInstance){
    var eventStart = event._start,
        eventEnd = event._end || event._start,
        dateRange = expandDateRange(eventStart, eventEnd),
        eventElement = event.element;
    
    $(dateRange).each(function(i){
        var td = getCellFromDate($.fullCalendar.formatDate(dateRange[i],'MM/dd/yy'), calInstance),
                currentCount = (td.data('apptCount') || 0) + 1;

        td.data('apptCount', currentCount);
        
        if (td.data().appointments === undefined) td.data().appointments = [event];
        else td.data().appointments.push(event);
    });
  }
  
  function expandDateRange(start, end){
    var value = new Date(start.getFullYear(), start.getMonth(), start.getDate()),
        values = [];

    end = new Date(end.getFullYear(), end.getMonth(), end.getDate());

    while (value <= end) {
      values.push(value);
      value = new Date(value.getFullYear(), value.getMonth(), value.getDate() + 1);
    }
    
    return values;
  }
  
  function resetEventsRangeCounts(){
    $('.fc-view-month td').each(function(i){
        $(this).find('.events-view-more').remove();
        $.removeData(this, "apptCount");
        $.removeData(this, "appointments");
    });
  }
  
  function viewMore(day, calInstance){
    var appointments = day.data('appointments'),
        elemWidth = day.outerWidth() + 1,
        self = this;
    
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
          calInstance.fullCalendar('unselect');
        }
      },
      content: function(){
        var startDate =  getDateFromCell(day, calInstance),
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
  
  function getCellFromDate(thisDate, calInstance){ //ties events to actual table cells, and also differentiates between "gray" dates and "black" dates
    var start = calInstance.fullCalendar('getView').start,
        end = calInstance.fullCalendar('getView').end,
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
  
  function getDateFromCell(td, calInstance){
    var cellPos = {
        row: td.parent().parent().children().index(td.parent()),
        col: td.parent().children().index(td)
    };

    return calInstance.fullCalendar('getView').cellDate(cellPos);
  }
  
}).call(ViewMore.prototype, jQuery);