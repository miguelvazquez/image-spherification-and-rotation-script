/*!{"i":" CFX Sistem | Scene v0.1s  | (c) 2005 - 2015  CFX ","api":"4.1","version":"1.0"}*/
var win = win || $(window);

scene._getUniId = scene._getUniId || 0;
scene.getUniqueId = function(){
	scene._getUniId++;
	var tn = new Date();
	return tn.getTime()+scene._getUniId;
}
scene.showSimpleWin = function(options){
	if(typeof options!="object"){
		options = {text:options};
	}
	var o = $.extend({title:null, text:"", addClass:null, complete:function(){} }, options);
	scene.getTemplate("tm-simple-window",function(w){
		w=$(w);
		w.addClass("simple_win load");
		if( o.addCass ){
			w.addClass(o.addCass);	
		}
		var pad = $(".pad",w);
		if(o.title){
			$(".zone-title",w).append(o.title);
		}
		$(".win-text",w).append(o.text);
		w.fadeTo(0,0);
		var _body = $("body");
		var ps = _body.width(); 
		
		_body.css({overflow:"hidden",position:"relative"});
		ps=_body.width() - ps;
		_body.append(w);
		
		_body.css({"margin-right":ps});
		
		w.removeClass("load").fadeTo("fast",1);
		pad.center({inside:w});
		var fn_close =  function(){
			w.fadeTo("fast",0,function(){
				w.remove();	
				
			});
			if(!$(".simple_win").not(w).length){
				_body.css({overflow:"","margin-right":"",position:""});
			}
		};
		$(".bt-close").click(function(){
			fn_close();	
		});
		$(".bt-swin-close").click(function(){
			fn_close();	
		});
		w.data("swin-close",fn_close);
		o.complete(w);
	});
		
}
function show_win(options){
	var o = $.extend({title:"",template:"template-simple-win", text:"",time:800, form:true, label_accept:"Aceptar", label_cancel:"Cancelar", form_type:"POST",  remove:false, addeventAjax:"show_win", id:null, addClass:null, complete:function(){}, close:function(){}, s:false }, options);
	if(o.remove){
		$("#"+o.id).each(function(){
			var fn_close=$(this).data("swin-close");
			if(fn_close)fn_close({event:"remove"});
		});
	}
	var sw = $(".simple-win");
	var div = null;
	if( o.id ){
		div = $("#"+o.id);
		if( div.length ){
			div.data("addZindex")();
			o.complete(div);
			return div;
		}
	}else{
		o.id='win-mi-'+new Date().getTime();	
	}
	$("html").addClass("open_swin");
	div = $( $("#"+(o.form?o.template:o.template+"-no-form")).html() ).addClass(o.addClass).attr({id:o.id});	
	
	
	div.fadeTo(0,0);
	var text = $(".win-text",div);
	text.hide();
	$(".win-title",div).html(o.title)
	var bt_accept  = $("[name=accept]", div);
	if(!o.label_accept)
		bt_accept.hide();
	bt_accept.val(o.label_accept);
	$("[name=cancel]",div).val(o.label_cancel);
	var zonetop = $(".zone-top",div);
	var zonecenter = $(".zone-center", div);
	var zonedown= $(".zone-down",div);
	 
	
	if( o.text )text.html(o.text); 
	else text.hide();
	div.fadeTo("fast",1,function(){
		text.show();
	});
	
	text.find("[tabindex=0]").each(function(){
		var tab = $(this);
		setTimeout(function(){ tab[0].focus();},100);	
	})
	var zindex=1000;
	if( sw.length ){
		sw.each(function(){ var w = $(this);
			var nzindex = parseInt( w.css("z-index") );
			if( zindex>nzindex )zindex=nzindex;
		});
	}
	zonetop.unbind("click").bind("click",function(){
		addZindex();	
	});
	var addZindex = function(){
		var z = 1001;
		$(".simple-win").not(div).each(function(){
			var zt = parseInt( $(this).css("z-index") );
			if( zt > z )  z = zt;
		});
		var oldzt = parseInt( div.css("z-index") );
		if( oldzt >= z) return;
		div.css({"z-index":z+1});	
	}
	var removeClassWin=function(){
		if(!$(".simple-win").not(div).length){
			$("html").removeClass("open_swin");
			
		};
	}
	addZindex();
	div.data("addZindex",function(){addZindex()});
	div.appendTo("body") ; 
	var close = function(options){ 
		div.addClass("remove-win");
		div.find("*").addClass("remove");
		var oc = $.extend({time:"fast", event:"close"}, options);
		if( oc.event=="remove"){
			div.remove(); 
			removeClassWin();
		}else{
			div.fadeTo(oc.time,0,function(){
				div.remove();
				removeClassWin();
			});
			zonecenter.slideUp("fast"); 
		}
		o.close(options);
	}
	$(".close-bg", div).click(function(){  
	});	
	var container = $('.container', div);
	$(".close-size", div).click(function(){
		container.toggle("fast",function(){
			
		});
		
	});	
	$(".close",div).click(function(){
		close();
	});	
	$(".winload", div).hide();
	var loading = function(){ 
		zonedown.slideUp("fast");
		$(".winload", div).slideDown("fast");		
	}
	var loadingClose = function(){ 
		zonedown.slideDown("fast");
		$(".winload",div ).slideUp("fast");		
	}
	div.data({
		"loading":function(show){
			show?loading():loadingClose();
		},
		"swin-setText":function(text){text.html(text)},
		"swin-close":function(op){close(op)},
		"swin-loading":loading,
		"swin-loading-close":loadingClose,
		"swin-ajust":function(){
			div.center();
			win.scrollTo(div)
			
		}
	})
	$("input[win]",div).val(o.id); 
	var zdown = $(".menu-button",div);
	addeventAjax(o.addeventAjax,{ html:div });
	cfx.inload();
	o.complete(div);
	
	var menuwin = $(".menu-win",div);
	menuwin.css("z-index",100);
	var fnS =function(){ 
		var scrolltop =  div.scrollTop()-25;
		var st = scrolltop;
		if( st > 0 ){
			menuwin.css({top:st});
		}else
			menuwin.css({top:0});
	}
	div.scroll(fnS);
	return div;
}

