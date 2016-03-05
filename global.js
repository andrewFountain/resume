var
  template           = function( id ){
    var
      template = Template.get( id ),
      output   = document.getElementById( 'output-' + id ),
      wrapper;
    return function( vars ){
      wrapper           = document.createElement( 'div' );
      wrapper.innerHTML = template.send( vars );
      output.appendChild( wrapper.children[ 0 ] );
    }
  },
  heroTemplate       = template( 'hero' ),
  personalTemplate   = template( 'personal' ),
  jobTemplate        = template( 'job' ),
  booksTemplate      = template( 'books' ),
  blogsTemplate      = template( 'blogs' ),
  languagesTemplate  = template( 'languages' ),
  frameworksTemplate = template( 'frameworks' ),
  educationTemplate  = template( 'education' );


personalTemplate( resume.personal );
heroTemplate( resume.personal );
languagesTemplate( { languages: resume.languages, frameworks: resume.frameworks } );
frameworksTemplate( { frameworks: resume.frameworks } );
jobTemplate( { jobs: resume.work } );
booksTemplate( { books: resume.books } );
blogsTemplate( { blogs: resume.blogs } );

resume.education.forEach( function( course ){
  educationTemplate( { course: course } );
} );

var scrollSpy = (function(){

  var
    stopped        = true,
    offset  = 0,
    events  = [],
    $navTriggers = $( '[data-section]' ),
    current      = $( $navTriggers[ 0 ] ),
    currentSection = [ 0 ],
    scrolling      = false,
    timeout;

  function NavEvt( params ){
    extend( this, params );
  }

  NavEvt.prototype = {};

  function SpyEvt( params ){
    extend( this, params );
  }

  $navTriggers.on( 'click', function( e ){

    var
      $this   = $( e.target ),
      section = $this.data( 'section' );

    $( section ).scrollTo();

  } );


  extend( SpyEvt.prototype, {

    update: function( offset ){

      if( offset > this.offset && this.persist === false ){

//          if( this.el instanceof gQuery && current !== this.el[ 0 ] ){
//
//          }

        this.cb.call( this.el, this.el, offset );
        return false;
      }

      return true;
    }

  } );

  extend( NavEvt.prototype, {

    update: function( offset ){

      if( currentSection[ 0 ] !== this.el[ 0 ] && offset > this.offset - 100 && offset < this.offset + this.height - 100 ){
        current.removeClass( 'active' );
        current        = this.button;
        currentSection = this.el;
        window.history.pushState( { hash: this.el.selector }, 'Resume', this.el.selector );
//          window.location.hash = this.el.selector;
        // console.log( 'changed current', current );
        current.addClass( 'active' );
      }

      return true;

    }

  } );

  return {

    run: function run( cb ){

      function update(){

        offset = window.scrollY;

        events = events.filter( function( event ){

          return event.update( offset );

        } );

        if( events.length ){
          stopped = false;
          window.setTimeout( function(){
            window.requestAnimationFrame( update )
          }, 120 );
        } else {
          stopped = true;
        }
      }

      update();

    },

    paralax: function paralax( el, cb ){

      if( isElement( el ) || isString( el ) ){
        el     = $( el );
        offset = el.offset( null );
      } else {
        offset = window.scrollY;
      }

      events.push( new Paralax( {
        el    : el,
        id    : el.selector,
        cb    : cb,
        offset: offset,
        height: el.css( 'height' )
      } ) );


      if( stopped ){
        this.run();
      }

    },

    bind: function( elOrOffset, cb ){

      var offset = null;

      if( isString( elOrOffset ) ){
        elOrOffset = $( elOrOffset );
        offset     = elOrOffset.offset();
      } else {
        offset = elOrOffset
      }

      events.push( new SpyEvt( {
        el     : elOrOffset,
        cb     : cb,
        offset : offset - (window.innerHeight * .5),
        persist: false
      } ) );

      if( stopped ){
        this.run();
      }

    },

    navigation: function( selector, dataId ){

      $( selector ).each( ( el ) =>{

        var
          $el      = $( el ),
          section  = $el.data( dataId || 'section' ),
          $section = $( section ),
          offset   = $section.offset( null );

        events.push( new NavEvt( {
          el     : $section,
          button : $el,
          offset : offset,
          height : $section.css( 'height' ),
          persist: true
        } ) );

      } );

    }

  }

})();


