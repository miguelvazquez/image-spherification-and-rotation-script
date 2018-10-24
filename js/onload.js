


;(function($win,$doc,$){
	$.cachedScript = function( url, options ) {
	  options = $.extend( options || {}, {
		dataType: "script",
		cache: true,
		url: url
	  });
	  return $.ajax( options );
	};
	var cPage = $win[$win.cPageScript];
	var noload = [];
	cPage.q = cPage.q || [];
	cPage.q.push = function(ad){
		var a =  Array.prototype.slice.call(ad);
		noload.push(a);
		cPage.exe();
	};
    cPage.apikey=function(key){};
	cPage._loadScript = [];
	cPage.loadScript = function(){
		var da 			= Array.prototype.slice.call(arguments);
		var link		= da.shift();
		var name		= da.shift();
		if( name && typeof cPage[name] !="undefined" ){
			cPage.exe();
		}else if(!cPage._loadScript[link]){
			cPage._loadScript[link]=true;
			$.cachedScript( link ).done(function(){
				cPage.exe();
			});
		}	
	};
	cPage.exe=function(){
		var da = null, _noload = [], f;
		while(  da = noload.shift() ){
			da = Array.prototype.slice.call(da);
			f = da.shift();
			if( typeof cPage[f] != 'undefined' ){
				
				cPage[f].apply(this, da);
			}else{
			
				da.unshift(f);
				_noload.push(da);
			}
			
		}
		noload = _noload;
	};
	var da = null;
	while(  da = cPage.q.shift() ) {
		noload.push(da);
	}
	cPage.load=true;
	cPage.exe();
	
	
})(window,document, jQuery || null);


var AnimateScrollMath = 'html:not(:animated),body:not(:animated)' ;
var _getUniId = _getUniId || 0;
var getUniqueId = function(){
  _getUniId++;
  var tn = new Date();
  return tn.getTime()+_getUniId;
}
var userSvg = function(f, k, l, e, m) {
 
    var useLink = {}, useLinkLocal = []
	$("use").each(function() {
		var use = $(this);
		var attr = use.attr("xlink:href").split("#");
		if( attr[0] ){
			if( !useLink[attr[0]])useLink[attr[0]] = [];
			useLink[attr[0]].push({"id":attr[1],'use':use});
		} 
	});
	for(var n in useLink){
		(function(link, data){
			
			$.ajax({
			  url: link,
			}).done(function( svg ) {
				svg = $(svg);
				for(var  m in data ){
					var obj = data[m];
					var sv = svg.find("#"+obj.id);
					var clone = sv.clone();
					//clone.clipPath() 
					clone.find("use").each(function() {
						var use = $(this);
						var attr = use.attr("xlink:href").split("#");
						var sv = svg.find("#"+attr[1]);
						
						use.replaceWith(sv);
						 
						
					});
					obj.use.replaceWith(clone);	
				}
				$("svg").attr({"xmlns:xlink":"http://www.w3.org/1999/xlink", xmlns:"http://www.w3.org/2000/svg", version:"1.1"});
			});
		})(n,useLink[n]);
	}
	$("svg").attr({"xmlns:xlink":"http://www.w3.org/1999/xlink", xmlns:"http://www.w3.org/2000/svg", version:"1.1"});
};


;(function($){
     $.fn.extend({
          styleSelect: function (options) {
               return this.each(function() {
				    var sel = $(this) ; var ofTime;
				   if ( sel[0].nodeName.toLowerCase() == 'select' && !sel.is(".style-select-hide")) {
					   
						sel.addClass("style-select-hide");
						var content = $("<span></span>");
						content.addClass("style-select");
						content.insertAfter(sel);
						var label = $("<span class=\"label\"></span>");
						content.append(label);
						var ulContent = $("<div></div>").addClass("sel-options-content");
						var ul = $("<ul></ul>");
						ulContent.append(ul);
						content.append(ulContent);
						ul.css("max-height",($(window).height()/3)*2);
						var pos = 0;
						var fnSelectChange = function(){
							$("li.sel", ul).removeClass("sel");
							$("li.sel-option", ul).removeClass("sel-option");
							var op = $("option:selected",sel);
							var li = $("li[value='"+op.val()+"']");
							li.addClass("sel-option");
							label.html(op.html());
							if( op.is(":disabled")){
								li.addClass("disabled");
								li.append('<i class="icon-lock"></i>');
							}
						}
						sel.off("change.ssel").on("change.ssel",fnSelectChange);
						var findAttr = sel.attr("data-find");
						if( findAttr ){
							var inputContent = $("<div></div>").addClass("box-find");	
							var inputFind = $("<input />").attr("type","text");	
							inputContent.append(inputFind);
							ulContent.prepend(inputContent);
							var part = findAttr.split("|");
							inputFind.on('keydown',function(){
								var expe = new RegExp(inputFind.val(), "i"),exist;
								for( var n in myList ){
									var obj = myList[n];
									exist = false;
									for( var p in part ){
										var re = obj[part[p]];
										if( re ){
											if( re.search(expe)!= -1 ){
												exist=true;	
											}
										}
									}
									if( exist ){
										obj.li.show();	
									}else{
										obj.li.hide();		
									}
										
								}
								
								
							});
						}
						var myList = []; 
						var addOrReset = function(){
							ul.html(""); myList = [];
							$("option",sel).each(function() {
								var op = $(this);
								var li = $("<li></li>");
								li.attr("value",op.val()).html(op.html());
								var fn = function(){
									$("li.sel", ul).removeClass("sel");
									li.addClass("sel");
								}
								var fnselect = function(forsesel){
									op.prop({"selected":true});
									if(forsesel){
										content.removeClass("open-sel");
									}
								}
								li.off("click.sle").on("click.sle",function(e){
									if(!li.is(".disabled")){
										fnselect();
										sel.trigger("change");
									}
								});
								li.off("mouseover.sle").on("mouseover.sle",function(){
									fn();
								});
								li.data("select",fn);
								li.data("selected",fnselect);
								ul.append(li);
								myList.push({
									li:li,
									value:op.val(),
									label:op.html()
								})
							});
						};
						label.off("click.opensel").on("click.opensel",function(e){ 
							if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android|Mobile)/)) {
							  sel.trigger("focus"); return ;
							}
							e.preventDefault();
							$("body").off("click.opensel");
							if( content.is(".open-sel") ){
								$(".open-sel").removeClass("open-sel");
							}else{
								//sel.focus();
								addOrReset();
								$(".open-sel").not(content).removeClass("open-sel");
								content.addClass("open-sel");
								if(ofTime)clearTimeout(ofTime);
								ofTime = setTimeout(function(){
									$("body").off("click.opensel").on("click.opensel",function(e){
										if($(e.target).parents(".box-find").length){
											
										}else{
											$("body").off("click.opensel");
											$(".open-sel").removeClass("open-sel");
										}
									});
								},100);
							}
						});
						addOrReset();
						var moveUpDown = function(p,e){
							if( content.is(".open-sel") ){
								var lis = $("li", ul);
								pos+=p;
								if(pos<0)pos = lis.length-1;
								if(pos>=lis.length)pos = 0;
								lis.eq(pos).data(p==0?"selected":"select")(true);
								e.preventDefault();
							}
						}
						$(window).on('keydown', function (e) {
							if (e.keyCode === 38) // up
							moveUpDown(-1,e);
							else if (e.keyCode === 40) // down
							moveUpDown(1,e);
							else if (e.keyCode === 13) // down
							moveUpDown(0,e);
						});
						fnSelectChange();
					   
					   
				   }
                    return sel;
               });
          }
     });
})(jQuery);

