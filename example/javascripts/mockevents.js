var mockjax = {
  events: [
    {
      title: "test0",
      start: "Tue Dec 2 2010 00:00:00",
      end: "Tue Dec 2 2010 00:00:00",
      allDay: true,
      description: 'test0 description'
    },
    {
      title: "test1",
      start: "Tue Jan 2 2011 00:00:00",
      end: "Tue Jan 2 2011 00:00:00",
      allDay: true,
      description: 'test1 description'
    },
    {
      title: "test2",
      start: "Tue Jan 3 2011 00:00:00",
      end: "Tue Jan 3 2011 00:00:00",
      allDay: true,
      description: 'test2 description'
    },
    {
      title: "test3",
      start: "Tue Jan 4 2011 00:00:00",
      end: "Tue Jan 4 2011 00:00:00",
      allDay: true,
      description: 'test3 description'
    },
    {
      title: "test4",
      start: "Tue Jan 4 2011 00:00:00",
      end: "Tue Jan 4 2011 00:00:00",
      allDay: true,
      description: 'test4 description'
    },
    {
      title: "test5",
      start: "Tue Jan 5 2011 00:00:00",
      end: "Tue Jan 5 2011 00:00:00",
      allDay: true,
      description: 'test5 description'
    },
    {
      title: "test6",
      start: "Tue Jan 5 2011 00:00:00",
      end: "Tue Jan 6 2011 00:00:00",
      allDay: true,
      description: 'test6 description'
    },
    {
      title: "test7",
      start: "Tue Jan 6 2011 00:00:00",
      end: "Tue Jan 6 2011 00:00:00",
      allDay: true,
      description: 'test7 description'
    },
    {
      title: "test8",
      start: "Tue Jan 6 2011 00:00:00",
      end: "Tue Jan 7 2011 00:00:00",
      allDay: true,
      description: 'test8 description'
    },
    {
      title: "test9",
      start: "Tue Jan 5 2011 00:00:00",
      end: "Tue Jan 8 2011 00:00:00",
      allDay: true,
      description: 'test9 description'
    },
    {
      title: "test10",
      start: "Tue Jan 6 2011 00:00:00",
      end: "Tue Jan 6 2011 00:00:00",
      allDay: true,
      description: 'test10 description'
    },
    {
      title: "test11",
      start: "Tue Jan 26 2011 00:00:00",
      end: "Tue Jan 28 2011 00:00:00",
      allDay: true,
      description: 'test11 description'
    },
    {
      title: "test12",
      start: "Tue Jan 31 2011 00:00:00",
      end: "Tue Jan 31 2011 00:00:00",
      allDay: true,
      description: 'test12 description'
    }
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
