myCalendar = (function(){
  return function () {
    var self = arguments.callee;

    mockjax.init();

    self.calendar = new Calendar('#calendar');
    self.calendar.observers();
    self.calendar.loadCalendar();
  }  
})();