addeventAjax("styleSelect",function(eve, obj){
	$("select",obj.html).not(".notStyleSelect").styleSelect();
});
addeventAjax("userSvg",function(eve, obj){
	
	$("svg.icon-svg[data-icon]").not("addsvg").each(function(){
		var el = $(this);
		
		var use = $("<use></use>").attr("xlink:href", scene._urlSvgBase+'#'+el.attr("data-icon") )
		el.append(use)
		el.addClass("addsvg");
		
	});
	userSvg(document, document.getElementsByTagName("use"), window.requestAnimationFrame || window.setTimeout, {},true);
});
var shareadd  = shareadd || function(){};
addeventAjax("SHARE_LINK",function(){  
	$('a.social-sharing').off('click.socialharing').on('click.socialharing', function(){
		var type = $(this).attr('data-type');
		var sharing_url = $(this).attr('data-href');
		var sharing_img = $(this).attr('data-img');
		var sharing_name = $(this).attr('data-name');
		var left = (win.width() - 600)/2;
		if( left < 0 ) left=0;
		if (type.length)
		{
			switch(type)
			{
				case 'twitter':
					window.open('https://twitter.com/intent/tweet?text=' + sharing_name + ' ' + encodeURIComponent(sharing_url), 'sharertwt', 'toolbar=0,status=0,width=640,height=445,left='+left);
					break;
				case 'facebook':
					window.open('https://www.facebook.com/sharer.php?u=' + sharing_url, 'sharer', 'toolbar=0,status=0,width=660,height=445,left='+left);
					break;
				case 'google-plus':
					window.open('https://plus.google.com/share?url=' + sharing_url, 'sharer', 'toolbar=0,status=0,width=660,height=545,left='+left);
					break;
				case 'pinterest':
					window.open('https://www.pinterest.com/pin/create/button/?media=' + sharing_img + '&url=' + sharing_url, 'sharerpinterest', 'toolbar=0,status=0,width=660,height=445,left='+left);
					break;
			}
		}
	});
});

cfx.inload=function(e){
	var s =null;
	while(  s = cfx._inload.shift() ){
		s(e);
	}
}
var _uniCID = _uniCID || 1;
function _uniID(ext){
	_uniCID++;
	return (ext?ext:'')+_uniCID	;
}

;(function($){
     $.fn.extend({
          childHeight: function (options) {
               return this.each(function() {
				   var con = $(this); 
				   var o = $.extend({
					  child:">*",
					  nameClass:"childHeight",
					  nameClassExt:"childH_",
					  idClass:_uniID()
				   }, options);
				   var idClass = o.idClass;
				   con.data("id-class",idClass);
				  
				   var idName = o.nameClassExt+idClass;
				   con.addClass(o.nameClass).addClass(idName);
				   var sty = $("#style_"+idName);
				   if(!sty.length ){
					   sty = $(document.createElement("style"));  
					   sty.attr("id","style_"+idName);
					   $("body").prepend(sty);
				   }
				   var st = " ."+o.nameClass+"."+idName+' '+o.child+'{height:{$h};}';
				   var childs = $(o.child,con);
				   var fn = function(){
					   sty.html(""); 
					   var h = 0;
					   childs.each(function() {
						    var t = $(this);
                        	if( h < t.height()) h = t.height();
                    	});
						var _st = st.replace('{$h}',h+'px');
						sty.html(_st);
				   }
				   win.resize(fn);
				   fn();
                   return con;
               });
          }
     });
})(jQuery);

addeventAjax("MENUFLOAT",function(eve, obj){
	$(".menuf",obj.html).each(function( ) {
        var menu = $(this);
		var div = $(">div",menu);
		var offsetTop=0;
		var outH = 0;
		var op = $.extend({noheight:false},menu.data("menuf-options"));
		var size =function(){
			offsetTop = menu.offset().top;
			div.width("");
			if(!op.noheight){
				menu.height("");
				outH = div.outerHeight(true);
				menu.height(outH);
			}
			div.width(menu.width());
		}
		var mtRef = null;
		var fn = function(){
			if(mtRef) clearTimeout(mtRef);
			mtRef = setTimeout(function(){
				size();
			},500);
			if( offsetTop < win.scrollTop() ){
				menu.addClass("fxm");
			}else{
				menu.removeClass("fxm");
				
			}
		}
		win.off("scroll.menufloat").on("scroll.menufloat",fn);
		win.off("resize.menufloat").on("resize.menufloat",size);
		size();fn();
    });	
	
	
});
function multiple(valor, multiple) {
	resto = valor % multiple;
	return (resto==0);
}
function inWinPage(href) {
	$("body").removeClass("win-show-load").addClass("win-show-preload");
	$.ajax({
		url: href,
		data: { "cfx-render":'ajax',"cfx-only":1,"cwin":1},
		dataType:'json'
	}).done(function( data ) {
		$("#win-sw").scrollTop(0);
		$("#win-sw .win-tx").html(data.content);
		cfx.inload();
		addeventAjax("ini", {
			html:$("#win-sw")	
		});	
		var addClass = $("#win-sw").attr("addClass");
		if( addClass ){
			$("#win-sw").removeClass(addClass);	
		}
		var classWin = $("#win-sw").find("[data-sw-class]").attr("data-sw-class");
		if( data.classWin ){
			$("#win-sw").addClass(data.classWin);
			$("#win-sw").attr("addClass",data.classWin);
		}
		if( classWin ){
			$("#win-sw").addClass(classWin);
			$("#win-sw").attr("addClass",classWin);	
		}
		$("body").addClass("win-show");
		$("body").addClass("win-show-anime");
		setTimeout(function(){
			$("body").removeClass("win-show-anime");
		},100);
		if(typeof cssExtendVerticalAjust != 'undefined'){
			cssExtendVerticalAjust();
			setTimeout(function(){
				cssExtendVerticalAjust();
			},100);
		}

	});

} 
addeventAjax("win-link",function(ev,obj){

	$("a[target='win-simple']").each(function( ) {
		var a = $(this);
		if(a.attr("href"))
		a.off("click.win").on("click.win",function(e){ e.preventDefault();
			inWinPage(a.attr("href"));
		});
	});
	$("#best-menu").find("a[href]").each(function(index, element) {
        var a = $(this);
		a.off("click.best-menu").on("click.best-menu",function(){
			$("body").toggleClass("openmenu");
		});
    });
	
});

addeventAjax("TABV4",function(ev,obg){
	$(".ctab2", obg.html).each(function( ) {
		var c = $(this); 
		var icion ='<span class="icon-svg"><svg preserveAspectRatio="xMaxYMax meet" viewBox="0 0 50 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="'+scene._urlSvgBase+'#svg_icon_300"/></svg></span>';
		if(c.data("TABV4"))return;c.data("TABV4",true);
		$("> div >.conte-text>.boxtext",c).each(function() {
           	var tab = $(this);
		    var bt = $(">div>h3",tab);
			//var cont = $(">div",tab);
			var div = $(">div",tab);
			//div.insertBefore(cont);
			tab.addClass("ctab_cc")
			//div.append(cont);
			bt.addClass("btctab");
			div.addClass("divctab");
			bt.insertBefore(div);
			bt.append(icion);
			if( !div.length ) return ;
			var fn_open = function(){
				tab.addClass("open");
				div.stop(true,true).slideDown("slow",function(){
					win.resize();	
				});	
			}
			var fn_close = function(ini){
				div.stop(true,true).slideUp(ini?0:"slow",function(){
					tab.removeClass("open");
					win.resize();
				});	
			}
			if(bt.is(".open_ini")){
				fn_open();
			}else{
				div.hide();
			}
			tab.data({tab_close:fn_close,tab_open:fn_open});
			var closeauto = tab.data("close-auto");
			bt.off("click.tab2").on("click.tab2",function(){
				if(tab.is(".open")){
					fn_close();	
				}else{
					if(closeauto){
						$(".ctab-content.open",c).not(tab).each(function() {
							var f = $(this).data("tab_close");
							if( f )f();
						});
					}
					fn_open();
				}
					
			});
			
        });
		
    });	
});


function anchorAnimate(url, event, call){
	var u = url.split("#");
	var header = $("header");
	var parent = $(AnimateScrollMath);
	if( typeof u[1] != "undefined" && u[1]){
		var has = decodeURI(u[1]);
		var an = $("a[name='"+has+"']");
		if( an.length ){
			var pa = an.data("parent-offset");
			if( pa )pa = an.parents(pa);
			var t = (pa?pa.offset().top:an.offset().top)-(header.outerHeight(true)-1);
			var tts = null;
			var top = parseInt(an.css("top"));
			if(!isNaN(top)){
				t+=top;
			}
			if( event ){
				if( event.preventDefault )
					event.preventDefault(); 
			}
			
			parent.stop(true,true).delay(10).animate({scrollTop:t},"pretty",'swing',function(){
				if(tts)clearTimeout(tts);
				tts = setTimeout(function(){
					if(call) call();
					var r = document.location.href.split("#");
					document.location.href = r[0]+"#"+has;
					parent.stop(true,true).animate({scrollTop:t},0);
					
					//$(window).trigger("hashchange");
				},10);
			});
			
		}else{
			if(call) call();	
		}
	}else{
		if(call) call();
	}	
}
var anchorInit= true;
$(window).on('scrolldelta.anchor', function (e) {
	anchorInit=false;
	$(this).off('scrolldelta.anchor');
});
$(window).on('scroll.anchor', function (e) {
	anchorInit=false;
	$(this).off('scroll.anchor');
});

