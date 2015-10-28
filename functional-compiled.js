'use strict';

var

/**
 * curry
 *
 * this function will take a function and curry the arguments
 *
 * @param   {Function}  fn          function to curry
 *
 * @returns {Function}              curried function with arguments
 */
curry = function curry(fn) {
	var ll = fn.length,
	    _curry = function _curry(_args_) {
		return function () {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			var a = _args_.concat(args);
			return a.length >= ll ? fn.apply(undefined, a) : _curry(a);
		};
	};
	return _curry([]);
},

/**
 * curryArgs
 *
 * this function will take a function and curry the arguments, set with argLength
 *
 * @param   {Function}  fn          function to curry
 * @param   {Number}    argLength   amount of arguments to curry before calling the function
 *
 * @returns {Function}              curried function with arguments
 */
curryArgs = function curryArgs(fn, argLength) {
	var _curry = function _curry(_args_) {
		return function () {
			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			var a = _args_.concat(args);
			return a.length >= argLength ? fn.apply(undefined, a) : _curry(a);
		};
	};
	return _curry([]);
},

/**
 * flipAll
 *
 * this function will reverse all arguments provided to function
 *
 * ` flip( Function:fn ) ( *:...arguments ); `
 *
 * @param   {Function}  fn          function to flip arguments
 *
 * @returns {Function}
 *
 *      @param   {*}         [args]      arguments to flip to function
	 */
flipAll = function flipAll(fn) {
	return function () {
		for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
			args[_key3] = arguments[_key3];
		}

		return fn.apply(undefined, args.reverse());
	};
},

/**
 * flip
 *
 * this function will take a function and apply 2 arguments to it in reverse.
 * if second argument is not provided a curried function will be returned
 *
 * ` flip( Function:fn ) ( *:first, *:second ); `
 *
 * @param   {Function}  fn          function to flip arguments
 *
 * @returns {Function}
 *
 *      @param   {*}         first       first argument
 *      @param   {*}         second      second argument
	 */
flip = function flip(fn) {
	return function (first, second) {
		return second ? _flip(second) : _flip;
		function _flip(second) {
			return fn.call(this, second, first);
		}
	};
},

/**
 * first
 *
 * this function will pass only the first argument to the curried isFunction
 *
 * ` first( Function:fn ) ( *:first ); `
 *
 * @param   {Function}  fn          function to call
 *
 * @returns {Function}
 *
 *      @param   {*}         first       argument to pass to function
	 */
first = function first(fn) {
	return function (first) {
		return fn.call(undefined, first);
	};
},

/**
 * arrProto
 *
 * this function will curry an array method and return a curried function
 * that can use the method
 *
 * ` arrProto( String:method ); `
 *
 * @method  {String}    method      Array method identifier
 *
 * @returns {Function}
 *
 *      @param  {Array}     arr         Array to apply prototype method to
 *      @param  [{*}]       args        arguments to apply to the prototype method
 */
arrProto = function arrProto(method) {
	method = Array.prototype[method];
	return function (arr) {
		for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
			args[_key4 - 1] = arguments[_key4];
		}

		return method.apply(arr, args);
	};
},

/**
 * slice
 *
 * this function will slice the provided array
 *
 * ` slice( Array:arr [, Int:start ] ); `
 *
 * @returns {Function}
 *
 *      @param  {Array}     arr         Array to slice
 *      @param  {Number}    start       Array index to slice from
 */
slice = arrProto('slice'),

/**
 * map
 *
 * this function will map over the provided array
 *
 * ` map( Array ) => ( Function( el [, Int:ii, Array:arr ] ){  } ); `
 *
 * @param  {Array}     arr         Array to slice
 *
 * @returns {Function}
 *
 *      @param  {Function}  fn          Function to call for each index of the Array
 *
 *      @returns {Array}                mapped array return values
 */
map = arrProto('map'),

/**
 * mapWith
 *
 * this function will curry a function to map over the provided array
 *
 * ` map( Function( el [, Int:ii, Array:arr ] ){  } ) => ( Array:arr ) `
 *
 * @param  {Function}  fn          Function to call for each index of the Array
 *
 * @returns {Function}
 *
 *      @param  {Array}     arr         Array to slice
 *
 *      @returns {Array}                mapped array return values
 */
mapWith = flip(map),
    parseIntMap = mapWith(first(parseInt)),
    hexToDecMap = mapWith(function (hex) {
	return parseInt(hex, 16);
}),
    negativeMap = mapWith(function (num) {
	return num * -1;
}),

/**
 * filter
 *
 * this function will filter the provided array, returning a new array
 * filtering out any element that does not return true
 *
 * ` filter( Array, Function( el [, Int:ii, Array:arr ] ){  } ); `
 *
 * @returns {Function}
 *
 *      @param  {Array}     arr         Array to slice
 *      @param  {Function}  fn          Function to call for each index of the Array
 *
 *      @returns {Array}                mapped array return values
 */
filter = arrProto('filter'),