var paralax = (function(){

  var
    events     = [],
    animations = [ 1 ],
    scrolling  = false,
    timeout    = null;

  /**
   * super efficient scrolling request annimation frome
   *
   * this function will bind an event to the dom scroll event,
   * and continually cancel the callback while scrolling. when
   * when scrolling is complete the `scrolling` variable will be
   * set to false which will end the requestAnimationFrame cycle
   */
  $( window ).on( 'scroll', function(){
    if( scrolling === false && events.length ){
      console.log( 'started scrolling', timeout );
      scrolling = true;
      _render();
    }
    window.clearTimeout( timeout );
    timeout = window.setTimeout( function(){
      scrolling = false;
      console.log( 'stopped scrolling', timeout );
    }, 80 );
  } );

  function _render(){

    events = events.filter( function( event ){

      return event.update( Date.now() );
    } );

    if( events.length && scrolling ){
      window.requestAnimationFrame( _render );
    }

  }


  function Paralax( params ){
    extend( this, params );
  }

  extend( Paralax.prototype, {
    update: function( timestamp ){

      var
        offset       = window.scrollY,
        heightOffset = window.innerHeight * 1;

      this.height = this.el.css( 'height' );
      this.curr   = offset - this.offset;
      this.bottom = this.curr + heightOffset;

      if( ( this.curr > 0 - heightOffset ) && ( this.curr < this.height ) ){

        this.progress = (this.bottom / this.height) * 100;

        return this.cb.call( this, this.progress, this );

      }

      return true; // persistent animation
    }
  } );

  return {
    add : function( el, cb ){

      var offset;

      if( isElement( el ) || isString( el ) ){
        el     = $( el );
        offset = el.offset();
      } else {
        offset = window.offsetY;
      }

      events.push( new Paralax( {
        el      : el,
        height  : el.css( 'height' ),
        progress: 0,
        offset  : offset,
        curr    : offset,
        cb      : cb
      } ) );
    },
    calc: function( p, el ){

      var
        pageOffset   = window.clientY,
        $el          = $( el ),
        elHeight     = $el.css( 'height' ),
        height       = p.end - p.start,
        parentOffset = $el.offset( p.el );

      return {
        start : {
          top   : p.bottom - parentOffset,
          bottom: p.bottom - parentOffset + elHeight
        },
        end   : {
          top   : null,
          bottom: null
        },
        parent: {
          top   : parentOffset,
          bottom: parentOffset + elHeight
        },
        page  : {
          top   : parentOffset,
          bottom: parentOffset + elHeight
        },
        height: elHeight
      };

    }
  };

  var startPos = paralax.calc( 'start' );

  startPos.top();

  function _render(){

    events = events.filter( function( event ){

      return event.update( Date.now() );
    } );

    if( events.length && scrolling ){
      window.requestAnimationFrame( _render );
    }

  }

})();

scrollSpy.navigation( '[data-section]', 'section' );

//  paralax.add( '#output-frameworks', function( progress, para ){
//
//    var elOffsets = [];
//
//    this.el.find('.framework' ).each(function( el ){
//      elOffsets.push( para.bottom - el.offsetTop, paralax.calc( para, el ) );
//    });
//
//    // console.log( 'progress', elOffsets, para );
//    return true;
//
//  });

scrollSpy.bind( '#output-personal', function( el, offset ){

  $( '.personal__attribute-item' ).stagger( ( ii ) => ii * 500, [ 0, 0 ], {
    opacity: 1
  }, 2000 );

  //$('.personal__attribute-item' ).animateFrom([200,200], {}, 2000);

} );

