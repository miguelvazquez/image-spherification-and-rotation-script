$(document).ready(function(e) {
	var p = [];
	
	var myhead = $("#body-header");
	$("#root_menu").each(function(){
		var root = $(this);
		var menut1 = $("#smenu-st2");
		var clone = root.find(">ul>li").not(".discart-clone").clone().addClass("m_minbx");
		menut1.find(">ul").html(clone);
		
	});
	$(".txmes-pmap > div").css("margin-top",$("header").height());
});


cfx.addinload(function(){
	var AnimateScrollMath = 'html:not(:animated),body:not(:animated)' ;
	var win =  $(window);
	$(".nmenu.mstyle-11").each(function() {
        var menu = $(this);
		var ul = menu.find("ul").first();
		$(">li",ul).each(function(i) {
            var li=$(this), dccs={}, dela=0.2;
			dela=0.2+(i*(0.1));
			dccs[prefix.css+'transition-delay']=dela+'s';
			dccs['transition-delay']=dela+'s';
			li.css(dccs);
        });
		
    });
	
	
	$("#ini_show_page").each(function() {
		var el = $(this), h ,res ;
		var bg =  el.find(".mod-bg.imtop");
		var fnresize = function(){
			h = win.height();
			if( h > 1400){
				h = 1400;
			}else if( h<400) h=400;
			el.css("min-height",h+"px");	
			el.height("");
			
			el.find(">span").height(el.innerHeight());
			res = el.find(">span").height()-bg.height()-(20);
		}
		fnresize();
		win.resize(fnresize);
		var fnscroll = function(){
			var s = win.scrollTop();
			var c = res/2;
			if( s > c){
			   s =  c;
			}
			bg.css("margin-top",s+'px');
		}
		win.on("scroll",fnscroll);
		fnscroll()
		setTimeout(function(){
			win.trigger("resize");
		},100);
		
		
		win.scrollTop(0);
		$("#Menutino").each(function() {
			var ts = $(this);
			setTimeout(function(){
				if(win.scrollTop()<200){
					$(AnimateScrollMath).animate({scrollTop:300 },"slow");
				}		
			},100);
			
			
		});
	
	
		
	});
	$("#inibodyz").each(function() {
        var el = $(this), h ,res ;
		var bg =  el.find(".mod-bg.imtop");
		var fnresize = function(){
			h = win.height();
			if( h > 1400){
				h = 1400;
			}else if( h<400) h=400;
			el.css("min-height",h+"px");	
			el.height("");
			res = el.height()-bg.innerHeight();
		}
		fnresize();
		win.resize(fnresize);
		var fnscroll = function(){
			var s = win.scrollTop();
			var c = res/2;
			if( s > c){
			   s =  c;
			}
			bg.css("margin-top",s+'px');
		}
		win.on("scroll",fnscroll);
		fnscroll()
		
    });
	
	$("#smenu-box-img-desc").each(function() {
        var ts = $(this);
		setTimeout(function(){
			if(win.scrollTop()<200){
				$(AnimateScrollMath).animate({scrollTop:ts.height()},"slow");
			}		
		},500);
		
		
    });
	
	
	$(".sfrom").each(function() {
		var fm = $(this);
        $(".tx2",fm).each(function(index, element) {
		   var el = $(this);
		   var p = el.parent().parent();
		   var place = $("<span></span>").addClass("placeholderTx").html(el.attr("placeholder"));
		   el.attr("placeholder","");
		   el.parent().prepend( place)
		   p.addClass("cboxInput")
		   var fn = function(){
			  if( el.val() ){
				p.addClass("showinfo");	  
			  }else{
				p.removeClass("showinfo");
			  }
		   }
           el.change(function(){fn();});
		   el.on("keydown",fn);
		   el.on("keyup",fn);
		   el.on("focusin",function(){
			   p.addClass("isfocus");
		   });
		   el.on("focusout",function(){
			   p.removeClass("isfocus");
		   });
		   
		  fn()
        });
		$(".fil",fm).each(function(index, element) {
			 var bx = $("<span></span>").addClass("inputFileBox");
			 var el = $(this);
             var place = $("<label></label>").html(el.attr("placeholder"));
			 var dis = $("<span></span>");
			 place.append(dis);
			 el.parent().prepend( bx );
			 bx.append(place);
			 bx.append(el);
			 var id = el.attr("id");
			 if( !id ){
				id = getUniqueId();
				el.attr("id",id)	;
			 }
			 place.prop("for",id);
			 el.change(function(){
				dis.html(el.val());	 
			 })
			 
        });
		
    });
	
	
	
	$(".a_6,.a_5,.a_2,.a_4").each(function() {
        var dt = $(this);
		
		var  s = $("<span />").addClass("lab");
		s.append(dt.contents());
		dt.append(s);
		dt.prepend(s.find(".icon-svg"));
		
    });
	$("#grupodele").hide().each(function() {
		var cf = $(this);
        cf.find("a").each(function() {
            var a = $(this);
			a.click(function(e) { e.preventDefault();
 				
				
				var data = {"getData":encodeURI(a.attr("href"))}
				$.ajax({
				  url: scene.urlBase+'extern/gmapPoint.php',
				  cache: false,
				  data: data,
				  dataType:"json"
				}).done(function( dat ) {
					
					console.log(dat);
					
					
					
					
				 });
				
				
				
			});
			
		 
		 
		 
		 
			
        });
		
    });
	
	
	$("#botonfix").each(function() {
		
        var bt = $(this);
		var mt
		var fnclose = function(){
			bt.removeClass("msshow");
			clearTimeout(mt);
			mt = setTimeout(function(){
				fnope()
			},10000);	
		}
		var fnope = function(){
			bt.addClass("msshow");
			clearTimeout(mt);
			mt = setTimeout(function(){
				fnclose()
			},2000);	
		}
		mt = setTimeout(function(){
			fnope();
		},3000);	
		bt.on("mouseleave",function(){
			clearTimeout(mt);
		})
    });
	
	
	
	
	
	
	
	
	
});






