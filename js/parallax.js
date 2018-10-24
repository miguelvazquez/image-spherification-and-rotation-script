/*!
 * parallax.js v1.3.1 (http://pixelcog.github.io/parallax.js/)
 * @copyright 2015 PixelCog, Inc.
 * @license MIT (https://github.com/pixelcog/parallax.js/blob/master/LICENSE)
 */

;(function ( $, window, document, undefined ) {

  // Polyfill for requestAnimationFrame
  // via: https://gist.github.com/paulirish/1579671

  (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                 || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
	window.requestAnimationFrameDateTime = new Date();
    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback) {
        var currTime = window.requestAnimationFrameDateTime.getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
  }());


  // Parallax Constructor

  function Parallax(element, options) {
    var self = this;

    if (typeof options == 'object') {
      delete options.refresh;
      delete options.render;
      $.extend(this, options);
    }

    this.$element = $(element);

    if (!this.imageSrc && this.$element.is('img')) {
      this.imageSrc = this.$element.attr('src');
    }

    var positions = (this.position + '').toLowerCase().match(/\S+/g) || [];

    if (positions.length < 1) {
      positions.push('center');
    }
    if (positions.length == 1) {
      positions.push(positions[0]);
    }

    if (positions[0] == 'top' || positions[0] == 'bottom' || positions[1] == 'left' || positions[1] == 'right') {
      positions = [positions[1], positions[0]];
    }

    if (this.positionX != undefined) positions[0] = this.positionX.toLowerCase();
    if (this.positionY != undefined) positions[1] = this.positionY.toLowerCase();

    self.positionX = positions[0];
    self.positionY = positions[1];

    if (this.positionX != 'left' && this.positionX != 'right') {
      if (isNaN(parseInt(this.positionX))) {
        this.positionX = 'center';
      } else {
        this.positionX = parseInt(this.positionX);
      }
    }

    if (this.positionY != 'top' && this.positionY != 'bottom') {
      if (isNaN(parseInt(this.positionY))) {
        this.positionY = 'center';
      } else {
        this.positionY = parseInt(this.positionY);
      }
    }

    this.position =
      this.positionX + (isNaN(this.positionX)? '' : 'px') + ' ' +
      this.positionY + (isNaN(this.positionY)? '' : 'px');

    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
      if (this.iosFix && !this.$element.is('img')) {
        this.$element.css({
          backgroundImage: 'url(' + this.imageSrc + ')',
          backgroundSize: 'cover',
          backgroundPosition: this.position
        });
      }
	  
      return this;
    }

    if (navigator.userAgent.match(/(Android)/)) {
      if (this.androidFix && !this.$element.is('img')) {
        this.$element.css({
          backgroundImage: 'url(' + this.imageSrc + ')',
          backgroundSize: 'cover',
          backgroundPosition: this.position
        });
      }
      return this;
    }

    /*this.$mirror = $('<div />').prependTo('body');
    this.$slider = $('<img />').prependTo(this.$mirror);
	var bgColor = this.$element.css("background-color");
    this.$mirror.addClass('parallax-mirror').css({
      visibility: 'hidden',
      zIndex: this.zIndex,
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'hidden',
	  "background-color":bgColor
    });
	var el = this.$element;
    this.$slider.addClass('parallax-slider').one('load', function() {
      if (!self.naturalHeight || !self.naturalWidth) {
        self.naturalHeight = this.naturalHeight || this.height || 1;
        self.naturalWidth  = this.naturalWidth  || this.width  || 1;
      }
      self.aspectRatio = self.naturalWidth / self.naturalHeight;

      Parallax.isSetup || Parallax.setup();
      Parallax.sliders.push(self);
      Parallax.isFresh = false;
      Parallax.requestRender();
	  el.addClass("parallax-add");
    });

    this.$slider[0].src = this.imageSrc;

    if (this.naturalHeight && this.naturalWidth || this.$slider[0].complete) {
      this.$slider.trigger('load');
    }*/
	
	this.$mirror = $('<div />').prependTo('body');
    this.$slider = $('<div />').prependTo(this.$mirror);
	var bgColor = this.$element.css("background-color");
    this.$mirror.addClass('parallax-mirror').css({
      visibility: 'hidden',
      zIndex: this.zIndex,
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'hidden',
	  height:'100%',
	  "background-color":bgColor 
    });
	this.$slider.css({
	  "background-image":"url("+this.imageSrc+")"
    });
	var el = this.$element;
    this.$slider.addClass('parallax-slider');
 
	
	Parallax.isSetup || Parallax.setup();
    Parallax.sliders.push(self);
    Parallax.isFresh = false;
    Parallax.requestRender();
	el.addClass("parallax-add");
	

  };


  // Parallax Instance Methods

  $.extend(Parallax.prototype, {
    speed:    0.2,
    bleed:    0,
    zIndex:   -100,
    iosFix:   true,
    androidFix: true,
    position: 'center',
    overScrollFix: false,

    refresh: function() { 
      this.boxWidth        = this.$element.outerWidth();
      this.boxHeight       = this.$element.outerHeight() + this.bleed * 2;
      this.boxOffsetTop    = this.$element.offset().top - this.bleed;
      this.boxOffsetLeft   = this.$element.offset().left;
      this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;

      var winHeight = Parallax.winHeight;
      var docHeight = Parallax.docHeight;
      var maxOffset = Math.min(this.boxOffsetTop, docHeight - winHeight);
      var minOffset = Math.max(this.boxOffsetTop + this.boxHeight - winHeight, 0);
      var imageHeightMin = this.boxHeight + (maxOffset - minOffset) * (1 - this.speed) | 0;
      var imageOffsetMin = (this.boxOffsetTop - maxOffset) * (1 - this.speed) | 0;

      if (imageHeightMin * this.aspectRatio >= this.boxWidth) {
        this.imageWidth    = imageHeightMin * this.aspectRatio | 0;
        this.imageHeight   = imageHeightMin;
        this.offsetBaseTop = imageOffsetMin;

        var margin = this.imageWidth - this.boxWidth;

        if (this.positionX == 'left') {
          this.offsetLeft = 0;
        } else if (this.positionX == 'right') {
          this.offsetLeft = - margin;
        } else if (!isNaN(this.positionX)) {
          this.offsetLeft = Math.max(this.positionX, - margin);
        } else {
          this.offsetLeft = - margin / 2 | 0;
        }
      } else {
        this.imageWidth    = this.boxWidth;
        this.imageHeight   = this.boxWidth / this.aspectRatio | 0;
        this.offsetLeft    = 0;

        var margin = this.imageHeight - imageHeightMin;

        if (this.positionY == 'top') {
          this.offsetBaseTop = imageOffsetMin;
        } else if (this.positionY == 'bottom') {
          this.offsetBaseTop = imageOffsetMin - margin;
        } else if (!isNaN(this.positionY)) {
          this.offsetBaseTop = imageOffsetMin + Math.max(this.positionY, - margin);
        } else {
          this.offsetBaseTop = imageOffsetMin - margin / 2 | 0;
        }
      }
    },

    render: function() {
      var scrollTop    = Parallax.scrollTop;
      var scrollLeft   = Parallax.scrollLeft;
      var overScroll   = this.overScrollFix ? Parallax.overScroll : 0;
      var scrollBottom = scrollTop + Parallax.winHeight;

      if (this.boxOffsetBottom > scrollTop && this.boxOffsetTop < scrollBottom) {
        this.visibility = 'visible';
      } else {
        this.visibility = 'hidden';
      }
      this.mirrorTop = this.boxOffsetTop  - scrollTop;
      this.mirrorLeft = this.boxOffsetLeft - scrollLeft;
      this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed);

      this.$mirror.css({
        transform: 'translate3d(0px, 0px, 0px)',
        visibility: this.visibility,
        top: this.mirrorTop - overScroll,
        left: 0,//this.mirrorLeft,
        height: this.boxHeight,
        width: this.boxWidth
      });

      this.$slider.css({
        transform: 'translate3d(0px, 0px, 0px)',
        position: 'absolute',
		backgroundSize: 'cover',
		//"background-position":"center "+this.offsetTop+"px ",
        top: -this.mirrorTop,
        left: 0,//this.offsetLeft,
		width:'100%',
        height: Parallax.winHeight,
        maxWidth: 'none'
      });
    }
  });


  // Parallax Static Methods

  $.extend(Parallax, {
    scrollTop:    0,
    scrollLeft:   0,
    winHeight:    0,
    winWidth:     0,
    docHeight:    1 << 30,
    docWidth:     1 << 30,
    sliders:      [],
    isReady:      false,
    isFresh:      false,
    isBusy:       false,

    setup: function() {
      if (this.isReady) return;

      var $doc = $(document), $win = $(window), tmi=null, tmi1=null,ani=false;
	  var renove = function(){
		  Parallax.winHeight = $win.height();
          Parallax.winWidth  = $win.width();
          Parallax.docHeight = $doc.height();
          Parallax.docWidth  = $doc.outerWidth(true);
          Parallax.isFresh = false;
          Parallax.requestRender();
		  Parallax.refresh();  
	  }
      $win.on('scroll.px.parallax load.px.parallax', function() {
          var scrollTopMax  = Parallax.docHeight - Parallax.winHeight;
          var scrollLeftMax = Parallax.docWidth  - Parallax.winWidth;
		  var _scrollTop = $win.scrollTop();
		  var _scrollLeft = $win.scrollLeft();
          Parallax.scrollTop  = Math.max(0, Math.min(scrollTopMax,  _scrollTop));
          Parallax.scrollLeft = Math.max(0, Math.min(scrollLeftMax, _scrollLeft));
          Parallax.overScroll = Math.max(_scrollTop - scrollTopMax, Math.min(_scrollTop, 0));
          Parallax.requestRender();
        })
        .on('resize.px.parallax load.px.parallax', function() {
         	renove();
        });

      this.isReady = true;
    },

    configure: function(options) {
      if (typeof options == 'object') {
        delete options.refresh;
        delete options.render;
        $.extend(this.prototype, options);
      }
    },

    refresh: function() {
      $.each(this.sliders, function(){ this.refresh() });
      this.isFresh = true;
    },

    render: function() {
      this.isFresh || this.refresh();
      $.each(this.sliders, function(){ this.render() });
    },

    requestRender: function() {
      var self = this;
	  self.render();
      if (!this.isBusy) {
        this.isBusy = true;
        window.requestAnimationFrame(function() {
          self.render();
          self.isBusy = false;
        });
      }
    }
  });


  // Parallax Plugin Definition

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var options = typeof option == 'object' && option;

      if (this == window || this == document || $this.is('body')) {
        Parallax.configure(options);
      }
      else if (!$this.data('px.parallax')) {
        options = $.extend({}, $this.data(), options);
        $this.data('px.parallax', new Parallax(this, options));
      }
      if (typeof option == 'string') {
        Parallax[option]();
      }
    })
  };

  var old = $.fn.parallax;

  $.fn.parallax             = Plugin;
  $.fn.parallax.Constructor = Parallax;


  // Parallax No Conflict

  $.fn.parallax.noConflict = function () {
    $.fn.parallax = old;
    return this;
  };


  // Parallax Data-API

  $(document).on('ready.px.parallax.data-api', function () {
	 
    	$('[data-parallax="scroll"]').each(function() {
             var obj = $(this);
			 var opt = obj.data("parallax-options");
			 if( typeof opt == "object" ){
				 obj.parallax(opt);
			 }else{
				 obj.parallax();
			 }
			
        });
  });

}(jQuery, window, document));