/**
 * filterWith
 *
 * this function will curry a filter function, and wait for an array
 * to filter.
 *
 * ` filter( Function( el [, Int:ii, Array:arr ] ){  } ) ( Array:arr )`
 *
 * @param  {Function}  fn          Function to call for each index of the Array
 *
 * @returns {Function}
 *
 *      @param  {Array}     arr         Array to slice
 *
 *      @returns {Array}                mapped array return values
 */
filterWith = flip(filter),

/**
 * get
 *
 * this function will curry an object and return a getter for the object
 *
 * @param   {Object}    obj         Object to get properties from
 *
 * @returns {Function}
 *
 *      @param  {String}    item        property key to retrieve from the Object
 *
 *      @returns {*}                    property of object
	 */
get = function get(obj) {
	return function (item) {
		return obj[item];
	};
},

/**
 * compase
 *
 * this function will combine and curry two functions, the return function will take
 * another function which will be passed through the curried functions
 *
 * ` compose( third, second ) => ( first ) `
 *
 * @param   {Function}  a           last function in the chain
 * @param   {Function}  b           second function in the chain
 *
 * @returns {Function}
 *
 *      @param  {Function}  c           first function in the chain
 */
compose = function compose(a, b) {
	return function (c) {
		return a(b(c));
	};
},

/**
 * pipe
 *
 * pipe will compose two functions together, but respect the order of the arguments
 *
 * ` pipe( second, third ) => ( first ) `
 *
 * @param   {Function}  a           second function in the chain
 * @param   {Function}  b           third function in the chain
 *
 * @returns {Function}
 *
 *      @param  {Function}  c           first function in the chain
 */
pipe = flipAll(compose),

/**
 * callFirst
 *
 * this will partially apply a function and the first arg, returned function will take
 * remaining arguments and apply to the curried function
 *
 * ` callFirst( Function( ...arguments ), first ) => ( ...arguments ) `
 *
 * @param   {Function}  fn          curried function
 * @param   {*}         first       first argument
 *
 * @returns {Function}
 *
 *      @param  [{*}]       args        arguments to apply to curried function
	 */
callFirst = function callFirst(fn, first) {
	return function () {
		for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
			args[_key5] = arguments[_key5];
		}

		return fn.apply(undefined, [first].concat(args));
	};
},

/**
 * callLast
 *
 * this will partially apply a function and the last arg, returned function will take
 * remaining arguments and apply to the curried function
 *
 * ` callFirst( Function( ...arguments ), last ) => ( ...arguments ) `
 *
 * @param   {Function}  fn          curried function
 * @param   {*}         last        last argument
 *
 * @returns {Function}
 *
 *      @param  [{*}]       args        arguments to apply to curried function
 */
callLast = function callLast(fn, last) {
	return function () {
		for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
			args[_key6] = arguments[_key6];
		}

		return fn.apply(undefined, args.concat([last]));
	};
},

/**
 * curryOne
 *
 * this function will curry a function taking one argument
 *
 * ` curryOne( Function ) => ( *:arg ) `
 *
 * @param   {Function}  fn          function to curry
 *
 * @returns {Function}
 *
 *      @param  {*]         arg         argument to apply to curried function
 *
 *      @returns {*}                    return from curried function
	 */
curryOne = function curryOne(fn) {
	return function (arg) {
		return fn.call(undefined, arg);
	};
},

/**
 * curryOne
 *
 * this function will curry a function taking one argument
 *
 * @param   {Function}  fn          function to curry
 *
 * @returns {Function}
 *
 *      @param  {*]         arg         argument to apply to curried function
 *
 *      @returns {*}                    return from curried function
 */
curryTwo = function curryTwo(fn) {
	return function (arg) {
		return callFirst(fn, arg);
	};
},

/**
 * curryThree
 *
 * this function will curry a function taking three arguments
 *
 * ` curryTwo( Function ) => ( first ) => ( second ) => ( third ); `
 *
 * @param   {Function}  fn          function to curry
 *
 * @returns {Function}      curryTwo
	 */
curryThree = function curryThree(fn) {
	return function (arg) {
		return curryTwo(callFirst(fn, arg));
	};
},

/**
 * fluent
 *
 * this decorator will return the owning object if no return
 * value is given to the curried function
 *
 * @param {Function}    method      method to decorate
 *
 * @returns {Function}
 *
 *      @param  [{*}]       args        arguments for curried method
 *
 *      @returns    {*}                 value of this abj
	 */
fluent = function fluent(method) {
	return function fluent() {
		for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
			args[_key7] = arguments[_key7];
		}

		var ret = method.apply(this, args);
		return typeof ret !== 'undefined' ? ret : this;
	};
},

/**
 * maybe
 *
 * this function will only execute the curried function on an object
 * if none of the arguments are nully
	 */
maybe = function maybe(fn) {
	return function maybe() {
		for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
			args[_key8] = arguments[_key8];
		}

		return args.length === 0 || containsNully(args) ? void 0 : fn.apply(this, args);
	};
},
    curriedMapWith = curryTwo(flip(map)),

/**
 * setter
 *
 * this decorator will only set a property's value if the arguments are
 * not null, and will return the value or this for fluent chaining
 */