cfx.addinload(function(){

	var bc = $("#body-content");
	var bh = $("header");
	var fnHead=function(){
		if(!$("html.is_root").length)
		bc.css("margin-top",(bh.height()-2)+'px');
	}			  
	fnHead();
	win.on("load",fnHead);
	win.on("resize",fnHead);
	
	bh.append($("#navigate"));
	
	
/*	$(".news-block1 ").each(function(){
		var el = $(this);
		el.find("h3").addClass("chif1");
		el.find(".intro-text").addClass("chif2");
		
	});;*/
	
	
	var fnm_minbx = function(){
		$(".m_minbx").each(function(){
			var el = $(this);
			if( el.position().left > (win.width()/2)){
			  	el.addClass("m_minbx_rr").removeClass("m_minbx_ll");
			   
			 }else{
				el.removeClass("m_minbx_rr").addClass("m_minbx_ll");		   
			 }
		});;
		
	}
	fnm_minbx();
	win.resize(fnm_minbx);
	setTimeout(function(){
		fnm_minbx();
	},100);
	
});
function edd(form, done, fnload){
	var id_name = "upload_iframe";
	var iframe = document.getElementById(id_name);
	if( !iframe ){
		var iframe = document.createElement("iframe");
		iframe.setAttribute("id", id_name);
		iframe.setAttribute("name", id_name);
		iframe.setAttribute("width", "0");
		iframe.setAttribute("height", "0");
		iframe.setAttribute("border", "0");
		iframe.setAttribute("style", "width: 0; height: 0; border: none;");
		var bod = document.getElementsByTagName('body')[0];
		bod.appendChild(iframe);
		window.frames[id_name].name = id_name;
	}
	var urlTaget = null;
	var iframeId = document.getElementById("upload_iframe");
	var eventHandler = function () {
		if (iframeId.detachEvent) iframeId.detachEvent("onload", eventHandler);
		else iframeId.removeEventListener("load", eventHandler, false);
		var doc = null;
		if (iframeId.document) {
			doc = iframeId.document;
		} else if (iframeId.contentWindow) {
			doc = iframeId.contentWindow.document;
		} else if (iframeId.contentDocument) {
			doc = iframeId.contentDocument;
		} 
		content = doc.body;
		
		var text =  content.innerText || content.textContent;
		if( text ){
			try {
				var json = jQuery.parseJSON(  text  );
			} catch (e) {
				console.log(urlTaget);
				console.error("JSON PARSER");
			  return;
			}
			if( done )done(json);
		}
		content.innerText='{"complete":"ok"}';
		content.textContent='{"complete":"ok"}';
		if ( fnload )fnload(false); 
		$(form).removeClass('sending');
	}
	$(form).attr({
		"target":"upload_iframe","method":"post","enctype":"multipart/form-data","encoding":"multipart/form-data"
	}).off("submit."+id_name).on("submit."+id_name, function(e){
		$(form).addClass('sending');
		urlTaget = $(this).attr("action");
		if ( fnload )fnload(true); 
		
		if (iframeId.addEventListener){
			iframeId.removeEventListener("load", eventHandler, false);
			iframeId.addEventListener("load", eventHandler, false);
		}else if (iframeId.attachEvent){
			iframeId.detachEvent("onload", eventHandler);
			iframeId.attachEvent("onload", eventHandler);	
		}
		
	});
	
	return form;	
}

