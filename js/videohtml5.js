;(function($,$doc, $win ){
	
	var win = $($win);
	var doc = $($doc);
	var videoHt = $win.videoHt || [];
	var OrderForValueAprox = function (rank, name, value) {
		var res = [];
		for(var n in  rank){
			res.push( $.extend(true,{},rank[n]));	
		}
		return res.sort(function (a, b) {
			return Math.abs(a[name] - value) - Math.abs(b[name] - value)
		})
	} 
	
	for(var n in  videoHt){
		
		(function(data){
			var div = $("#vhtml5"+data.id);
			if(!div.length) return;
			var gal = {};
			
			gal.video;
			gal.addVideo = function(){
				gal.video = $('<video></video>');
				div.append(gal.video);
				var vflos = OrderForValueAprox(data.video,"w",win.width());
				
				gal.video.attr({preload:"auto",controls:true});
				
				for (var n in vflos) {
					if (gal.video[0].canPlayType(vflos[n].mime)) {
						var source = gal.video.append("<source/>");
						source.attr({
							type: vflos[n].mime,
							src: vflos[n].u
						});
						if( data.img_prev ){
							
							var size = OrderForValueAprox(data.img_prev.size, "width", div.width());
							sizeFirst = size[0];
							var src = data.img_prev.srcWxH.replace(/\{wxh\}/, sizeFirst.width+'x'+sizeFirst.height);
							source.attr({poster:src});
							
								
						}
						break;
					}
				}
			}
			gal.addVideo();
		})(videoHt[n]);	
	}
	
})(jQuery, document, window);