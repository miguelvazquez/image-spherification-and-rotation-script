/*!{"i":" CFX System | Basic v0.1s  | (c) 2005 - 2015  CFX ","api":"4.1","version":"1.0"}*/

var hexcase=0;var b64pad="";function hex_sha1(a){return rstr2hex(rstr_sha1(str2rstr_utf8(a)))}function hex_hmac_sha1(a,b){return rstr2hex(rstr_hmac_sha1(str2rstr_utf8(a),str2rstr_utf8(b)))}function sha1_vm_test(){return hex_sha1("abc").toLowerCase()=="a9993e364706816aba3e25717850c26c9cd0d89d"}function rstr_sha1(a){return binb2rstr(binb_sha1(rstr2binb(a),a.length*8))}function rstr_hmac_sha1(c,f){var e=rstr2binb(c);if(e.length>16){e=binb_sha1(e,c.length*8)}var a=Array(16),d=Array(16);for(var b=0;b<16;b++){a[b]=e[b]^909522486;d[b]=e[b]^1549556828}var g=binb_sha1(a.concat(rstr2binb(f)),512+f.length*8);return binb2rstr(binb_sha1(d.concat(g),512+160))}function rstr2hex(c){try{hexcase}catch(g){hexcase=0}var f=hexcase?"0123456789ABCDEF":"0123456789abcdef";var b="";var a;for(var d=0;d<c.length;d++){a=c.charCodeAt(d);b+=f.charAt((a>>>4)&15)+f.charAt(a&15)}return b}function str2rstr_utf8(c){var b="";var d=-1;var a,e;while(++d<c.length){a=c.charCodeAt(d);e=d+1<c.length?c.charCodeAt(d+1):0;if(55296<=a&&a<=56319&&56320<=e&&e<=57343){a=65536+((a&1023)<<10)+(e&1023);d++}if(a<=127){b+=String.fromCharCode(a)}else{if(a<=2047){b+=String.fromCharCode(192|((a>>>6)&31),128|(a&63))}else{if(a<=65535){b+=String.fromCharCode(224|((a>>>12)&15),128|((a>>>6)&63),128|(a&63))}else{if(a<=2097151){b+=String.fromCharCode(240|((a>>>18)&7),128|((a>>>12)&63),128|((a>>>6)&63),128|(a&63))}}}}}return b}function rstr2binb(b){var a=Array(b.length>>2);for(var c=0;c<a.length;c++){a[c]=0}for(var c=0;c<b.length*8;c+=8){a[c>>5]|=(b.charCodeAt(c/8)&255)<<(24-c%32)}return a}function binb2rstr(b){var a="";for(var c=0;c<b.length*32;c+=8){a+=String.fromCharCode((b[c>>5]>>>(24-c%32))&255)}return a}function binb_sha1(v,o){v[o>>5]|=128<<(24-o%32);v[((o+64>>9)<<4)+15]=o;var y=Array(80);var u=1732584193;var s=-271733879;var r=-1732584194;var q=271733878;var p=-1009589776;for(var l=0;l<v.length;l+=16){var n=u;var m=s;var k=r;var h=q;var f=p;for(var g=0;g<80;g++){if(g<16){y[g]=v[l+g]}else{y[g]=bit_rol(y[g-3]^y[g-8]^y[g-14]^y[g-16],1)}var z=safe_add(safe_add(bit_rol(u,5),sha1_ft(g,s,r,q)),safe_add(safe_add(p,y[g]),sha1_kt(g)));p=q;q=r;r=bit_rol(s,30);s=u;u=z}u=safe_add(u,n);s=safe_add(s,m);r=safe_add(r,k);q=safe_add(q,h);p=safe_add(p,f)}return Array(u,s,r,q,p)}function sha1_ft(e,a,g,f){if(e<20){return(a&g)|((~a)&f)}if(e<40){return a^g^f}if(e<60){return(a&g)|(a&f)|(g&f)}return a^g^f}function sha1_kt(a){return(a<20)?1518500249:(a<40)?1859775393:(a<60)?-1894007588:-899497514}function safe_add(a,d){var c=(a&65535)+(d&65535);var b=(a>>16)+(d>>16)+(c>>16);return(b<<16)|(c&65535)}function bit_rol(a,b){return(a<<b)|(a>>>(32-b))};

