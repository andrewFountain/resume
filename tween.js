!(function(){

	window.test     = () => SCENES[ 0 ]._update();
	window.Timeline = Timeline;

	let
		SCENES        = [],
		TWEENS = [],
		CURRENT_SCENE = -1,
		start         = 0;


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
	const easing = {
		def: 'easeOutQuad',
		swing           : function( t, b, c, d ){
			//alert(easing.default);
			return easing[ easing.def ]( t, b, c, d );
		},
		easeInQuad      : function( t, b, c, d ){
			return c * (t /= d) * t + b;
		},
		easeOutQuad     : function( t, b, c, d ){
			return -c * (t /= d) * (t - 2) + b;
		},
		easeInOutQuad   : function( t, b, c, d ){
			if( (t /= d / 2) < 1 ) return c / 2 * t * t + b;
			return -c / 2 * ((--t) * (t - 2) - 1) + b;
		},
		easeInCubic     : function( t, b, c, d ){
			return c * (t /= d) * t * t + b;
		},
		easeOutCubic    : function( t, b, c, d ){
			return c * ((t = t / d - 1) * t * t + 1) + b;
		},
		easeInOutCubic  : function( t, b, c, d ){
			if( (t /= d / 2) < 1 ) return c / 2 * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t + 2) + b;
		},
		easeInQuart     : function( t, b, c, d ){
			return c * (t /= d) * t * t * t + b;
		},
		easeOutQuart    : function( t, b, c, d ){
			return -c * ((t = t / d - 1) * t * t * t - 1) + b;
		},
		easeInOutQuart  : function( t, b, c, d ){
			if( (t /= d / 2) < 1 ) return c / 2 * t * t * t * t + b;
			return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
		},
		easeInQuint     : function( t, b, c, d ){
			return c * (t /= d) * t * t * t * t + b;
		},
		easeOutQuint    : function( t, b, c, d ){
			return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
		},
		easeInOutQuint  : function( t, b, c, d ){
			if( (t /= d / 2) < 1 ) return c / 2 * t * t * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
		},
		easeInSine      : function( t, b, c, d ){
			return -c * Math.cos( t / d * (Math.PI / 2) ) + c + b;
		},
		easeOutSine     : function( t, b, c, d ){
			return c * Math.sin( t / d * (Math.PI / 2) ) + b;
		},
		easeInOutSine   : function( t, b, c, d ){
			return -c / 2 * (Math.cos( Math.PI * t / d ) - 1) + b;
		},
		easeInExpo      : function( t, b, c, d ){
			return (t == 0)
				? b
				: c * Math.pow( 2, 10 * (t / d - 1) ) + b;
		},
		easeOutExpo     : function( t, b, c, d ){
			return (t == d)
				? b + c
				: c * (-Math.pow( 2, -10 * t / d ) + 1) + b;
		},
		easeInOutExpo   : function( t, b, c, d ){
			if( t == 0 ) return b;
			if( t == d ) return b + c;
			if( (t /= d / 2) < 1 ) return c / 2 * Math.pow( 2, 10 * (t - 1) ) + b;
			return c / 2 * (-Math.pow( 2, -10 * --t ) + 2) + b;
		},
		easeInCirc      : function( t, b, c, d ){
			return -c * (Math.sqrt( 1 - (t /= d) * t ) - 1) + b;
		},
		easeOutCirc     : function( t, b, c, d ){
			return c * Math.sqrt( 1 - (t = t / d - 1) * t ) + b;
		},
		easeInOutCirc   : function( t, b, c, d ){
			if( (t /= d / 2) < 1 ) return -c / 2 * (Math.sqrt( 1 - t * t ) - 1) + b;
			return c / 2 * (Math.sqrt( 1 - (t -= 2) * t ) + 1) + b;
		},
		easeInElastic   : function( t, b, c, d ){
			var s = 1.70158;
			var p = 0;
			var a = c;
			if( t == 0 ) return b;
			if( (t /= d) == 1 ) return b + c;
			if( !p ) p = d * .3;
			if( a < Math.abs( c ) ){
				a     = c;
				var s = p / 4;
			}
			else var s = p / (2 * Math.PI) * Math.asin ( c / a );
			return -(a * Math.pow( 2, 10 * (t -= 1) ) * Math.sin( (t * d - s) * (2 * Math.PI) / p )) + b;
		},
		easeOutElastic  : function( t, b, c, d ){
			var s = 1.70158;
			var p = 0;
			var a = c;
			if( t == 0 ) return b;
			if( (t /= d) == 1 ) return b + c;
			if( !p ) p = d * .3;
			if( a < Math.abs( c ) ){
				a     = c;
				var s = p / 4;
			}
			else var s = p / (2 * Math.PI) * Math.asin ( c / a );
			return a * Math.pow( 2, -10 * t ) * Math.sin( (t * d - s) * (2 * Math.PI) / p ) + c + b;
		},
		easeInOutElastic: function( t, b, c, d ){
			var s = 1.70158;
			var p = 0;
			var a = c;
			if( t == 0 ) return b;
			if( (t /= d / 2) == 2 ) return b + c;
			if( !p ) p = d * (.3 * 1.5);
			if( a < Math.abs( c ) ){
				a     = c;
				var s = p / 4;
			}
			else var s = p / (2 * Math.PI) * Math.asin ( c / a );
			if( t < 1 ) return -.5 * (a * Math.pow( 2, 10 * (t -= 1) ) * Math.sin( (t * d - s) * (2 * Math.PI) / p )) + b;
			return a * Math.pow( 2, -10 * (t -= 1) ) * Math.sin( (t * d - s) * (2 * Math.PI) / p ) * .5 + c + b;
		},
		easeInBack      : function( t, b, c, d, s ){
			if( s == undefined ) s = 1.70158;
			return c * (t /= d) * t * ((s + 1) * t - s) + b;
		},
		easeOutBack     : function( t, b, c, d, s ){
			if( s == undefined ) s = 1.70158;
			return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
		},
		easeInOutBack   : function( t, b, c, d, s ){
			if( s == undefined ) s = 1.70158;
			if( (t /= d / 2) < 1 ) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
			return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
		},
		easeInBounce    : function( t, b, c, d ){
			return c - easing.easeOutBounce ( d - t, 0, c, d ) + b;
		},
		easeOutBounce   : function( t, b, c, d ){
			if( (t /= d) < (1 / 2.75) ){
				return c * (7.5625 * t * t) + b;
			} else if( t < (2 / 2.75) ){
				return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
			} else if( t < (2.5 / 2.75) ){
				return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
			} else {
				return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
			}
		},
		easeInOutBounce : function( t, b, c, d ){
			if( t < d / 2 ) return easing.easeInBounce ( t * 2, 0, c, d ) * .5 + b;
			return easing.easeOutBounce ( t * 2 - d, 0, c, d ) * .5 + c * .5 + b;
		}
	};


	function render(){

		if( CURRENT_SCENE > -1 && SCENES.length ){

			if( !SCENES[ CURRENT_SCENE ]._update() ){
				// if scene has ended increment the timeline
				if( ++CURRENT_SCENE < SCENES.length ){
					SCENES[ CURRENT_SCENE ]._init();
					window.requestAnimationFrame( render );
				} else {
					CURRENT_SCENE = -1;
				}
			} else {
				window.requestAnimationFrame( render );
			}
		}
	}


	function Timeline(){
		this.start = 0;
	}

	extendProto( Timeline.prototype, {

		/**
		 * add
		 *
		 * this method will add a new tween to the timeline
		 *
		 * @param   {String}    name        name of the tween (scene)
		 *'
		 * @return {Tween}                  tween attach animations to
		 */
		add: fluent( function( name, time ){
			// push to animations and index on tweens object at the same time
			return SCENES[ name ] = SCENES[ SCENES.push( new Tween( name, time ) ) - 1 ];
		} ),

		/**
		 * to
		 *
		 * this method will animate to the scene, running all animations until that scene
		 *
		 * @param   {String}    scene       scene to animate to
		 */
		to: fluent( function( scene ){


		} ),

		/**
		 * go
		 *
		 * this method will animate to the scene, skipping all animations in between scenes
		 *
		 * @param   {String}    scene       scene to animate to
		 */
		go: fluent( function( scene ){


		} ),

		/**
		 * play
		 *
		 * this method will play all the tweens for the timeline
		 */
		play: fluent( function(){

			CURRENT_SCENE = 0;
			SCENES[ 0 ]._init();
			this.start = start = Date.now();
			render();

		} ),

		/**
		 * pause
		 *
		 * this method will pause the timeline
		 */
		pause: fluent( function(){

			CURRENT_SCENE = -1;

		} )
	} );


	function Tween( name, time ){
		this.name              = name;
		this.events            = {};
		this.animations        = [];
		this.currentAnimations = [];
		this.delay             = 0;
		this.time              = time || 1000;
	}

	extendProto( Tween.prototype, {

		to: fluent( function( selector, properties, time = 2000 ){

			properties.time  = ( properties.time || time );
			properties.delay = this.delay;

			properties = sortProperties.call( this, properties );

			addAnimations.call( this, selector, properties );
		} ),

		wait: fluent( function( delay ){

			this.delay += delay;

		} ),

		stagger: fluent( function( selector, stagger, properties ){

			properties = sortProperties.call( this, properties );

			addAnimations.call( this, selector, properties, stagger );

		} ),

		on: fluent( function( event, cb ){

			this.events[ event ] = cb;

		} ),

		_init: function( animation ){
			this.currentAnimations = this.animations.slice( 0 );
			this.currentAnimations.forEach( function( animation ){
				animation._init();
			} );
			this.start = 0;
		},

		_add: function( animation ){
			this.animations.push( animation );
			this.currentAnimations.push( animation );
		},

		_update: function(){

			let now = Date.now();

			this.start    = this.start || now;
			this.progress = this.start - now;

			this.currentAnimations = this.currentAnimations.filter( updateAnimationFilter );

			if( this.currentAnimations.length === 0 ){

				this.events.complete.call( this, this );
				return false

			}
			// remove from the timeline if progress is less than total time
			return this.progress < this.time;
		}

	} );

	function updateAnimationFilter( animation ){
		return animation._update( Date.now() );
	}

	function Animation(){}

	Animation.prototype = null;
	extendProto( Animation.prototype, {} );

	function StyleNumber( $el, key, value, timing, stagger ){

		this.$el     = $el;
		this.key     = key;
		this.value   = value;
		this.timing  = timing;
		this.stagger = stagger;

		this.easing   = easing[ timing.ease || 'easeInOutQuad' ];
		this.time     = timing.time;
		this.delay    = timing.delay;
		this.timing   = timing;
		this.progress = 0;
	}

	StyleNumber.prototype = new Animation;
	extendProto( StyleNumber.prototype, {
		_update: function( now ){

			this.start    = this.start || now;
			this.progress = now - this.start;

			this.curr = this.easing( this.progress, this.initial, this.diff, this.time );

			let styleProp         = {};
			styleProp[ this.key ] = this.curr + ( this.unit || 0 );

			this.$el.css( styleProp );

			if( this.progress < this.time + this.delay ){
				return true;
			} else {
				this.start             = false;
				styleProp[ this.key ] = this.curr + ( this.unit || 0 );
				this.$el.css( styleProp );
				return false;
			}
		},
		_init  : function(){

			const
				start   = parseFloat( this.$el.css( this.key ) ),
				prop  = valueAndUnit( this.value ),
				initial = start,
				to      = prop.value;

			this.unit    = prop.unit;
			this.initial = initial;
			this.curr    = initial;
			this.to      = to;
			this.diff    = diff( initial, to );

			this.start    = 0;
			this.progress = 0;
		}
	} );


	function StyleColor( $el, key, value, timing, stagger ){


		this.$el      = $el;
		this.timing   = timing;
		this.stagger  = stagger;
		this.prop     = key;
		this.value    = value;
		this.easing   = easing[ timing.ease || 'easeInOutQuad' ];
		this.time     = timing.time;
		this.delay    = timing.delay;
		this.progress = 0;
	}

	StyleColor.prototype = new Animation;
	extendProto( StyleColor.prototype, {
		_init  : function(){

			let initial = this.$el.css( this.prop ),
			    value;

			initial = colorToArray( initial );
			value   = colorToArray( this.value );

			this.start    = 0;
			this.progress = 0;
			this.initial  = initial;
			this.curr     = initial.slice();
			this.to       = value;
			this.diff     = diffArray( initial, value );
		},
		_update: function( now ){

			let newCurr = [];

			this.start    = this.start || Date.now();
			this.progress = now - this.start;

			if( this.progress < this.delay ){
				return true;
			}

			for( let ii = 0, ll = this.curr.length; ii < ll; ii++ ) {
				newCurr[ ii ] = this.easing( this.progress - this.delay, this.initial[ ii ], this.diff[ ii ], this.time );
			}

			this.curr = parseIntMap( newCurr );

			let styleProp          = {};
			styleProp[ this.prop ] = 'rgb(' + this.curr.join( ',' ) + ')';

			this.$el.css( styleProp );

			if( this.progress < this.time + this.delay ){
				return true;
			} else {
				this.start = false;
				styleProp[ this.prop ] = 'rgb(' + this.to.join( ',' ) + ')';
				return false;
			}
		}
	} );

	function Matrix( $el, key, value, timing, stagger ){
		this.$el     = $el;
		this.key     = key;
		this.value   = value;
		this.time    = timing.time;
		this.delay   = timing.delay;
		this.timing  = timing;
		this.stagger = stagger;
		if( timing.easing && Array.isArray( timing.easing ) ){
			this.dualEase = timing.easing.reverse().map( ( ease ) => easing[ ease || 'easeInOutQuad' ] );
			this.easing = easing[ timing.easing[0] || 'easeInOutQuad' ];
		} else {
			this.dualEase = false;
			this.easing = easing[ timing.easing || 'easeInOutQuad' ];
		}
	}

	Matrix.prototype = new Animation;
	extendProto( Matrix.prototype, {
		_update: function( now ){

			let newCurr = [];

			this.start    = this.start || Date.now();
			this.progress = now - this.start;

			if( this.progress < this.delay ){
				return true;
			}

			for( var ii = 0, ll = this.curr.length; ii < ll; ii++ ) {
				// allow different easings for x and y
				if( this.dualEase && ii > ll - 2 ){
					newCurr[ ii ] = this.dualEase[ ii % 2 ]( this.progress - this.delay, this.initial[ ii ], this.diff[ ii ], this.time );
				} else {
					newCurr[ ii ] = this.easing( this.progress - this.delay, this.initial[ ii ], this.diff[ ii ], this.time );
				}
			}

			this.curr = newCurr;

			this.$el.matrix( this.curr );

			return this.progress < this.time + this.delay
				? true
				: (this.$el.matrix( this.to ), this.start = false);
		},
		_init  : function(){

			this.start    = 0;
			this.progress = 0;
			this.initial  = this.$el.matrix();
			this.curr     = this.initial.slice( 0 );
			this.to       = this.value.length == 2
				? [ 1, 0, 0, 1 ].concat( this.value )
				: this.value;
			this.diff     = diffArray( this.initial, this.to );
		}
	} );


	function addAnimations( selector, properties, stagger = 0 ){

		let $el = $( selector );

		for( let key in properties.matrix ) {
			let matrix = properties.matrix[ key ];
			this._add( new Matrix( $el, key, matrix, properties.timing, stagger ) );
		}

		for( let key in properties.styleColor ) {
			let styleColor = properties.styleColor[ key ];

			this._add( new StyleColor( $el, key, styleColor, properties.timing, stagger ) );
		}

		for( let key in properties.styleNumber ) {
			let styleNumber = properties.styleNumber[ key ];

			this._add( new StyleNumber( $el, key, styleNumber, properties.timing, stagger ) );
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
	let sortProperties = (function(){

		const
			timing = new Set( [ 'time', 'delay', 'speed', 'easing' ] ),
			matrix = new Set( [ 'pos', 'top', 'left', 'bottom', 'right', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale' ] ),
			colors = new Set( [ 'background', 'color', 'background-color', 'border-color' ] );

		return function( properties ){

			let
				ret = {
					timing     : {},
					matrix: {},
					styleNumber: {},
					styleColor : {}
				};

			for( let key in properties ) {

				if( !properties.hasOwnProperty( key ) ){
					continue;
				}

				let prop = properties[ key ];

				if( timing.has( key ) ){

					ret.timing[ key ] = prop;
				}
				else if( matrix.has( key ) ){

					ret.matrix[ key ] = prop;
				}
				else if( colors.has( key ) ){

					ret.styleColor[ key ] = prop;
				}
				else {

					ret.styleNumber[ key ] = prop;
				}
			}

			return ret;
		}

	})();


	function extendProto( reciever, giver ){

		let ret = {};

		for( let key in giver ) {
			let value = giver[ key ];

			if( isPrivate( key ) ){
				Object.defineProperty( reciever, key, {
					value     : value,
					writable  : false,
					enumerable: false
				} );
			} else {
				Object.defineProperty( reciever, key, {
					value     : value,
					writable  : false,
					enumerable: true
				} );
			}

		}

		return reciever;

		function isPrivate( key ){
			return key.charAt( 0 ) === '_';
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
	function cssProp( el, prop, parse ){
		prop = el.style[ prop ] || window.getComputedStyle( el, null )[ prop ];
		return parse
			? parseFloat( prop )
			: prop;
	}

	function isColorProperty( prop ){
		return [ 'color', 'background', 'background-color', 'border-color' ].indexOf( prop ) > -1
	}

	function colorToArray( color ){

		let
			match = null;

		const
			hexReg = /\#([0-9a-z]+)/,
			rgbReg = /\(([0-9 ,.]+)\)/;

		if( Array.isArray( color ) ){

			return color;

		} else if( ( match = color.match( hexReg ) ) ){

			if( match[ 1 ].length === 3 ){
				color = mapWith( ( ii ) => (ii + 1) * 16 )( hexToDecMap( match[ 1 ].split( '' ) ) );
			} else {
				color = hexToDecMap( match[ 1 ].match( /.{2}/g ) );
			}

		} else if( match = color.match( rgbReg ) ){

			color = parseIntMap( match[ 1 ].split( /,\s*/ ) );

		}

		return color;

	}

	/**
	 * set or get the transform translation property
	 */
	function matrix( el, xy ){

		if( xy ){

			if( xy.length === 2 ){
				xy = [ 1, 0, 0, 1 ].concat( xy );
			}
			el.style.transform = 'matrix(' + xy.join() + ')';

		} else {

			const
				curr  = el.style[ 'transform' ] || window.getComputedStyle( el, null )[ 'transform' ],
				match = curr.match( /matrix\(([^)]+)\)/ );

			return match
				? parseIntMap( match[ 1 ].split( /,/ ) )
				: [ 1, 0, 0, 1, 0, 0 ];
		}
	}

	function valueAndUnit( value ){

		let
			unit,
			match,
			type;

		if( isString( value ) ){
			if( ( match = value.match( /([-\.0-9]+)(px|%|em)*/ ) ) ){
				value = parseFloat( match[ 1 ] );
				unit  = match[ 2 ] || 'px';
				type  = Number
			} else {
				type = String
			}
		}

		return {
			value: value,
			unit : unit,
			type : type || Number
		};

	}

})();

let
	timeline = new Timeline(),
	scene1   = timeline.add( 'scene-1', 2000 ),
	scene2   = timeline.add( 'scene-2', 2000 ),
	scene3   = timeline.add( 'scene-3', 2000 );

//scene1
//	.to('.something', {
//		pos: [0,0],
//		rotateZ: 360,
//		background: '#faa',
//		easing: 'easeIn'
//	}, 200 )
//	.wait( 400 )
//	.to('.another', {
//		pos: [0,0],
//		scale: [100,100],
//		color: [20,31.66],
//		delay: 400
//	}, 400)
//	.stagger('.things', 200, {
//		pos: [ 0, 0 ],
//		scale: [ 100, 100 ],
//		color: [ 20, 31.66 ],
//		delay: 400,
//		width: 400
//	})
//	.on('complete', function( tween ){
//		console.log('complete tweening');
//	});

scene1
	.to( '.things', {
		background: '#c3f',
		pos       : [ 600, 200 ],
		time      : 600,
		easing: [  'easeInOutQuad','easeOutCirc' ]
	} )

	.to( '.another', {
		background: '#fc3',
		pos       : [ 0,.7,.7,0,400, 200 ],
		time      : 600,
		easing    : [ 'easeInOutQuad', 'easeOutCirc' ]
	} )

	.to( '.something', {
		background: '#3cf',
		pos       : [ 200, 200 ],
		time      : 600,
		easing    : [ 'easeInOutQuad', 'easeOutCirc' ]
	} )
	.on( 'complete', function( tween ){
		console.log( 'it\'s blue', tween );
	} );

scene2
	.to( '.something', {
		background: '#3cf',
		pos       : [ 300, 0 ],
		borderRadius: '50%',
		time      : 600
	} )
	.wait( 100 )
	.to( '.another', {
		background  : '#c3f',
		pos       : [ 300, 0 ],
		borderRadius: '50%',
		time        : 600
	} )
	.wait( 100 )
	.to( '.things', {
		background: '#fc3',
		pos       : [ 300, 0 ],
		borderRadius: '50%',
		time      : 600,
	} )
	.on( 'complete', function( tween ){
		console.log( 'No it\'s a circle', tween );
	} );

scene3
	.to( '.something', {
		background: '#c3f',
		pos       : [ 0, 0 ],
		time      : 1000,
		borderRadius: '0%',
		easing: 'easeOutBounce'
	} )
	.wait( 100 )
	.to( '.another', {
		background  : '#fc3',
		borderRadius: '0%',
		pos         : [ 0, 0 ],
		time        : 1000,
		easing: 'easeOutBounce'
	} )
	.wait( 100 )
	.to( '.things', {
		background: '#3cf',
		pos       : [ 0, 0 ],
		time      : 1000,
		borderRadius: '0%',
		easing: 'easeOutBounce'
	} )
	.on( 'complete', function( tween ){
		console.log( 'hangon a sec', tween );
	} );

//timeline.play();        // will play all the tweens in order
//timeline.to('scene');   // will play all tweens up to provided scene
//timeline.go('scene');   // tween directly to a scene