scrollSpy.bind( '#output-languages', function( $el, offset ){

  $el.find( '.framework' ).animate( [ 1, 0, 0, 1, 0, 0 ], null, 1000 );

  $el.find( '.framework' ).each( function( el, ii ){

    var
      $this     = $( this ),
      $progress = $this.find( '.progress' ),
      $header   = $this.find( 'header' ),
      width     = parseInt( $progress.css( 'width' ) ),
      $inner    = $this.find( '.progress-inner' ),
      progress  = parseInt( $progress.data( 'score' ) ) / 10;

    $inner.animate( null, {
      width     : ((width * progress / width) * 100) + '%',
      background: '#3cf'
    }, 2000 );

    $header.animate( null, {
      background: '#3cf'
    }, 2000 );
  } );

} );

scrollSpy.bind( '#output-frameworks', function( $el, offset ){

  $el.find( '.framework' ).animate( [ 1, 0, 0, 1, 0, 0 ], null, 1000 );

  $el.find( '.framework' ).each( function( el, ii ){

    var
      $this     = $( this ),
      $progress = $this.find( '.progress' ),
      $header   = $this.find( 'header' ),
      width     = parseInt( $progress.css( 'width' ) ),
      $inner    = $this.find( '.progress-inner' ),
      progress  = parseInt( $progress.data( 'score' ) ) / 10;

    $inner.animate( null, {
      width: ((width * progress / width) * 100) + '%'
    }, 2000 );

  } );
} );


function Slideshow(){

  this.currentSlide = 0;
  this.length       = 0;
  this.width        = 0;

}


