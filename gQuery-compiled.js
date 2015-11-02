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

'use strict';

(function () {
	'use strict';
	window.$ = selector;
	window.gQuery = gQuery;

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
	function selector(selector /*, context */) {
		if (selector === window || selector === document || selector instanceof HTMLElement) {
			return new gQuery('object', [selector]);
		}
		/*let*/var els = isNodeList(selector) ? selector : (arguments[1] || document).querySelectorAll(selector);
		return new gQuery(selector, els);
	}

	/**
  * gQuery
  *
  * this is the gQuery constructor. to create now instance
  *
  * @param   {NodeList}  els     elements to wrap with gQuery
  */
	function gQuery(selector, els) {
		this.add(els);
		this.length = els.length;
		this.events = {};
		this.selector = selector;
	}

	/*let*/
	var
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
	animations = [],
	    tweens = [];

	/*const*/
	var
	/**
  * easing
  *
  * this object will hold the easing functions for animations
  *
  * @type {{easeIn: Function, linear: Function}}
  */
	easing = {
		easeIn: function easeIn(time, begin, change, duration) {
			return -change * (time /= duration) * (time - 2) + begin;
		},
		linear: function linear(progress, begin, change, duration) {
			return progress < duration ? property.begin + progress / time * change : begin + change;
		}
	};

	extend(gQuery.prototype, {

		/**
   * $.prototype.css
   *
   * this method will set or return a css property value, if cannot find
   * css property on element, will use getComputedStyle and cause ui reflow.
   *
   * @param   {Object|String}     style       Object: style properties, String:style property identifier
   */
		css: fluent(function (style) {

			if (typeof style === 'string') {
				var prop = cssProp(this[0], style);
				return isColorProperty(style) ? prop : parseFloat(prop);
			}

			this.each(function (el) {
				for ( /*let*/var key in style) {
					el.style[key] = style[key];
				}
			});
		}),

		/**
  * $.prototype.text
  *
  * this method will set or return an elements innerHTML, if cannot find
  * css property on element, will use getComputedStyle and cause ui reflow.
  *
  * @param   {Object|String}     style       Object: style properties, String:style property identifier
  */
		html: fluent(function (text) {

			if (!text) {
				return this[0].innerHTML;
			}

			this.each(function (el) {
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
		each: fluent(function (fn) {
			for ( /*let*/var ii = 0, ll = this.length; ii < ll; ii++) {
				fn.call(this[ii], this[ii], ii, this);
			}
		}),

		map: fluent(function (fn) {
			return Array.prototype.map.apply(this, arguments);
		}),

		reduce: fluent(function (fn, initial) {
			return Array.prototype.reduce.apply(this, arguments);
		}),

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
		add: fluent(function (els) {
			/*let*/
			var ii = this.length || 0,
			    el = els.length,
			    ll = ii + el;

			for (; ii < ll; ii++) {
				this[ii] = els[ii];
			}
			this.length = ll;
		}),

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
		on: fluent(function (evt, fn, capture) {
			this.events[evt] = fn;
			this.each(function (el) {
				el.addEventListener(evt, fn.bind(el), capture || false);
			});
		}),

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
		off: fluent(function (evt) {
			/*const*/var fn = this.events[evt];
			this.each(function (el) {
				el.removeEventListener(evt, fn);
			});
			this.events[evt] = null;
		}),

		/**
   * $.prototype.children
   *
   * this method will return a new instance containing the current elements
   * children
   *
   * @returns {gQuery}
   */
		children: function children() {
			/*let*/var ret = [];
			this.each(function (el) {
				/*let*/var children = slice(el.children);
				Array.prototype.splice.apply(ret, [ret.length, 0].concat(children));
			});
			return new gQuery(this.selector, ret);
		},

		/**
  * $.prototype.scrollTo
   *
   * this method will scroll the first element in the gQuery object into view
   *
   * @param   {Number}    time        time in miliseconds to perform the animation
   * @param   {String}    easeFn      easing algorithm.
   *
   * @fluent
  **/
		scrollTo: fluent(function (time, easeFn) {

			time = time || 2000;

			var to = this.offset() - 4 * 16,
			    curr = window.pageYOffset || document.documentElement.scrollTop,
			    start = Date.now(),
			    progress,
			    initial = curr,
			    difference = diff(initial, to);

			//var scroller = new Scroller( to, time, ease );
			//
			//animations.push( scroller );
			//
			//if( !running ){
			//	running = true;
			//	window.requestAnimationFrame( _animate );
			//}

			function _scrollTo() {

				progress = Date.now() - start;

				curr = easing[easeFn || 'easeIn'](progress, initial, difference, time);
				window.scrollTo(0, curr);

				if (progress < time) {
					window.requestAnimationFrame(_scrollTo);
				}
			}

			_scrollTo();
		}),

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
		find: function find(selector) {
			/*let*/var ret = [];
			this.each(function (el) {
				/*const*/var children = slice(el.querySelectorAll(selector));
				Array.prototype.splice.apply(ret, [ret.length, 0].concat(children));
			});
			return new gQuery(this.selector, ret);
		},

		/**
   * removeClass
   *
   * this method will remove a any classes passed in as arguments from the gquery
   * collection.
   *
   * @param   {Array}     classes     classes to remove from the current selection
   */
		removeClass: fluent(function () {
			for (var _len = arguments.length, classes = Array(_len), _key = 0; _key < _len; _key++) {
				classes[_key] = arguments[_key];
			}

			this.each(function (el) {
				el.classList.remove.apply(el.classList, classes);
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
		addClass: fluent(function () {
			for (var _len2 = arguments.length, classes = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				classes[_key2] = arguments[_key2];
			}

			this.each(function (el) {
				el.classList.add.apply(el.classList, classes);
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
		toggleClass: fluent(function () {
			for (var _len3 = arguments.length, classes = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				classes[_key3] = arguments[_key3];
			}

			this.each(function (el) {
				el.classList.toggle.apply(el.classList, classes);
			});
		}),

		classes: function classes() {
			var classez = [];
			this.each(function (el) {
				classez.concat(slice(el.classList));
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
		data: function data(key) {
			return notUndefined(key) ? this[0].dataset[key] : this[0].dataset;
		},

		dataAll: function dataAll(key) {
			var ret;
			if (notDefined) {}

			return notUndefined(key) ? this[0].dataset[key] : this[0].dataset;
		},

		/**
   * $.prototype.offset
   *
   * this method will find the top offset from the provided parent
   * or the body element.
   *
   * @param   {*}         parent    optional: parent element to get offset from. selector, gQuery, HTMLElement
   *
   * @returns {Number}              total affset in px;
   */
		offset: function offset(parent) {

			if (parent) {
				// set the parent. can accept selector, gQuery instance or element,
				// will set parent to HTMLElement for comparison.
				parent = isString(parent) // it's a selector
				? document.querySelector(parent) : parent instanceof gQuery ? parent[0] // only the first element
				: parent; // it must me an element
			} else {
					parent = document.body;
				}

			return _offset(0, this[0]);

			function _offset(_x, _x2) {
				var _again = true;

				_function: while (_again) {
					var offset = _x,
					    el = _x2;
					_again = false;
					if (el !== parent) {
						_x = offset += el.offsetTop;
						_x2 = el.parentNode;
						_again = true;
						continue _function;
					} else {
						return offset;
					}
				}
			}
		},

		/**
   * $.prototype.translateX
   *
   * this method will return the translateX property, or set it
   *
   * @param   {String}    val     optional:value to set, with unit
   * @returns {Number}
   */
		translateX: (function () {

			var translations = {};

			return function (val) {

				var ii = xx++;

				if (val) {

					this.each(function (el) {
						el.style.transform = 'translateX(' + val + ')';
					});
				} else {
					/*let*/
					var transform = this[0].style.transform,
					    match = transform.match(/translateX\(([0-9-.]+)(px|em|%)*\)/);

					return parseInt(match[1]);
				}
			};
		})(),

		/**
   * $.prototype.matrix
   *
   * this method will set or return the current matrix parameters
   *
   * @param   {Array}     matrixArr    optional: array of matrix values [a,b,c,d,x,y] || [x,y]
   *
   * @returns {gQuery|Array}          this or array representing current matrix, [a,b,c,d,x,y]
   */
		matrix: fluent(function (matrixArr) {
			if (matrixArr) {
				this.each(function (el) {
					matrix(el, matrixArr);
				});
			}
			return matrix(this[0]);
		}),

		/**
   * $.prototype.animate
   *
   * this method wil add the current animation properties to the animation queue
   * and start it if not already started.
   *
   * @param {Array}       xy          co-ordinates for animation
   * @param {Object}      styles      key: value object of style properties. (camelCase keys)
   * @param {Number}      time        total time for the animation
   * @param {Function}    cb          callback when animation has finished. (called once per element animated)
   * @param {String}      ease        easing algorithm. linear || easeIn (default)
   *
   * @returns void 0;
   */
		animate: function animate(xy, styles, time, cb, ease) {
			/*const*/var self = this;

			// build the animation queue
			this.each(function (el) {
				return _addAnimation(el, xy, styles, time, cb, ease);
			});
		},

		animateFrom: function animateFrom(xy, styles, time, cb, ease) {
			/*const*/var self = this;

			// build the animation queue
			this.each(function (el) {
				return _addAnimation(el, xy, styles, time, cb, ease, true);
			});
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
   * @param   {Array}             xy          xy co-ordinates for animation
   * @param   {Object}            styles      styles to apply to the element
   * @praam   {Number}            time        total animation time
   * @param   {Function}          cb          callback when animation of element is complete
   * @param   {String}            ease        easing algorithm
   */
		stagger: function stagger(delay, xy, styles, time, cb, ease) {

			this.each(function (el, ii) {

				var timeout = isFunction(delay) ? delay.call(el, ii) : ii * delay;

				return window.setTimeout(function () {
					_addAnimation(el, xy, styles, time, cb, ease);
				}, timeout);
			});
		},

		staggerFrom: function staggerFrom(delay, xy, styles, time, cb, ease) {

			this.each(function (el, ii) {

				var timeout = isFunction(delay) ? delay.call(el, ii) : ii * delay;

				return window.setTimeout(function () {
					_addAnimation(el, xy, styles, time, cb, ease, true);
				}, timeout);
			});
		},

		/**
   * $.prototype.spy
   *
   * this method will bind events to when the elements scroll into view
   *
   * $( 'some-element' ).spy( Function:cb [, offset] );
   *
   * @param   {Function}  cb      callback when event is fired
   * @param   {Number}    offset  offset from the top
   *
   * TODO: figure out a between method
   * TODO: make permenant events
   */
		spy: (function () {

			var stopped = true,
			    offset = 0,
			    events = [];

			return fluent(function _spy(cb, offset) {

				this.each(function (el) {

					var elOrOffset = null;

					if (!offset) {
						offset = $(el).offset();
					}

					events.push({
						el: elOrOffset,
						cb: cb,
						offset: offset - window.innerHeight * .5
					});

					if (stopped) {
						_run();
					}
				});
			});

			/**
    * _run
    *
    * this function will create a recursive animation
    *
    * @private
    */
			function _run() {

				if (events.length) {
					stopped = false;
					window.setTimeout(function () {
						window.requestAnimationFrame(_update);
					}, 120);
				} else {
					stopped = true;
				}

				_update();
			}

			/**
    * _update
    *
    * this function will check the scroll position against the events.
    * if the event has fired it will be removed from the events array.
    *
    * @private
    */
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

	/**
  * gQuery static methods
  */
	extend(gQuery, {

		tween: function tween(tweenArr, cb) {

			tweenArr.forEach(function (tween) {

				_addTween(tween);
			});
		}

	});

	//$.tweenTo( [
	//	{
	//		el   : '.thing:nth-child(1)',
	//		pos  : [ 0, 0 ],
	//		style: {
	//			opacity: 1
	//		},
	//		time : 1000,
	//		delay: 0
	//	},
	//	{
	//		el   : '.thing:nth-child(2)',
	//		pos  : [ 200, 0 ],
	//		style: {
	//			apacity: 1
	//		},
	//		time : 1000,
	//		delay: 0
	//	}
	//], function(){
	//	console.log( 'tweening complete' );
	//} );

	/**
  * base animation class to inherit
  */
	function Animation() {}
	extend(Animation.prototype, {

		alive: function alive() {

			if (this.progress < this.time) {
				return true;
			} else {
				if (isFunction(this.cb)) {
					this.cb.call(this.el, this.el, this);

					return false;
				}
			}
		}
	});

	function StyleProperty(el, key, prop, time, cb, ease, isFrom) {

		prop = valueAndUnit(prop);

		var start = cssProp(el, key, true);

		var initial = isFrom ? prop.value : start,
		    to = isFrom ? start : prop.value;

		this.el = el;
		this.prop = key;
		this.unit = prop.unit;
		this.initial = initial;
		this.curr = initial;
		this.to = to;
		this.diff = diff(initial, to);
		this.easing = easing[ease || 'easeIn'];
		this.time = time;
		this.progress = 0;
		this.cb = cb;
		this.start = Date.now();
	}

	StyleProperty.prototype = new Animation();

	extend(StyleProperty.prototype, {

		update: fluent(function (now) {

			this.progress = now - this.start;

			this.curr = this.easing(this.progress, this.initial, this.diff, this.time);

			this.el.style[this.prop] = this.curr + (this.unit || 0);
		})

	});

	function StyleColor(el, key, value, time, cb, ease) {

		var initial = cssProp(el, key);

		initial = colorToArray(initial);
		value = colorToArray(value);

		this.el = el;
		this.prop = key;
		this.initial = initial;
		this.curr = initial;
		this.to = value;
		this.diff = diffArray(initial, value);
		this.easing = easing[ease || 'easeIn'];
		this.time = time;
		this.progress = 0;
		this.cb = cb;
		this.start = Date.now();
	}

	StyleColor.prototype = new Animation();

	extend(StyleColor.prototype, {

		update: fluent(function (now) {

			var newCurr = [];

			this.progress = now - this.start;

			for (var ii = 0, ll = this.curr.length; ii < ll; ii++) {
				newCurr[ii] = this.easing(this.progress, this.initial[ii], this.diff[ii], this.time);
			}

			this.curr = parseIntMap(newCurr);

			this.el.style[this.prop] = 'rgb(' + this.curr.join(',') + ')';
		})

	});

	function Vector(el, xy, time, cb, ease, isFrom) {

		var _matrix = matrix(el);

		xy = xy.length === 2 ? [1, 0, 0, 1].concat(xy) : xy;

		var initial = isFrom ? xy : _matrix,
		    to = isFrom ? _matrix : xy,
		    diff = diffArray(initial, to);

		this.el = el;
		this.initial = initial;
		this.curr = initial;
		this.to = to;
		this.diff = diff;
		this.easing = easing[ease || 'easeIn'];
		this.time = time;
		this.progress = 0;
		this.cb = cb;
		this.start = Date.now();
	}

	Vector.prototype = new Animation();

	extend(Vector.prototype, {

		update: fluent(function (now) {

			var newCurr = [];

			this.progress = now - this.start;

			for (var ii = 0, ll = this.curr.length; ii < ll; ii++) {
				newCurr[ii] = this.easing(this.progress, this.initial[ii], this.diff[ii], this.time);
			}

			this.curr = newCurr;

			matrix(this.el, this.curr);
		})

	});

	function Scroller(to, time, ease) {

		var initial = window.scrollY;

		this.initial = initial;
		this.curr = initial;
		this.to = to;
		this.diff = diff(initial, to);
		this.easing = easing[ease || 'easeIn'];
		this.time = time;
		this.progress = 0;
		this.cb = cb;
		this.start = Date.now();
	}

	Scroller.prototype = new Animation();

	extend(Scroller.prototype, {

		update: fluent(function (now) {

			this.progress = now - this.start;

			this.curr = this.easing(this.progress, this.initial, this.diff, this.time);

			window.scrollTo = this.curr + (this.unit || 0);
		}),

		alive: function alive() {}

	});

	function _addTween(tweenArr) {

		tweens.push(tweenArr.map(function (tween) {

			var _tween = {
				el: tween.el,
				initial: _matrix,
				curr: _matrix,
				to: xy,
				diff: diffArray(_matrix, xy),
				easing: ease,
				time: time,
				start: Date.now()
			};
		}));

		if (!running) {
			running = true;
			window.requestAnimationFrame(_animate);
		}
	}

	/**
  * _addAnimation
  *
  * this function will add an event to the event stack, and begin animation if it
  * has been paused.
  *
  * @param   {HTMLElement}   el          Element to bind animation properties to
  * @param   {Array}         xy          Array representing Matrix or KY parameters
  * @param   {Object}        styles      style object
  * @param   {Number}        time        animation length
  * @param   {Function}      cb          callback when specific animation has finished
  * @param   {String}        ease        easing function
  * @param   {boolean}       isFrom      true if animating from the given parameters
  *
  * @private
  *
  * @return  void
  */
	function _addAnimation(el, xy, styles, time, cb, ease, isFrom) {

		if (xy) {
			var animation = new Vector(el, xy, time, cb, ease, isFrom);
			animations.push(animation);
		}

		if (styles) {
			/*let*/
			var key;

			for (key in styles) {

				var animation;

				if (isColorProperty(key)) {
					animation = new StyleColor(el, key, styles[key], time, cb, ease, isFrom);
				} else {
					animation = new StyleProperty(el, key, styles[key], time, cb, ease, isFrom);
				}

				animations.push(animation);
			}
		}

		if (!running) {
			running = true;
			window.requestAnimationFrame(_animate);
		}
	}

	/**
  * _animate
  *
  * this function will loop over the current animation queue. and call the
  * Animation instances update method
  *
  * @param   {Number}     timestamp       timestamp inherited from api
  *
  * TODO: find out if filter is too cpu intensive for lots of concurrent animations
  * TODO: create web worker for the calculations
  *
  * @private
  */
	function _animate(timestamp) {

		animations = animations.filter(function (animation) {

			if (!(animation instanceof Animation)) return false;

			animation.update(Date.now());

			return animation.alive();
		});

		// only call the _animate function if there are animations still pending
		if (animations.length) {
			window.requestAnimationFrame(_animate);
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
  * @param   {bool}          parse   if value is an integer parse it
  *
  * @returns {Number}
  */
	function cssProp(el, prop, parse) {
		prop = el.style[prop] || window.getComputedStyle(el, null)[prop];
		return parse ? parseFloat(prop) : prop;
	}

	function isColorProperty(prop) {
		return ['color', 'background', 'background-color', 'border-color'].indexOf(prop) > -1;
	}

	function colorToArray(color) {

		var match = null,
		    hexReg = /\#([0-9a-z]+)/,
		    rgbReg = /\(([0-9 ,.]+)\)/;

		if (Array.isArray(color)) {

			return color;
		} else if (match = color.match(hexReg)) {

			if (match[1].length === 3) {
				color = mapWith(function (ii) {
					return (ii + 1) * 16;
				})(hexToDecMap(match[1].split('')));
			} else {
				color = hexToDecMap(match[1].match(/.{2}/g));
			}
		} else if (match = color.match(rgbReg)) {

			color = parseIntMap(match[1].split(/,\s*/));
		}

		return color;
	}

	/**
  * set or get the transform translation property
  */
	function matrix(el, xy) {

		if (xy) {

			if (xy.length === 2) {
				xy = [1, 0, 0, 1].concat(xy);
			}
			el.style.transform = 'matrix(' + xy.join() + ')';
		} else {

			var curr = el.style['transform'] || window.getComputedStyle(el, null)['transform'],
			    match = curr.match(/matrix\(([^)]+)\)/);

			return match ? parseIntMap(match[1].split(/,/)) : [1, 0, 0, 1, 0, 0];
		}
	}

	function valueAndUnit(value) {

		var unit, match, type;

		if (isString(value)) {
			if (match = value.match(/([-\.0-9]+)(px|%|em)*/)) {
				value = parseFloat(match[1]);
				unit = match[2] || 'px';
				type = Number;
			} else {
				type = String;
			}
		}

		return {
			value: value,
			unit: unit,
			type: type || Number
		};
	}

	function every(method) {
		return function (fn) {
			/*const*/var self = this,
			    ll = this.length;

			for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
				args[_key4 - 1] = arguments[_key4];
			}

			for ( /*let*/var ii = 0; ii < ll; ii++) {
				fn.apply(self[ii], [self[ii]].concat(args));
			}
		};
	}
})();

//$.tween([
//	{
//		el: '.thing:nth-child(1)',
//		pos: [0,0],
//		style: {
//			opacity: 1
//		},
//		time: 1000,
//		delay: 0
//	},
//	{
//		el: '.thing:nth-child(2)',
//		pos: [200,0],
//		style: {
//			apacity: 1
//		},
//		time: 1000,
//		delay: 0
//	}
//], function(){
//	console.log('tweening complete');
//});

//# sourceMappingURL=gQuery-compiled.js.map