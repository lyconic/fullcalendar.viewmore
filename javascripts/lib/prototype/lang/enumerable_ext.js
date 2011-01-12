/**
 *  Extensions for Enumerable Mixin
 *
 *  Adds some missing Enumerable functions
**/
Object.extend(Enumerable, (function(){
  
  /**
   *  Enumerable#indexBy(iterator[, context]) -> Hash
   *  - iterator (Function): A `Function` which returns the
   *    value to be used as the index.
   *  - context (Object): The scope in which to call `iterator`. Affects what
   *    the keyword `this` means inside `iterator`.
  **/
  function indexBy(iterator, context) {
    var memo = new Hash();
    
    this.each(function(item) {
      var k = iterator(item),
          v = memo.get(k) || [];
      v.push(item);
      memo.set(k, v);
    }, context);
    
    return memo;
  }
  
  return {
    indexBy: indexBy
  };
  
})());