var prefix = (function () {
  if( typeof window.getComputedStyle != "undefined" ){
	  return{ 
	  	dom: "",
		lowercase: "",
		css:"",
		js:""
	  };	  
  }
  var styles = window.getComputedStyle(document.createElement('div'));
  var pre = (Array.prototype.slice
      .call(styles)
      .join('') 
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1],
    dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
  return {
    dom: dom,
    lowercase: pre,
    css: '-' + pre + '-',
    js: pre[0].toUpperCase() + pre.substr(1)
  };
})();
(function (fallback) {    

    fallback = fallback || function () { };

    // function to trap most of the console functions from the FireBug Console API. 
    var trap = function () {
        // create an Array from the arguments Object           
        var args = Array.prototype.slice.call(arguments);
        // console.raw captures the raw args, without converting toString
        console.raw.push(args);
        var message = args.join(' ');
        console.messages.push(message);
        fallback(message);
    };

    // redefine console
    if (typeof console === 'undefined') {
        console = {
            messages: [],
            raw: [],
            dump: function() { return console.messages.join('\n'); },
            log: trap,
            debug: trap,
            info: trap,
            warn: trap,
            error: trap,
            assert: trap,
            clear: function() { 
                  console.messages.length = 0; 
                  console.raw.length = 0 ;
            },
            dir: trap,
            dirxml: trap,
            trace: trap,
            group: trap,
            groupCollapsed: trap,
            groupEnd: trap,
            time: trap,
            timeEnd: trap,
            timeStamp: trap,
            profile: trap,
            profileEnd: trap,
            count: trap,
            exception: trap,
            table: trap
        };
    }

})(null);

var win = win || $(window);
(function( $ ) {
	if(!$.ui ) return;
	var proto = $.ui.autocomplete.prototype,
	initSource = proto._initSource;
	
	function filter( array, term ) {
	var matcher = new RegExp( $.ui.autocomplete.escapeRegex(term), "i" );
	return $.grep( array, function(value) {
		return matcher.test( $( "<div>" ).html(  value.value || value || value.label ).text() );
	});
	}
	
	$.extend( proto, {
	_initSource: function() {
	if ( this.options.html && $.isArray(this.options.source) ) {
		this.source = function( request, response ) {
			
			response( filter( this.options.source, request.term ) );
		
		};
	} else {
			initSource.call( this );
		}
	},
	
	_renderItem: function( ul, item) {
	return $( "<li></li>" )
	.data( "item.autocomplete", item )
	.append( $( "<a></a>" )[ this.options.html ? "html" : "text" ]( item.label ) )
	.appendTo( ul );
	}
	});
	
})( jQuery );	
;(function($){
     $.fn.extend({
          getTop: function (parents, options) {
			 var t = $(this);
			 var parents = typeof parents=="object"?parents : t.parents(parents);
             var win =  $(window);
			 var scrollTop  = win.scrollTop(); 
			 var scrollTopDiv  = parents.scrollTop(); 
			 var of = t.offset().top;
			 var ofp = parents.offset().top;
			 return ((of+scrollTop)+scrollTopDiv)-(ofp+scrollTop);
			
			  
          }
     });
})(jQuery);
;(function($){
     $.fn.extend({
          addInput: function (options) {
               return this.each(function() {
				   var form = $(this);
				   if ( form[0].nodeName.toLowerCase() == 'form') {
					   for(var name in options){
						   var input = $('input[name="'+name+'"]', form);
						   if( !input.length ){
							   input = $('<input type="hidden" />').attr({'name' : name , "data-input":1 });
							   form.append(input);
						   }
						   input.val(options[name]);
						  // form.append(input.attr({'name' : name, 'value' : options[name] }));
					   }
				   }
                    return form;
               });
          }
     });
})(jQuery);

