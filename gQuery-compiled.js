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
			return new gQuery([selector]);
		}
		var els = isNodeList(selector) ? selector : (arguments[1] || document).querySelectorAll(selector);
		return new gQuery(els);
	}

	/**
  * gQuery
  *
  * this is the gQuery constructor. to create now instance
  *
  * @param   {NodeList}  els     elements to wrap with gQuery
  */
	function gQuery(els) {
		this.add(els);
		this.length = els.length;
		this.events = {};
	}

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
	animations = [];

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
				return cssProp(this[0], style);
			}

			this.each(function (el) {
				for (var key in style) {
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
			for (var ii = 0, ll = this.length; ii < ll; ii++) {
				fn.call(this[ii], this[ii], ii, this);
			}
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
			var fn = this.events[evt];
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
			var ret = [];
			this.each(function (el) {
				var children = slice(el.children);
				Array.prototype.splice.apply(ret, [ret.length, 0].concat(children));
			});
			return new gQuery(ret);
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
		find: function find(selector) {
			var ret = [];
			this.each(function (el) {
				var children = slice(el.querySelectorAll(selector));
				Array.prototype.splice.apply(ret, [ret.length, 0].concat(children));
			});
			return new gQuery(ret);
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
		offset: function offset(parent) {

			parent = parent || document.body;

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
   * @param   {Number}    val     optional:value to set
   * @returns {Number}
   */
		translateX: (function () {

			var translations = {};

			return function (val) {

				var ii = xx++;

				if (val) {

					this.each(function (el) {
						el.style.transform = 'translateX(' + val + 'px)';
					});
				} else {
					var transform = this[0].style.transform,
					    match = transform.match(/translateX\(([0-9-.]+)(px|em|%)*\)/);

					return parseInt(match[1]);
				}
			};
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
		animate: function animate(styles, time, cb, ease) {
			var self = this;

			// build the animation queue
			this.each(function (el) {
				return _addAnimation(el, styles, time, cb, ease);
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
   * @param   {Object}            styles      styles to apply to the element
   * @praam   {Number}            time        total animation time
   * @param   {Function}          cb          callback when animation of element is complete
   * @param   {String}            ease        easing algorithm
   */
		stagger: function stagger(delay, styles, time, cb, ease) {

			this.each(function (el, ii) {

				var timeout = isFunction(delay) ? delay.call(el, ii) : ii * delay;

				return window.setTimeout(function () {
					_addAnimation(el, styles, time, cb, ease);
				}, timeout);
			});
		},

		spy: (function () {

			var stopped = true,
			    offset = 0,
			    events = [];

			return function _spy(cb, offset) {

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
			};

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

	function _addAnimation(el, styles, time, cb, ease) {

		var ret = {
			el: el,
			props: {},
			cb: cb
		};
		var key = undefined;
		for (key in styles) {
			var initial = cssProp(el, key),
			    prop = styles[key],
			    noUnit = ['opacity'].indexOf(key) > -1,
			    to = undefined,
			    unit = undefined;
			if (isString(prop)) {
				var match = styles[key].match(/([-\.0-9]+)(px|%|em)*/);
				to = parseFloat(match[1]);
				unit = match[2] || 'px';
			} else {
				to = prop;
				unit = noUnit ? '' : unit || 'px';
			}

			ret.props[key] = {
				curr: initial,
				to: to,
				unit: unit,
				initial: initial,
				easing: ease,
				time: time,
				start: Date.now()
			};
			ret.props[key].diff = diff(initial, to);
		}

		animations.push(ret);

		if (!running) {
			running = true;
			window.requestAnimationFrame(_animate);
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
	function _animate(timestamp) {
		// filter out any finished animations
		animations = animations.filter(function (animation) {

			var prop = undefined,
			    property = undefined,
			    progress = undefined;

			for (prop in animation.props) {

				property = animation.props[prop];
				progress = Date.now() - property.start;

				property.curr = easing[property.easing || 'easeIn'](progress, property.initial, property.diff, property.time);
				animation.el.style[prop] = property.curr + property.unit;

				if (progress < property.time) {
					return true;
				} else {
					if (isFunction(animation.cb)) {
						animation.cb.call(animation.el, animation.el, animation);
					}
					return false;
				}
			}
		});
		// only call the _animaate function if there are animations still pending
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
  *
  * @returns {Number}
  */
	function cssProp(el, prop) {
		return parseFloat(el.style[prop] || window.getComputedStyle(el, null)[prop]);
	}

	function every(method) {
		return function (fn) {
			var self = this,
			    ll = this.length;

			for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
				args[_key4 - 1] = arguments[_key4];
			}

			for (var ii = 0; ii < ll; ii++) {
				fn.apply(self[ii], [self[ii]].concat(args));
			}
		};
	}
})();

//# sourceMappingURL=gQuery-compiled.js.map