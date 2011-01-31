# _View More Button_ Plugin for [FullCalendar][0]

This code was written by [Scott Greenfield][1] of [Lyconic][2] to address issue [#304][3].

I was looking at the list of issues for FullCalendar on Google Code, and I realized that, 
out of necessity for a company project, I had solved several of them. Anyway, I figured 
I'd start with the most "starred" enhancement, the "view more" button.

## Getting Started

**Dependencies:**

* [jQuery](http://jquery.com)
* [jQuery UI](http://jqueryui.com/)
* [FullCalendar](http://arshaw.com/fullcalendar/)
* [DateJS](http://www.datejs.com)
* [jQuery.formBubble](http://github.com/lyconic/formbubble)

**FullCalendar.viewMore** acts as a wrapper for FullCalendar, so that you can specify a maximum number of events per day. If the events exceed the max, a 'view more' button will be added to the date box.

The simplest way of enabling the plugin is to call `limitEvents` on an initialized fullcalendar:

    $('#calendar').fullCalendar({
      height: 760,
      editable: true,      
      events: function(start, end, callback) {
        $.ajax({
          url: '/test/get-events',
          dataType: 'json',
          success: function(data){
            callback(data);
          }
        });
      }
    });

    $('#calendar').limitEvents(4);

That's it! The API isn't finished, and we will be expanding its capabilities in the future, but for now this does what we need.

  [0]: http://arshaw.com/fullcalendar/
  [1]: mailto:jquery.fun@gmail.com
  [2]: http://lyconic.com/about
  [3]: http://code.google.com/p/fullcalendar/issues/detail?id=304