/*
!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);

*/
(function($){
     $.fn.extend({
          center: function (options) {
               var options =  $.extend({ // Default values
                    inside:window, // element, center into window
                    transition: 0, // millisecond, transition time
                    minX:0, // pixel, minimum left element value
                    minY:0, // pixel, minimum top element value
                    withScrolling:true, // booleen, take care of the scrollbar (scrollTop)
                    vertical:true, // booleen, center vertical
                    horizontal:true // booleen, center horizontal
               }, options);
               return this.each(function() {
                    var props = {position:'absolute'};
					var op = null;
                    if (options.vertical) {
                         var top = ($(options.inside).height() - $(this).outerHeight(true)) / 2;
                         if (options.withScrolling) top += $(options.inside).scrollTop() || 0;
                         top = (top > options.minY ? top : options.minY);
                        op = $.extend(props, {top: top+'px'});
                    }
                    if (options.horizontal) {
                          var left = ($(options.inside).width() - $(this).outerWidth(true)) / 2;
                          if (options.withScrolling) left += $(options.inside).scrollLeft() || 0;
                          left = (left > options.minX ? left : options.minX) ;
                        op =  $.extend(props, {left: left+'px'});
                    }
					
                    if (options.transition > 0){ 
						delete op['position'];
						$(this).css({position:'absolute'}).animate(op, options.transition, options.onfinishanimate);
					} else $(this).css(op);
		
                    return $(this);
					
					
               });
          }
     });
})(jQuery);
(function($) {
    $.fn.serializeObject = function() {
        var data={}, f = this.serializeArray();
		var index = {};
		
		for (var n in f){
			if( f[n].name.indexOf('[]') != -1){
				if( typeof index[f[n].name] == "undefined") 
				index[f[n].name]=0; else index[f[n].name]+=1;
				f[n].name = f[n].name.replace('[]','['+index[f[n].name]+']');
			}
			data[f[n].name]=f[n].value;
		}
        return data;
    };
})(jQuery);
(function($) {
    $.fn.valList = function() {
        var data=[], f = this.serializeArray();
		var index = {};
		for (var n in f){
			if( f[n].name.indexOf('[]') != -1){
				if( typeof index[f[n].name] == "undefined") 
				index[f[n].name]=0; else index[f[n].name]+=1;
				f[n].name = f[n].name.replace('[]','['+index[f[n].name]+']');
			}
			data.push(f[n].value);
		}
        return data;
    };
})(jQuery);
var _addeventAjax = _addeventAjax || {};
var _addeventAjaxTime = _addeventAjaxTime || {};
var addeventAjax = function(name, e){
	if(typeof(e) == "function") _addeventAjax[name]=e;
	else if(e == "delete")delete _addeventAjax[name];
		else{
			for(var n in _addeventAjax){ 
				if(typeof _addeventAjax[n] == "function"){
					(function(n){
						if(_addeventAjaxTime[n]) clearTimeout(_addeventAjaxTime[n]);
						_addeventAjaxTime[n] = setTimeout(function(){
							_addeventAjax[n](name,e);
						},5);
					})(n);
				}
			}
	}
}
function __fxop(){ return _FXOP = ((0.2+0.4) !== 0.6 )?true:false; }
function fixFloat(float){
    if(typeof _FXOP == "undefined")_FXOP=__fxop();
    if( !_FXOP )return float;
    if( String(float).indexOf(".") != -1 ){
        var l, d, n = String(float).split(".");
        d = n[1]; l = d.length;
        if( l >= 12 ){
            d = d.split(""); d[l-1]=d[l-2];
            float = parseFloat(Number(n[0]+"."+d.join("")).toFixed(l-1));
        }
    }
    return float;
}
function _angle(deg){
	return (Math.PI * (deg/180));	
}

function _getA (ww, deg){
	var _cos =  Math.cos(_angle(deg));
	var hipo = ww/_cos;
	return fixFloat(hipo*Math.sin(_angle(deg)));
}

var cajax =  window.history && window.history.pushState && window.history.replaceState
  && !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]|WebApps\/.+CFNetwork)/);
  