extend( Slideshow.prototype, {
  init   : fluent( function(){

    var
      self    = this,
      $window = $( window );

    this.slideshow = $( '.slideshow' );
    this.wrapper   = this.slideshow.find( '.slideshow-wrapper' );
    this.slides    = this.wrapper.children();
    this.length    = this.slides.length;
    this.left      = this.slideshow.find( '#slideshow-nav-left' );
    this.right     = this.slideshow.find( '#slideshow-nav-right' );

    this.timeline = new Timeline();
    this.scenes = {};

    this.addScenes();

    this.left.on( 'click', function( e ){
      // self.setLeft( 'backward' );
      timeline.prev();
    } );

    this.right.on( 'click', function( e ){
      //self.setLeft( 'forward' );
      timeline.next();
    } );


    scrollSpy.bind( '#output-job', function( $el, offset ){
      timeline.go('scene-bwired');
      //console.log($el);
      //var $slides = $el.find('.job__details');
      //var $first = $slides.nth('first');
      //var $listItems = $first.find( 'li' );
      //$listItems.stagger( 250, [ 0, 0 ], { opacity: 1 }, 500 );
      //$listItems.stagger( 509, null, { color: '#f02673' }, 2000 );
    } );

    $window.on( 'resize', function( e ){

      var
        width = parseFloat( self.slideshow.css( 'width' ) ),
        pos   = width * self.currentSlide;

      self.wrapper.matrix( -pos, 0 );
      self.width = width;
    } );

  } ),
  addScenes: function(){

    var
      $slideshow = $('.slideshow-wrapper'),
      $background = $('.slideshow'),
      screenWidth = parseFloat($slideshow.css('width')) / 5;

    this.scenes.bwired        = this.timeline.add('scene-bwired');
    this.scenes.twenty4       = this.timeline.add('scene-twenty4');
    this.scenes.commonwealth  = this.timeline.add('scene-commonwealth');

    window.timeline = this.timeline;

    this.scenes.bwired
      .to( $slideshow, {
        pos: [0, 0],
        easing: Easing.easeBack(2)
      } )
      .to( $background, {
        backgroundPositionX: '500px'
      } )
      .staggerFrom( '#slide_bwired .job__details li', 60, {
        pos       : [ -100, -100 ],
        time      : 1000,
        opacity: 1,
        // easing    : [ 'easeInOutQuad', 'easeOutCirc' ]
        easing    : 'easeOutBounce'
      } )
      .on( 'complete', function( tween ){
        console.log( 'No it\'s a circle', tween );
      } );

    this.scenes.twenty4
      .to( $slideshow, {
        pos: [-(screenWidth * 1), 0],
        easing: 'easeOutBounce'
      } )
      .to( $background, {
        backgroundPositionX: '1000px'
      } )
      .staggerFrom( '#slide_twenty4 .job__details li', 80, {
        pos    : [ 100, 100 ],
        time: 500,
        opacity: 1,
        easing : 'easeOutQuad'
      } )
      .on( 'complete', function( tween ){
        console.log( 'No it\'s a circle', tween );
      } );

    this.scenes.commonwealth
      .to( $slideshow, {
        pos: [ -(screenWidth * 2), 0],
        easing: 'swing'
      } )
      .to( $background, {
        backgroundPositionX: '1500px'
      } )
      .staggerFrom( '#slide_commonwealth .job__details li', 60, {
        pos    : [ -100, 100 ],
        time: 500,
        opacity: 1,
        // easing    : [ 'easeInOutQuad', 'easeOutCirc' ]
        easing : 'easeOutQuad'
      } )
      .on( 'complete', function( tween ){
        console.log( 'No it\'s a circle', tween );
      } );

  },
  setLeft: function( direction ){
    var
      self   = this,
      width = this.width || parseFloat( this.slideshow.css( 'width' ) ),
      matrix = this.wrapper.matrix(),
      curr   = matrix[ 4 ],
      val;

    console.log( this.currentSlide );

    if( direction === 'forward' ){
      if( this.currentSlide >= this.length - 1 ){
        return false;
      }
      this.currentSlide++;
      val = ( curr - width );
    } else {
      if( this.currentSlide <= 0 ){
        return false;
      }
      this.currentSlide--;
      val = ( curr + width );
    }

    this.width = width;

    var
      $slide       = $( this.slides[ this.currentSlide ] ),
      $heading = $slide.find( 'h3' ),
      $headingLink = $heading.find( 'a' );

    // TODO: figure out business positions and add to positions object
    var
      order     = [ 'bwired', 'twenty4', 'commonwealth', 'anz', 'hobsons' ],
      positions = {
        bwired      : 600,
        twenty4: 200,
        commonwealth: 1200,
        anz         : 1800,
        hobsons     : 2400
      };

    $heading.animateFrom( [ -200, -200 ], { opacity: 0 }, 1000 );
    $headingLink.animate( null, { color: '#f02673' }, 2000 );

    $slide.find( '.job__details li' ).stagger( 250, [ 0, 0 ], { opacity: 1 }, 500 );
    $slide.find( '.job__details li' ).stagger( 509, null, { color: '#f02673' }, 2000 );

    this.wrapper.animate( [ val, 0 ], null, 1000 );
    //this.slideshow.animate( null, { backgroundPositionX: (val / 2 * -1) + 'px' }, 1000 );
    this.slideshow.animate( null, { backgroundPositionX: positions[ order[ this.currentSlide ]] + 'px' }, 1000 );

    // this.slideshow.animate(null, {backgroundPositionX: ( positions[ order[ this.currentSlide ] ]) + 'px'}, 1000);
  }
  //setLeft: function( direction ){
  //  var
  //    self   = this,
  //    width = this.width || parseFloat( this.slideshow.css( 'width' ) ),
  //    matrix = this.wrapper.matrix(),
  //    curr   = matrix[ 4 ],
  //    val;
  //
  //  console.log( this.currentSlide );
  //
  //  if( direction === 'forward' ){
  //    if( this.currentSlide >= this.length - 1 ){
  //      return false;
  //    }
  //    this.currentSlide++;
  //    val = ( curr - width );
  //  } else {
  //    if( this.currentSlide <= 0 ){
  //      return false;
  //    }
  //    this.currentSlide--;
  //    val = ( curr + width );
  //  }
  //
  //  this.width = width;
  //
  //  var
  //    $slide       = $( this.slides[ this.currentSlide ] ),
  //    $heading = $slide.find( 'h3' ),
  //    $headingLink = $heading.find( 'a' );
  //
  //  // TODO: figure out business positions and add to positions object
  //  var
  //    order     = [ 'bwired', 'twenty4', 'commonwealth', 'anz', 'hobsons' ],
  //    positions = {
  //      bwired      : 600,
  //      twenty4: 200,
  //      commonwealth: 1200,
  //      anz         : 1800,
  //      hobsons     : 2400
  //    };
  //
  //  $heading.animateFrom( [ -200, -200 ], { opacity: 0 }, 1000 );
  //  $headingLink.animate( null, { color: '#f02673' }, 2000 );
  //
  //  $slide.find( '.job__details li' ).stagger( 250, [ 0, 0 ], { opacity: 1 }, 500 );
  //  $slide.find( '.job__details li' ).stagger( 509, null, { color: '#f02673' }, 2000 );
  //
  //  this.wrapper.animate( [ val, 0 ], null, 1000 );
  //  //this.slideshow.animate( null, { backgroundPositionX: (val / 2 * -1) + 'px' }, 1000 );
  //  this.slideshow.animate( null, { backgroundPositionX: positions[ order[ this.currentSlide ]] + 'px' }, 1000 );
  //
  //  // this.slideshow.animate(null, {backgroundPositionX: ( positions[ order[ this.currentSlide ] ]) + 'px'}, 1000);
  //}

} );