$("body").on('click.anchor', function (e) {
	anchorInit=false;
	$(this).off('click.anchor');
});

addeventAjax("ANCLA",function(eve, obj){
	
	
	setTimeout(function(){
		if( anchorInit ){
			var u = document.location.href.split("#");
			var has = decodeURI(u[1]);
			var an = $("a[name='"+has+"']");
			if( an.length ){
				anchorInit=false;
				anchorAnimate(document.location.href);
			}
		}
	},100);
		
	
	$("a[href*='#']",obj.html).each(function() {
		var bt = $(this);
		bt.off("click.anchor").on("click.anchor",function(e){
			anchorAnimate(bt.attr("href"), e);
		});
		var u = bt.attr("href").split("#");
		bt.attr("data-url-fragment",u[1]);
	});
	$(window).off('load.anchor').on('load.anchor', function (e) {
		anchorInit=false;
		anchorAnimate(document.location.href);
		$(window).off('load.anchor');
		
	});
	
	setTimeout(function(){
		anchorAnimate(document.location.href);
	},10);

});
function OrderForValueAprox(rank, name, value) {
	var res = [];
	for(var n in  rank){
		res.push( $.extend(true,{},rank[n]));	
	}
	return res.sort(function (a, b) {
		return Math.abs(a[name] - value) - Math.abs(b[name] - value)
	})
}
var fmsR;	
var calcWidth = {}
calcWidth.porcentWidthClass= function(el){
	var el = $(el);
	var finds = el.attr("data-calc-width").split("|");
	
	for(var n in finds){
		(function(f){
			
			var w = 0;
			var li = $(f,el);
			for(i=0; i<10; i++){
				el.removeClass("porCent_"+i);
				el.removeClass("porCentColOdd");
				el.removeClass("porCentColEven");
				li.removeClass("porCentRowOdd");	
				li.removeClass("porCentRowEven");			
			}
			var wp = el.width(); 
			
				var cso =0, row=0, crow=0
				li.each(function() {
					var e = $(this);
					if((e.width()+w ) > wp){
					}else{
						w+=e.width()	;
						cso++;
					}
				});
				li.each(function() {
					if(	crow>=cso ){
						crow=0;
						row++;
					}
					crow++;
					$(this).addClass(( row % 2  )?"porCentRowOdd":"porCentRowEven");		
				});
				el.addClass("porCent_"+cso);	
				el.addClass(( cso % 2  )?"porCentColOdd":"porCentColEven");	
			
			
		})(finds[n]);
	}	
}
calcWidth.widthDif= function(el){
		var el = $(el);
		var finds = el.attr("data-calc-width").split("|");
		for(var n in finds){
			(function(f){
				el.removeClass("cal-dif-max");
				var wTotal = 0;
				var li = $(f,el);
				if( li.length ){
					li.width(""); 
					li.each(function() {
						wTotal+=$(this).outerWidth(true);
					});
					var res = (el.width() - wTotal);
					if( res>0 ){
						var comp = Math.round(res/li.length)-1;
						li.each(function() {
						   var el = $(this);
						   var ow = el.width();
						   el.width(ow+comp);
						});
						
					}else{
						el.addClass("cal-dif-max");
					}
				}
			})(finds[n]);
		}
		
}

calcWidth.porcentWidthEq= function(el){
		var el = $(el);
		var finds = el.attr("data-calc-width").split("|");
		for(var n in finds){
			(function(f){

				var wTotal = 0;
				var li = $(f,el);
				li.width("");
				li.each(function() {
                    wTotal+=$(this).outerWidth(true);
                });
				
				li.each(function() {
				   var el = $(this);
                   var ow =el.width();
				   var res = (ow*100)/wTotal;
				   el.css("width",res+'%');
                });
			})(finds[n]);
		}
}
		
function areaResize(){
	
	$(".mod-smenu.lih").each(function() {
        var menu = $(this);
		var ul = $(">ul",menu);
		var li = $(">ul>li",menu);
		li.css({width:"","min-height":"","min-width":""});	
		var liw = li.width();
		
		var minW =parseFloat(li.css("min-width"));
		var minH =parseFloat(li.css("min-height"));
		var ch =  getSizeByFixedWidth(minW,minH, liw);
		li.height(ch);
    });
	$("*[data-area-t]").each(function() {
		if( parseInt( $(this).attr("data-area-t") )== 1 ){
			$(this).css({width:"","min-height":"","min-width":""});	
		}else{
			$(this).css({width:"",height:"","min-height":"","min-width":""});
		}
	})
	$("*[data-area-resize-v2]").each(function() {
        var c = $(this); c.removeClass("area-resize");
		var data = c.data("area-resize-v2");
		if( typeof data == "object"){
			for(var n in  data){
				if(!data[n].win_size)data[n].win_size=1;	
				if(!data[n].win_size)data[n].pocent_width=100;
				data[n].win_size = parseFloat(data[n].win_size);
			}
		}
		var winW =  win.width();
		var d = OrderForValueAprox(data,"win_size", winW);
		var indexajust = 0;
		if( d.length>1 ){
			if( d[0].win_size < winW && d[1].win_size > winW ){
				indexajust=1;	
			}
		}
		
		var o = $.extend({"pocent_width":100,"win_comp_w":0,"win_size":null,"parent_width":null,"width":null,"height":null,"max_width":null,"max_height":null,"min_width":null,"min_height":null, "child_min_h":null, "win_min_h":null, "win_auto":null, "comp_w":0, "comp_h":0,"parent":null,"child":null},d[indexajust]);
		if( c.is(".loadmasonry") ){
			c.attr("data-area-t",1).css({width:"","min-height":"","min-width":""});	
		}else{
			c.attr("data-area-t",2).css({width:"",height:"","min-height":"","min-width":""});
		}
		if( o.child ){ 
			c = $(o.child,c);
		}
		var parent = c.parent();
		if( o.parent ){ 
			parent = c.parents(o.parent);
		}
		
		
		
		var min_height = o.min_height,min_width = o.min_width,max_width=o.max_width,max_height=o.max_height;
		if( o.child_min_h ){
			if( !min_height || min_height< c[0].scrollHeight ){
				min_height = c[0].scrollHeight;	
				min_height+=parseFloat(c.css("padding-top"));
				min_height+=parseFloat(c.css("padding-bottom"));
			}
		}
		if( o.win_min_h ){
			min_height = win.height();
			if( min_height> 1400 )min_height=1400;
		}
		if( min_height ) c.css("min-height",min_height+'px');
		if( min_width ) c.css("min-width",min_width+'px');	
		if( max_height ) c.css("max-height",max_height+'px');
		if( max_width ) c.css("max-width",max_width+'px');
		
		var parentW = o.parent_width?o.parent_width:parent.innerWidth();
		if( o.win_auto){
			if(parentW>win.width())parentW=win.width();
		}	
		if(!o.parent_width){
			parentW-=parseFloat(parent.css("padding-left"));
			parentW-=parseFloat(parent.css("padding-right"));
		}
		if(  o.pocent_width){
			parentW = ((parentW * parseFloat(o.pocent_width) )/ 100);
		}
		if(  o.win_comp_w){
			parentW += parseFloat( o.win_comp_w);
		}
		parentW -= 1;
		
		var paddLeft=parseFloat(c.css("padding-left")),
			paddRight=parseFloat(c.css("padding-right")),
			paddTop=parseFloat(c.css("padding-top")),
			paddBottom=parseFloat(c.css("padding-bottom"));
			
			
			c.attr("parentW",parentW)
		if( o.width && o.height ){
			
			var ch =  getSizeByFixedWidth(o.width,o.height, parentW);
			if( min_height && ch<min_height) ch = min_height;
			if( o.max_height && ch>o.max_height ) ch = o.max_height;
			
			var cw =  getSizeByFixedHeight(o.width,o.height, ch);
			 
			ch+= parseFloat(o.comp_h);
			cw+= parseFloat(o.comp_w);
		 
			ch = ch-paddTop-paddBottom;
		 	cw = cw-paddLeft-paddRight;
		
		
			c.width((cw)+'px');
			c.height((ch)+'px');
		}else if(o.pocent_width){
			parentW = parentW-paddLeft-paddRight;
			c.width(parseInt(parentW)+'px');
		}
		if(  min_height  ){
			if( c.height()< min_height){
				c.height((min_height)+'px');	
			}
		}
		
		c.addClass("area-resize");
		
		
	});
	
	
	$('[data-equally-height]').each(function() {
		var el = $(this);
		var finds = el.attr("data-equally-height").split("|");
		for(var n in finds){
			(function(f){
				var h = 0;
				var li = $(f,el);
				li.height("");
				li.each(function() {
					var e = $(this);
                    if(e.height()>h)h=e.height();
                })
				li.height(h);
			})(finds[n]);
		}
		
	});

	$('[data-calc-width]').each(function() {
		var el = $(this);
		var fn = el.attr("data-calc-fn");
		if( fn == "eq"){
			calcWidth.porcentWidthEq(this);	
		}else if(fn == "dif"){
			calcWidth.widthDif(this);
		}else{
			calcWidth.porcentWidthClass(this);
		}
		
		
	});
	
	$("*[data-vertical-align]").each(function() {
		var c = $(this);
		var op = c.data("vertical-align");
		try{
			if( typeof op !== "object" &&  op !==null){
				op=jQuery.parseJSON(op);
			}
		}catch(err) {
			console.log(err);
			return 
		}
		var parent, o = $.extend({"parent_level":1, "parent":null }, op );
		if( o.parent ){
			parent = $(o.parent);	
		}else{
			for(var i=0; i< o.parent_level; i++){
				if(!parent)parent = c.parent();
				else parent = parent.parent();
			}
		}
		var h = (parent.height()-c.height())/2;
		c.css("top",h);
	});
	
	if(fmsR)clearTimeout(fmsR);
	fmsR = setTimeout(function(){
		if( $.fn.masonry){
			$('.grid-auto>div.loadmasonry>.cmodule').addClass("ini-masonry")
			$('.grid-auto>div.loadmasonry').masonry('reloadItems');
			$('.grid-auto>div.loadmasonry').masonry('layout');
		}
	},100);
	
	$('.text-pos .boxtext').each(function() {
        var c = $(this);
	    var p = c.parent();
		var paddingTop=parseInt(p.css("padding-top"));
		var paddingBottom=parseInt(p.css("padding-bottom"));
		var marginTop=parseInt(c.css("margin-top"));
		var marginBottom=parseInt(c.css("margin-bottom"));
		var outerHeightC = c.outerHeight(true);
		var innerHeightP = p.innerHeight()-paddingTop-paddingBottom;
		var rest = (innerHeightP-outerHeightC)/2;
		
		
    });
}
var cftimew = {};
areaResize();
win.off("resize.areaResize").on("resize.areaResize",function(){
	areaResize();
});
win.off("load.areaResize").on("load.areaResize",function(){
	areaResize();
});
setTimeout(function(){
	areaResize();
},100);

