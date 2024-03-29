/*
	---------
	- Shims -
	---------
		
	Needed for: ie7, ff3
	JSON.parse
	JSON.stringify
	https://github.com/bestiejs/json3

	---------
	
	Needed for: ie7, ie8
  Array.filter
	http://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Ar
	ray/filter	
*/
if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun /*, thisp*/) {
        var len = this.length >>> 0;
        if (typeof fun != "function") {
            throw new TypeError();
        }

        var res = [];
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in this) {
                var val = this[i]; // in case fun mutates this
                if (fun.call(thisp, val, i, this)) {
                    res.push(val);
                }
            }
        }

        return res;
    };
}

/*
Needed for: ie7, ie8
Array.map
http://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/map

 */
 
if (!Array.prototype.map) {  
  Array.prototype.map = function(callback, thisArg) {  
  
    var T, A, k;  
  
    if (this == null) {  
      throw new TypeError(" this is null or not defined");  
    }  
  
    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.  
    var O = Object(this);  
  
    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".  
    // 3. Let len be ToUint32(lenValue).  
    var len = O.length >>> 0;  
  
    // 4. If IsCallable(callback) is false, throw a TypeError exception.  
    // See: http://es5.github.com/#x9.11  
    if ({}.toString.call(callback) != "[object Function]") {  
      throw new TypeError(callback + " is not a function");  
    }  
  
    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.  
    if (thisArg) {  
      T = thisArg;  
    }  
  
    // 6. Let A be a new array created as if by the expression new Array(len) where Array is  
    // the standard built-in constructor with that name and len is the value of len.  
    A = new Array(len);  
  
    // 7. Let k be 0  
    k = 0;  
  
    // 8. Repeat, while k < len  
    while(k < len) {  
  
      var kValue, mappedValue;  
  
      // a. Let Pk be ToString(k).  
      //   This is implicit for LHS operands of the in operator  
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.  
      //   This step can be combined with c  
      // c. If kPresent is true, then  
      if (k in O) {  
  
        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.  
        kValue = O[ k ];  
  
        // ii. Let mappedValue be the result of calling the Call internal method of callback  
        // with T as the this value and argument list containing kValue, k, and O.  
        mappedValue = callback.call(T, kValue, k, O);  
  
        // iii. Call the DefineOwnProperty internal method of A with arguments  
        // Pk, Property Descriptor {Value: mappedValue, Writable: true, Enumerable: true, Configurable: true},  
        // and false.  
  
        // In browsers that support Object.defineProperty, use the following:  
        // Object.defineProperty(A, Pk, { value: mappedValue, writable: true, enumerable: true, configurable: true });  
  
        // For best browser support, use the following:  
        A[ k ] = mappedValue;  
      }  
      // d. Increase k by 1.  
      k++;  
    }  
  
    // 9. return A  
    return A;  
  };        
}



/*
Needed for: ie7, ie8
Array.indexOf
https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
*/
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
        "use strict";
        if (this == null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 1) {
            n = Number(arguments[1]);
            if (n != n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    }
}

/*
	Needed for ie7, ie8
	Array.every
	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/every
*/	
if (!Array.prototype.every)
{
  Array.prototype.every = function(fun /*, thisp */)
  {
    "use strict";
 
    if (this == null)
      throw new TypeError();
 
    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();
 
    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in t && !fun.call(thisp, t[i], i, t))
        return false;
    }
 
    return true;
  };
}


/*
	Needed for: ie7, ie8
	Array.isArray
	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/isArray
*/
if(!Array.isArray) {
  Array.isArray = function (vArg) {
    return Object.prototype.toString.call(vArg) === "[object Array]";
  };
}

/*
	Needed for: ie7, ie8, ff3
	Object.keys
	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/keys
*/
if (!Object.keys) {
  Object.keys = (function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length
 
    return function (obj) {
      if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object')
 
      var result = []
 
      for (var prop in obj) {
        if (hasOwnProperty.call(obj, prop)) result.push(prop)
      }
 
      if (hasDontEnumBug) {
        for (var i=0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i])
        }
      }
      return result
    }
  })()
};

/*
	Needed for: ie7, ie8
	String.trim
	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/Trim
*/
if(!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g,'');
  };
}