var _template_load = {};
var _template_load_tem = new Array();
function template(id, call, options, p){
	var o = $.extend({ com:"?com=", parseHtml:null}, options);
	var _id = id.split(":");
	var idTeme = "zone-template-"+_id[0];
	var templates = $(_id[0]=="body"? "body":"#"+idTeme);
	if( p > 2){
		alert("Error:"+scene._baseUrlAdmin+o.com+_id[0]);
	}else if( templates.length ){
		var teme = $("#"+_id[1], templates);
		if( !teme.length )alert("template: No exist: \n"+id);
		else{
			var html = teme.html();
			 if(typeof o.parseHtml=="function" )html=o.parseHtml(html);
			 call($(html));
		}
	}else{
		if( _template_load[_id[0]]) {
			p=(!p )?1:p+1;
			 _template_load_tem.push({id:id, call:call, options:options, p:p});
			 return ;
		}
		_template_load[_id[0]]=true;
		$.ajax({
				url: scene._baseUrlAdmin+o.com+_id[0],
				data: {fn:"template","cfx-render":"ajax", "cfx-only":1},
				dataType:'json'
		}).done(function( json ) {
			if( typeof json.html == "object" && json.html)json.html = json.html.join("");
			
			var div = $("<div></div>").attr({id:idTeme}).html( json.html );
			var z = $("#zone-templates");
			if( !z.length){
				z = $("<div></div>").hide().attr({id:"zone-templates"}).appendTo("body");	
			}
			z.append(div); 
			p=(!p )?1:p+1;
			template(id, call, options, p );
			var s = null;
			while( s = _template_load_tem.shift() ){  template(s.id, s.call, s.options, s.p );  }
		}).fail(function(jqXHR, textStatus) {
			alert( "Request failed: " + textStatus );
			console.log(jqXHR);
		});
	}
}
scene.inputCheckAll = function(el, parent){
	var t = $(el);
	var s = t.data("value");
	$(s, parent).prop({checked:t.is(":checked")});	
	
}
scene.getTemplate = function(id, call, options){
	var o = $.extend({ parseHtml:null}, options);	
	var teme = $("script#"+id);
	if( !teme.length )alert("template: No exist: \n"+id);
	else{
		var html = teme.html();
		if(typeof o.parseHtml=="function" )html=o.parseHtml(html);
		call(html);	
	}
}
scene.sendForm=function(form, event, href, param ){
	var form = $(form);
	if( event ){
		cfx.preventDefault(event);
	}
	scene.pageMsnClear();
	var o = $.extend(form.serializeObject(), param);
	$(form).addClass("sending");
	$("body").addClass("form-sending");
	scene.ajax((href?href:form.attr("action")),o,{form:form,type:form.attr("method"),
		done:function(){
			setTimeout(function(){
				$(form).removeClass("sending");
				$("body").removeClass("form-sending");
			},500);
		},
		success:function(json){
			scene.setPageCom(json);
		}
	});
}
scene.sendFormAll=function(form, event, href ){
	var form = $(form);
	if( event ){
		cfx.preventDefault(event);
	}
	scene.pageMsnClear();
	scene.ajax((href?href:form.attr("action")),form.serializeObject(),{form:form,type:form.attr("method"),success:function(json){
		
	}});
}
scene.serializeObjectEncrypt64 = function(form){
	var data = $(form).serializeObject();
	var encrypt64 = (data.encrypt64)?data.encrypt64.split(","):[];
	$("*[encrypt64]", form).each(function(){
		var name = $(this).attr("name"); 
		if(	data[name] ){
			data[name] = "encrypt64:"+cfx.Base64.encode( data[name] );
			encrypt64.push(name);
		}
	});
	data.encrypt64 = encrypt64.join(",");
	return data;
	
}
scene.checkboxAll = function(name, active){
	$("input[name='"+name+"']").prop("checked", active);
}
scene.AutoCheckboxAll = function(el, name){
	var el = $(el);
	var active = el.is(":checked");
	$(name).prop("checked", active);
}
scene.replaceVal = function(string, options, call){
	if(string && options){
		for(var n in options){
			if(typeof call == "function") options[n]=call(n,options[n]);
			var m = new RegExp('\{[\$]'+n+'\}',"gi");
			string = string.replace(m,options[n]);
		}
	}
	return string;
}
scene.selectOptionHide=function(select){
	var s = $(select);
	$("option", s).each(function(i){
		var sl = $(this).attr("data-value");
		if(sl)$(sl).hide();
	});
	var sl = s.find('option:selected').attr('data-value');
	if(sl)$(sl).show();
	
	var elhide = s.find('option:selected').attr('data-value-hide');
	if( elhide)$(elhide).hide();
	
	var show = s.find('option:selected').attr('data-value-show');
	if( show)$(show).show();
}
scene.selectCheckboxHide=function(input){
	var input = $(input);
	var form = input[0].form;
	$("[name="+input.attr("name")+"]").each(function(){
		var s = $(this);
		var sl = s.attr("data-value");
		if(sl)$(sl)[(s.is(":checked"))?"show":"hide"]();
		var sls = s.attr("data-value-show");
		if(sls)$(sls)[(s.is(":checked"))?"show":"hide"]();
		var slh = s.attr("data-value-hide");
		if(slh)$(slh)[(s.is(":checked"))?"hide":"show"]();
			
	});
} 
scene.stringFnParse = function(fn, arg){
	for (var d in fn ){
		var _done = fn[d];
		try{
			if( typeof _done == "function"){
				_done.apply(this, arg );	
			}else{
				var f = _done;
				if(typeof _done == "string"){
					f = _done.split(",");
				}
				if(typeof f == "object")
				for (var _f in f ){ f[_f] = eval(f[_f]);
					if( typeof f[_f] == "function")
						f[_f] .apply(this, arg );
				}
			} 
		}catch(e){
			console.log(e);
			console.log("fail:scene.stringFnParse",fn,arg)
		}
	}	
}
scene.fn=function(fn,param,event){  
	if(event)
	cfx.preventDefault(event);
	var datasParser = {};
	if( typeof param == "object"){
		for(var n in param)datasParser[n]=param[n];
	} 
	func(fn, datasParser);
}
scene.exec=function(fn, el, event, param){ 
	var paramName =( typeof param == "string")?param:"param";
	if( event )
		cfx.preventDefault(event);
	var datasParser = cfx.getParam(el,paramName);
	if( typeof param == "object"){
		for(var n in param)datasParser[n]=param[n];
	}
	datasParser.target = el;
	func(fn, datasParser);
}
scene.exe=function(fn){ 
	var f = getFunc(fn);
	if(!f) return ;
	var arg = [];
	for (var i = 1; i < arguments.length; i++) {
        arg.push(arguments[i]);
   	}
	f.apply(this, arg);
}
scene.setFragment=function(json){
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
			
		} 
		if( !json.noinload ){
			cfx.inload();
			addeventAjax("setFragment", {
				html:null	
			});
		}
	}
};
scene.getPageHref=function(href, param){ 
	scene.pageMsnClear();
	scene.sAjax(href,(param?param:{}),{ type:(param?"POST":"GET"),done:function(json){
		scene.setPageCom(json);
	}});
}
scene.getPage=function(el, event, href, param){
	if( event )
		cfx.preventDefault(event);
	if( !href ){
		var href = el.getAttribute("href");	
	}
	if(!href){
		alert("no attribute href");	
	}else{
		scene.getPageHref(href,param);
	}
}
scene._t=0; 
scene.setPageCom = function(json){
	if( typeof json._t !='undefined' && scene._t == json._t ){
		return;
	}
	scene._t = json._t;
	var o = $.extend({html:null, urlBase:null,title:null, zonesCom:null}, json);
	if( json.zone ){
		scene.zone(json.zone);
	}
	
	if( json.fragment ){
		scene.setFragment(json);
	}else if( o.html ) { 		
		if( o.zonesCom ){
			var z = o.zonesCom.split(",");
			var tm = $("<div></div>");
			tm.html( o.html );
			for( var n  in z )	{
				 var nam = z[n];
				 var hmt = $(nam);
				 if( $(nam).length ){
				 	$(nam).each(function(index) {
                        var s = $(this);
						
							var clone = s.clone();
							s.before(clone);
							s.html($(nam,tm).eq(index).html());
							var oldH = clone.height();
							var newH = s.height();
							if( oldH != newH ){
								if( s.is("table") ){
									  
								}else{
									s.height(oldH).css({overflow:"hidden"}).animate({ height:newH },"slow",function(){
										s.css({ overflow:"", height:"" });	
									});	
								}
							}
							clone.remove();
                    });
					
				 }
			}
			tm.remove();
		}else{
		
			$("#com").html(o.html);
		}
		cfx.inload();
		addeventAjax("update",{html:$("#com")});
						
	}
	
	setTimeout(function(){
		scene.addEventZoneMsn();	
	},100);
}