if( $.fn.masonry){
	$('.grid-auto>div>.cmodule').addClass("ini-masonry")
	$('.grid-auto>div').addClass("loadmasonry").masonry({
	  itemSelector: '.ini-masonry',
	  columnWidth: 1
	});
}
var cmenusGlobalList=[];
addeventAjax("CFXSMENU",function(eve,obj){
	
	
	
	$("nav.menu-smo",obj.html).not(".mod-smenu-load-smo").each(function() {
		var c = $(this); c.addClass("mod-smenu-load-smo");
		var ul = $(">ul",c);
		var nul = $("<ul></ul>");
		var nli = $("<li></li>");
		var nbt = $('<a><svg  preserveaspectratio="xMaxYMax meet" version="1.1"  xmlns="http://www.w3.org/2000/svg"  xmlns:xlink="http://www.w3.org/1999/xlink"  ><use xlink:href="'+scene._urlSvgBase+'#svg_icon_328"/></svg></a>');
		nbt.addClass("bt-menu-li");
		nul.addClass("nf");
		nli.addClass("nlf");
		
		c.append(nul);
		nli.append(nbt);
		nli.append(ul);
		nul.append(nli);
	})
	$("nav.cmenuv").not(".mod-smenu-no-auto").not(".mod-smenu-load").each(function() {
		
		var c = $(this); c.addClass("mod-smenu-load");
		
		
		var idClassMenu = 'cmenu-id-'+c.attr("id");
		
		var ahref = $("a[href]",c);
		ahref.off("click.smvsd").on("click.smvsd",function(){
			$("body").removeClass("open_menu idClassMenu");
		});
		var eventname ='cmenuv';
		$(document).off("click."+eventname).on("click."+eventname,function(event){
			var p = $(event.target).parents(".cmenuv");
			if(!p.length ){
				
				$("nav.cmenuv").not(p).each(function(){
					$(this).find(".sm-a-click").removeClass("sm-a-click");
				});
				//$("nav.cmenuv .sm-a-click").removeClass("sm-a-click");
				$("nav.cmenuv .sm-a-click-current").removeClass("sm-a-click-current");
			}
		});	
		
		$(".sm-li-pw, .sm-li-pw-eq, .sm-li-pw-dif",c).each(function(){
            var li = $(this);
			var ul = li.find(">ul");
			ul.attr("data-calc-width",">li");
			if( li.is(".eq") || li.is(".sm-li-pw-eq")){
				ul.attr("data-calc-fn","eq");
			}
			if( li.is(".dif") || li.is(".sm-li-pw-dif")){
				ul.attr("data-calc-fn","dif");
			}
		});
		var closd = []; var mstxn,trun
		$(".sm-tab",c).not(".sm-notedit").each(function() {
			var bt_click = $("<span></span>"); 
			var bt_hover = $("<span></span>"); 
			var li = $(this);
			var ul = li.find(">ul");
			var ulgruo = $("<div></div>").addClass("ul-grup");
			var ligruo = $("<div></div>").addClass("li-grup");
			ul.append(ligruo);
			ul.append(ulgruo); 
			ul.addClass("sm-ul-nouser");;
			li.off("mouseenter.smv1").on("mouseenter.smv1",function(){
				if(mstxn)clearTimeout(mstxn);
				
				ul.removeClass("sm-ul-nouser");
				ul.addClass("sm-ul-grup-hover");
			})
			li.off("mouseleave.smv1").on("mouseleave.smv1",function(){
				closd.push(function(){
					ligruo.find(".sm-li-hover").removeClass("sm-li-hover");
					ulgruo.find(".sm-li-hover").removeClass("sm-li-hover");
				});
				mstxn = setTimeout(function(){
					while(fn = closd.shift() ){
						fn()	
					}	
					ul.removeClass("sm-ul-grup-hover");
					ul.addClass("sm-ul-nouser");
				},500);
				
				
			});
			if( li.is(".sm-li-pw")  || li.is(".sm-li-pw-eq") || li.is(".sm-li-pw-dif") ){
				ul.removeAttr("data-calc-width");
				ul.removeAttr("data-calc-fn");
				ligruo.attr("data-calc-width",">li");
				if( li.is(".eq") || li.is(".sm-li-pw-eq")){
					ligruo.attr("data-calc-fn","eq");	
				}
				if( li.is(".dif") || li.is(".sm-li-pw-dif") ){
					ligruo.attr("data-calc-fn","dif");	
				}
				
			}
			$(">li",ul).not(".not-sm-tab").each(function(index, element) {
                var li = $(this);
				ligruo.append(li);
				var nul = li.find(">ul").addClass("sm-notedit");
				if( li.is(".current") ){
					nul.addClass("sm-ul-current");
				}
				li.off("click.smv1").on("click.smv1",function(){
					li.toggleClass("sm-li-show");
					if( li.is(".sm-li-show")){
						ligruo.find(".sm-li-show").not(li).removeClass("sm-li-show");
						ulgruo.find(".sm-li-show").removeClass("sm-li-show");
						nul.addClass("sm-li-show");
					}else{
						nul.removeClass("sm-li-show");	
					}
				});
				
				li.off("mouseenter.smv1").on("mouseenter.smv1",function(){
					li.toggleClass("sm-li-hover");
					if( li.is(".sm-li-hover")){
						ligruo.find(".sm-li-hover").not(li).removeClass("sm-li-hover");
						ulgruo.find(".sm-li-hover").removeClass("sm-li-hover");
						nul.addClass("sm-li-hover");
					}else{
						nul.removeClass("sm-li-hover");	
					}
				});
				li.off("mouseleave.smv1").on("mouseleave.smv1",function(){
					li.removeClass("sm-li-hover");
				});
				
				nul.off("mouseenter.smv1").on("mouseenter.smv1",function(){
					if(mstxn)clearTimeout(mstxn);
					nul.addClass("sm-li-hover");
				});
				
				
				if(!li.is(".not-sm-tab-sub")){
					ulgruo.append(nul);
				}else{
					li.append(nul);	
				}
				
			
            });
			
			
		});
		var fnChecCurrent = function(li){
			if( li.is(".sm-a-click-current")){
				li.parent().find(".sm-a-click-current").not(li).removeClass("sm-a-click-current");
			}
				
		}
		$(">ul ul",c).not(".sm-notedit").each(function() {
			var bt_click = $("<span></span>"); 
			var bt_hover = $("<span></span>"); 
			var ul = $(this);
			var li = ul.parent();
			var closeBt = $(">li.close", ul);
			if( li.is(".grup-hide"))return;
			var a = $(">a,>.ag",li);
			var na = $("<span></span>");
			na.insertAfter(a);
			na.append(a);
			na.addClass("sm-a");
			na.prepend(bt_click);
			bt_click.addClass("sm-bt");
			bt_hover.addClass("sm-bt-hover");
			bt_click.append(bt_hover);
			if(	!a.attr("href")){
				li.addClass("sm-href-empty"); 	
			}
			li.off("mouseenter.smv1").on("mouseenter.smv1",function(){
				li.addClass("sm-li-hover");
			});
			li.off("mouseleave.smv1").on("mouseleave.smv1",function(){
				li.removeClass("sm-li-hover");
			});
			bt_hover.off("mouseenter.smv1").on("mouseenter.smv1",function(){
				li.addClass("sm-a-hover");
			});
			bt_hover.off("mouseleave.smv1").on("mouseleave.smv1",function(){
				li.removeClass("sm-a-hover");
			});
			a.off("mouseenter.smv1").on("mouseenter.smv1",function(){
				li.addClass("sm-a-hover");
			});
			a.off("mouseleave.smv1").on("mouseleave.smv1",function(){
				li.removeClass("sm-a-hover");
			});
			
			bt_click.off("click.smv1").on("click.smv1",function(){
				li.toggleClass("sm-a-click");
				li.toggleClass("sm-a-click-current");
				fnChecCurrent(li);
				
			});
			a.off("click.smv1").on("click.smv1",function(){
				li.toggleClass("sm-a-click");
				li.toggleClass("sm-a-click-current");
				fnChecCurrent(li);
			});
			closeBt.off("click.smv1").on("click.smv1",function(){
				li.removeClass("sm-a-click");
			});
			
	
		});
	});
	$("nav.mod-smenu, .active-mod-smenu",obj.html).not(".cmenuv").not(".mod-smenu-no-auto").not(".mod-smenu-load").each(function() {
		var c = $(this); c.addClass("mod-smenu-load");
		if( c.is(".menu_prin"))
			c.css("max-height",win.height()-60);
		
		var current_show= c.is(".current-show");
		var ahref = $("a[href]",c);
		ahref.click(function(){
			$("body").removeClass("open_menu");
		});
		var noanime = c.is(".sm-noanime");
		var ttm = null; 
		$(">ul ul",c).not(".sm-notedit").each(function() {
			
			var bt_click = $("<span></span>"); 
			var bt_hover = $("<span></span>"); 
			var ulHelp = $("<span></span>"); 
			var ul = $(this);
            var li = ul.parent();
			if( li.is(".grup-hide"))return;
			var a = $(">a,>.ag",li);
			var na = $("<span></span>");
			na.insertAfter(a);
			na.append(a);
			na.addClass("sm-a");
			ulHelp.insertBefore(ul);
			na.prepend(bt_click);
			
			ulHelp.addClass("sm-ul-h");
			bt_click.addClass("sm-bt");
			bt_hover.addClass("sm-bt-hover");
			bt_click.append(bt_hover);
			li.addClass("sm-load"); 
			if(	!a.attr("href")){
				li.addClass("sm-href-empty"); 	
			}
			var tmtime =null;
			var fnOpen = function(ini){
				if(ttm)clearTimeout(ttm);
				li.removeClass("sm-pev-del");
				li.addClass("sm-pev-open");
				if(noanime){
					var d = li.data("tmdelay");
					if( d ) clearTimeout(d);
					d = setTimeout(function(){
						li.removeClass("sm-pev-open");
						li.removeClass("sm-hide");
						li.addClass("sm-show");
					},ini?ini:400);
					li.data("tmdelay",d);
				}else
				ul.stop(true,true).slideDown((ini?ini:"slow"),function(){
					li.removeClass("sm-pev-open");
					li.addClass("sm-show");
				});		
			}
			var fnClose = function(ini, force, forceB){
				if(force && tmtime)clearTimeout(tmtime);
				li.removeClass("sm-pev-open");
				li.addClass("sm-pev-del");
				
				if(noanime){
					var d = li.data("tmdelay");
					if( d ) clearTimeout(d);
					d = setTimeout(function(){
						li.removeClass("sm-pev-del");
						li.removeClass("sm-show");
						li.addClass("sm-hide");
					},ini?ini:200);
					li.data("tmdelay",d);
				}else
				if( (bt_click.is(":visible") && (li.is(".sm-show") || force )) ||forceB ){
					ul.stop(true,true).slideUp((ini?ini:"slow"),function(){
						li.removeClass("sm-pev-del");
						li.removeClass("sm-show");
					});
				}
				
			}
			
			$(">li.sm-is-hover-active",li.parent()).not(li).mouseenter(function() {
				fnClose(200,true);
			});
			na.mouseenter(function(){
				li.addClass("sm-a-hover"); 
			});
			na.mouseleave(function(){
				li.removeClass("sm-a-hover"); 
			});
			li.data({"sm-open":fnOpen,"sm-close":fnClose});
			ul.addClass("sm-ul");
			li.addClass("sm-show");
			if( bt_hover.is(":visible") ){
				li.addClass("sm-is-hover-active");
			}
			bt_hover.mouseenter(function(){
				if(ul.is(":animated"))return;
				li.addClass("sm-hover"); 
				if(tmtime)clearTimeout(tmtime);
				fnOpen();
				$(">li",li.parent()).not(li).each(function() {
					var fc = $(this).data("sm-close");
					if(fc)fc(200,true);
				});
				
			});
			ul.mouseenter(function(){
				if(ul.is(":animated"))return;
				li.addClass("sm-hover"); 
				if(tmtime)clearTimeout(tmtime)
				fnOpen();
				
			});
			a.mouseenter(function(){ 
				if(ul.is(":animated"))return;
				if( bt_hover.is(":visible") ){
					li.addClass("sm-hover"); 
					if(tmtime)clearTimeout(tmtime)
					/*ul.stop(true,true).slideDown("slow",function(){
						li.addClass("sm-show");
					});*/
					fnOpen();
					$(">li",li.parent()).not(li).each(function() {
						var fc = $(this).data("sm-close");
						if(fc)fc(200,true);
					});
				}
			});
			if(!li.is(".grup-hide"))
			li.mouseleave(function(){
				if( ul.is(":animated") )return;
				if( li.is(".sm-hover") ){
					if(tmtime)clearTimeout(tmtime)
					tmtime = setTimeout(function(){
						if( li.is(".sm-hover") ){
							if( bt_click.is(":visible") && bt_hover.is(":visible") ){
							/*ul.stop(true,true).slideUp("slow",function(){
								li.removeClass("sm-show");
								li.removeClass("sm-hover");
							});*/
								fnClose();
							}
						}
					},600);	
				}
			});
			
			bt_click.click(function(){
				if( ul.is(":animated") )return;
				if(tmtime)clearTimeout(tmtime);
				if( li.is(".sm-show") ){
					fnClose();
				}else{
					fnOpen();
				}
			});
			if( !current_show  && ulHelp.is(":visible")){
				fnClose(1,true,true);
			}else{
				if(!$("a.current",ul ).length && ulHelp.is(":visible") ){
					fnClose(1,true,true);	
				}else{
					fnOpen(1);	
				}
			}
        });
		
		c.mouseleave(function() {  
			if(ttm)clearTimeout(ttm);
			ttm = setTimeout(function(){
				$(">ul>li.sm-is-hover-active",c).each(function() {
				 
					  var fc = $(this).data("sm-close");
					  if(fc)fc(400,true);
					
				});
			},1000);
		 });
		 c.mouseenter(function(){
			 if(ttm)clearTimeout(ttm);
		 })
	});
});
cfx.addeventAjax = addeventAjax;
cfx.pageAddAja=true;

