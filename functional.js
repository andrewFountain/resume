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
		curry       =   ( fn ) =>{
							var ll = fn.length,
						    _curry = ( _args_ ) =>
							    ( ...args ) =>{
								    var a = _args_.concat( args );
								    return a.length >= ll
									    ? fn.apply( this, a )
									    : _curry( a );
							    };
							return _curry( [] );
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
		curryArgs   =   ( fn, argLength ) => {
							var _curry = ( _args_ ) =>
								( ...args ) => {
									var a = _args_.concat( args );
									return a.length >= argLength
										? fn.apply( this, a )
										: _curry( a );
								};
							return _curry( [] );
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
		flipAll     =   ( fn ) =>
							( ...args ) =>
								fn.apply( this, args.reverse() ),


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
		flip        =   ( fn ) =>
							( first, second ) => {
								return second
									? _flip( second )
									: _flip;
								function _flip(second) {
									return fn.call(this, second, first)
								}
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
		first       =   ( fn ) =>
							( first ) =>
								fn.call( this, first ),

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
		arrProto    =   ( method ) => {
							method = Array.prototype[ method ];
							return ( arr, ...args ) =>
								method.apply( arr, args );
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
		slice       =   arrProto( 'slice' ),



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
		map         =   arrProto( 'map' ),


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
		mapWith     =   flip( map ),

		parseIntMap    = mapWith( first(parseInt)),

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
		filter      =   arrProto( 'filter' ),


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
		filterWith  =   flip( filter ),


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
		get         =   ( obj ) =>
							( item ) =>
								obj[ item ],


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
		compose     =   ( a, b ) =>
							( c ) =>
								a( b( c ) ),


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
		pipe        =   flipAll( compose ),


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
		callFirst   =   ( fn, first ) =>
							( ...args ) =>
								fn.apply(this, [ first ].concat( args ) ),


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
		callLast    =   ( fn, last ) =>
							( ...args ) =>
								fn.apply(this, args.concat( [ last ] ) ),


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
		curryOne    =   ( fn ) =>
							( arg ) =>
								fn.call( this, arg ),


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
		curryTwo    =   ( fn ) =>
							( arg ) =>
								callFirst(fn, arg ),


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
		curryThree  =   ( fn ) =>
							( arg ) =>
								curryTwo(callFirst(fn, arg )),


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
		fluent      =   ( method ) =>
							function fluent( ...args ){
								var ret = method.apply( this, args );
								return typeof ret !== 'undefined'
									? ret
									: this
							},

		/**
		 * maybe
		 *
		 * this function will only execute the curried function on an object
		 * if none of the arguments are nully
 		 */
		maybe       =   ( fn ) =>
							function maybe( ...args ){
								return args.length === 0 || containsNully( args )
									? void 0
									: fn.apply(this, args );
							},


		curriedMapWith =    curryTwo( flip( map ) ),

		/**
		 * setter
		 *
		 * this decorator will only set a property's value if the arguments are
		 * not null, and will return the value or this for fluent chaining
		 */
		setter      =       compose( fluent, maybe ),

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
		not         =   ( fn ) =>
							function( ...args ){
								return !fn.apply( this, args );
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
		bind        =   ( fn ) =>
							( ...bound ) =>
								function( ...passed ) {
									return fn.apply(this, bound.concat( passed ))
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
		typeIs      =   ( prop ) =>
							( val ) =>
								typeof val === prop,


		isInstance  =   ( instance ) =>
							( thing ) =>
								thing instanceof instance,


		isUndefined =   typeIs( 'undefined' ),


		notUndefined=   not(isUndefined),


		isFunction  =   typeIs('function'),

		isElement   =   isInstance(HTMLElement),
		isNodeList  =   isInstance(NodeList),

		isString    =   typeIs('string'),

		isNully = ( val ) => val == null,
		nullyFilter = filterWith( not(isNully) ),
		count = ( thing ) => thing.length,
		containsNully = compose( count, filterWith( isNully ) ),

		/**
		 * this function will return an array of the values not
		 * contained in the input array
		 *
		 * @param   {Array}     arr         array to check
		 * @param   {Array}     values      array to compare
		 *
		 * @returns {Array}     values not in input array
 		 */
		notIn       = (arr, ...values ) =>
			values.filter(( item ) => arr.indexOf(item) > -1 ),


		combine     =   ( arr ) =>
							( ...values ) => {
								var index = null;
								values = arr.concat( notIn(arr, values ));
							},


		diff        =   ( one, two ) =>
							one < two
								? two - one
								: ( one - two ) * -1,

		diffArray   =   (left, right) => {
							var ret = [],
								ii = 0,
								ll = left.length;

							for( ; ii < ll; ii++ ){
								ret.push(diff( left[ii], right[ii] ));
							}
							return ret;
						},


		getSet      =   ( prop, fn ) => {
							return fluent(function( val ){
								if( isUndefined( val ) ){
									return this[ prop ];
								}
								extend( this[ prop ], val );
							})
						},


		capitalize  =   ( str ) =>
							str.replace(/(\w)(\w*)/, ( matches, first, rest) =>
								first.toUpperCase() + rest ),


	    crossBrowser =  (...browsers) =>
						    ( prop ) =>
							    ( el, value ) => {
								    browsers.forEach(( browser ) =>
									    el.style[browser + '-' + capitalize( prop ) ] = value );

								    el.style[ prop ] = value;
	                            },


	    allBrowsers =   crossBrowser('webkit', 'moz', 'ms' ),


	    transform   =   allBrowsers('transform');


	function extend( reciever, ...givers ){
		return givers.reduce(function( reciever, giver ){

			for( var key in giver ){
				reciever[ key ] = giver[ key ];
			}

			return reciever;

		}, reciever )
	}



	extend.fluent = function( reciever, ...givers ){
		return givers.reduce( function( reciever, giver ){

			for( var key in giver ) {
				reciever[ key ] = fluent(giver[ key ]);
			}

			return reciever;

		}, reciever )
	};


	// this should force re compiling force again bitches