setter = compose(fluent, maybe),

/**
 * not
 *
 * this function will return the inverse of the curried function
 *
 * @param {Function}    fn          function to curry
 *
 * @returns {Function}
 *
 *      @param  {*}         args        arguments to apply to curried function
	 */
not = function not(fn) {
	return function () {
		for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
			args[_key9] = arguments[_key9];
		}

		return !fn.apply(this, args);
	};
},

/**
 * bind
 *
 * this function will bind arguments to a curried function
 *
 * ` bind( Function [, *:...bound] ) => ( *:...passed ) `
 *
 * @param {Function}    fn          function to curry
 *
 * @returns {Function}
 *
 *      @param  [{*}]       bound       arguments to bind to curried function
 *
 *      @returns {Function}
 *
 *          @param [{*}]        passed      arguments passed when calling bound function
 *
 *          @returns {*}                    result of curried function
	 */
bind = function bind(fn) {
	return function () {
		for (var _len10 = arguments.length, bound = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
			bound[_key10] = arguments[_key10];
		}

		return function () {
			for (var _len11 = arguments.length, passed = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
				passed[_key11] = arguments[_key11];
			}

			return fn.apply(this, bound.concat(passed));
		};
	};
},

/**
 * typeIs
 *
 * this function will curry a property value, and return a function that takes
 * a value to compare.
 *
 * `typeIs( *:prop ) => ( *:val )`
 *
 * @param {*}       prop            a type of object
 *
 * @returns {Function}
 *
 *      @param {*}       val             a value to check against the type
 *
 *      @returns {Boolean}
	 */
typeIs = function typeIs(prop) {
	return function (val) {
		return typeof val === prop;
	};
},
    isInstance = function isInstance(instance) {
	return function (thing) {
		return thing instanceof instance;
	};
},
    isUndefined = typeIs('undefined'),
    notUndefined = not(isUndefined),
    isFunction = typeIs('function'),
    isElement = isInstance(HTMLElement),
    isNodeList = isInstance(NodeList),
    isString = typeIs('string'),
    isNully = function isNully(val) {
	return val == null;
},
    nullyFilter = filterWith(not(isNully)),
    count = function count(thing) {
	return thing.length;
},
    containsNully = compose(count, filterWith(isNully)),

/**
 * this function will return an array of the values not
 * contained in the input array
 *
 * @param   {Array}     arr         array to check
 * @param   {Array}     values      array to compare
 *
 * @returns {Array}     values not in input array
	 */
notIn = function notIn(arr) {
	for (var _len12 = arguments.length, values = Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
		values[_key12 - 1] = arguments[_key12];
	}

	return values.filter(function (item) {
		return arr.indexOf(item) > -1;
	});
},
    combine = function combine(arr) {
	return function () {
		for (var _len13 = arguments.length, values = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
			values[_key13] = arguments[_key13];
		}

		var index = null;
		values = arr.concat(notIn(arr, values));
	};
},
    diff = function diff(one, two) {
	return one < two ? two - one : (one - two) * -1;
},
    diffArray = function diffArray(left, right) {
	var ret = [],
	    ii = 0,
	    ll = left.length;

	for (; ii < ll; ii++) {
		ret.push(diff(left[ii], right[ii]));
	}
	return ret;
},
    getSet = function getSet(prop, fn) {
	return fluent(function (val) {
		if (isUndefined(val)) {
			return this[prop];
		}
		extend(this[prop], val);
	});
},
    capitalize = function capitalize(str) {
	return str.replace(/(\w)(\w*)/, function (matches, first, rest) {
		return first.toUpperCase() + rest;
	});
},
    crossBrowser = function crossBrowser() {
	for (var _len14 = arguments.length, browsers = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
		browsers[_key14] = arguments[_key14];
	}

	return function (prop) {
		return function (el, value) {
			browsers.forEach(function (browser) {
				return el.style[browser + '-' + capitalize(prop)] = value;
			});

			el.style[prop] = value;
		};
	};
},
    allBrowsers = crossBrowser('webkit', 'moz', 'ms'),
    transform = allBrowsers('transform');

function extend(reciever) {
	for (var _len15 = arguments.length, givers = Array(_len15 > 1 ? _len15 - 1 : 0), _key15 = 1; _key15 < _len15; _key15++) {
		givers[_key15 - 1] = arguments[_key15];
	}

	return givers.reduce(function (reciever, giver) {

		for (var key in giver) {
			reciever[key] = giver[key];
		}

		return reciever;
	}, reciever);
}

extend.fluent = function (reciever) {
	for (var _len16 = arguments.length, givers = Array(_len16 > 1 ? _len16 - 1 : 0), _key16 = 1; _key16 < _len16; _key16++) {
		givers[_key16 - 1] = arguments[_key16];
	}

	return givers.reduce(function (reciever, giver) {

		for (var key in giver) {
			reciever[key] = fluent(giver[key]);
		}

		return reciever;
	}, reciever);
};

// this should force re compiling force again bitches

//# sourceMappingURL=functional-compiled.js.map