function cajaxhistory(url, title, options){
	var o = $.extend({replaceState:false} , options);
	o.url = url;
	if(title)document.title = title;
	o.title=title; 
	if(cajax){
		var r = o.replaceState?true:false;
		delete( o.replaceState );
		var stateObj = { foo: "bar" };
		window.history[(r)?'replaceState':'pushState'](stateObj, title, url);
	}else{
		window.location.href='#!redir/'+url;
	}
	if (window._gaq ) _gaq.push(['_trackPageview',url]);
}
if( cajax ){
	window.addEventListener('popstate', function(event) {
		if (!event.state) {
			
		}else{
			window.location.href = event.target.window.location.href;
		}
		
	});
}
var an=window.location.href.split('#!redir/');
var _href=null;
if( $.trim(an[1])){
	window.location.href = an[1];
}

function preg_match_all(regex, haystack) {
   var globalRegex = new RegExp(regex, 'g');
   var globalMatch = haystack.match(globalRegex);
   matchArray = new Array();
   for (var i in globalMatch) {
      nonGlobalRegex = new RegExp(regex);
      nonGlobalMatch = globalMatch[i].match(nonGlobalRegex);
      matchArray.push(nonGlobalMatch);
   }
   return matchArray;
}

function extractScript(text) {
	var part = text.replace(/\*/gi,'-XX-XX-').split("<\/script>");
	var matchArray = [];
	for(var n in part){
		var c = part[n].match(new RegExp(/<script([^>]+)?>([^*]+)/));
		if( c ){
			for( var j=0; j<3; j++ ){
				if(c[j])
				c[j] = c[j].replace(/\-XX\-XX-/gi,"*");
			}
			c[0]+='</script>';
			matchArray.push( c );
		}
	}
	
	return matchArray;
}
function clearMenuList(){
	$(".addMenuList").remove();
	$(".btMenuList.active").removeClass("active btMenuList");
	$("body").off("click.oplab");	
}
function addMenuPos(bt, menu){
	var left = bt.offset().left;
	var top = bt.offset().top;
	var wm = win.width()/2;
	var hm = win.height();
	var  maxh =( hm-bt.outerHeight(true) )-50; 
	$(".menu",menu).each(function(index, element) {
        var m = $(this); 
		m.css({"max-height":""});
		m.css({"max-height":maxh+"px"});
		m.width("");
		m.width(m.width()+20);
    });
	
	if (left > wm){
		left-=menu.width()-bt.outerWidth(true);
		menu.addClass("right");
	}else menu.addClass("left");
	
	var st = top-$(window).scrollTop();
	;if( st+bt.outerHeight(true)+menu.outerHeight(true) > hm && st>(hm/2)){
		menu.addClass("top");
		top-=menu.outerHeight(true);
	}else{
		menu.addClass("down");
		top+=bt.outerHeight(true);
	}
	
	menu.css({left:left+"px",top:top+"px"});
}
function addMenuBodyEvent(eventname, bt, menu, remove){
	setTimeout(function(){
		$("body").off("click."+eventname).on("click."+eventname,function(event){
			var p = $(event.target).parents(".addMenuList");
			if(!p.length ){
				menu.fadeOut("fast",function(){
					if( remove )
						menu.remove();
				})
				bt.removeClass("active btMenuList");
				$("body").off("click."+eventname);	
			}
		});	
	},10);
}
function addMenuList(bt, menu){
	bt=$(bt);menu=$(menu);
	if(bt.is(".active"))return;
	menu.addClass("addMenuList").css({position:"absolute"});
	$("body").append(menu);
	addMenuPos(bt, menu);
	bt.addClass("active btMenuList");
	setTimeout(function(){
		addMenuBodyEvent("addMenuList", bt, menu, true);
	},10);
	addeventAjax("addMenuList",{
		html:menu	
	});
	menu.find(".onfocus").focus();
	return [bt,menu];
}

addeventAjax("data-share", function( e, obj ){
	$("a[data-share]", obj.html).each(function() {
		var a = $(this);
		var href = a.attr("href");
		if (href )
		a.off("click.com").off("click.share").on("click.share",function(e ){ e.preventDefault();
			var html = $("#tm-shares").html();
			html = html.replace("{$href}",encodeURI( href ));
			cfx.swin(html);
			
		});
        
    });
	
});


