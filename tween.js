!(function(){

	window.test     = () => SCENES[ 0 ]._update();
	window.Timeline = Timeline;

	let
		SCENES          = [],
	    TWEENS          = [],
	    CURRENT_SCENE   = -1,
	    start           = 0;


	function render(){

		SCENES[ CURRENT_SCENE ]._update();

		if( CURRENT_SCENE > -1 && SCENES.length ){
			window.requestAnimationFrame( render );
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

			this.start = start = Date.now();

		}),

		/**
		 * pause
		 *
		 * this method will pause the timeline
		 */
		pause : fluent(function(){


		})
	});


	function Tween( name ){
		this.name = name;
		this.events = {};
		this.animations = [];
		this.delay = 0;
	}
	extendProto( Tween.prototype, {

		to: fluent(function( selector, properties, time ){

			properties.time = time + this.delay;

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
		},

		_update: function(){

			console.log( 'tween update', this );

			this.now = Date.now();

			this.currentAnimations = this.currentAnimations.filter( updateAnimationFilter );

			if( currentAnimations.length === 0 ){

				this.events.complete.call( this, this );

			}
		}

	});

	function updateAnimationFilter( animation ){
		animation._update();
		return false;
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
		this.$el     = $el;
		this.key     = key;
		this.value   = value;
		this.timing  = timing;
		this.stagger = stagger;
	}

	StyleColor.prototype = new Animation;
	extendProto( StyleColor.prototype, {
		_update: function(){
			console.log( 'color update', this );
		}
	});

	function Matrix( $el, key, value, timing, stagger ){
		this.$el     = $el;
		this.key     = key;
		this.value   = value;
		this.timing  = timing;
		this.stagger = stagger;
	}

	Matrix.prototype = new Animation;
	extendProto( Matrix.prototype, {
		_update: function(){
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

})();

let
	timeline    = new Timeline(),
	scene1      = timeline.add('scene-1', 2000);
    //scene2      = timeline.add('scene-2');

scene1
	.to('.something', {
		pos: [0,0],
		rotateZ: 360,
		background: '#faa',
		easing: 'easeInOut'
	}, 200 )
	.wait( 400 )
	.to('.another', {
		pos: [0,0],
		scale: [100,100],
		color: [20,31.66],
		delay: 400
	}, 400)
	.stagger('.things', 200, {
		pos: [ 0, 0 ],
		scale: [ 100, 100 ],
		color: [ 20, 31.66 ],
		delay: 400,
		width: 400
	})
	.on('complete', function( tween ){
		console.log('complete tweening');
	});

//timeline.play();        // will play all the tweens in order
//timeline.to('scene');   // will play all tweens up to provided scene
//timeline.go('scene');   // tween directly to a scene