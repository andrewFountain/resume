!(function(){

	let
		ANIMATIONS  = [],
	    TWEENS      = {};

	function Timeline(){}

	extend(Timeline.prototype, {

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
			return TWEENS[ name ] = ANIMATIONS.push( new Tween( name ) );
		}),

		// not required
		remove: fluent( function( selector ){


		}),

		/**
		 * play
		 *
		 * this method will play all the tweens for the timeline
		 */
		play  : fluent( function(){


		}),

		/**
		 * pause
		 *
		 * this method will pause the timeline
		 */
		pause : fluent( function(){


		})
	});


	function Tween( name ){
		this.name = name;
		this.events = {};
	}
	extend( Tween.prototype, {

		animate: fluent(function( selector, properties ){

			this.selector = selector;
			this.$els = $( selector );
			this.properties = sortProperties( properties );

		}),

		stagger: fluent(function( selector, delay, properties ){

			this.selector   = selector;
			this.$els       = $( selector );
			this.properties = sortProperties( properties );

		}),

		on: fluent(function( event, cb ){

			this.events[ event ] = cb;

		})

	});


	/**
	 * this function will separate the different types of properties into
	 * timing, vectors, colors and general
	 *
	 * @param {Object}  properties      properties of the tween
	 *
	 * @return {Object}
	 */
	let sortProperties = (function(){

		const
			timing    = new Set([ 'delay', 'speed', 'easing' ]),
			positions = new Set([ 'pos', 'top', 'left', 'bottom', 'right', 'rotate', 'rotateX', 'rotateY', 'rotateZ' ]),
			colors    = new Set([ 'background', 'color', 'background-color', 'border-color' ]);

		return function( properties ){

			let
				ret       = {
					timing: {},
					position: {},
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
				else if( positions.has( key ) ){

					ret.position[ key ] = prop;
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

})();

let
	timeline    = new Timeline();
	scene1      = timeline.add('scene-1'),
    scene2      = timeline.add('scene-2');

scene1
	.to('.something', {
		pos: [0,0],
		rotateZ: 360,
		background: '#faa'
	})
	.to('.another', {
		pos: [0,0],
		scale: [100,100],
		color: [20,31.66]
	})
	.stagger('.things', 200, {

	})
	.on('complete' ,function( tween ){

	});

timeline.play();        // will play all the tweens in order
timeline.to('scene');   // will play all tweens up to provided scene