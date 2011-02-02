var mockjax = {
  events: [
    {
      title: "test0",
      start: "Dec 2 2010 00:00:00",
      end: "Dec 2 2010 00:00:00",
      allDay: true,
      description: 'test0 description'
    },
    {
      title: "test1",
      start: "Jan 2 2011 00:00:00",
      end: "Jan 2 2011 00:00:00",
      allDay: true,
      description: 'test1 description'
    },
    {
      title: "test2",
      start: "Jan 3 2011 00:00:00",
      end: "Jan 3 2011 00:00:00",
      allDay: true,
      description: 'test2 description'
    },
    {
      title: "test3",
      start: "Jan 4 2011 00:00:00",
      end: "Jan 4 2011 00:00:00",
      allDay: true,
      description: 'test3 description'
    },
    {
      title: "test4",
      start: "Jan 4 2011 00:00:00",
      end: "Jan 4 2011 00:00:00",
      allDay: true,
      description: 'test4 description'
    },
    {
      title: "test5",
      start: "Jan 5 2011 00:00:00",
      end: "Jan 5 2011 00:00:00",
      allDay: true,
      description: 'test5 description'
    },
    {
      title: "test6",
      start: "Jan 5 2011 00:00:00",
      end: "Jan 6 2011 00:00:00",
      allDay: true,
      description: 'test6 description'
    },
    {
      title: "test7",
      start: "Jan 6 2011 00:00:00",
      end: "Jan 6 2011 00:00:00",
      allDay: true,
      description: 'test7 description'
    },
    {
      title: "test8",
      start: "Jan 6 2011 00:00:00",
      end: "Jan 7 2011 00:00:00",
      allDay: true,
      description: 'test8 description'
    },
    {
      title: "test9",
      start: "Jan 5 2011 00:00:00",
      end: "Jan 8 2011 00:00:00",
      allDay: true,
      description: 'test9 description'
    },
    {
      title: "test10",
      start: "Jan 6 2011 00:00:00",
      end: "Jan 6 2011 00:00:00",
      allDay: true,
      description: 'test10 description'
    },
    {
      title: "test11",
      start: "Jan 26 2011 00:00:00",
      end: "Jan 28 2011 00:00:00",
      allDay: true,
      description: 'test11 description'
    },
    {
      title: "test12",
      start: "Jan 31 2011 00:00:00",
      end: "Jan 31 2011 00:00:00",
      allDay: true,
      description: 'test12 description'
    },
    {
      title: "test5",
      start: "Feb 14 2011 00:00:00",
      end: "Feb 16 2011 00:00:00",
      allDay: true,
      description: 'test5 description'
    },
    {
      title: "test6",
      start: "Feb 14 2011 00:00:00",
      end: "Feb 15 2011 00:00:00",
      allDay: true,
      description: 'test6 description'
    },
    {
      title: "test7",
      start: "Feb 15 2011 00:00:00",
      end: "Feb 15 2011 00:00:00",
      allDay: true,
      description: 'test7 description'
    },
    {
      title: "test8",
      start: "Feb 15 2011 00:00:00",
      end: "Feb 16 2011 00:00:00",
      allDay: true,
      description: 'test8 description'
    },
    {
      title: "test9",
      start: "Feb 16 2011 00:00:00",
      end: "Feb 18 2011 00:00:00",
      allDay: true,
      description: 'test9 description'
    },
    {
      title: "test10",
      start: "Feb 15 2011 00:00:00",
      end: "Feb 15 2011 00:00:00",
      allDay: true,
      description: 'test10 description'
    },
    {
      title: "test11",
      start: "Feb 15 2011 00:00:00",
      end: "Feb 17 2011 00:00:00",
      allDay: true,
      description: 'test11 description'
    },    
  ],
  init: function(){
    $.mockjax({ //get initial events
      url: '/test/get-events',
      dataType: 'json',
      responseTime: 0,
      responseText: mockjax.events
    });
  }
};