function removeMenuClassBody(ignore){
	var className = $("body").attr("class");
	var classNameFind  = className.match(/menu-(hover|click)\-([a-zA-Z0-9\_\-]+)/gi);
	if( classNameFind ){
		for(var n in classNameFind){
			if( classNameFind[n].replace(/menu-(hover|click)\-/gi,'') == ignore ){
				delete(classNameFind[n])	;
			}
		}
		classNameFind = classNameFind.join(" ",classNameFind);
		$("body").removeClass(classNameFind);
	}
}

$("body").off("click.mmu").on("click.mmu",function(e){
	var target = $(e.target);
	if( !target.is(".nmenu") && !target.parents(".nmenu").length){
		removeMenuClassBody();
	}
	
});
$(document).ready(function() {
	
	$("nav .nmenu").each(function() {
        var nmenu = $(this);
		var a = $(">a,>.ag",nmenu);
		var className = nmenu.attr("class");
		var classNameFind  = className.match(/mstyle\-([a-zA-Z0-9]+)/);
		if( classNameFind ){
			classNameFind  = classNameFind[0];
		}else{
			classNameFind  = "menu_big";	
		}
		var bt;
		if( a.attr("href") ){
			bt = $("<span></span>"); 
			var na = $("<span></span>").addClass("sm-a");
			na.insertAfter(a);
			na.append(a);
			na.prepend(bt);
			bt.addClass("sm-bt");	
		}else
			bt=a;
		
		$(">ul",nmenu).addClass("sm-notedit").each(function() {
            var ul = $(this);
			var sp = $("<span></span>").addClass("bo_menu_box");
			var sp2 = $("<span></span>");
			var btclose = $('<a class="close_menu"><span class="ciocn"><svg  xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet" ><use xlink:href="'+scene._urlSvgBase+'#svg_icon_'+scene.iconclose+'"></svg></span></a>');
		
			sp.append(btclose);
			sp.append(ul);
			sp2.addClass("bo_menu").append(sp);
			nmenu.append(sp2);
			var fnCheck = function(){
				if($("body").is(".menu-click-"+classNameFind)){
					nmenu.addClass("menu-current");	
				}else{
					nmenu.removeClass("menu-current");		
				}
			}
			btclose.on("click",function(){
				$("body").toggleClass("menu-click-"+classNameFind);
				fnCheck();	
			});
			bt.on("click",function(){
				$("body").toggleClass("menu-click-"+classNameFind);
				fnCheck();		
			});
			sp2.on("click",function(e){
				if(!$(e.target).parents(".bo_menu_box").length){
					$("body").removeClass("menu-click-"+classNameFind);
					fnCheck();	
				}
					
			});
			$("a[href]",nmenu).not(a).on("click",function(){
				removeMenuClassBody();
				fnCheck();	
			});
        });
		
    });
	$("#smenu-menu_prin").each(function() {
		var c = $(this);
        var fn = function(){
			var w = 0;
			$(">ul>li",c).each(function() {
                w+=$(this).outerWidth(true);
            });
			if( w > c.width() ){
				c.addClass("limitLi");	
			}else{
				c.removeClass("limitLi");		
			}
		}
		fn();
		win.resize(fn);
		
    });
	
	var mybody = $("body");
	cfx.inload();
 	addeventAjax("ini", {
		html:null	
	});	
	
	//$('.parallax-window').css("background-image","");
	//$('.parallax-window').parallax();
	
	$(".mpag_h2.style0").each(function(index, element) {
        var bt = $(this);
		var a = $("a", bt);
		var c = bt.next();
		var anc =bt.prev();
		c.slideUp(0);
		var fnScroll = function(){
			var hs =$("header");
			var top =( bt.offset().top)-hs.height()
			$(AnimateScrollMath).animate({scrollTop:top},"slow",function(){
				win.resize();
			});
		}
		var fn = function(){
			if( c.is(".tab_open") ){
				bt.removeClass("a_tab_open");
				c.removeClass("tab_open").stop(true).slideUp("slow");;
			}else{
				bt.addClass("a_tab_open");
				c.addClass("tab_open").stop(true).slideDown("slow");;	
			}
		}
		a.click(function(e){ e.preventDefault();
			fnScroll();
			fn();
		});
		var h = document.location.href.split("#");
	
		if( h[1] &&  h[1] == anc.attr("name") ){
			 
			bt.addClass("a_tab_open");
			c.addClass("tab_open").stop(true).slideDown("slow");;	
			fnScroll();
		} 
		if( anc.is(".current") ){
				anc.removeClass("current");
				fnScroll();
				bt.addClass("a_tab_open");
				c.addClass("tab_open").stop(true).slideDown("slow");
			}
			
		$("a[href$='#"+anc.attr("name")+"']").each(function(){ 
            var a = $(this);
			a.click(function(e){e.preventDefault();
				var li = $(".tab_open").not(c);
				var lia = $(".a_tab_open").not(bt);
				lia.removeClass("a_tab_open");
				li.removeClass("tab_open");
				if( li.length ){
					li.stop(true).slideUp("fast",function(){
						fnScroll();
						bt.addClass("a_tab_open");
						c.addClass("tab_open").stop(true).slideDown("slow");
						
					});
				}else{
					fnScroll();
					bt.addClass("a_tab_open");
					c.addClass("tab_open").stop(true).slideDown("slow");
				}
			});
		
			
			
			
        });
		
		
    });
	var  topmaneufiexd = $(".topmaneufiexd");
	var FloatMenu = function(){
		var op = topmaneufiexd.length?topmaneufiexd.offset().top:10;
		if(win.scrollTop()>op){
			mybody.addClass("floatMenu");
			mybody.removeClass("noFloatMenu");
		}else{
			mybody.removeClass("floatMenu");
			mybody.addClass("noFloatMenu");
		}	
	}
	win.scroll(FloatMenu);
	win.on("load",function(){
		FloatMenu();
		setTimeout(function(){
			FloatMenu()
		},100);
	});
	win.scrollTop(win.scrollTop()+1)
	
	
	var fnmenus = function(){
		setTimeout(function(){
		$("#smenu-ini").each(function() {
			 var ul = $(this);
			ul.css("max-height",win.height());
		});
		},100);
	}
	setTimeout(function(){
	fnmenus();
	},100);
	win.resize(fnmenus);
	
	
	$("#menu_mobi #bt-mobi a").each(function() {
		var bt = $(this);
		bt.click(function(){
			if(mybody.is(".open_menu")){
				mybody.removeClass("open_menu");
			}else{
				mybody.addClass("open_menu");
				fnmenus();
			}
		});
        
    });
	
	$("#menu_prin a").each(function() {
		var bt = $(this);
		bt.click(function(){
			mybody.removeClass("open_menu");
		});
        
    });
	var body_content = $("#body-content");
	var header = $("header").last();
	
	$(".menu_prin").each(function() {
        var c = $(this);
		var fn_op = function(){
			if($("ul.n2:visible",c).length){
				mybody.addClass("open_menu");
			}else{
				mybody.removeClass("open_menu");	
			}
		}
		$("ul.n2",c).each(function() {
            var ul = $(this);
			var prev = ul.prev();
			var close = function(ini){
				ul.slideUp(ini?0:'fast',function(){fn_op()});	
			}
			var open = function(ini){
				
				if(!ini){
					$("ul.n2:visible",c).not(ul).slideUp("fast");	
				}
				mybody.addClass("open_menu");
				ul.slideDown(ini?0:'slow',function(){fn_op()});	
				var h = win.height()-header.outerHeight(true);
				if( h > 1200)h=1200;
				ul.css("max-height",h+'px');
			}
			prev.click(function(){
				if( ul.is(":visible") ){
					close();	
				}else{
					open();
				}
			});
			close(true);
        });
    });
	
	
	
	$(".nextAniPage").click(function(){
		
		$(AnimateScrollMath).animate({scrollTop:body_content.offset().top-header.height() },"slow");	
	});
	
	
	if (top.location != self.location) { 
		//var m = top.location.href ;
		try{
			if(!top.location.href){
				//top.location = self.location;
			}
		}catch(e){
			
		}
		
		
		//window.location.href = $("base").attr("href");
		 
	
	}
	//DEBUG
	/*var db = $("<div></div>");
	db.appendTo("body");
	db.addClass("bodypagdebug");
	
	var sd = function (){
		var t = win.width()+'x'+win.height()
		db.html(t).attr({title:t});
	}
	sd(); win.resize(sd);*/
	
	$(".animetxt div.mod-texthtml .dboxtext >* ").addClass("sc_ani");;
	
	
	var fnscroll = [];
 
	/*var fnclosewinintro = function(){
		$(".win-intro").fadeOut("slow",function(){
			mybody.removeClass("winintoload");
		});
	}
	$(".win-intro").each(function(index, element) {
		var bt = $(this);
        mybody.addClass("winintoload");
		bt.click(function(){
			fnclosewinintro()
		});
    });
	setTimeout(function(){
		fnclosewinintro();
	},4000);
	
	mybody.click(function(e){
		if(!$(e.target).parents(".mt2").length){
			$(".open-menu-mt2").removeClass("open-menu-mt2");
		}
	});
	
	var fnupdatepos = function(){};
	mybody.addClass("pageready");
	var fnPageLoad = function(){
		setTimeout(function(){
			if(!mybody.is(".winintoload") ){
				fnupdatepos();
				mybody.addClass("pageload");
			}else{
				fnPageLoad();	
			}
		},500);
	}
	fnPageLoad();
	*/
	
	$(".sc_ani,.sc_ani2,.sc_ani3,.sc_ani4,.in_show_page").each(function() {
		var ts = $(this);
		var point = ts.data("mipointer");
		if(!point){
			point = $("<point></point>").addClass("pointer");
			point.insertBefore(ts);
		}
		 ts.data("mipointer",point); 
	});
	mybody.addClass("pageload");
	if( !mybody.is(".module-body")){
		$(".module-grid-li").addClass("sc_ani");
		$("#smenu-box-img-desc ul").addClass("sc_ani");
		
		fnupdatepos = function(){
			$(".sc_ani,.sc_ani2,.sc_ani3,.sc_ani4,.in_show_page").each(function() {
				var ts = $(this);
				var point = ts.data("mipointer");
				if( point )
					ts.attr("offset-top",point.offset().top);
			});
		}
	}
	fnupdatepos();
	var pas = null;
	var fnsc=function(){
		if(pas) clearTimeout(pas);
		pas = setTimeout(function(){
			fnupdatepos();
		},500);
		var scrollTop = win.scrollTop();
		var w = win.height();
		if( w > 1400)w =1400;
		var w3  = w / 3;
		var w4  = w / 4;
		var w2  = w / 2;
		var w5  = w / 5;
		var fn;
		$(".sc_ani, .sc_ani2, .sc_ani3").each(function() {
        	var ts = $(this);
			var to = parseInt( ts.attr("offset-top"));
			var tw = 0;
			if( ts.is(".sc_ani")){
				tw = w5;
			}else if( ts.is(".sc_ani2")){
				tw = w5*2;
			}else if( ts.is(".sc_ani3")){
				tw = w5*3;
			}
			if( ((to-(w-tw)) - scrollTop) < 0  && ( (to + ts.height()) - scrollTop)>0){
				fn = ts.data("sc_fn_show");
				if(typeof fn == "function")fn();
				ts.addClass("sc_show");	
				ts.removeClass("sc_hide");	
				
			}else{
					fn = ts.data("sc_fn_hide");
				
	
				if( ts.is(".go") ){
					if( ((to-(w)) - scrollTop) > 0 ){
						
					
						if(typeof fn == "function")fn();
						ts.addClass("sc_hide");
						ts.removeClass("sc_show");
					}
					
					
				}else{
					if(typeof fn == "function")fn();
					ts.addClass("sc_hide");
					ts.removeClass("sc_show");
					
				}
				
				
			}
			
			
    	});
		
		$(".in_show_page").each(function() {
            var ts = $(this);
			var to = parseInt( ts.attr("offset-top"));
			if( ((to-(w)) - scrollTop) < 0 && scrollTop<ts.height()  ){
				ts.addClass("showpage");	
				mybody.addClass("in_show_page_bk");	
			}else{
				ts.removeClass("showpage");	
				mybody.removeClass("in_show_page_bk");	
			}
        });
	}
	win.scroll(function(){
		fnsc();
	});
	var setsc_ani = null;
	var ajustRmeo = function(){
		$(".sc_ani").removeClass("sc_ani").addClass("sc_ani_tm");
		if(setsc_ani)clearTimeout(setsc_ani);
		setsc_ani = setTimeout(function(){
			$(".sc_ani_tm").addClass("sc_ani").removeClass("sc_ani_tm");
			fnupdatepos();
			fnsc();
		},500);	
	}
	win.resize(function(){
		ajustRmeo();
		fnsa();
		
	});
	ajustRmeo();
	win.on("load",function(){
		ajustRmeo();
		fnsa();
		setTimeout(function(){
			ajustRmeo();
			fnsa();
		},500);
	});
	
	var fnsa = function(){
		$(".sect.gallery.banner").each(function() {
            var gal= $(this);
			var tx = $("#idconten"); 
			$(".item",gal).css("min-height",tx.height());
        });
		$("#idconten>div").each(function() {
            var dv = $(this);
			var parent = dv.parent();
			dv.css("margin-top","");
			if( parent.height() > dv.height() ){
				var w =  (parent.height() - dv.height())/2;
				dv.css("margin-top",w+"px");
			}
			
        });
	}
	fnsa();
	
	$(".navigate-anchor nav").not(".no-animate").each(function(){
		$(this).addClass("animate-anchor");
	});
	$(".edit-page-zone").appendTo("body");
	var comhe = 0;
	var navul = $("nav.animate-anchor").not(".no-animate");
	var preparefnscroltachor = function(){
		navul.each(function(i) {
            var ul= $(this),cc={};
			var enob = navul.eq(i+1);
			if( !enob.length ){
				enob = $("footer");
			}else{
				enob = navul.eq(i+1).parent();	
			}
			var offsetTop = ul.parent().offset().top;
			
			var topEnd = enob.length?enob.offset().top:offsetTop;
			ul.attr("data-offset-top",offsetTop);
			ul.attr("data-offset-end",topEnd);
			ul.attr("data-offset-max",(topEnd-offsetTop)-ul.height());
		
        });
		comhe = $("header").outerHeight(true);
	}
	var stme = 0,stmeIndx = [],classFloatName='flo-show';
	var fnscroltachor = function(){
		if( !stme ){
			preparefnscroltachor();
			stme = setTimeout(function(){
				stme=0;
			},500);	
		}else{
			clearTimeout(stme);	
		}
		var scrolltop = win.scrollTop()-1;
		navul.each(function(i) {
            var ul= $(this),cc={},mtop=0;
			var sto = (scrolltop+comhe) - parseFloat(ul.attr("data-offset-top")) ;
			var stomax = parseFloat(ul.attr("data-offset-max")) ;
			if( sto > 0 ){
				if( sto>stomax ){
					mtop=stomax;
					ul.removeClass(classFloatName);
				}else{
					ul.addClass(classFloatName);
					mtop=sto;
				}
			}else{
				ul.addClass(classFloatName);
				mtop=0;
			}

			
			if (!navigator.userAgent.match(/(Android|iPod|iPhone|iPad)/) ) {
				cc["transform"]='translateY('+mtop+'px)';
				cc[prefix.css+"transform"]='translateY('+mtop+'px)';
				ul.css(cc);	
			}
			
		});
	}
	
	win.scroll(fnscroltachor);
	preparefnscroltachor();
	fnscroltachor();
	setTimeout(function(){
			preparefnscroltachor();
			fnscroltachor();
	},1000);	
	win.resize(function(){
		setTimeout(function(){
			preparefnscroltachor();
			fnscroltachor();
			setTimeout(function(){
				preparefnscroltachor();
				fnscroltachor();
			},1000);	
		},100);	
	});
	
	
});	



