myCalendar = (function(){
  return function () {
    var self = arguments.callee;

    mockjax.init();

    self.calendar = new Calendar('#calendar');
    self.calendar.observers();
    self.calendar.loadCalendar();
  }  
})();

(function (I) {
  var public = {};


  
  public.someFunction = function () {
    //console.log('in some public function');
  }    
  
  $.extend(I, public);
  
})(myCalendar);