scene.inputRequired=function(list, form, addClassError){
	var in_focus = false;
	if( !addClassError ) addClassError='error';
	if( typeof list == "object" ){
		form = $(form);
		$("."+addClassError,form).each(function(){
			$(this).removeClass(addClassError);
		});
		for(var n in list){
		  (function(e,n){
				var sna='';
				if( typeof e == "object" && e!=null){
					for(var na in e){
						sna=n+'['+na+']';
					}
					n = sna;
				}
				
				if(n)
		  		$("[name='"+n+"']",form).each(function(){
					var inp = $(this), pa = null;
					var currentVal = inp.val(); 
					if( addClassError ){
						if(inp.attr("type")=="checkbox" || inp.attr("type")=="radio"){
							pa = inp.parent();
						}else{
							pa = inp;	
						}
						pa.addClass(addClassError);
						inp.off("change.form").on("change.form",function(){
							if( currentVal != inp.val() ){
								pa.removeClass(addClassError);
							}else{
								pa.addClass(addClassError);	
							}
						});	
						if(!in_focus){
							inp.focus();
							in_focus=true;	
						}
					}
					
				})
				
			})(list[n],n)		
		}
	}

}
scene.json=function(url, data, options){
	var d = $.extend({"cfx-only":1, "cfx-render":'json'}, data);
	for( var n in data)d[n]=data[n];
	scene.ajax(url, d, options);
	
}
scene.getZoneUpdate=function(){
	var z ={};
	$(".zone").each(function( ) { 
		var zone = $(this);
		z[zone.attr("name")]=zone.attr("update");
	});
	return z;
}
scene.zone=function(contains){ 
	
	for(var n in contains){
		var op = contains[n];
		var z = $(op.name);
		if( !z.length ){
			z = $(".zone[name='"+op.name+"']");
		}
		z.html(op.html);
		cfx.inload();
		addeventAjax("loadpage", {
			html:z
		});
	}
	
}
scene._eventSuccess = {};
scene.eventSuccess = function(nameEvent, nameFunction, func){
	if(!scene._eventSuccess[nameEvent])scene._eventSuccess[nameEvent]={};
		scene._eventSuccess[nameEvent][nameFunction]=func;
}; 
scene.eventSuccessExec = function(nameEvent, json){
	if( scene._eventSuccess[nameEvent] ){
		for(var n in  scene._eventSuccess[nameEvent]){
			var fn = scene._eventSuccess[nameEvent][n];
			fn(nameEvent, json);
		}
		 scene._eventSuccess[nameEvent] = {};
	}
};
scene.getParamAjaxScene = function(data, only){
	var d = {"cfx-render":'ajax'};
	if( only ) d["cfx-only"] = only
	return $.extend( d, data);
}
scene.sAjax=function(url, data, options){
var o = $.extend({done:function(){}, success:function(){},error:function(){},fail:function(){},type:"GET"}, options);
	var d = $.extend({ "cfx-render":'ajax'}, data);
	for( var n in data)d[n]=data[n]; 
	cfx.sloading();
	$.ajaxSetup({cache: true});
	$.ajax({
		type: o.type,
		url: url,
		data: d,
		dataType:'json'
	}).done(function( json ) {
		if( json.reload ){ window.location.href=json.reload; return;}
		if( json.AdminLogged && !json.logged  && !json.noReload ){
			window.location.reload();
			return;
		}
		if( json.urlBaseRemplase )cajaxhistory(json.urlBase, json.title,{replaceState:true} );
			else if( json.urlBase )cajaxhistory(json.urlBase, json.title );
		if( json.redir ){ 
			scene.ajax(json.redir,{memorizeMsn:true, memorizeSuccess:json.success?json.success:null },{success:o.success,fail:function(){
				window.location.href=json.redir;	
			}})	
		}else{
			if( !json.memorizeMsn )
				scene.pageMsnClear();
		}
		if( json.successEvent ){
			scene.eventSuccessExec( json.successEvent ,json );
		}
		cfx.sloading(true);
		o.done(json);
	}).fail(function(jqXHR, textStatus) {
			o.fail(jqXHR, textStatus);
			alert( "Request failed: " + textStatus );
			console.log(jqXHR);
	});
}
scene.pageMsnClear=function(){
	$(".zone-msn-dinamic").each(function(){
		var ms = $(this);
		ms.children().each(function() {
			var dv = $(this);
			scene.closeMsn(dv);
        });
		setTimeout(function(){
			scene.checkMsnEmpty(ms);
		},scene.closeMsnDelayTime+50);
	 });
}
scene.addEventZoneMsn=function(zone){
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
scene.paserMsnJson=function(json){
	if( json.msn ){
		var ms = $("#zone-msn");
		var time = $.trim(ms.html())?"fast":0;
		ms.slideUp(time,function(){
			ms.html(json.msn);
			scene.addEventZoneMsn(ms);
		});
	}
}

scene.ajax=function(url, data, options){
	
			var o = $.extend({form:null,addClassError:'error',done:function(){}, success:function(){}, show_error:true, error:function(){},fail:function(){},type:"GET"}, options);
			var d = $.extend({ "cfx-render":'ajax'}, data);
			for( var n in data)d[n]=data[n];
			cfx.sloading();
			$.ajax({
				type: o.type,
				url: url,
				data: d,
				dataType:'json'
			}).done(function( json ) {
				if( json.reload ){ window.location.href=json.reload; return;}
				if( json.AdminLogged && !json.logged  && !json.noReload ){
					window.location.reload();
					return;
				}
				if( json.urlBaseRemplase )cajaxhistory(json.urlBase, json.title,{replaceState:true} );
					else if( json.urlBase )cajaxhistory(json.urlBase, json.title );
				if( json.redir ){ 
					window.location.href=json.redir;	
				}else{
					if( !json.memorizeMsn )
						scene.pageMsnClear();
				}
				cfx.sloading(true);
				
				o.done(json);
				if( json.zone ){
					scene.zone(json.zone);
				}
				
				scene.paserMsnJson(json);
				
				if( typeof json.inputRequired == "object" ){
					scene.inputRequired(json.inputRequired,o.form,o.addClassError);
				}
				
				if( json.success ){
					o.success( json );
				}
				if( json.error ){
					o.error( json );
				}
				
				if( json.successEvent ){
					scene.eventSuccessExec( json.successEvent ,json );
				}
			 
			}).fail(function(jqXHR, textStatus) {
					o.fail(jqXHR, textStatus);
					alert( "Request failed: " + textStatus );
					console.log(jqXHR);
		});
}
scene.formUpload=function(form, done, fnload) {
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
			if( done )done(json, form);
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
scene.getParent=function(el,sel){
	var parent = $(el).parent();
	if( parent.is(sel) || parent.is("body"))	return  parent
	else{
		return scene.getParent(parent,sel);	
	}
}
scene.closeCurrentWin = function(el, obj){
	var el = $(el),win;
	if( el.is(".simple-win") ){
		win = el;
	}else{
		win = el.parents(".simple-win");
	}
	var fn_close = win.data("swin-close");
	if( fn_close )fn_close(obj);  
}





function getFunc(id){
	if( !id ) {
		alert( "Fail func:" + id);
		console.log(id);
		return;
	}
	var _id = id.split(":");
	if(typeof scene.func[_id[0]] == "object"){
		if(typeof scene.func[_id[0]][_id[1]] == "function")
		return scene.func[_id[0]][_id[1]]; else
		alert("function: No exist: \n"+id);
	}else{
		alert( "Fail func:" + id);
	}
}



function func(id, options){
	var o = $.extend({ com:"?com=" }, options); 
	if( !id ) {
		alert( "Fail func:" + id);
		console.log(id);
		return;
	}
	
	var _id = id.split(":");
	if(typeof scene.func[_id[0]] == "object"){
		if(typeof scene.func[_id[0]][_id[1]] == "function")
		typeof scene.func[_id[0]][_id[1]](options); else
		alert("function: No exist: \n"+id);
	}else{
		alert( "Fail func:" + id);
	}
}
addeventAjax("update_tinymce",function(){
	if(typeof update_tinymce == "function")update_tinymce();
});

addeventAjax("auto-change",function(e){
	$("select[auto-change],input[auto-change],textarea[auto-change]", e.html ).change();
});
/*addeventAjax("tbody-sortable", function( e ){
	$("tbody[data-fn-sortable], ul[data-fn-sortable]", e.html ).each(function(){
		var c = $(this);
		
		var tag = c.is("tbody")?'tr':"li";
		var axis = "y";
		var dat = c.attr("data-sortable-axis");
		if( dat ){
			axis = (dat=="xy")?false:dat;
		}
		
		if(!c.data("add-data-fn-sortable")){ c.data("add-data-fn-sortable",true);
			var fn = c.attr("data-fn-sortable");
			c.sortable({ axis: axis, items:tag+":not(.ui-state-disabled)",dropOnEmpty: false, handle: ".handle",
				helper: function(e, ui){
					 ui.children().each(function() { $(this).width($(this).width()); });
					 return ui;
				},
				placeholder: {
						element: function(tr, ui) {
							return tr.clone().addClass('ui-placeholder-highlight').removeAttr('style');
						},
						update: function() { return;}
				},
				activate:function(e,ui){ 
					var tr = $(ui.item);
					var parent_current = tr.attr("data-parent");
					tr.attr("index-current", tr.index() );	
					$(tag,c).each(function(){
						var trc = $(this);
						var parent = trc.attr("data-parent");
						if( parent != parent_current )trc.addClass("ui-state-disabled");
					});
					
				},
				stop:function(e,ui){
					var tr = ui.item,
					parent = tr.attr('data-parent'),
					orderCurrent = tr.attr('order-current'),
					order = 0, p=0, v=0, indexOld = parseInt(tr.attr('index-current'));

					order = tr.index()-p;
					if(order==indexOld)return;
					if(order>indexOld){
						order--; v = 0;
					}else v = 0;
					if(order<0)order=1;
					
					var _tr = $(tag,c).not(tr).eq(order);
					var _order = parseInt( _tr.attr("order-current") )-v;
					
					if(fn=="v2"){
						var fnx = c.data("fn");
						var exe = c.data("exec") ;
						var param = tr.data("param");
						var opt = tr.data("options");
						
						param["order"]=_order;
						param["parent"]=parent
						scene[exe](fnx,param,opt);
					}else{
						scene.exec(fn, ui.item[0], null, {order:_order,parent:parent});
					}
					
					
					
				},out:function(e,ui){ 
					$(tag,c).removeClass("ui-state-disabled");
					
				}
				
				
			});
		}
	});
});	*/

addeventAjax("tbody-sortable", function( e ){
	$("tbody[data-fn-sortable], ul[data-fn-sortable]", e.html ).each(function(){
		var c = $(this);
		var tag = c.is("tbody")?'tr':"li";
		var axis = "y";
		var dat = c.attr("data-sortable-axis");
		if( dat ){
			axis = (dat=="xy")?false:dat;
		}
		
		if(!c.data("add-data-fn-sortable")){ c.data("add-data-fn-sortable",true);
			var fn = c.attr("data-fn-sortable");
			c.sortable({ axis: axis, items:tag+":not(.ui-state-disabled)",dropOnEmpty: false, handle: ".handle",
				helper: function(e, ui){
					 ui.children().each(function() { $(this).width($(this).width()); });
					 return ui;
				},
				placeholder: {
						element: function(tr, ui) {
							return tr.clone().addClass('sort-helper ui-placeholder-highlight').removeAttr('style');
						},
						update: function() { return;}
				},
				activate:function(e,ui){ 
					var tr = $(ui.item);
					var parent = tr.attr("data-parent");
					$(tag,c).not("[data-parent='"+parent+"']").addClass("ui-state-disabled");
					var li = tr.parent().find('[data-parent='+parent+']');
					li.not(".sort-helper").each(function(index) {
                       $(this).attr("old-index", index+1).attr("first-order-current", li.attr("order-current"));
                    });
					
				},
				stop:function(e,ui){
					var tr=ui.item, parent=parseInt(tr.attr('data-parent')),
					tindex, prev, next, oldindex, ocu=0;
					var li = tr.parent().find('[data-parent='+parent+']').not(".sort-helper");
					li.each(function(i) { if($(this).is(tr)) tindex = i+1;});
					oldindex = parseInt(tr.attr("old-index"));
					if( tindex == oldindex )return;
					ocu = parseInt(tr.attr("first-order-current"))-1; 
					var order = ocu+tindex ;   
					if(fn=="v2"){
						var param = $.extend({},tr.data("param"));
						param["order"]=order;
						param["parent"]=parent
						scene[c.data("exec")](c.data("fn"),param,tr.data("options"));
					}else{
						scene.exec(fn, ui.item[0], null, {order:_order,parent:parent});
					}
					
				},out:function(e,ui){ 
					$(tag,c).removeClass("ui-state-disabled");
					
				}
				
				/*,update:function(e,ui){ 
					
				} */
			});
		}
	});
});	