;(function($){
	var doc = $(document), win = $(window), tmi=null, tmi1=null,ani=false, srcLO;
	var cParalax = {
		datas:[],
		winWidth:0,
		winHeight:0,
		docWidth:0,
		docHeight:0,
		isFresh:false,
		scrollTop:0,
		renove : function(){
			this.winWidth  = win.width();
			this.winHeight = win.height();
			this.docWidth  = doc.outerWidth(true);
			this.docHeight = doc.height();
			this.isFresh = false;
		 
		},
		updateImg : function(ini){
			var self = this;
			clearTimeout(srcLO);
			srcLO = setTimeout(function(){
				for( var n in self.datas ){
					var src = self.getSrc(self.datas[n]); 
					self.datas[n].mirror.css({"background-image":"url("+src+")"});	
				}
			},ini?0:1000);
		},
		OrderForValueAprox : function (rank, name, value) {
			var res = [];
			for(var n in  rank){
				res.push( $.extend(true,{},rank[n]));	
			}
			return res.sort(function (a, b) {
				return Math.abs(a[name] - value) - Math.abs(b[name] - value)
			})
		},
		getSizeByFixedWidth:function ($width, $height, $newWidth){
				$newHeight = $newWidth * ($height / $width );
				return $newHeight;
		},
		getSizeByFixedHeight:function ($width, $height, $newHeight){
			$ratio = $width / $height;
			$newWidth = $newHeight * $ratio;
			return $newWidth;
		},
		getSrc : function(data){
			var self = this;
			var size =  self.OrderForValueAprox(data.size, "width", self.winWidth);
			var sizeFirst = size[0];
			var sizeNext = size[1];
			if( sizeNext ){
				if(sizeFirst.width < self.winWidth && sizeNext.width > sizeFirst.width){
					sizeFirst = sizeNext;
				}
			}
			var src = data.srcWxH.replace(/\{wxh\}/, sizeFirst.width+'x'+sizeFirst.height);
			return src;
			
		},
		disp:function (x1, x2, p, ps){
				var o = {xa:x1, xb:x2, dx:x2-x1, p:p };
				var r = (((o.dx)*p)/(isNaN(ps)?1:ps))+x1;
				o.xr = r;
				if(x1<x2){
					if(r > x2) r = x2;else if(r < x1) r=x1;
				} else{
					if(r < x2) r = x2;else if(r > x1) r=x1;
				}
				o.x = r;
				o.result = r;
				o.da=o.xr-x1;
				o.dr=o.dx-(o.xr-o.xa); 
				return o;
		},
		render : function(){
			var self = this;
			this.scrollTop = win.scrollTop();
			this.scrollTopWin = this.scrollTop+this.winWidth;
			for( var n in this.datas ){
				
				var opt = this.datas[n];
				if( isNaN(opt.offsetY) ) opt.offsetY = 0;
				var mh = opt.obj.outerHeight();
				opt.mirror.height(mh)
				var offsetTop = opt.obj.offset().top;
				var mtop = this.scrollTop - offsetTop; 
				opt.mirror.css({top:-mtop});
			  	var ow = opt.mirror.width();
				var oh = opt.mirror.height();
				var nw = ow;
				var nh = this.getSizeByFixedWidth( opt.width, opt.height, ow );
				if( nh < this.winHeight ){
					nh = this.winHeight;	
					nw = this.getSizeByFixedHeight( opt.width, opt.height, nh );;
				}
				if( nh < mh){
					nh = mh;	
					nw = this.getSizeByFixedHeight( opt.width, opt.height, nh );;
				}
				
				var ds = self.disp(0, nh, opt.offsetY,100);
				
				nw = this.getSizeByFixedHeight( nw, nh, nh+ds.xr );;
				
				
			
				
				opt.mirror.css({"background-size":nw+"px "+(nh+ds.xr)+'px' }); 
	 			mtop = mtop * (1 - opt.speed);
				
				var dsx = self.disp(0, nh+ds.xr, opt.offsetBgY,100);
				opt.mirror.css({"background-position":"center "+(mtop-ds.xr-dsx.xr)+"px  " }); 
				
			}
			 
		 
		}		
	}
	
	win.on('resize.cfx-parallax load.cfx-parallax', function() {
       cParalax.renove();
	   cParalax.render();
	   cParalax.updateImg();
    });
	win.on('scroll.cfx-parallax', function() {
       cParalax.render();
    });
	$.fn.extend({
		cParalax: function (options) {
			var obj = $(this); 
			return obj;
		}
	});
	 $(document).ready(function () {
	 	 cParalax.renove();
    	$('[data-cfx-parallax]').each(function() {
             var obj = $(this);
			 var dat = obj.attr("data-cfx-parallax");
			 var dataClass =obj.attr("data-cfx-parallax-class");
			 if( cfxParallax && cfxParallax[dat]){
				 
				 var p = $.extend({
					offsetY:0,
					offsetBgY:0,
					speed:    0.4,
					bleed:    0,
					zIndex:   -100,
					iosFix:   true,
					androidFix: true,
					position: 'center',
					overScrollFix: false,
					disable_paralax: false,
					backgroundSize:'cover'
				 },cfxParallax[dat]);
				 
				
				 if (navigator.userAgent.match(/(Android|iPod|iPhone)/) || p.disable_paralax ) {
				  if (p.androidFix || p.iosFix  || p.disable_paralax) {
					 
					  	var src = cParalax.getSrc(p); 
						obj.css({
						  backgroundImage: 'url(' + src + ')',
						  backgroundSize: p.backgroundSize,
						  backgroundPosition: p.position
						});
				  }
				  return this;
				}
				
				 
				 
				 
				 p.obj = obj;
				 var div = $("<div />").addClass(dataClass);
				 $("body").prepend(div);
				 p.mirror = div;
				 div.css({
					  zIndex: p.zIndex,
					  position: 'fixed',
					  top: 0,
					  left: 0,
					  overflow: 'hidden',
					  height:'100%' ,
					  width:'100%',
					  "background-repeat":"no-repeat"
	  			});
				
				 cParalax.datas.push(p);
				 cParalax.render();
				 cParalax.updateImg(true);
			 }
			 return this;
			
        });
		
		function animate() {
			if( cParalax.docHeight != doc.height() ){
				cParalax.renove();
				cParalax.render();
			}
			
			requestAnimationFrame( animate );
			
		}
		animate()
  });
})(jQuery);
var cfxParallax = cfxParallax || {};