scene.closeMsnDelayTime = 600;
scene.closeMsn=function(dv){
	dv = $(dv);
	dv.addClass("delete").removeClass("add-msn");
	setTimeout(function(){
		dv.remove();
	},scene.closeMsnDelayTime);
}
scene.checkMsnEmpty=function(ms){
	var empty = $.trim($(ms).html());
	var parent = ms.parents("#zone-msn-fix");
	if( empty ){
		ms.addClass("not-empty").removeClass("empty");	
		parent.addClass("not-empty").removeClass("empty");	
	}else{
		ms.addClass("empty").removeClass("not-empty");	
		parent.addClass("empty").removeClass("not-empty");		
	}
	return empty;
}
function addEventZoneMsn(zone){
	$(zone?zone:".zone-msn-dinamic").each(function(){
		var ms = $(this); var time;
		if( scene.checkMsnEmpty(ms) ){
			time=0;	
		}else{
			time=800;		
		}
		ms.stop().slideUp(time,function(){
			ms.children().addClass("prepare-add-msn");
			ms.stop().slideDown("fast",function(){
				ms.children().removeClass("prepare-add-msn");
				ms.children().addClass("add-msn");
				ms.find(".close-box-info").each(function() {
					var bt = $(this);
                    bt.off("click.close-msn").on("click.close-msn",function(){
						scene.closeMsn(bt.parents(".add-msn"));
					});
                });
			});
		});
	 });
	
}
function sendSimpleFormSendig(form,eve){
	var form = $(form);
	if( !form.attr("action") ){
		form.attr("action",$("link[rel='canonical']").attr("href")) ;
	}
	if(eve)cfx.preventDefault(eve); 
	$(form).each(function() {
		var form = $(this);
		form.addInput({"cfx-only":1, "cfx-render":"ajax"});
		form.attr("onsubmit",""); cfx.sloading(true);
		var nform = edd(form, function(dat){
			if( typeof dat == "object" ){
				if( dat.success && dat.urlBase ){
					cajaxhistory(dat.urlBase);
				}
				
				if( dat.msn ){
					var ms = $("#zone-msn");
					var time = $.trim(ms.html())?"fast":0;
					ms.slideUp(time,function(){
						ms.html(dat.msn);
						addEventZoneMsn(ms);
					});
				}
				if( dat.success ){
					form[0].reset();
				}
	
			}
			if( dat.inputRequired) {
				scene.inputRequired(dat.inputRequired,form);
			}
			cfx.sloading(false);
			$("#simple-loading").hide();
		});
		
		nform.trigger( "submit" );
		
		setTimeout(function(){
			form.removeClass("sending");
		},1500);
	});
	
}