function words(){

  var words  = 'javascript node php css scss less html awesome simple complex clean functional oop asynchronous awesome elegant optimised abstracted'.split( ' ' ),
      wordEl = document.getElementById( 'word' );

  function show(){

    var word             = words[ Math.floor( Math.random() * words.length ) ],
        rect;
    wordEl.style.opacity = 1;
    wordEl.innerHTML     = word;

    window.setTimeout( function(){

      fadeOut( wordEl, function(){
        window.requestAnimationFrame( show );
      } );

    }, (Math.random() * 500) + 500 );

  }

  show();

  function fadeIn( el ){
    var rect = el.getBoundingClientRect();

    el.style.width = (rect.width / 16) + 'em';
    console.log( 'fadeIn', rect.width );
  }

  function fadeOut( el, cb ){
    var rect   = el.getBoundingClientRect(),
        random = Math.floor( Math.random() * 250 ) + 250;

    el.style.width = (rect.width / 16) + 'em';
    //console.log( rect.width );

    $( el ).animate( null, { opacity: 0 }, random, function( el ){
      cb.call( this, el );
    } );
  }

}

words();

var slideshow = new Slideshow().init();

//    $(window).on('resize', function( e ){
//        if( isConsoleOpen() ){
//            console.log('Awesome you looked');
//        }
//    });

function isConsoleOpen(){
  var start = performance.now();
  console.log( start );
  return performance.now() - start > 2000;
}

var c = {
  styles: {
    header: {
      background: 'red',
      color     : 'white',
      padding   : '1em'
    }
  },
  style : function( type ){
    return this.styles[ type ];
  },
  title : function( text ){
    console.log( '%c ' + text + ' ', 'background:#f02673;color:white;font-size:2em;display:block;width:100%' );
  },
  header: function( text ){
    console.log( '%c ' + text + ' ', 'background:#f9f9f9;color:white;font-size:1.5em' );
  },
  list  : function( text ){
    console.log( '%c > ', 'background:#f02673;color:white;font-size:1em', text );
  }
};

$( '.truck' ).animate( [ 200, 0 ], { opacity: 1 }, 4000, function(){
  scrollSpy.bind( 800, function(){
    $( '.truck' ).animate( [ -600, 0 ], { left: '-600px' }, 4000 );
  } );
} );

function rand(){
  return (Math.random() * 2) - 1;
}