setTimeout(function(){
	$("body").addClass("page-deady");
},10);


var _anchorCurrent,_anchorName;
var originalTitle = document.title;

function anchorCurrent(){
	var scrolTop = win.scrollTop();
	var nav = $("header");
	var list = $(".ancla");
	list.each(function(i){
		var  sb = $(this); 
		var name = sb.attr("name");
		var res = scrolTop- (sb.offset().top-(nav.height())+5);
		var next = list.eq(i+1);
		var dis = 50;
		if( !next.length ){
			next=$("footer");
		}
		if( next.length ){
			 dis = next.offset().top - sb.offset().top;
		}
		
		if( res<dis && res>-50 && _anchorName != name ){
			_anchorCurrent = sb;
			_anchorName = name;
			
			var s = $("[data-url-fragment='"+_anchorName+"']");
		    $(".current-anchor").not(s).removeClass("current-anchor");
			s.addClass("current-anchor");
			var title = sb.attr("title");
			if( title ){
				document.title = originalTitle +' - '+title;
			}else{
				document.title = originalTitle;
			}
			
			
			return false;
		}else if(res < -50 && _anchorName == name){
			_anchorName =null;
			document.title = originalTitle;	
			$("[data-url-fragment='"+name+"']").removeClass("current-anchor");
			
		}
	});
}
anchorCurrent();
var _anchorCurrentTm;
win.on("scroll",function(){
	anchorCurrent();
	clearTimeout(_anchorCurrentTm)
	_anchorCurrentTm = setTimeout(function(){
		anchorCurrent();
	},500)
});
win.on("load",function(){
	_anchorCurrentTm = setTimeout(function(){
		anchorCurrent();
	},550);
	
});
function prevScroll(index, eve){
	if(eve)cfx.preventDefault(eve);
	var st = win.scrollTop();
	var nav = $("header");
	var offsetTopPrevn=[];
	$(".ancla").each(function(i){
		var  sb = $(this);
		offsetTopPrevn.push(sb.offset().top);	
	});
	var pos = 0;
	for(var n in offsetTopPrevn){
		if( offsetTopPrevn[n]< (st-nav.height())+5){
			pos = offsetTopPrevn[n];
			break;
		}
	}
	if( pos ){
		$(AnimateScrollMath).stop(true).animate({scrollTop:pos-nav.height() },"slow");	
	}else{
		$(AnimateScrollMath).stop(true).animate({scrollTop:st-win.height()},"slow");		
	}
}
function nextScroll(index, eve){
	if(eve)cfx.preventDefault(eve);
	var st = win.scrollTop();
	var nav = $("header");
	var offsetTopPrevn=[];
	$(".ancla").each(function(i){
		var  sb = $(this);
		offsetTopPrevn.push(sb.offset().top);	
	});
	var pos = 0;
	for(var n in offsetTopPrevn){
		if( offsetTopPrevn[n] > (st+nav.height())+5 ){
			pos = offsetTopPrevn[n];
			break;
		}
	}
	if( pos ){
		$(AnimateScrollMath).stop(true).animate({scrollTop:pos-nav.height() },"slow");	
	}else{
		$(AnimateScrollMath).stop(true).animate({scrollTop:st+win.height()},"slow");	
	}
	//if(!anime) $("html,body").stop(true).animate({scrollTop:st+win.height()},"slow");
	
}



