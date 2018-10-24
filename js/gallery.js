;(function($,$doc, $win ){
	
	var win = $($win);
	var doc = $($doc);
	var galleryData = $win.galleryData || [];
	var OrderForValueAprox = function (rank, name, value) {
		var res = [];
		for(var n in  rank){
			res.push( $.extend(true,{},rank[n]));	
		}
		return res.sort(function (a, b) {
			return Math.abs(a[name] - value) - Math.abs(b[name] - value)
		})
	}
	for(var n in  galleryData){
		
		(function(data){
			var galMin = $("#"+data.id);
			if(!galMin.length) return;
			var gal = {};
			if( data.img_tag ){
				galMin.addClass("gimg_tag");
			}
			gal.parserDafult = function(o){
				
				var div = $("<div/>").addClass("item im_"+o.id_img);
				
				if( data.img_tag ){
					div.append("<img class=\"gim\"/>");
					
				}else{
					div.css("background-position",o.position);
					if( data.bgsize )
						div.css("background-size",data.bgsize);	
				}
				
				if(o.redir){
					var a = $("<a class=\"alin\" href=\""+o.redir+"\"></a>");
					if(o.redir_target){
						a.attr("target",o.redir_target);
					}
					div.append(a);
				}
				if(o.intro_text)div.append("<div class=\"gal_text item-text\"><div><div>"+o.intro_text+"</div></div></div>");
				if(o.full_text)div.append("<div class=\"full_text item-text-full\"><div><div><div><div><div>"+o.full_text+"</div></div></div></div></div></div>");
				div.data("obj",o);
				
				$(".sc_ani_gal",div).addClass("animated");
				return div;
			}
			if( data.text_pag ){
				data.owlCarousel.paginationCallback = function(i,c, p, b){
					var s = $("<span></span>");
					setTimeout(function(){
						var o = $(b.$userItems[i]).data("obj");
						s.html(o.title);
					},5);
					p.addClass("page-title");
					return s;
					
				}
			}
			
			
			
			gal.ajustImagen = function(){
				galMin.find(".owl-item .item").each(function() {
					var div = $(this);
					var o = div.data("obj");
					var w = galMin.width();
					var h = galMin.height();
					var size = OrderForValueAprox(o.size, "width", w );
					var sizeFirst = size[0];
					var sizeNext = size[1];
					if( sizeNext ){
						if(sizeFirst.width < w && sizeNext.width > sizeFirst.width){
							sizeFirst = sizeNext;
						}
					}
					
					if( sizeFirst.height < h ){
						size = OrderForValueAprox(o.size, "height", h );
						sizeFirst = size[0];
						sizeNext = size[1];
						if( sizeNext ){
							if(sizeFirst.height < h && sizeNext.height > sizeFirst.height){
								sizeFirst = sizeNext;
							}
						}
					}
					
					$(".item-current .animated", galMin).addClass("go");					
					var src = o.srcWxH.replace(/\{wxh\}/, sizeFirst.width+'x'+sizeFirst.height);
					if( data.img_tag ){
						div.find("img.gim").attr({"src":src,"width":sizeFirst.width, height:sizeFirst.height });
					
					}else{
						div.css("background-image","url("+src+")");
					}
					
				});
			}
			
			gal.resize = function(){
				if( data.img_tag ){
					return;	
				}
				var item = $(".item",galMin);
				var wh = win.height(); var xh=0;
				if( wh > 1500) wh=1500;
				item.addClass("haju");
				if( data.hParent ){
					var n = galMin.parent().parent().height();
					item.height(n); 
					
					
				}else if( data.hContent ){
					item.removeClass("haju");
					item.addClass("hContent");
				}else if( data.w && data.h ){
					var frament_item = parseInt(data.frament_item);
					if( isNaN(frament_item) || frament_item<1 )frament_item=1;
					 
					var nh =  getSizeByFixedWidth(data.w,data.h,(item.parent().width()/frament_item));
						
					var min_height = parseInt(item.css("min-height"));
					if( min_height>0 && min_height >nh)
						nh = min_height;
					item.height(nh); 
					
				}else{
					item.height(wh); 
				}
				
				var hmt = 0;
				$(".item-text-full",galMin).each(function(index, element) {
					var ft = $(this);
					if( ft.css("position")=="absolute")
					$(".item-text-full>div>div>div>div>div",galMin).each(function() {
						var d = $(this);
						if( hmt<d.height()){
							hmt=d.height()	
						}
					});
				});
				
				if( hmt ){
					if(hmt>$(".item",galMin).height()){
						item.height(hmt)	;
					}; 
				}
				var dsc=  data.comp_height_del;
				if( dsc ){
					var dscw =  $(dsc);	
					if( dscw.length){
						var fw = 0;
						dscw.each(function(){
							fw+=$(this).outerHeight(true);
						});
						var nh = $(".item",galMin).height()-fw;
						var min_height = parseInt(item.css("min-height"));
						if( min_height>0 && min_height >nh)
							nh = min_height;
						
						
						item.height(nh);
					}
					
				}
			}
			
			if( data.jsonParseItem ){
				data.owlCarousel.jsonParseItem=gal[data.jsonParseItem];
			}
			data.owlCarousel.beforeMove = function(a,e){
				$(".go",galMin).removeClass("go");
				
			}
			data.owlCarousel.afterMove = function(a,e){
				
				var it = e.getItem(e.currentItem);
				$(".animated", it).addClass("go");
			}
			data.owlCarousel.afterInit = function(a,e){
				
				var it = e.getItem(e.currentItem);
				$(".animated", it).addClass("go");
			}
			
			galMin.owlCarousel(data.owlCarousel);
			galMin.find(".owl-item .item-text-full").each(function() {
				$(this).parent().parent().prepend($(this));
			});
			gal.resize();
			gal.ajustImagen();
			
			var stime;
			win.resize(function(){
				clearTimeout(stime);
				stime = setTimeout(function(){
					gal.resize();
					gal.ajustImagen()
					clearTimeout(stime);
					stime = setTimeout(function(){
						gal.resize();
						gal.ajustImagen();
					},500);
				},100);
			});
			stime = setTimeout(function(){
				gal.resize();
				gal.ajustImagen()
				clearTimeout(stime);
				stime = setTimeout(function(){
					gal.resize();
					gal.ajustImagen();
				},200);
			},50);
		})(galleryData[n]);	
	}
	
	
})(jQuery, document, window);