function get_html_translation_table (table, quote_style) {
  var entities = {},
    hash_map = {},
    decimal;
  var constMappingTable = {},
    constMappingQuoteStyle = {};
  var useTable = {},
    useQuoteStyle = {};

  // Translate arguments
  constMappingTable[0] = 'HTML_SPECIALCHARS';
  constMappingTable[1] = 'HTML_ENTITIES';
  constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
  constMappingQuoteStyle[2] = 'ENT_COMPAT';
  constMappingQuoteStyle[3] = 'ENT_QUOTES';

  useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
  useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';

  if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
    throw new Error("Table: " + useTable + ' not supported');
    // return false;
  }

  entities['38'] = '&amp;';
  if (useTable === 'HTML_ENTITIES') {
    entities['160'] = '&nbsp;';
    entities['161'] = '&iexcl;';
    entities['162'] = '&cent;';
    entities['163'] = '&pound;';
    entities['164'] = '&curren;';
    entities['165'] = '&yen;';
    entities['166'] = '&brvbar;';
    entities['167'] = '&sect;';
    entities['168'] = '&uml;';
    entities['169'] = '&copy;';
    entities['170'] = '&ordf;';
    entities['171'] = '&laquo;';
    entities['172'] = '&not;';
    entities['173'] = '&shy;';
    entities['174'] = '&reg;';
    entities['175'] = '&macr;';
    entities['176'] = '&deg;';
    entities['177'] = '&plusmn;';
    entities['178'] = '&sup2;';
    entities['179'] = '&sup3;';
    entities['180'] = '&acute;';
    entities['181'] = '&micro;';
    entities['182'] = '&para;';
    entities['183'] = '&middot;';
    entities['184'] = '&cedil;';
    entities['185'] = '&sup1;';
    entities['186'] = '&ordm;';
    entities['187'] = '&raquo;';
    entities['188'] = '&frac14;';
    entities['189'] = '&frac12;';
    entities['190'] = '&frac34;';
    entities['191'] = '&iquest;';
    entities['192'] = '&Agrave;';
    entities['193'] = '&Aacute;';
    entities['194'] = '&Acirc;';
    entities['195'] = '&Atilde;';
    entities['196'] = '&Auml;';
    entities['197'] = '&Aring;';
    entities['198'] = '&AElig;';
    entities['199'] = '&Ccedil;';
    entities['200'] = '&Egrave;';
    entities['201'] = '&Eacute;';
    entities['202'] = '&Ecirc;';
    entities['203'] = '&Euml;';
    entities['204'] = '&Igrave;';
    entities['205'] = '&Iacute;';
    entities['206'] = '&Icirc;';
    entities['207'] = '&Iuml;';
    entities['208'] = '&ETH;';
    entities['209'] = '&Ntilde;';
    entities['210'] = '&Ograve;';
    entities['211'] = '&Oacute;';
    entities['212'] = '&Ocirc;';
    entities['213'] = '&Otilde;';
    entities['214'] = '&Ouml;';
    entities['215'] = '&times;';
    entities['216'] = '&Oslash;';
    entities['217'] = '&Ugrave;';
    entities['218'] = '&Uacute;';
    entities['219'] = '&Ucirc;';
    entities['220'] = '&Uuml;';
    entities['221'] = '&Yacute;';
    entities['222'] = '&THORN;';
    entities['223'] = '&szlig;';
    entities['224'] = '&agrave;';
    entities['225'] = '&aacute;';
    entities['226'] = '&acirc;';
    entities['227'] = '&atilde;';
    entities['228'] = '&auml;';
    entities['229'] = '&aring;';
    entities['230'] = '&aelig;';
    entities['231'] = '&ccedil;';
    entities['232'] = '&egrave;';
    entities['233'] = '&eacute;';
    entities['234'] = '&ecirc;';
    entities['235'] = '&euml;';
    entities['236'] = '&igrave;';
    entities['237'] = '&iacute;';
    entities['238'] = '&icirc;';
    entities['239'] = '&iuml;';
    entities['240'] = '&eth;';
    entities['241'] = '&ntilde;';
    entities['242'] = '&ograve;';
    entities['243'] = '&oacute;';
    entities['244'] = '&ocirc;';
    entities['245'] = '&otilde;';
    entities['246'] = '&ouml;';
    entities['247'] = '&divide;';
    entities['248'] = '&oslash;';
    entities['249'] = '&ugrave;';
    entities['250'] = '&uacute;';
    entities['251'] = '&ucirc;';
    entities['252'] = '&uuml;';
    entities['253'] = '&yacute;';
    entities['254'] = '&thorn;';
    entities['255'] = '&yuml;';
  }

  if (useQuoteStyle !== 'ENT_NOQUOTES') {
    entities['34'] = '&quot;';
  }
  if (useQuoteStyle === 'ENT_QUOTES') {
    entities['39'] = '&#39;';
  }
  entities['60'] = '&lt;';
  entities['62'] = '&gt;';


  // ascii decimals to real symbols
  for (decimal in entities) {
    if (entities.hasOwnProperty(decimal)) {
      hash_map[String.fromCharCode(decimal)] = entities[decimal];
    }
  }

  return hash_map;
}
function htmlspecialchars_decode (string, quote_style) {
  // http://kevin.vanzonneveld.net
  // +   original by: Mirek Slugen
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Mateusz "loonquawl" Zalega
  // +      input by: ReverseSyntax
  // +      input by: Slawomir Kaniecki
  // +      input by: Scott Cariss
  // +      input by: Francois
  // +   bugfixed by: Onno Marsman
  // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Ratheous
  // +      input by: Mailfaker (http://www.weedem.fr/)
  // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
  // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: htmlspecialchars_decode("<p>this -&gt; &quot;</p>", 'ENT_NOQUOTES');
  // *     returns 1: '<p>this -> &quot;</p>'
  // *     example 2: htmlspecialchars_decode("&amp;quot;");
  // *     returns 2: '&quot;'
  var optTemp = 0,
    i = 0,
    noquotes = false;
  if (typeof quote_style === 'undefined') {
    quote_style = 2;
  }
  string = string.toString().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  var OPTS = {
    'ENT_NOQUOTES': 0,
    'ENT_HTML_QUOTE_SINGLE': 1,
    'ENT_HTML_QUOTE_DOUBLE': 2,
    'ENT_COMPAT': 2,
    'ENT_QUOTES': 3,
    'ENT_IGNORE': 4
  };
  if (quote_style === 0) {
    noquotes = true;
  }
  if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
    quote_style = [].concat(quote_style);
    for (i = 0; i < quote_style.length; i++) {
      // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
      if (OPTS[quote_style[i]] === 0) {
        noquotes = true;
      } else if (OPTS[quote_style[i]]) {
        optTemp = optTemp | OPTS[quote_style[i]];
      }
    }
    quote_style = optTemp;
  }
  if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
    string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
    // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
  }
  if (!noquotes) {
    string = string.replace(/&quot;/g, '"');
  }
  // Put this in last place to avoid escape being double-decoded
  string = string.replace(/&amp;/g, '&');

  return string;
}