scene.setFragment=function(json, noinload){
	if( json.fragment ){
		for( var n in json.fragment ){
			var obj = json.fragment[n];
			var d = $( "*[data-fragment='"+obj.name+"']" );
			var insert = d.attr("data-fragment-insert");
			if( insert == "remplace"){ 
				d.replaceWith(obj.html);
			}else{
				d.html(obj.html);
			}
			if( !noinload ){
				cfx.inload();
				addeventAjax("setFragment", {
					html:d	
				});
			}
			if(obj.name == 'cpage' ){
				$(AnimateScrollMath).animate({scrollTop:0},"slow");		
			}
			
			
		}
	}
};

scene.fullGallery=function(id, index, type){
	var url = scene.urlBase+'?scom=gallery&id_cat='+id;
	$.ajax({
		url: url,
		dataType:'json'
   }).done(function( data ) {
	   if( data.gal )
	   if( data.gal.list_arts ){
	   		scene.showFullGallery(data.gal.list_arts, index, type);
	   }
   });
}
scene.showFullGallery=function(li, idJump, type){
	
	var nf = $($("#full-gallery").html());
	nf.hide().addClass("fullgallery").addClass("galtype"+type).appendTo("body");
	nf.removeClass("preload");
	var galMin = $("#owl-ho",nf);
	var ww  = win.width();
	
	var fnParseBig = function(o){
		var firstThumb = o.thumb[o.firstThumb];
		var div = $("<div />").addClass("item  gallery-int");
		var img = $("<div />").addClass("item-img");
		
		var h = parseInt(firstThumb.width);
		for(var n in o.thumb ){
			var m = parseInt(o.thumb[n].width);
			if( ww <  m  &&  h > m ){
				h = n;	
			}
		}
		var obj = o.thumb[h];
		div.append(img);
		img.css("background-image","url("+obj.src+")");
		
		div.attr({"data-w":obj.width,"data-h":obj.height});
		if( o.title_html){
			var title = $("<div />").addClass("item-title");
			title.append(o.title_html);
			div.append(title);
		}
	
		
		return div;
	}
	
	var fnParseNavi = function(i){
		var miObj = li[i];
		var t =  miObj.thumb[miObj.lastThumb];
		var div = $("<div />");
		div.addClass("nav")
		.css("background-image","url("+t.src+")") 
		var divC = $("<div />");
		divC.addClass("sloaidng-small");
		divC.append(div);
	
		return divC;
	}
	var loadBG =[];
	var fn_ajust = function(){ 
		var div = $(".item", nf);
		div.height(nf.height()-60);
		if( type==1 ){
			
			var pdtop = parseInt(div.css("padding-top"));
			var pdbottom = parseInt(div.css("padding-bottom"));
			var h = nf.height()-pdtop-pdbottom;
			var ow = parseInt(div.attr("data-w"));
			var oh = parseInt(div.attr("data-h"));
			var w = getSizeByFixedHeight(ow,oh,h);
			div.height(h).width(w);	
		}
	}
	galMin.owlCarousel({ 
			ApiVersion: 2,
			navigation : true, 
			navigationText:[$("#gal-prev").html(), $("#gal-next").html()],
			autoPlay : true,
			stopOnHover : true,
			paginationCallback : fnParseNavi,
			items:1,
			jsonParseItem :fnParseBig,
			temsDesktop : false,
			itemsDesktopSmall : false,
			itemsTablet : false,
			itemsTabletSmall : false,
			itemsMobile : false,
			singleItem:true,
			jsonContent: li,
			afterMove:function(a,e,b,c){
				scrollNav();
			}
	
	}); 
	var scrollNav=function(){
		$(".owl-page.active").each(function() {
			var bt = $(this);
			var pa = bt.parent()
			var sc = bt.offset().left+pa.scrollLeft();
			sc=sc-(win.width()/2);
			if(sc<0)sc=0;
			pa.stop().animate({scrollLeft:sc},"slow");
		});
	}
	var gl = galMin.data("owlCarousel");
	if( idJump )
		gl.jumpTo(idJump); 
	scrollNav();
	var f = $(gl.getItem(idJump)).find(">div").data("load");
	if( f )f();
	fn_ajust();
	var mtss = null;
	win.off("resize.fullgallery").on("resize.fullgallery",function(){
		if(mtss) clearTimeout(mtss);
		mtss = setTimeout(function(){
			fn_ajust();	
		},200)
		fn_ajust();
	});
	var coselGal=function(){
		nf.fadeOut("slow",function(){
			$("body").removeClass("open_win");
			nf.html("").remove();	
		});	
	}
	$(".close", nf).click(function(){
		coselGal();
	});
	$("body").addClass("open_win");
	nf.fadeIn("fast",function(){
		fn_ajust();	
	});
	
	
	
	
	$('[data-calc-width]').each(function() {
		var el = $(this);
		var fn = el.attr("data-calc-fn");
		if( fn == "eq"){
			calcWidth.porcentWidthEq(this);	
		}else if(fn == "dif"){
			calcWidth.widthDif(this);
		}else{
			calcWidth.porcentWidthClass(this);
		}
		
		
	});

}
scene.submitForm = function(form,eve){
	cfx.preventDefault(eve);
	$(form).each(function() {
		var form = $(this);
		console.log(form);
		form.addInput({"cfx-only":1, "cfx-render":"ajax"});
		scene.formUpload(form, function(dat){
			scene.paserMsnJson(dat);
			if( typeof dat == "object" ){
				if( dat.success && dat.urlBase ){
					cajaxhistory(dat.urlBase);
				}
			}
			if( dat.inputRequired) {
				scene.inputRequired(dat.inputRequired,form);
			}
			cfx.sloading(false);
		});
		cfx.sloading(true);
		setTimeout(function(){
			form.removeClass("sending");
		},1500);
	});

}
