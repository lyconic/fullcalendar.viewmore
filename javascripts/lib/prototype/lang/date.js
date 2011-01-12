/** section: Language
 * class Date
 *
 *  Extensions to the built-in `Date` object.
**/


(function(proto) {
  
  /**
   *  Date#toISOString() -> String
   *
   *  Produces a string representation of the date in ISO 8601 format.
   *  The time zone is always UTC, as denoted by the suffix "Z".
   *
   *  <h5>Example</h5>
   *
   *      var d = new Date(1969, 11, 31, 19);
   *      d.getTimezoneOffset();
   *      //-> -180 (time offest is given in minutes.)
   *      d.toISOString();
   *      //-> '1969-12-31T16:00:00Z'
  **/
  
  function toISOString() {
    return this.getUTCFullYear() + '-' +
      (this.getUTCMonth() + 1).toPaddedString(2) + '-' +
      this.getUTCDate().toPaddedString(2) + 'T' +
      this.getUTCHours().toPaddedString(2) + ':' +
      this.getUTCMinutes().toPaddedString(2) + ':' +
      this.getUTCSeconds().toPaddedString(2) + 'Z';
  }

/*
*/
  function succ(){
    return this.clone().addDays(1);
  }
  
  /**
   *  Date#toJSON() -> String
   *
   *  Internally calls [[Date#toISOString]].
   *
   *  <h5>Example</h5>
   *
   *      var d = new Date(1969, 11, 31, 19);
   *      d.getTimezoneOffset();
   *      //-> -180 (time offest is given in minutes.)
   *      d.toJSON();
   *      //-> '1969-12-31T16:00:00Z'
  **/

  function toJSON() {
    return this.toISOString();
  }
  
  /**
   *   Date#valid() -> Boolean
   *
   *   Checks if date is valid in case constructor failed.
  **/
  
  function valid() {
    return this instanceof Date && isFinite(this);
  }
  
  function invalid() {
    return !(this.valid());
  }
  
  /**
   *  Date#tomorrow() -> Boolean
   *
   *  Returns `true` if Date is tomorrow
  **/
  
  function tomorrow() {
    var date = this.clone().clearTime();
    return date.equals(Date.tomorrow());
  }
  
  /**
   *  Date#yesterday() -> Boolean
  **/
  
  function yesterday() {
    var date = this.clone().clearTime();
    return date.equals(Date.yesterday());
  }
  
  /**
   *  Date#past() -> Boolean
   **/
  
  function past () {
    return (this.compareTo(Date.today()) === -1);
  }
  
  /**
   *  Date#future() -> Boolean
  **/
  
  function future () {
    return (this.compareTo(Date.today()) === 1);
  }
  
  /**
   *   Date#sameDayAs(date) -> Boolean
   *   - date (Date): The date to compare
  **/
  
  function sameDayAs (date) {
    var date1 = this.clone().clearTime();
    var date2 = date.clone().clearTime();
    return date1.equals(date2);
  }
  
  if (!proto.toISOString) proto.toISOString = toISOString;
  if (!proto.toJSON) proto.toJSON = toJSON;
  
  Object.extend(proto, {
    valid:     valid,
    invalid:   invalid,
    tomorrow:  tomorrow,
    yesterday: yesterday,
    past:      past,
    future:    future,
    sameDayAs: sameDayAs,
    succ: succ
  });
  
})(Date.prototype);

/**
 *   Date.tomorrow() -> Date
 *
 *   Convenience method
 **/
Date.tomorrow = function() {
  return Date.today().add(1).days();
};

/**
 *   Date.yesterday() -> Date
 *
 *   Convenience method
 **/
Date.yesterday = function() {
  return Date.today().add(-1).days();
};