function html_entity_decode (string, quote_style) {
  // http://kevin.vanzonneveld.net
  // +   original by: john (http://www.jd-tech.net)
  // +      input by: ger
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +   improved by: marc andreu
  // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Ratheous
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Nick Kolosov (http://sammy.ru)
  // +   bugfixed by: Fox
  // -    depends on: get_html_translation_table
  // *     example 1: html_entity_decode('Kevin &amp; van Zonneveld');
  // *     returns 1: 'Kevin & van Zonneveld'
  // *     example 2: html_entity_decode('&amp;lt;');
  // *     returns 2: '&lt;'
  var hash_map = {},
    symbol = '',
    tmp_str = '',
    entity = '';
  tmp_str = string.toString();

  if (false === (hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style))) {
    return false;
  }

  // fix &amp; problem
  // http://phpjs.org/functions/get_html_translation_table:416#comment_97660
  delete(hash_map['&']);
  hash_map['&'] = '&amp;';

  for (symbol in hash_map) {
    entity = hash_map[symbol];
    tmp_str = tmp_str.split(entity).join(symbol);
  }
  tmp_str = tmp_str.split('&#039;').join("'");

  return tmp_str;
}
function add_val_form(e, form, name, nivel){
	if(!nivel)nivel=1;
	for (var n in e){
		(function(v, n){ 
			var nmame = (name)?name+"["+n+"]":n; 
			if(typeof v =="object"){
				if(	nivel<3 )
					add_val_form(v, form, nmame,(nivel+1));
			}else{
				$("*[name='"+ nmame +"']", form).each(function(){
					var a = $(this);
					if(a.is('input')){
						if(a.attr('type')=='radio'|| a.attr('type')=='checkbox'){
							if(a.attr('value')==v ){ a.attr('checked',false);
								setTimeout(function(){
									 a.attr({checked:true});
								},500);
							}else{ a.attr({checked:false}); }
						}else a.val(html_entity_decode(htmlspecialchars_decode(!v?'':v)));
					}
					if(a.is('select')){
						a.find('option[value='+v+']').attr('selected',"selected");
					}
					if(a.is('textarea')){
						a.val(html_entity_decode(htmlspecialchars_decode(v)));
					}
					var exec_change = a.attr("data-on-change");
					if( exec_change )setTimeout(function(){ 
						
						a.change();
	
					 },100);
					
				});
			}	
		})(e[n], n);
	}
}
var cfx = cfx || {};
cfx.loading_show=false;
cfx.loading_close=function(options){
	var settings = {show_b:false, closeTimeAnimate:'fast', closeAnimate:function(w, t, f){w.fadeOut(t,function(){f(w);});},endAnimate:null };   
	var o = $.extend(settings, options); 
	if(typeof cfx.loading_timeClose != "undefined")clearTimeout(cfx.loading_timeClose);
	var wb=cfx.swin_b;
	wb.bind('click', function(){cfx.swin_close()});
	var wt=cfx.loading_t;
	cfx.loading_show=false;
	if(typeof o.closeAnimate == "function")o.closeAnimate(wt,o.closeTimeAnimate,function(){
		wt.hide().html('');
		if(typeof o.endAnimate == "function")o.endAnimate();
	});else wt.hide().html('');
	if(!o.show_b)
	wb.fadeOut(o.closeTimeAnimate);
	wb.removeClass('loading');
};
cfx.loading=function(options){
	var settings = {text:'cargando..',show_b:true, openTimeAnimate:'fast', openAnimate:function(w, t, f){w.fadeOut(t,function(){f(w);});},endAnimate:null, timeClose:10000 };   
	var o = $.extend(settings, options); 
	var wb=cfx.swin_b;
	wb.unbind('click');
	var wt=cfx.loading_t;
	wt.html(o.text);
	cfx.loading_show=true;
	wt.fadeIn(o.openTimeAnimate).center();
	if(o.show_b){
		if(!wb.is(":visible"))
			wb.show().css({opacity :0, background:"#000000"}).stop().animate({opacity :0.9},'fast');
		else wb.stop().animate({opacity :0.9},'fast');
	}
	wb.addClass('loading');
	if(parseInt(o.timeClose)){
		cfx.loading_timeClose = setTimeout(function(){
			cfx.loading_close({
				show_b:true,
				endAnimate:function(){cfx.swin('Se ha superado el tiempo de espera.<br />Por favor vuelva a intentarlo pasados unos segundos',{type:'error',timeClose:10000});}
			});
		},o.timeClose);
	}
};
;(function(f,h,$){var a='placeholder' in h.createElement('input'),d='placeholder' in h.createElement('textarea'),i=$.fn,c=$.valHooks,k,j;if(a&&d){j=i.placeholder=function(){return this};j.input=j.textarea=true}else{j=i.placeholder=function(){var l=this;l.filter((a?'textarea':':input')+'[placeholder]').not('.placeholder').bind({'focus.placeholder':b,'blur.placeholder':e}).data('placeholder-enabled',true).trigger('blur.placeholder');return l};j.input=a;j.textarea=d;k={get:function(m){var l=$(m);return l.data('placeholder-enabled')&&l.hasClass('placeholder')?'':m.value},set:function(m,n){var l=$(m);if(!l.data('placeholder-enabled')){return m.value=n}if(n==''){m.value=n;if(m!=h.activeElement){e.call(m)}}else{if(l.hasClass('placeholder')){b.call(m,true,n)||(m.value=n)}else{m.value=n}}return l}};a||(c.input=k);d||(c.textarea=k);$(function(){$(h).delegate('form','submit.placeholder',function(){var l=$('.placeholder',this).each(b);setTimeout(function(){l.each(e)},10)})});$(f).bind('beforeunload.placeholder',function(){$('.placeholder').each(function(){this.value=''})})}function g(m){var l={},n=/^jQuery\d+$/;$.each(m.attributes,function(p,o){if(o.specified&&!n.test(o.name)){l[o.name]=o.value}});return l}function b(m,n){var l=this,o=$(l);if(l.value==o.attr('placeholder')&&o.hasClass('placeholder')){if(o.data('placeholder-password')){o=o.hide().next().show().attr('id',o.removeAttr('id').data('placeholder-id'));if(m===true){return o[0].value=n}o.focus()}else{l.value='';o.removeClass('placeholder');l==h.activeElement&&l.select()}}}function e(){var q,l=this,p=$(l),m=p,o=this.id;if(l.value==''){if(l.type=='password'){if(!p.data('placeholder-textinput')){try{q=p.clone().attr({type:'text'})}catch(n){q=$('<input>').attr($.extend(g(this),{type:'text'}))}q.removeAttr('name').data({'placeholder-password':true,'placeholder-id':o}).bind('focus.placeholder',b);p.data({'placeholder-textinput':q,'placeholder-id':o}).before(q)}p=p.removeAttr('id').hide().prev().attr('id',o).show()}p.addClass('placeholder');p[0].value=p.attr('placeholder')}else{p.removeClass('placeholder')}}}(this,document,jQuery));

