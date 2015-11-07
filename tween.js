!(function(){

	window.test     = () => SCENES[ 0 ]._update();
	window.Timeline = Timeline;

	let
		SCENES          = [],
	    TWEENS          = [],
	    CURRENT_SCENE   = -1,
	    start           = 0;


	const
		/**
		 * easing
		 *
		 * this object will hold the easing functions for animations
		 *
		 * @type {{easeIn: Function, linear: Function}}
		 */
		easing = {
			easeIn: function easeIn( time, begin, change, duration ){
				return -change * (time /= duration) * (time - 2) + begin;
			},
			linear: function linear( progress, begin, change, duration ){
				return progress < duration
					? property.begin + (progress / time) * change
					: begin + change;
			}
		};


	function render(){

		if( CURRENT_SCENE > -1 && SCENES.length ){

			if( SCENES[ CURRENT_SCENE ]._update() ){
				window.requestAnimationFrame( render );
			}


		}
	}


	function Timeline(){
		this.start = 0;
	}

	extendProto(Timeline.prototype, {

		/**
		 * add
		 *
		 * this method will add a new tween to the timeline
		 *
		 * @param   {String}    name        name of the tween (scene)
		 *
		 * @return {Tween}                  tween attach animations to
		 */
		add   : fluent( function( name ){
			// push to animations and index on tweens object at the same time
			return SCENES[ name ] = SCENES[ SCENES.push( new Tween( name ) ) - 1 ];
		}),

		/**
		 * to
		 *
		 * this method will animate to the scene, running all animations until that scene
		 *
		 * @param   {String}    scene       scene to animate to
		 */
		to: fluent(function( scene ){


		}),

		/**
		 * go
		 *
		 * this method will animate to the scene, skipping all animations in between scenes
		 *
		 * @param   {String}    scene       scene to animate to
		 */
		go: fluent(function( scene ){


		}),

		/**
		 * play
		 *
		 * this method will play all the tweens for the timeline
		 */
		play  : fluent( function(){

			CURRENT_SCENE = 0;
			this.start = start = Date.now();
			render();

		}),

		/**
		 * pause
		 *
		 * this method will pause the timeline
		 */
		pause : fluent(function(){

			CURRENT_SCENE = -1;

		})
	});


	function Tween( name ){
		this.name = name;
		this.events = {};
		this.animations = [];
		this.currentAnimations = [];
		this.delay = 0;
	}
	extendProto( Tween.prototype, {

		to: fluent(function( selector, properties, time ){

			properties.time = properties.time || time + this.delay;

			properties = sortProperties.call( this, properties );

			addAnimations.call( this, selector, properties );
		}),

		wait: fluent(function( delay ){

			this.delay += delay;

		}),

		stagger: fluent(function( selector, stagger, properties ){

			properties = sortProperties.call( this, properties );

			addAnimations.call( this, selector, properties, stagger );

		}),

		on: fluent(function( event, cb ){

			this.events[ event ] = cb;

		}),

		_init: function( animation ){
			this.currentAnimations = this.animations.slice( 0 );
		},

		_add: function( animation ){
			this.animations.push( animation );
			this.currentAnimations.push( animation );
		},

		_update: function(){

			console.log( 'tween update', this );

			this.now = Date.now();

			this.currentAnimations = this.currentAnimations.filter( updateAnimationFilter );

			if( this.currentAnimations.length === 0 ){

				this.events.complete.call( this, this );
				return false

			}
			return true;
		}

	});

	function updateAnimationFilter( animation ){
		return animation._update( Date.now() );
	}

	function Animation(){}
	Animation.prototype = null;
	extendProto( Animation.prototype, {

	});

	function StyleNumber( $el, key, value, timing, stagger ){
		this.$el        = $el;
		this.key        = key;
		this.value      = value;
		this.timing     = timing;
		this.stagger    = stagger;
	}
	StyleNumber.prototype = new Animation;
	extendProto( StyleNumber.prototype, {
		_update: function(){
			console.log( 'number update', this );
		}
	});


	function StyleColor( $el, key, value, timing, stagger ){

		let initial = $el.css( key );

		initial = colorToArray( initial );
		value   = colorToArray( value );

		this.$el      = $el;
		this.timing   = timing;
		this.stagger  = stagger;
		this.prop     = key;
		this.initial  = initial;
		this.curr     = initial.slice();
		this.to       = value;
		this.diff     = diffArray( initial, value );
		this.easing   = easing[ timing.ease || 'easeIn' ];
		this.time     = timing.time;
		this.progress = 0;
	}

	StyleColor.prototype = new Animation;
	extendProto( StyleColor.prototype, {
		_update: function( now ){

			let newCurr = [];

			this.start = this.start || Date.now();
			this.progress = now - this.start;

			for( let ii = 0, ll = this.curr.length; ii < ll; ii++ ) {
				newCurr[ ii ] = this.easing( this.progress, this.initial[ ii ], this.diff[ ii ], this.time );
			}

			this.curr = parseIntMap( newCurr );

			let styleProp = {};
			styleProp[ this.prop ] = 'rgb(' + this.curr.join( ',' ) + ')';

			this.$el.css( styleProp );

			console.log( 'color update', this );

			return this.progress < this.time;
		}
	});

	function Matrix( $el, key, value, timing, stagger ){
		this.$el     = $el;
		this.key     = key;
		this.initial = $el.matrix();
		this.curr    = this.initial.slice( 0 );
		this.to      = value.length == 2 ? [ 1, 0, 0, 1 ].concat( value ) : value;
		this.diff    = diffArray( this.initial, this.to );
		this.time    = timing.time;
		this.timing  = timing;
		this.stagger = stagger;
		this.start   = Date.now();
		this.easing  = easing[ timing.easing || 'easeIn' ];
	}

	Matrix.prototype = new Animation;
	extendProto( Matrix.prototype, {
		_update: function( now ){

			let newCurr = [];

			this.progress = now - this.start;

			for( var ii = 0, ll = this.curr.length; ii < ll; ii++ ) {
				newCurr[ ii ] = this.easing( this.progress, this.initial[ ii ], this.diff[ ii ], this.time );
			}

			this.curr = newCurr;

			this.$el.matrix( this.curr );

			console.log( 'matrix update', this );
		}
	} );


	function addAnimations( selector, properties, stagger = 0 ){

		let $el = $( selector );

		for( let key in properties.matrix ){
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
			timing  = new Set([ 'time', 'delay', 'speed', 'easing' ]),
			matrix  = new Set([ 'pos', 'top', 'left', 'bottom', 'right', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale' ]),
			colors  = new Set([ 'background', 'color', 'background-color', 'border-color' ]);

		return function( properties ){

			let
				ret       = {
					timing: {},
					matrix: {},
					styleNumber: {},
					styleColor: {}
				};

			for( let key in properties ) {

				if( ! properties.hasOwnProperty( key ) ){
					continue;
				}

				let  prop = properties[ key ];

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

		for( let key in giver ){
			let value = giver[ key ];

			if( isPrivate( key ) ){
				Object.defineProperty( reciever, key, {
					value: value,
					writable: false,
					enumerable: false
				});
			} else {
				Object.defineProperty( reciever, key, {
					value     : value,
					writable  : false,
					enumerable: true
				});
			}

		}

		return reciever;

		function isPrivate( key ){
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
				curr = el.style[ 'transform' ] || window.getComputedStyle( el, null )[ 'transform' ],
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
	timeline    = new Timeline(),
	scene1      = timeline.add('scene-1', 2000);
    //scene2      = timeline.add('scene-2');

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
	.to('.something', {
		background: '#3cf',
		time: 400
	})
	.on('complete', function( tween ){
		console.log( 'it\'s blue', tween );
	});

//timeline.play();        // will play all the tweens in order
//timeline.to('scene');   // will play all tweens up to provided scene
//timeline.go('scene');   // tween directly to a scene