function cssExtendVerticalAjust(){
	$(".min-vh, .min-vh-c1>*").each(function () {
		var c = $(this);
		var h = win.height();
		c.css("min-height",h+'px');
	});
	$(".max-vh, .max-vh-c1>*").each(function () {
		var c = $(this);
		var h = win.height();
		c.css("max-height",h+'px');
	});
	
	$(".add-vh, .add-vh-c1>*").each(function () {
		var c = $(this);
		var h = win.height();
		c.css("height",h+'px');
	});
	
	 $(".pull-down, .pull-down-c1>*, .pull-center, .pull-center-c1>*, .h-inherit, .h-inherit-c1>*").each(function () {
		  $(this).height("").css("margin-top", "");
	});
	 $(".uq-ch-he, .chin").each(function () {
		 var c = $(this);
		 for(var i=0; i<=5; i++){
			(function(index){
				var cs = ".chi"+index;
				var csf = ".chif"+index;
				var s = cs+','+csf;
				var h = 0;
				c.find(csf).css("height","")
				c.find(cs).css("min-height","")
				c.find(s).each(function(){
					var li = $(this);
					if( h < li.innerHeight()){
						h=li.innerHeight();
					}
				});
				c.find(cs).css("min-height",h+"px");
				c.find(csf).css("height",h+"px");
			})(i)
		 }
	 });
	 $(".pull-down, .pull-down-c1>*, .pull-center, .pull-center-c1>*, .h-inherit, .h-inherit-c1>*").each(function () {
		 var el = $(this),p,pt,pd,pl,pr;
		 if( el.is("script") )return;
		 p = el.parent();
		 pt = parseFloat(p.css("padding-top"));
		 pb = parseFloat(p.css("padding-bottom"));
		 pcp = p.css("position");
		 ecp = el.css("position");
		 el.height(""); el.css("margin-top", "");
		 
		 if(el.is(".h-inherit") ){
			 ch	= (p.height()-pt-pb)-el.height();
			 if(ch<el.height())ch=el.height();
			 el.height(ch);
		 }
		 if( p.is(".h-inherit-c1")){
			
			 el.height("");
			 ch	= (p.height()-pt-pb);
			 if(ch<el.outerHeight())ch=el.outerHeight();
			 el.height(ch);
			
		 }
		
		 if(el.is(".pull-down") || p.is(".pull-down-c1")){
			
			 ch	= (p.outerHeight()-pt-pb)-el.outerHeight(true);
			 if(ch<0)ch=0;
			 el.css("margin-top", ch+"px");
			
		 }
		 if(el.is(".pull-center") || p.is(".pull-center-c1")){
			 ch	= (p.outerHeight()-pt-pb)-el.outerHeight(true);
			 if(	 ch < 0)ch=0;
			 if( ch > 0)ch=ch/2;
				 el.css("margin-top", ch+"px");
			
		 }
		// el.css("position",ecp);
    })	
}


var doc = doc ||  $(document);
var win = win ||  $(window);
function ajustDocHeight() {
	if(!isBodyEditor){
		if( doc.docHeight != doc.height() ){
			cssExtendVerticalAjust();
			doc.docHeight = doc.height();
		}
		if(	requestAnimationFrame ){
			requestAnimationFrame( ajustDocHeight );
		}
	}
}

var isBodyEditor = $("body").is(".body-editor");
ajustDocHeight();
win.resize(function(){
	ajustDocHeight(true);
});
win.on("load",function(){
	ajustDocHeight(true);
	setTimeout(function(){
		ajustDocHeight(true);
	});
});

function openVideoYoutube(id){
	var url='https://www.youtube.com/embed/'+id+'?&autoplay=1&rel=0'
	var w = 500, h = 280; 
			var d = $("<div />");
			
			var bg = $('<a class="bt-swin-close"></a>');
			d.append(bg);
			d.append('<a class="bt-close"><i class="icon-close"></i></a>');
			var frame = $(document.createElement("iframe"));
			frame.attr({ width:"100%", height:280, frameborder:"0", webkitallowfullscreen:"webkitallowfullscreen", mozallowfullscreen:"mozallowfullscreen", allowfullscreen:"allowfullscreen"});
			frame.addClass("frame-video");
			var f = function(){
				
				var nh = getSizeByFixedWidth(w,h,frame.width());
				frame.height(nh);
				var sh= win.height()-40;
				if( sh > 1500)sh=1500;
				if( sh< nh ){
					var nw = getSizeByFixedHeight(w,h,sh); 
					frame.width(nw).height(sh);
				}
				frame.parent().width(frame.width()).height(frame.height());
			}
			frame.attr({src:url});
			d.addClass("center-body winvideo");
			d.append(frame);
	
			var ht ='<div class="vwin"><div class="vwinc"><div class="vwinctext"></div></div></div>';
			
			var winvideo= $('<div/>').addClass("win-vidoep").append(ht);
			winvideo.appendTo("body");
			winvideo.find(".vwinctext").append(d);;
			var closeWin = function(){
				winvideo.fadeOut("fast",function(){
					winvideo.remove();
				})
				
			}
			winvideo.on("click",function(){
				closeWin();
			})
			
			setTimeout(function(){ f();},10);
	
}