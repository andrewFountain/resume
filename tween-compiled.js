'use strict';

!(function () {

	window.test = function () {
		return SCENES[0]._update();
	};
	window.Timeline = Timeline;

	var SCENES = [],
	    TWEENS = {},
	    CURRENT_SCENE = -1,
	    LAST_SCENE = 0,
	    START = 0;

	/**
  * easing
  *
  * this object will hold the easing functions for animations
  *
  * http://robertpenner.com/easing/
  * http://gizma.com/easing/
  *
  * @type {{easeIn: Function, linear: Function}}
  */

	// --------------------------------------------------
	// easing.js v0.5.4
	// Generic set of easing functions with AMD support
	// https://github.com/danro/easing-js
	// This code may be freely distributed under the MIT license
	// http://danro.mit-license.org/
	// --------------------------------------------------
	// All functions adapted from Thomas Fuchs & Jeremy Kahn
	// Easing Equations (c) 2003 Robert Penner, BSD license
	// https://raw.github.com/danro/easing-js/master/LICENSE
	// --------------------------------------------------
	var easing = {
		def: 'easeOutQuad',
		swing: function swing(t, b, c, d) {
			//alert(easing.default);
			return easing[easing.def](t, b, c, d);
		},
		linear: function linear(t, b, c, d) {
			return c * t / d + b;
		},
		easeInQuad: function easeInQuad(t, b, c, d) {
			return c * (t /= d) * t + b;
		},
		easeOutQuad: function easeOutQuad(t, b, c, d) {
			return -c * (t /= d) * (t - 2) + b;
		},
		easeInOutQuad: function easeInOutQuad(t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t + b;
			return -c / 2 * (--t * (t - 2) - 1) + b;
		},
		easeInCubic: function easeInCubic(t, b, c, d) {
			return c * (t /= d) * t * t + b;
		},
		easeOutCubic: function easeOutCubic(t, b, c, d) {
			return c * ((t = t / d - 1) * t * t + 1) + b;
		},
		easeInOutCubic: function easeInOutCubic(t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t + 2) + b;
		},
		easeInQuart: function easeInQuart(t, b, c, d) {
			return c * (t /= d) * t * t * t + b;
		},
		easeOutQuart: function easeOutQuart(t, b, c, d) {
			return -c * ((t = t / d - 1) * t * t * t - 1) + b;
		},
		easeInOutQuart: function easeInOutQuart(t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
			return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
		},
		easeInQuint: function easeInQuint(t, b, c, d) {
			return c * (t /= d) * t * t * t * t + b;
		},
		easeOutQuint: function easeOutQuint(t, b, c, d) {
			return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
		},
		easeInOutQuint: function easeInOutQuint(t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
		},
		easeInSine: function easeInSine(t, b, c, d) {
			return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
		},
		easeOutSine: function easeOutSine(t, b, c, d) {
			return c * Math.sin(t / d * (Math.PI / 2)) + b;
		},
		easeInOutSine: function easeInOutSine(t, b, c, d) {
			return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
		},
		easeInExpo: function easeInExpo(t, b, c, d) {
			return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
		},
		easeOutExpo: function easeOutExpo(t, b, c, d) {
			return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
		},
		easeInOutExpo: function easeInOutExpo(t, b, c, d) {
			if (t == 0) return b;
			if (t == d) return b + c;
			if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
			return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
		},
		easeInCirc: function easeInCirc(t, b, c, d) {
			return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
		},
		easeOutCirc: function easeOutCirc(t, b, c, d) {
			return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
		},
		easeInOutCirc: function easeInOutCirc(t, b, c, d) {
			if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
			return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
		},
		easeInElastic: function easeInElastic(t, b, c, d) {
			var s = 1.70158;
			var p = 0;
			var a = c;
			if (t == 0) return b;
			if ((t /= d) == 1) return b + c;
			if (!p) p = d * .3;
			if (a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else var s = p / (2 * Math.PI) * Math.asin(c / a);
			return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		},
		easeOutElastic: function easeOutElastic(t, b, c, d) {
			var s = 1.70158;
			var p = 0;
			var a = c;
			if (t == 0) return b;
			if ((t /= d) == 1) return b + c;
			if (!p) p = d * .3;
			if (a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else var s = p / (2 * Math.PI) * Math.asin(c / a);
			return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
		},
		easeInOutElastic: function easeInOutElastic(t, b, c, d) {
			var s = 1.70158;
			var p = 0;
			var a = c;
			if (t == 0) return b;
			if ((t /= d / 2) == 2) return b + c;
			if (!p) p = d * (.3 * 1.5);
			if (a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else var s = p / (2 * Math.PI) * Math.asin(c / a);
			if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
		},
		easeInBack: function easeInBack(t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c * (t /= d) * t * ((s + 1) * t - s) + b;
		},
		easeOutBack: function easeOutBack(t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
		},
		easeInOutBack: function easeInOutBack(t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
			return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
		},
		easeInBounce: function easeInBounce(t, b, c, d) {
			return c - easing.easeOutBounce(d - t, 0, c, d) + b;
		},
		easeOutBounce: function easeOutBounce(t, b, c, d) {
			if ((t /= d) < 1 / 2.75) {
				return c * (7.5625 * t * t) + b;
			} else if (t < 2 / 2.75) {
				return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
			} else if (t < 2.5 / 2.75) {
				return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
			} else {
				return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
			}
		},
		easeInOutBounce: function easeInOutBounce(t, b, c, d) {
			if (t < d / 2) return easing.easeInBounce(t * 2, 0, c, d) * .5 + b;
			return easing.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
		}
	};

	function render() {

		if (CURRENT_SCENE > -1 && SCENES.length && CURRENT_SCENE < LAST_SCENE) {

			if (!SCENES[CURRENT_SCENE]._update()) {
				// if scene has ended increment the timeline
				if (++CURRENT_SCENE < SCENES.length) {
					SCENES[CURRENT_SCENE]._init();
					window.requestAnimationFrame(render);
				} else {
					CURRENT_SCENE = -1;
				}
			} else {
				window.requestAnimationFrame(render);
			}
		}
	}

	function Timeline() {
		this.start = 0;
	}

	extendProto(Timeline.prototype, {

		/**
   * add
   *
   * this method will add a new tween to the timeline
   *
   * @param   {String}    name        name of the tween (scene)
   * @param   {Number}    time        optional: total time for the tween to run.
   *'
   * @return {Tween}                  tween to attach animations to
   */
		add: function add(name, time) {
			// push to animations and index on tweens object at the same time
			var index = SCENES.push(new Tween(name, time));
			TWEENS[name] = {
				index: index - 1,
				scene: SCENES[index - 1]
			};
			return SCENES[index - 1];
		},

		/**
   * play
   *
   * this method will play all the tweens for the timeline, if no arguments
   * are provided, entire animation will play.
   *
   * @param   {String|Number}     start       optional: scene to start animation from
   * @param   {String|Number}     end         optional: scene to end animation
   */
		play: fluent(playTween),

		/**
   * to
   *
   * this method will animate to the scene, running all animations until that scene
   *
   * @param   {String|Number}    end       scene to animate to
   */
		to: fluent(callSecord(playTween)),

		/**
   * from
   *
   * this method will play from the specified tween
   *
   * @param   {String|Number}    start       scene to animate from
   */
		from: fluent(callfirst(playTween)),

		/**
   * between
   *
   * this method will play all tweens from the first to the second tween.
   * alias for Timeline.play
   *
   * @param   {String|Number}     start       scene to start animation from
   * @param   {String|Number}     end         scene to end animation
   */
		between: fluent(playTween),

		/**
   * go
   *
   * this method will animate to the scene, skipping all animations in between scenes
   *
   * @param   {String}    scene       scene to animate to
   */
		go: function go(start) {

			if (isString(start)) {
				start = TWEENS[start].index;
			}

			return playTween(start, start + 1);
		},

		/**
   * pause
   *
   * this method will pause the timeline
   */
		pause: fluent(function () {

			CURRENT_SCENE = -1;
		})
	});

	/**
  * callFirst
  *
  * apply the first argument only
  *
  * @param   {Function}  fn      function to decorate
  *
  * @returns {Function}
  *      @param  {*}     first      first argument of decorated function
  */
	function callfirst(fn) {
		return function (first) {
			return fn.call(this, first, null);
		};
	}

	/**
  * callLast
  *
  * apply as second argument, passing null as the first
  *
  * @param   {Function}  fn      function to decorate
  *
  * @returns {Function}
  *      @param  {*}     second      last argument of decorated function
  */
	function callSecord(fn) {
		return function (second) {
			return fn.call(this, null, second);
		};
	}

	/**
  * playTween
  *
  * this function is used to set the start and end tweens and start
  * the animation loop. It is used for all the timeline methods, but decorated
  * to modify to required functionality.
  *
  * @param   {String|Number}     start       optional: tween to start animation from
  * @param   {String|Number}     end         optional: tween to end animation on
  */
	function playTween(start, end) {

		if (isString(start)) {
			start = TWEENS[start].index;
		}

		if (isString(end)) {
			end = TWEENS[end].index;
		}

		CURRENT_SCENE = start && start > -1 ? start : 0;
		LAST_SCENE = end && end > -1 ? end : SCENES.length;
		this.start = START = Date.now();

		SCENES[CURRENT_SCENE]._init();
		render();
	}

	function Tween(name, time) {
		this.name = name;
		this.events = {};
		this.animations = [];
		this.currentAnimations = [];
		this.delay = 0;
		this.time = time;
	}

	extendProto(Tween.prototype, {

		to: fluent(function (selector, properties) {
			var time = arguments.length <= 2 || arguments[2] === undefined ? 2000 : arguments[2];

			properties.time = properties.time || time;
			properties.delay = this.delay;

			properties = sortProperties.call(this, properties);

			addAnimation.call(this, selector, properties);
		}),

		wait: fluent(function (delay) {

			this.delay += delay;
		}),

		stagger: fluent(function (selector, stagger, properties) {
			var time = arguments.length <= 3 || arguments[3] === undefined ? 1000 : arguments[3];

			properties = sortProperties.call(this, properties);

			properties.time = properties.time || time;
			properties.delay = this.delay;

			addAnimations.call(this, selector, properties, stagger);
		}),

		on: fluent(function (event, cb) {

			this.events[event] = cb;
		}),

		_init: function _init(animation) {
			this.currentAnimations = this.animations.slice(0);
			this.currentAnimations.forEach(function (animation) {
				animation._init();
			});
			this.start = 0;
		},

		_add: function _add(animation) {
			this.animations.push(animation);
			this.currentAnimations.push(animation);
		},

		_update: function _update() {

			var now = Date.now();

			this.start = this.start || now;
			this.progress = now - this.start;

			this.currentAnimations = this.currentAnimations.filter(updateAnimationFilter);

			var incomplete = this.time == null ? this.currentAnimations.length : this.progress < this.time + this.delay;

			if (incomplete) {
				return true;
			} else {
				this.events.complete.call(this, this);
				return false;
			}
		}

	});

	function updateAnimationFilter(animation) {
		return animation._update(Date.now());
	}

	function Animation() {}

	extendProto(Animation.prototype, {
		_finished: function _finished(type) {

			if (this.progress < this.time + this.delay) {
				return true;
			}

			var styleProp = {};

			if (type === 'StyleNumber') {
				styleProp[this.key] = this.to + (this.unit || 0);
				this.$el.css(styleProp);
			} else if (type === 'StyleColor') {
				styleProp[this.prop] = 'rgb(' + this.to.join(',') + ')';
				this.$el.css(styleProp);
			} else if (type === 'Matrix') {
				this.$el.matrix(this.to);
			}
			return false;
		}
	});

	function StyleNumber($el, key, value, timing, stagger) {

		this.$el = $el;
		this.key = key;
		this.value = value;
		this.timing = timing;
		this.stagger = stagger;

		this.easing = easing[timing.ease || 'easeInOutQuad'];
		this.time = (timing.time || 0) + (stagger || 0);
		this.delay = (timing.delay || 0) + (stagger || 0);
		this.timing = timing;
		this.progress = 0;
	}

	StyleNumber.prototype = new Animation();
	extendProto(StyleNumber.prototype, {
		_update: function _update(now) {
			now = Date.now();
			this.start = this.start || now;
			this.progress = now - this.start;

			if (this.progress < this.delay) {
				return true;
			}

			this.curr = this.easing(this.progress, this.initial, this.diff, this.time);

			var styleProp = {};
			styleProp[this.key] = this.curr + (this.unit || 0);

			this.$el.css(styleProp);

			return this._finished('StyleNumber');
		},
		_init: function _init() {

			var initial = parseFloat(this.$el.css(this.key)),
			    prop = valueAndUnit(this.value),
			    to = prop.value;

			this.unit = prop.unit;
			this.initial = initial;
			this.curr = initial;
			this.to = to;
			this.diff = diff(initial, to);

			this.start = 0;
			this.progress = 0;
		}
	});

	function StyleColor($el, key, value, timing, stagger) {

		this.$el = $el;
		this.timing = timing;
		this.stagger = stagger;
		this.prop = key;
		this.value = value;
		this.easing = easing[timing.ease || 'easeInOutQuad'];
		this.time = (timing.time || 0) + (stagger || 0);
		this.delay = (timing.delay || 0) + (stagger || 0);
		this.progress = 0;
	}

	StyleColor.prototype = new Animation();
	extendProto(StyleColor.prototype, {
		_init: function _init() {

			var initial = this.$el.css(this.prop),
			    value = undefined;

			initial = colorToArray(initial);
			value = colorToArray(this.value);

			this.start = 0;
			this.progress = 0;
			this.initial = initial;
			this.curr = initial.slice();
			this.to = value;
			this.diff = diffArray(initial, value);
		},
		_update: function _update(now) {

			var newCurr = [];

			this.start = this.start || Date.now();
			this.progress = now - this.start;

			if (this.progress < this.delay) {
				return true;
			}

			for (var ii = 0, ll = this.curr.length; ii < ll; ii++) {
				newCurr[ii] = this.easing(this.progress - this.delay, this.initial[ii], this.diff[ii], this.time);
			}

			this.curr = parseIntMap(newCurr);

			var styleProp = {};
			styleProp[this.prop] = 'rgb(' + this.curr.join(',') + ')';

			this.$el.css(styleProp);

			return this._finished('StyleColor');
		}
	});

	function Matrix($el, key, value, timing, stagger) {
		this.$el = $el;
		this.key = key;
		this.value = value;
		this.time = timing.time + (stagger || 0);
		this.delay = (timing.delay || 0) + (stagger || 0);
		this.timing = timing;
		this.stagger = stagger;
		if (timing.easing && Array.isArray(timing.easing)) {
			this.dualEase = timing.easing.reverse().map(function (ease) {
				return easing[ease || 'easeInOutQuad'];
			});
			this.easing = easing[timing.easing[0] || 'easeInOutQuad'];
		} else {
			this.dualEase = false;
			this.easing = easing[timing.easing || 'easeInOutQuad'];
		}
	}

	Matrix.prototype = new Animation();
	extendProto(Matrix.prototype, {
		_update: function _update(now) {

			var newCurr = [];

			this.start = this.start || Date.now();
			this.progress = now - this.start;

			if (this.progress < this.delay) {
				return true;
			}

			for (var ii = 0, ll = this.curr.length; ii < ll; ii++) {
				// allow different easings for x and y
				if (this.dualEase && ii > ll - 2) {
					newCurr[ii] = this.dualEase[ii % 2](this.progress - this.delay, this.initial[ii], this.diff[ii], this.time);
				} else {
					newCurr[ii] = this.easing(this.progress - this.delay, this.initial[ii], this.diff[ii], this.time);
				}
			}

			this.curr = newCurr;

			this.$el.matrix(this.curr);

			return this._finished('Matrix');
		},
		_init: function _init() {

			this.start = 0;
			this.progress = 0;
			this.initial = this.$el.matrix();
			this.curr = this.initial.slice(0);
			this.to = this.value.length == 2 ? [1, 0, 0, 1].concat(this.value) : this.value;
			this.diff = diffArray(this.initial, this.to);
		}
	});

	function addAnimation(selector, properties) {
		var stagger = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

		var $el = $(selector);

		for (var key in properties.matrix) {
			var _matrix = properties.matrix[key];
			this._add(new Matrix($el, key, _matrix, properties.timing, stagger));
		}

		for (var key in properties.styleColor) {
			var styleColor = properties.styleColor[key];

			this._add(new StyleColor($el, key, styleColor, properties.timing, stagger));
		}

		for (var key in properties.styleNumber) {
			var styleNumber = properties.styleNumber[key];

			this._add(new StyleNumber($el, key, styleNumber, properties.timing, stagger));
		}
	}

	function addAnimations(selector, properties) {
		var stagger = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
		var time = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

		var animation = this,
		    $els = $(selector),
		    delay = 0,
		    elProperties = $els.map(function (el) {
			return extend({}, properties);
		});

		var _loop = function (key) {
			var matrix = properties.matrix[key];

			$els.each(function (el, ii) {
				delay += stagger;
				animation._add(new Matrix($(el), key, matrix, properties.timing, delay));
			});
		};

		for (var key in properties.matrix) {
			_loop(key);
		}

		delay = properties.delay || 0;

		var _loop2 = function (key) {
			var styleColor = properties.styleColor[key];

			$els.each(function (el) {
				delay += stagger;
				var styleColorObj = new StyleColor($(el), key, styleColor, properties.timing, delay);
				console.log(delay, styleColorObj);
				animation._add(styleColorObj);
			});
		};

		for (var key in properties.styleColor) {
			_loop2(key);
		}

		delay = properties.delay || 0;

		var _loop3 = function (key) {
			var styleNumber = properties.styleNumber[key];

			$els.each(function (el) {
				delay += stagger;
				animation._add(new StyleNumber($(el), key, styleNumber, properties.timing, delay));
			});
		};

		for (var key in properties.styleNumber) {
			_loop3(key);
		}
	}

	/**
  * this function will separate the different types of properties into
  * timing, vectors, colors and general. must be called
  *
  * @this  {Tween}
  *
  * @param {Object}  properties      properties of the tween
  *
  * @return {Object}
  */
	var sortProperties = (function () {

		var timing = new Set(['time', 'delay', 'speed', 'easing']),
		    matrix = new Set(['pos', 'top', 'left', 'bottom', 'right', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale']),
		    colors = new Set(['background', 'color', 'background-color', 'border-color']);

		return function (properties) {

			var ret = {
				timing: {},
				matrix: {},
				styleNumber: {},
				styleColor: {}
			};

			for (var key in properties) {

				if (!properties.hasOwnProperty(key)) {
					continue;
				}

				var prop = properties[key];

				if (timing.has(key)) {

					ret.timing[key] = prop;
				} else if (matrix.has(key)) {

					ret.matrix[key] = prop;
				} else if (colors.has(key)) {

					ret.styleColor[key] = prop;
				} else {

					ret.styleNumber[key] = prop;
				}
			}

			return ret;
		};
	})();

	function extendProto(reciever, giver) {

		var ret = {};

		for (var key in giver) {
			var value = giver[key];

			if (isPrivate(key)) {
				Object.defineProperty(reciever, key, {
					value: value,
					writable: false,
					enumerable: false
				});
			} else {
				Object.defineProperty(reciever, key, {
					value: value,
					writable: false,
					enumerable: true
				});
			}
		}

		return reciever;

		function isPrivate(key) {
			return key.charAt(0) === '_';
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

		var match = null;

		var hexReg = /\#([0-9a-z]+)/,
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

		var unit = undefined,
		    match = undefined,
		    type = undefined;

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
})();

//# sourceMappingURL=tween-compiled.js.map