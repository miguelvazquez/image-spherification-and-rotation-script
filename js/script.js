$(document).ready(function(){
	var isEditor = $("body").is(".body-editor");
   var logoini =  $("#logoini");
   var logoiniIcon = $("#logoini #logosd");
   var header = $("header");
   var Menutino = $("#Menutino");
   var win =  $(window);
   var h = win.height();
 var _iniBoxINI = false;
   var re = function(){
		h = win.height();
		/*logoiniIcon.css({"margin-top":"","margin-bottom":""});
	   if( h > (logoini.height()+Menutino.height())){
		   var res =  (h -(logoini.height()+Menutino.height()+header.height()))/2;
		   
		    if( win.width()>890){
		   		logoiniIcon.css({"margin-top":res+"px","margin-bottom":res+"px"});
			}
	   } 
	   */
	   logoini.css({"margin-top":""});
	   var Introgrid =  $("#Introgrid>div");
	   var Introgal =  $("#Introgal");
	   $("#Introgal .owl-item .item").each(function(){
			 $(this).addClass("notAjust").css("min-height","").css("height","");
		});  
	   
	   if( win.width()<900){
		
			$("#Introgal .owl-item .item").each(function(){
			
				var no = parseInt($("#body-content").css("margin-top")); 
				
				$(this).css("min-height",(logoini.outerHeight(true) )+"px");
				$(this).css("height",(logoini.outerHeight(true)+(header).outerHeight(true) )+"px");
			});
	   }else{
		   var w = win.height();
	   		$("#Introgal .owl-item .item").each(function(){
				$(this).css("height",w+"px");
			});
			
		   
	   }
	   var mih = $("#Introgal").outerHeight(true);
	   if( (logoini.find(">div").outerHeight(true) +  Menutino.outerHeight(true) )>mih ){
		   mih =(logoini.find(">div").outerHeight(true) +  Menutino.outerHeight(true) );
	   }
	   Introgrid.css({display:"block","min-height":mih+"px"});
	   var t = logoini.find(">div").outerHeight(true)+Menutino.outerHeight(true);
	   var c = 0;
	   if( t < Introgrid.height() ){
		   c = Introgrid.height() - t;
	   }
	   if( win.width()>=900){
		   logoini.css({"margin-top":(c/2)+"px"});
	   }
	   
	   
   }
   if(!isEditor){
   		re();
		win.resize(re);
	   	win.on("load",re);
	   setTimeout(function(){
		   re();
	   },100);
   }
	var _iniBox = false;
	var iniBox = function(){
		if(!_iniBox){
			_iniBox=true;
			Menutino.addClass("pload");
			 $("li",Menutino).each(function(index) {
				var li = $(this);
				var a = li.find("a");
				setTimeout(function(){
					li.addClass("pload");
					setTimeout(function(){
						a.addClass("hover");
						setTimeout(function(){
							a.removeClass("hover");
						},1000)
					},(500*index)+1000)
				},(300*index)+500)
			});
		}
	}
	var svg_370 = $("#logosd .svg_370"); 
	var svg_371 = $("#logosd .svg_371"); 
	var svg_372 = $("#logosd .lo3"); 
	 var line = $("<div />").addClass("line").prependTo("#logosd")
	var mt;
	var fnanime = function(ini){
		if(!$("#logosd #svg_icon_370").length){
			clearTimeout(mt);
			mt = setTimeout(function(){
				fnanime();
			},500);
			return ;
		}
		line.show().css({left:"50%",width:0}).fadeTo(0,0).animate({
			left:0,width:"100%"
	 	 },0,"linear",function(){
			
			  svg_372.fadeTo(0,0);
			 
			  svg_370.fadeTo(400,1,function(){
				   iniBox();
				  svg_371.fadeTo(400,1,function(){
					  svg_372.delay(500).fadeTo(400,1,function(){
						 
						
						  
					  })
				  })
			  });
			  
			  
		});
		
	}
	
	var  disp = function(x1, x2, p, ps){
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
	}
	
   
	if (!navigator.userAgent.match(/(Android|iPod|iPhone)/) ) {
	  svg_370.fadeTo(0,0); 
	  svg_371.fadeTo(0,0); 
	  svg_372.fadeTo(0,0); 
	  line.fadeTo(0,0);
	}else{
		Menutino.addClass("pload");	
		$("li",Menutino).addClass("pload");
	}
	 
	var svg_icon_370, svg_icon_371, svg_icon_372;
	var fnanimeIni = function(){
		if(!svg_370.length){
			return false;
		}
		
		var origenl = parseInt(svg_370.css("margin-left")); 
		var origent = parseInt(svg_370.css("margin-top")); 
		
		
		svg_370.css("margin-left",'50%'); 
		
		svg_370s = svg_370.find(">span").css('display','block');
		var a = svg_370.parent().css('display','block'); 
	
		var ol = (svg_370.parent().width()/2)-(svg_370.width()/2);
		var olt = (svg_370.parent().height()/2);
		var ils = (logoini.height()/2)-(svg_370.height()/2);
		var sml = false;
		if(win.width()<890){
			sml = true;	
		}
		
		svg_370.css("margin-left",ol+'px'); 
		//svg_370.css("margin-top",(sml?0:olt)+'px'); 
		a.css("margin-top",(ils)+'px');  
		svg_370s.css('-webkit-transform','scale('+0+','+0+') ');
		svg_370s.css('transform','scale('+0+','+0+') '); 
		svg_370s.css('display','block'); 
		svg_370s.css("-webkit-transform-origin","50% 50%");
		svg_370s.css("transform-origin","50% 50%");
		
		//svg_370s.css("margin-left",'-50%'); 
		
		setTimeout(function(){
			
			setTimeout(function(){
				fnanime(true);
			},1800);
			svg_370.fadeTo(1,1).animate({
				pas: 100
			},{
				step: function(now, tween) {
					if (tween.prop === "pas") {
						var sca = disp(0,(sml?2:3),tween.pos ).result;
						svg_370s.css('-webkit-transform','scale('+sca+','+sca+') ');
						svg_370s.css('transform','scale('+sca+','+sca+') ');  
					}
				},
				duration:1800,
				complete:function(){
					
					
					svg_370.delay(100).animate({
							"margin-left": origenl+'px',
							pas: 0
					},{
						step: function(now, tween) {
							
							if (tween.prop === "marginLeft") {
								svg_370.css("margin-left",tween.now+'px'); 
							}
							if (tween.prop === "pas") {
								
								var sca = disp((sml?2:3),1 ,tween.pos ).result;
								svg_370s.css('-webkit-transform','scale('+sca+','+sca+') ');
								svg_370s.css('transform','scale('+sca+','+sca+') '); 
								//sca = disp((sml?0:olt),origent,tween.pos ).result;
								//svg_370.css("margin-top",sca    +'px'); 
								sca = disp(ils,0,tween.pos ).result;
								a.css("margin-top",(sca)+'px');   
							}
						},
						duration:1000,
						complete:function(){
							
							svg_370s.css('-webkit-transform','');
							svg_370s.css('transform','');
							svg_370.css("margin-left",''); 
							svg_370.css("margin-top",''); 
							
							
								
						}
					})
						
				}
			})
		},100);
	}
	if (!navigator.userAgent.match(/(Android|iPod|iPhone)/) ) {
		setTimeout(function(){
			fnanimeIni();
			if(win.width()<890){
				iniBox();	
			}
		},100);
	}
	
	
	
	
	$(".bxim li.n0").each(function(){
		var li 		= $(this);
		var stTo 	= $("<span/>").addClass("tto");
		var stToM 	= $("<span/>").addClass("ttom");
		var ic 		= li.find("a>.icon-svg");
		var la 		= li.find("a>.lab");
		
		stTo.append(ic.clone()).append(la.clone());
		stToM.append(ic).append(la.removeClass("lab").addClass("mlab"));
		li.find("a").prepend(stTo);
		if(!li.find("a>.xhtml").length){
			li.find("a").append($("<span/>").addClass("xhtml"));
		}
		li.find("a>.xhtml").prepend(stToM);
		
		
	});
});

$("html.nojs").removeClass("nojs");