addeventAjax("data-placeholder", function( e ){
	$('input, textarea').placeholder(); 	
});
cfx.simple_scrollUp=function(){
	var win = win || $(window);
	$("body,html").animate({scrollTop:win.scrollTop()-win.height()/2});
};
cfx.simple_scrollDown=function(){
	var win = win || $(window);
	$("body,html").animate({scrollTop:win.scrollTop()+win.height()/2});
};



function getSizeByFixedWidth($width, $height, $newWidth){
		$ratio = $height / $width  ;
		$newHeight = $newWidth * $ratio;
		return $newHeight;
}
function getSizeByFixedHeight($width, $height, $newHeight){
		$ratio = $width / $height;
		$newWidth = $newHeight * $ratio;
		return $newWidth;
	}
function hexToRgb(hex_string, default_)
{
    if (default_ == undefined)
    {
        default_ = null;
    }

    if (hex_string.substr(0, 1) == '#')
    {
        hex_string = hex_string.substr(1);
    }
    
    var r;
    var g;
    var b;
    if (hex_string.length == 3)
    {
        r = hex_string.substr(0, 1);
        r += r;
        g = hex_string.substr(1, 1);
        g += g;
        b = hex_string.substr(2, 1);
        b += b;
    }
    else if (hex_string.length == 6)
    {
        r = hex_string.substr(0, 2);
        g = hex_string.substr(2, 2);
        b = hex_string.substr(4, 2);
    }
    else
    {
        return default_;
    }
    
    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);
    if (isNaN(r) || isNaN(g) || isNaN(b))
    {
        return default_;
    }
    else
    {
        return {r: r / 255, g: g / 255, b: b / 255};
    }
}

function rgbToHex(r, g, b, Hash)
{
    r = parseInt(r),  g = parseInt(g), b = parseInt(b);
	return  ((Hash || Hash == undefined)?"#":'') + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

if(!jQuery.cookie)
jQuery.cookie = function (key, value, options) {
    if (arguments.length > 1 && (value === null || typeof value !== "object")) {
        options = jQuery.extend({}, options);
        if (value === null) {
            options.expires = -1;
        }
        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? String(value) : encodeURIComponent(String(value)),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};