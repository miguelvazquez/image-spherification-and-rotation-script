/*!{"i":" CFX Sistem | Tools v0.1s  | (c) 2005 - 2015  CFX ","api":"4.1","version":"1.0"}*/

;(function( window, undefined ) {
	var _inload=new Array();
	var Base64 = {
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = Base64._utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

		}

		return output;
	},

	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}

		output = Base64._utf8_decode(output);

		return output;

	},

	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while ( i < utftext.length ) {

			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}

		return string;
	}
	}

	var _cfx = {
		version:0.02,
		Base64:Base64,
		_loading:null,
		sloading:function(hide){
			if(!_cfx._loading ){
				_cfx._loading = document.getElementById("simple-loading");
				if(!_cfx._loading){
					_cfx._loading = document.createElement("div");
					_cfx._loading.setAttribute("id","simple-loading");
					document.body.appendChild( _cfx._loading ); 
				}
			}
			_cfx._loading.style.display=hide?"none":"block";
		},
		setTimeLoop:function(func, delay, loop ){
			var varTime = {timeOut:null, loop:loop };
			var fn = function(){
				if( varTime.timeOut ) clearTimeout(varTime.timeOut);
				varTime.timeOut = setTimeout(function(){
					func(); varTime.loop--;
					if( varTime.loop > 0 )fn();
				},delay);
			}
			fn();
			return varTime;
		},
		password: function (length, special) {
			var iteration = 0;
			var password = "";
			var randomNumber;
			if(special == undefined){
				var special = false;
			}
			while(iteration < length){
				randomNumber = (Math.floor((Math.random() * 100)) % 94) + 33;
				if(!special){
					if ((randomNumber >=33) && (randomNumber <=47)) { continue; }
					if ((randomNumber >=58) && (randomNumber <=64)) { continue; }
					if ((randomNumber >=91) && (randomNumber <=96)) { continue; }
					if ((randomNumber >=123) && (randomNumber <=126)) { continue; }
				}
				iteration++;
				password += String.fromCharCode(randomNumber);
			}
			return password;
		},

		generatepass:function(plength){
			var keylist = ("abcdefghijklmnopqrstuvwxyz0123456789-_.#&").split(""), temp=[];
			for (i=0;i<plength;i++){
				var lt = keylist[Math.floor(Math.random()*keylist.length)];
				if( /([a-z])/.test(lt) && Math.round(Math.random()*1) ){
					lt = lt.toUpperCase();
				}	
				temp.push( lt );
			}
			var newpass = temp.join("");
			if( plength > 2 && !/([0-9])/.test(newpass)){
				temp[Math.floor(Math.random()*(plength-1))] = Math.round(Math.random()*9);
			}
			if( plength > 2 && !/([A-Z])/.test(newpass)){
				for( i=0;i<plength;i++){
					var l = Math.floor(Math.random()*(plength-1));
					if( /([a-z])/.test(temp[l]) ){
						temp[l] = temp[l].toUpperCase();
						break;
					}	
				}
			}
			return temp.join("");
		},
		normalize : function(str) {
			  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÇç",
				  to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuucc",
				  mapping = {};
			 
			  for(var i = 0, j = from.length; i < j; i++ )
				  mapping[ from.charAt( i ) ] = to.charAt( i );
				  var ret = [];
				  for( var i = 0, j = str.length; i < j; i++ ) {
					  var c = str.charAt( i );
					  if( mapping.hasOwnProperty( str.charAt( i ) ) )
						  ret.push( mapping[ c ] );
					  else
						  ret.push( c );
				  }
				  return ret.join( '' );
			},
			urlkey : function(str){
					return _cfx.normalize(str).toLowerCase().replace(/ /g, '-').replace(/ñ/g, 'n').replace(/[^0-9@: a-z _.-]/g, '-')
					.replace(/[(\.\-|\.\_|\-\.|\_\.|_\-|\-\_|\.\.)]+/g, '-');
			},
			load : function(e){
				if(typeof(e) == "function") _inload.push(e);
				else{
					var s =null;
					while( s = _inload.shift() ){s(e);}
				}
			},
			preg_match : function (regex, haystack) {
				var re = new RegExp(regex);
				var m = re.exec(haystack);
				if (m == null) {
					return null;	
				}else return m;
			},
			mt_rand : function  (min, max) {
				var argc = arguments.length;
				if (argc === 0) {min = 0; max = 2147483647;
				} else if (argc === 1) {
					throw new Error('Warning: mt_rand() expects exactly 2 parameters, 1 given');
				}    return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			loadScript : function(url, callback, count){
				var t = this; 
				if(!count)count=1;
				var s = document.getElementsByTagName('script');
				var l = s.length;
				for(var i=0; i<l; i++){
					var scr = s[i];
					var src = scr.getAttribute("src");
					if( url == src ){
						var state = scr.getAttribute("data-state");
						if( state == "load"){
							if(typeof callback == "function")callback();
						}else{
							if( count<5){
								setTimeout(function(){
									t.loadScript(url, callback, count+1);	
								},500);	
							}else{
								console.log("Fail load:"+url);	
							}
						}
						return ;
					}	
				}
				var script = document.createElement("script");
				script.type = "text/javascript";
				script.async = true;
				
				if (script.readyState){ 
					script.onreadystatechange = function(){
						if (script.readyState == "loaded" ||
								script.readyState == "complete"){
							script.onreadystatechange = null;
							script.setAttribute("data-state","load");
							if(typeof callback == "function")callback();
						}
					};
				} else { 
					script.onload = function(){
						script.setAttribute("data-state","load");
					   	if(typeof callback == "function")callback();
					};
				}
				script.src = url;
				document.getElementsByTagName('script')[0].appendChild(script);
			},
			setCookie : function (key, value, exdays, path, domain, secure){
				var exdate=new Date();
				exdate.setDate(exdate.getDate() + exdays);
				document.cookie = [
						encodeURIComponent(key), '=',
						encodeURIComponent(String(value)),
						'; expires=' + exdate.toUTCString(), 
						path ? '; path=' + path : '',
						domain ? '; domain=' + domain : '',
						secure ? '; secure' : ''
					].join('');
					
			},
			getCookie : function (c_name){
				var i,x,y,ARRcookies=document.cookie.split(";");
				for (i=0;i<ARRcookies.length;i++){
				  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
				  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
				  x=x.replace(/^\s+|\s+$/g,"");
					if (x==c_name){
						return unescape(y);
					}
				}
			},
			cookie:function (key, value, options) {
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
			},
			browser : function(userAgent){ 
				var obj={};
				obj.userAgent=typeof userAgent != "undefined"?userAgent:navigator.userAgent;
				obj.name = null;
				obj.version = 0;
				obj.so = null;
				obj.info = new Array();
				obj._ismobile = null;
				obj._istablet = null;
				var BR_list = [ {v: ['2','3'], name:'IE',		agent:'(.*) MSIE ([0-9]*).([0-9]*)'},
								{v: ['2','3'], name:'Safari', 	agent:'(.*) Version/([0-9]*).([0-9]*)(.*)Safari/([0-9]*).([0-9]*)'},
								{v: ['2','3'], name:'Firefox',	agent:'(.*) Firefox/([0-9]*).([0-9]*)'},
								{v: ['2','3'], name:'Chrome',	agent:'(.*) Chrome/([0-9]*).([0-9]*)' },
								{v: ['4','5'], name:'Opera',	agent:'Opera/([0-9]*).([0-9]*)(.*)Version/([0-9]*).([0-9]*)'},
								{v: ['4','5'], name:'GoogleBoot',agent:'Mozilla/([0-9]*).([0-9]*)(.*)Googlebot/([0-9]*).([0-9]*)'}];
				var SO_list = { 'Windows':'Windows',
								'linux':'Linux',
								'iPhone(.*)iPhone':'iPhone',
								'iPad(.*)Mac':'iPad',
								'iPod(.*)iPhone':'iPod',
								'Macintosh(.*)Mac':'Macintosh',
								'Googlebot':'Googlebot',
								'BeOS':'BeOS'};
				
				for(var n in SO_list){
					if(_cfx.preg_match ( n , obj.userAgent)){
						obj.so = SO_list[n];
						break;
					}
				}
				
				for (var n in BR_list){
					var o = BR_list[n];	
					var matches = _cfx.preg_match( o.agent, obj.userAgent);
					if(matches){
						obj.name = o.name;
						if(!o.v)return;
						obj.version = matches[o.v[0]]+'.'+matches[o.v[1]];
						break;
					}
				} 
				obj.getName = function(){return obj.name};
				obj.istablet = function(){
					if(obj._istablet !== null) return obj._istablet;
					obj.ismobile();
					return obj._istablet;
				}
				obj.ismobile = function(){
					if(obj._ismobile !== null) return obj._ismobile;
					obj._ismobile = false;
					if(__cfx.preg_match('(up.browser|up.link|mmp|symbian|smartphone|midp|wap|phone|mobile|palmos)',obj.userAgent.toLowerCase() )) obj._ismobile = true;
					if(_cfx.preg_match('(tablet|ipad)',obj.userAgent.toLowerCase() )){
						obj._ismobile = false;
						obj._istablet = true;
					}else{
						obj._istablet = false;
					}
					if(_cfx.preg_match('application/vnd.wap.xhtml+xml',obj.userAgent.toLowerCase())) b++;
					return obj._ismobile;
				}
				return obj;
			},
			bgresized : function (iw, ih, width, height, minw, minh){
					var w=0, h=0, x=0, y=0, fRatio=0;
					if(minw){ if(width < minw ) width=minw;}
					if(minh){ if(height < minh ) height=minh;}
					if (width > height) {
						if (iw > ih) {
							fRatio = iw/ih;
							w = width
							h = Math.round(width * (1/fRatio));
							var newIh = h;
							if(newIh < height) {
								fRatio = ih/iw;
								h = height;
								w = Math.round(height * (1/fRatio));
							}
						} else {
							fRatio = ih/iw;
							h = height;
							w = Math.round(height * (1/fRatio));
						}
					} else {
						fRatio = ih/iw;
						h = height;
						w = Math.round(height * (1/fRatio));
					}	
					if (w > width) { x = (w - width) / 2;}
					if (h > height) { y = (h - height) / 2;}
					return {'w':Math.round(w),'h':Math.round(h),'x':Math.round(x),'y':Math.round(y)};		 
			},
			roundTo: function(c, num) {
				var resto = c%num;
				if (resto <= (num/2)) { 
					return c-resto;
				} else {
					return c+num-resto;
				}
			},
			resized: function (maxW, maxH, width, height){
					var w=maxW, h=maxH, x=0, y=0;
					if (width>height) {
						w=maxW;
						h=w*(height/width);
					}else{
						h=maxH;
						w=h*(width/height);
					}
					if(maxH){
						if (width<height) {
							w=maxW;
							h=w*(height/width);
						}else{
							h=maxH;
							w=h*(width/height);
						}
						if (width>height) {
							w=maxW;
							h=w*(height/width);
						}else{
							h=maxH;
							w=h*(width/height);
						}
					}
			
					width=w;
					height=h;
					x=(maxW-width)/2;
					y=(maxH-height)/2;
					return {'w':Math.round(w),'h':Math.round(h),'x':Math.round(x),'y':Math.round(y)};		 
			},
			dis:function (x1, x2, x ){
				var o = {xa:x1, xb:x2, x:x, dx:x2-x1, da:x-x1, db:x2-x};
				var r=((o.da*1)/(o.dx));
				o.pr = r; //actual percentage
				o.pp = (r<0)?0:((r>1)?1:r);
				o.pn = (r>0)?0:((r<-1)?-1:r);
				if(r > 1) r=1; else if(r < -1) r=-1;
				o.p = r;
				o.result = r;
				return o;
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
			isset:function(el){
				return ( typeof el !=="undefined" )?true:false;
			},
			getAttributes:function(el){
				var attributes = {}; 
				if( el.attributes )
					for( var attr, i=0, attrs=el.attributes, l=attrs.length; i<l; i++ ){
						attr = attrs.item(i);
						attributes[attr.nodeName] =  ( _cfx.isset(attr.value) )?attr.value:attr.nodeValue;
					}
				return attributes;
			},
			getParam:function(el, name){
				if(!name)name="param";
				var attr = _cfx.getAttributes(el);
				var paramParser = {};
				var _exp = new RegExp( "^("+name+"-)" );
				for (var n in attr){
					var r = n.replace(_exp,"");
					if( r != n) paramParser[r]=attr[n];
				}
				return paramParser;
			},
			preventDefault:function(e){
				 var evt = e || window.event; 
				 if( !evt )return;
				 if( evt.preventDefault) 
				  	evt.preventDefault();  
				 else{  
				  	evt.returnValue = false;  
				  	evt.cancelBubble= true;  
				 }
			}
		};
		
	
	if ( document.readyState === "complete" ) { setTimeout( _cfx.load(), 10 );
	} else if ( document.addEventListener ) {
		window.addEventListener( "load", _cfx.load , false );
	} else { window.attachEvent( "onload", _cfx.load );}
	if( typeof window.cfx == "object" )for(var n in _cfx)window.cfx[n]=_cfx[n];
	else
	window.cfx = _cfx;
})(window);


