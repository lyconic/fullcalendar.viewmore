// References to this file can be deleted, as can the file itself
// the purpose of this file is to give an example of the "view more" event limiting functionality in action,
// and in order to do that, I had to provide some mock events.

var prevMonth = Date.today().add(-1).months(),
      thisMonth = Date.today(),
      nextMonth = Date.today().add(1).months(),
      prevMonthNumber = prevMonth.getMonth() + 1,
      thisMonthNumber = thisMonth.getMonth() + 1,
      nextMonthNumber = nextMonth.getMonth() + 1;

var mockjax = {
  events: [
    {
      title: "test0",
      start: prevMonthNumber + "/2/" + prevMonth.getFullYear() + " 00:00:00",
      end: prevMonthNumber + "/2/" + prevMonth.getFullYear() + " 00:00:00",
      allDay: true,
      description: 'test0 description'
    },
    {
      title: "test1",
      start: thisMonthNumber + "/2/" + thisMonth.getFullYear() + " 00:00:00",
      end: thisMonthNumber + "/2/" + thisMonth.getFullYear() + " 00:00:00",
      allDay: true,
      description: 'test1 description'
    },
    {
      title: "test2",
      start: thisMonthNumber + "/3/" + thisMonth.getFullYear() + " 00:00:00",
      end: thisMonthNumber + "/3/" + thisMonth.getFullYear() + " 00:00:00",
      allDay: true,
      description: 'test2 description'
    },
    {
      title: "test3",
      start: thisMonthNumber + "/4/" + thisMonth.getFullYear() + " 00:00:00",
      end: thisMonthNumber + "/4/" + thisMonth.getFullYear() + " 00:00:00",
      allDay: true,
      description: 'test3 description'
    },
    {
      title: "test4",
      start: thisMonthNumber + "/4/" + thisMonth.getFullYear() + " 00:00:00",
      end: thisMonthNumber + "/4/" + thisMonth.getFullYear() + " 00:00:00",
      allDay: true,
      description: 'test4 description'
    },
    {
      title: "test5",
      start: thisMonthNumber + "/5/" + thisMonth.getFullYear() + " 00:00:00",
      end: thisMonthNumber + "/5/" + thisMonth.getFullYear() + " 00:00:00",
      allDay: true,
      description: 'test5 description'
    },
    {
      title: "test6",
      start: thisMonthNumber + "/6/" + thisMonth.getFullYear() + " 00:00:00",
      end: thisMonthNumber + "/6/" + thisMonth.getFullYear() + " 00:00:00",
      allDay: true,
      description: 'test6 description'
    },
    {
      title: "test7",
      start: thisMonthNumber + "/6/" + thisMonth.getFullYear() + " 00:00:00",
      end: thisMonthNumber + "/6/" + thisMonth.getFullYear() + " 00:00:00",
      allDay: true,
      description: 'test7 description'
    },
    {
      title: "test8",
      start: thisMonthNumber + "/6/" + thisMonth.getFullYear() + " 00:00:00",
      end: thisMonthNumber + "/7/" + thisMonth.getFullYear() + " 00:00:00",
      allDay: true,
      description: 'test8 description'
    },
    {
      title: "test9",
      start: thisMonthNumber + "/5/" + thisMonth.getFullYear() + " 00:00:00",
      end: thisMonthNumber + "/8/" + thisMonth.getFullYear() + " 00:00:00",
      allDay: true,
      description: 'test9 description'
    },
    {
      title: "test10",
      start: thisMonthNumber + "/6/" + thisMonth.getFullYear() + " 00:00:00",
      end: thisMonthNumber + "/6/" + thisMonth.getFullYear() + " 00:00:00",
      allDay: true,
      description: 'test10 description'
    },
    {
      title: "test11",
      start: thisMonthNumber + "/25/" + thisMonth.getFullYear() + " 00:00:00",
      end: thisMonthNumber + "/26/" + thisMonth.getFullYear() + " 00:00:00",
      allDay: true,
      description: 'test11 description'
    },
    {
      title: "test12",
      start: thisMonthNumber + "/25/" + thisMonth.getFullYear() + " 00:00:00",
      end: thisMonthNumber + "/27/" + thisMonth.getFullYear() + " 00:00:00",
      allDay: true,
      description: 'test12 description'
    },
    {
      title: "test13",
      start: thisMonthNumber + "/24/" + thisMonth.getFullYear() + " 00:00:00",
      end: thisMonthNumber + "/28/" + thisMonth.getFullYear() + " 00:00:00",
      allDay: true,
      description: 'test13 description'
    },
    {
      title: "test14",
      start: thisMonthNumber + "/26/" + thisMonth.getFullYear() + " 00:00:00",
      end: thisMonthNumber + "/26/" + thisMonth.getFullYear() + " 00:00:00",
      allDay: true,
      description: 'test14 description'
    },
    {
      title: "test15",
      start: thisMonthNumber + "/26/" + thisMonth.getFullYear() + " 00:00:00",
      end: thisMonthNumber + "/27/" + thisMonth.getFullYear() + " 00:00:00",
      allDay: true,
      description: 'test15 description'
    },
    {
      title: "test16",
      start: nextMonthNumber + "/14/" + nextMonth.getFullYear() + " 00:00:00",
      end: nextMonthNumber + "/16/" + nextMonth.getFullYear() + " 00:00:00",
      allDay: true,
      description: 'test16 description'
    },
    {
      title: "test17",
      start: nextMonthNumber + "/14/" + nextMonth.getFullYear() + " 00:00:00",
      end: nextMonthNumber + "/15/" + nextMonth.getFullYear() + " 00:00:00",
      allDay: true,
      description: 'test17 description'
    },
    {
      title: "test18",
      start: nextMonthNumber + "/15/" + nextMonth.getFullYear() + " 00:00:00",
      end: nextMonthNumber + "/15/" + nextMonth.getFullYear() + " 00:00:00",
      allDay: true,
      description: 'test18 description'
    },
    {
      title: "test19",
      start: nextMonthNumber + "/15/" + nextMonth.getFullYear() + " 00:00:00",
      end: nextMonthNumber + "/16/" + nextMonth.getFullYear() + " 00:00:00",
      allDay: true,
      description: 'test19 description'
    },    
    {
      title: "test20",
      start: nextMonthNumber + "/16/" + nextMonth.getFullYear() + " 00:00:00",
      end: nextMonthNumber + "/18/" + nextMonth.getFullYear() + " 00:00:00",
      allDay: true,
      description: 'test20 description'
    },
    {
      title: "test21",
      start: nextMonthNumber + "/15/" + nextMonth.getFullYear() + " 00:00:00",
      end: nextMonthNumber + "/15/" + nextMonth.getFullYear() + " 00:00:00",
      allDay: true,
      description: 'test21 description'
    },
    {
      title: "test22",
      start: nextMonthNumber + "/15/" + nextMonth.getFullYear() + " 00:00:00",
      end: nextMonthNumber + "/17/" + nextMonth.getFullYear() + " 00:00:00",
      allDay: true,
      description: 'test22 description'
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
