/**
 * gQuery
 *
 * this is a mock of jQuery using only the functions that I use every day.
 *
 * it will find a collection of HTML elements maseed on the seleector function
 * and wrap them in a utility library of useful methods to update or read the
 * collection.
 *
 * TODO: add pubsub events
 *
 * @example
 *  ```
 *  $( String:selector|Element|document|window|gQuery )
 *          .method(  );
 *  ```
 *
 */

(function(){
	'use strict';
	window.$ = selector;

	/**
	 * selector
	 *
	 * this function will create a new gQuery instance using the selector
	 * or passed elements
	 *
	 * @param   {String|HTMLElement|NodeList|window|document}    selector   selector to wrap with gQuery
	 * @param   {HTMLElement}   context     optional: parent element to select from
	 *
	 * @returns {gQuery}
	 */
	function selector( selector /*, context */ ){
		if( selector === window || selector === document || selector instanceof HTMLElement){
			return new gQuery('object', [selector]);
		}
		let els = isNodeList(selector) ? selector : ( arguments[1] || document ).querySelectorAll( selector );
		return new gQuery( selector, els );
	}

	/**
	 * gQuery
	 *
	 * this is the gQuery constructor. to create now instance
	 *
	 * @param   {NodeList}  els     elements to wrap with gQuery
	 */
	function gQuery( selector, els ){
		this.add( els );
		this.length = els.length;
		this.events = {};
		this.selector = selector;
	}

	let
		/**
		 * running
		 *
		 * true if animations pending, else false
		 * @type {boolean}
		 */
		running = false,
		/**
		 * animations
		 *
		 * this array holds any currently running animations
		 * @type {Array}
		 */
		animations = [];

	const
		/**
		 * easing
		 *
		 * this object will hold the easing functions for animations
		 *
		 * @type {{easeIn: Function, linear: Function}}
		 */
	    easing     = {
		    easeIn: function easeIn( time, begin, change, duration ){
			    return -change * (time /= duration) * (time - 2) + begin;
		    },
		    linear: function linear( progress, begin, change, duration ){
			    return progress < duration
				    ? property.begin + (progress / time) * change
				    : begin + change;
		    }
	    };

	extend( gQuery.prototype, {

		/**
		 * $.prototype.css
		 *
		 * this method will set or return a css property value, if cannot find
		 * css property on element, will use getComputedStyle and cause ui reflow.
		 *
		 * @param   {Object|String}     style       Object: style properties, String:style property identifier
		 */
		css: fluent( function( style ){

			if( typeof style === 'string' ){
				return cssProp( this[ 0 ], style );
			}

			this.each( function( el ){
				for( let key in style ) {
					el.style[ key ] = style[ key ];
				}
			} );
		} ),

        /**
		 * $.prototype.text
		 *
		 * this method will set or return an elements innerHTML, if cannot find
		 * css property on element, will use getComputedStyle and cause ui reflow.
		 *
		 * @param   {Object|String}     style       Object: style properties, String:style property identifier
		 */
		html: fluent( function( text ){

			if( !text ){
				return this[ 0 ].innerHTML;
			}

			this.each( function( el ){
				el.innerHTML = text;
			});
		}),

		/**
		 * $.prototype.each
		 *
		 * this method will run a function on each element in the current
		 * instance.
		 *
		 * `gQuery.each(( element ) => { ...do something })`
		 *
		 * @param   {Function}  fn      callback function
		 */
		each: fluent( function( fn ){
			for( let ii = 0, ll = this.length; ii < ll; ii++ ) {
				fn.call( this[ ii ], this[ ii ], ii, this );
			}
		} ),

		/**
		 * $.prototype.add
		 *
		 * this method wil add a new object to the current gQuery instance
		 *
		 * gQuery.add( NodeList )
		 *
		 * @param   {NodeList}     els     elements to add to the instance
		 *
		 * @returns {gQuery}
		 * @fluent
		 */
		add: fluent( function( els ){
			let
				ii = this.length || 0,
			    el = els.length,
			    ll = ii + el;

			for( ; ii < ll; ii++ ) {
				this[ ii ] = els[ ii ];
			}
			this.length = ll;
		} ),

		/**
		 * $.prototype.on
		 *
		 * this method will bind an event to the instance elements
		 *
		 * @param   {String}    evt         event name to bind
		 * @param   {Function}  fn          function to callback on event
		 * @param   {Boolean}   capture     optional: use the event capture phase
		 *
		 * @returns {gQuery}
		 * @fluent
		 */
		on: fluent( function( evt, fn, capture ){
			this.events[ evt ] = fn;
			this.each( function( el ){
				el.addEventListener( evt, fn.bind( el ), capture || false );
			} );
		} ),

		/**
		 * $.prototype.off
		 *
		 * this method will remove an event listener for the instance elements
		 *
		 * @param   {String}    evt     event identifier to remove
		 *
		 * @returns {gQuery}
		 * @fluent
		 */
		off: fluent( function( evt ){
			const fn             = this.events[ evt ];
			this.each( function( el ){
				el.removeEventListener( evt, fn );
			} );
			this.events[ evt ] = null;
		} ),

		/**
		 * $.prototype.children
		 *
		 * this method will return a new instance containing the current elements
		 * children
		 *
		 * @returns {gQuery}
		 */
		children: function(){
			let ret = [];
			this.each( function( el ){
				let children = slice( el.children );
				Array.prototype.splice.apply( ret, [ ret.length, 0 ].concat( children ) );
			} );
			return new gQuery( this.selector, ret );
		},

		/**
		 * $.prototype.splice
		 *
		 * this method is copied from the Array.prototype so the output
		 * get's converted to an array in the console.
		 */
		splice: Array.prototype.splice,

		/**
		 * $.prototype.find
		 *
		 * this method will search from the current element, looking for any
		 * children that match the selector.
		 *
		 * @param   {String}    selector        child selector
		 *
		 * @returns {gQuery}                    new instance with child nodes
		 */
		find: function( selector ){
			let ret = [];
			this.each( function( el ){
				const children = slice( el.querySelectorAll( selector ) );
				Array.prototype.splice.apply( ret, [ ret.length, 0 ].concat( children ) );
			});
			return new gQuery( this.selector, ret );
		},

		/**
		 * removeClass
		 *
		 * this method will remove a any classes passed in as arguments from the gquery
		 * collection.
		 *
		 * @param   {Array}     classes     classes to remove from the current selection
		 */
		removeClass: fluent(function( ...classes ){
			this.each(function( el ){
				el.classList.remove.apply(el.classList, classes );
			});
		}),

		/**
		 * addClass
		 *
		 * this method will remove a any classes passed in as arguments from the gquery
		 * collection.
		 *
		 * @param   {Array}     classes     classes to remove from the current selection
		 */
		addClass: fluent(function( ...classes ){
			this.each(function( el ){
				el.classList.add.apply(el.classList, classes );
			});
		}),

		/**
		 * toggleClass
		 *
		 * this method will remove a any classes passed in as arguments from the gquery
		 * collection.
		 *
		 * @param   {Array}     classes     classes to remove from the current selection
		 */
		toggleClass: fluent(function( ...classes ) {
			this.each(function( el ){
				el.classList.toggle.apply( el.classList, classes );
			});
		}),

		classes: function( ...classes ){
			var classez = [];
			this.each(function( el ){
				classez.concat( slice( el.classList ) );
			});
			return classez;
		},
		/**
		 * $.prototype.data
		 *
		 * this method will return the dataset of an element or a property
		 *
		 * @param   {String}    key         optional: key from dataset to retrieve
		 *
		 * @returns {*}                     dataset value
		 */
		data: function( key ){
			return notUndefined( key )
				? this[0].dataset[ key ]
				: this[0].dataset;
		},

		/**
		 * $.prototype.offset
		 *
		 * this method will find the top offset from the provided parent
		 * or the body element.
		 *
		 * @param   {HTMLElement}   parent      optional: parent element to get offset from.
		 *
		 * @returns {Number}                    total affset in px;
		 */
		offset: function( parent ){

			parent = parent || document.body;

			return _offset( 0, this[0] );

			function _offset( offset, el ){
				return el !== parent
					? _offset( offset += el.offsetTop, el.parentNode )
					: offset;
			}
		},

		/**
		 * $.prototype.translateX
		 *
		 * this method will return the translateX property, or set it
		 *
		 * @param   {Number}    val     optional:value to set
		 * @returns {Number}
		 */
		translateX: (function(){

			var translations = {};

			return function( val ){

				var ii = xx++;

				if( val ){

					this.each( function( el ){
						el.style.transform = 'translateX(' + val + 'px)';
					} );

				} else {
					let
						transform = this[ 0 ].style.transform,
						match     = transform.match( /translateX\(([0-9-.]+)(px|em|%)*\)/ );

					return parseInt( match[ 1 ] );
				}

			}

		})(),

		/**
		 * $.prototype.animate
		 *
		 * this method wil add the current animation properties to the animation queue
		 * and start it if not already started.
		 *
		 * @param {Object}      styles      key: value object of style properties. (camelCase keys)
		 * @param {Int}         time        total time for the animation
		 * @param {Function}    cb          callback when animation has finished. (called once per element animated)
		 * @param {String}      ease        easing algorithm. linear || easeIn (default)
		 *
		 * @returns void 0;
		 */
		animate: function( styles, time, cb, ease ){
			const
				self = this;

			// build the animation queue
			this.each( ( el ) =>
				_addAnimation( el, styles, time, cb, ease ));
		},

		/**
		 * $.protytpe.stagger
		 *
		 * this method will stagger all element animations by the delay time
		 *
		 * $collection.stagger(500, {prop: value}, time, (el) => , 'easing' );
		 * $collection.stagger((ii) => ii * 500, {prop: value}, time, (el) => , 'easing' );
		 *
		 * @param   {Number|Function}   delay       delay time in miliseconds for each iteration,
		 *                                          or function to calculate. neww timeout. this: element, args( ii:iteration )
		 * @param   {Object}            styles      styles to apply to the element
		 * @praam   {Number}            time        total animation time
		 * @param   {Function}          cb          callback when animation of element is complete
		 * @param   {String}            ease        easing algorithm
		 */
		stagger: function( delay, styles, time, cb, ease ){

			this.each(( el, ii ) => {

				var timeout = isFunction( delay )
					? delay.call( el, ii )
					: ii * delay;

				return window.setTimeout( () => {
					_addAnimation( el, styles, time, cb, ease );
				}, timeout );
			});

		},


        spy: (function () {

            var
                stopped = true,
                offset = 0,
                events = [];

            return function _spy(cb, offset) {

                this.each(function( el ){

                    var
                        elOrOffset = null;

                    if (!offset) {
                        offset = $(el).offset();
                    }

                    events.push({
                        el: elOrOffset,
                        cb: cb,
                        offset: offset - (window.innerHeight * .5)
                    });

                    if (stopped) {
                        _run();
                    }

                });
            };

            function _run() {

                if (events.length) {
                    stopped = false;
                    window.setTimeout(function () {
                        window.requestAnimationFrame(_update)
                    }, 120);
                } else {
                    stopped = true;
                }

                _update();

            }

            function _update() {

                offset = window.scrollY;

                events = events.filter(function (event) {

                    if (offset > event.offset) {
                        event.cb.call(event.el, event.el, offset);
                        return false;
                    }

                    return true;

                });
            }

        })()

	});

	function _addAnimation( el, styles, time, cb, ease ){

		let ret = {
			el   : el,
			props: {},
			cb: cb
		};
		let key;
		for( key in styles ) {
			let initial = cssProp( el, key ),
			    prop    = styles[ key ],
			    noUnit  = ['opacity'].indexOf(key) > -1,
			    to, unit;
			if( isString( prop ) ){
				let match = styles[ key ].match( /([-\.0-9]+)(px|%|em)*/ );
				to        = parseFloat( match[ 1 ] );
				unit      = match[ 2 ] || 'px';
			} else {
				to   = prop;
				unit = noUnit ? '' : unit || 'px';
			}

			ret.props[ key ] = {
				curr   : initial,
				to     : to,
				unit   : unit,
				initial: initial,
				easing : ease,
				time   : time,
				start  : Date.now()
			};
			ret.props[ key ].diff = diff( initial, to );

		}

		animations.push( ret );

		if( !running ){
			running = true;
			window.requestAnimationFrame( _animate );
		}

	}

	/**
	 * _animate
	 *
	 * this function will loop over the current animation queue calculating
	 * new vertors and updating the styles, finished animations are removed from
	 * the queue.
	 *
	 * @param   {Number}     timestamp       timestamp inherited from api
	 *
	 * TODO: find out if filter is too cpu intensive for lots of concurrent animations
	 * TODO: create web worker for the calculations
	 *
	 * @private
	 */
	function _animate( timestamp ){
		// filter out any finished animations
		animations = animations.filter( function( animation ){

			let
				prop,
			    property,
			    progress;

			for( prop in animation.props ) {

				property = animation.props[prop];
				progress = Date.now() - property.start;

				property.curr = easing[ property.easing || 'easeIn' ]( progress, property.initial, property.diff, property.time);
				animation.el.style[ prop ] = property.curr + property.unit;

				if( progress < property.time ){
					return true;
				} else {
					if( isFunction(animation.cb) ){
						animation.cb.call( animation.el, animation.el, animation );
					}
					return false;
				}
			}
		});
		// only call the _animaate function if there are animations still pending
		if( animations.length ){
			window.requestAnimationFrame( _animate );
		} else {
			running = false;
		}
	}

	/**
	 * cssProp
	 *
	 * this function will return a css property. if property cannot be found on the
	 * element, getComputedStyle will be used and cause a ui reflow.
	 *
	 * @param   {HTMLElement}   el      element to get style from
	 * @param   {String}        prop    property value to retrieve
	 *
	 * @returns {Number}
	 */
	function cssProp(el, prop){
		return parseFloat( el.style[ prop ] || window.getComputedStyle( el, null )[ prop ] );
	}

	function every( method ){
		return function( fn, ...args ){
			const self = this,
			    ll   = this.length;
			for(let ii = 0; ii < ll; ii++ ){
				fn.apply( self[ii], [ self[ii] ].concat( args ) );
			}
		}
	}

})();
