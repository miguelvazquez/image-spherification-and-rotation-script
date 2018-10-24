/*!{"i":" CFX System | Basic v0.1s  | (c) 2005 - 2015  CFX ","api":"4.1","version":"1.0"}*/


var _addeventAjax = _addeventAjax || {};
var _addeventAjaxTime = _addeventAjaxTime || {};
var addeventAjax = function(name, e) {
	if (typeof(e) == "function") _addeventAjax[name] = e;
	else if (e == "delete") delete _addeventAjax[name];
	else {
		for (var n in _addeventAjax) {
			if (typeof _addeventAjax[n] == "function") {
				(function(n) {
					if (_addeventAjaxTime[n]) clearTimeout(_addeventAjaxTime[n]);
					_addeventAjaxTime[n] = setTimeout(function() {
						_addeventAjax[n](name, e);
					}, 5);
				})(n);
			}
		}
	}
}

function __fxop() { return _FXOP = ((0.2 + 0.4) !== 0.6) ? true : false; }

function fixFloat(float) {
	if (typeof _FXOP == "undefined") _FXOP = __fxop();
	if (!_FXOP) return float;
	if (String(float).indexOf(".") != -1) {
		var l, d, n = String(float).split(".");
		d = n[1];
		l = d.length;
		if (l >= 12) {
			d = d.split("");
			d[l - 1] = d[l - 2];
			float = parseFloat(Number(n[0] + "." + d.join("")).toFixed(l - 1));
		}
	}
	return float;
}

function _angle(deg) {
	return (Math.PI * (deg / 180));
}

function _getA(ww, deg) {
	var _cos = Math.cos(_angle(deg));
	var hipo = ww / _cos;
	return fixFloat(hipo * Math.sin(_angle(deg)));
}

var cajax = window.history && window.history.pushState && window.history.replaceState &&
	!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]|WebApps\/.+CFNetwork)/);

function cajaxhistory(url, title, options) {
	var o = $.extend({ replaceState: false }, options);
	o.url = url;
	if (title) document.title = title;
	o.title = title;
	if (cajax) {
		var r = o.replaceState ? true : false;
		delete(o.replaceState);
		var stateObj = { foo: "bar" };
		window.history[(r) ? "replaceState" : "pushState"](stateObj, title, url);
	} else {
		window.location.href = "#!redir/" + url;
	}
	if (window._gaq) _gaq.push(["_trackPageview", url]);
}
if (cajax) {
	window.addEventListener("popstate", function(event) {
		if (!event.state) {

		} else {
			window.location.href = event.target.window.location.href;
		}

	});
}
var an = window.location.href.split("#!redir/");
var _href = null;
if ($.trim(an[1])) {
	window.location.href = an[1];
}

function preg_match_all(regex, haystack) {
	var globalRegex = new RegExp(regex, "g");
	var globalMatch = haystack.match(globalRegex);
	matchArray = new Array();
	for (var i in globalMatch) {
		nonGlobalRegex = new RegExp(regex);
		nonGlobalMatch = globalMatch[i].match(nonGlobalRegex);
		matchArray.push(nonGlobalMatch);
	}
	return matchArray;
}


addeventAjax("data-share", function(e, obj) {
	$("a[data-share]", obj.html).each(function() {
		var a = $(this);
		var href = a.attr("href");
		if (href)
			a.off("click.com").off("click.share").on("click.share", function(e) {
				e.preventDefault();
				var html = $("#tm-shares").html();
				html = html.replace("{$href}", encodeURI(href));
				cfx.swin(html);

			});

	});

});


var cfx = cfx || {};
cfx.loading_show = false;
cfx.loading_close = function(options) {
	var settings = { show_b: false, closeTimeAnimate: "fast", closeAnimate: function(w, t, f) { w.fadeOut(t, function() { f(w); }); }, endAnimate: null };
	var o = $.extend(settings, options);
	if (typeof cfx.loading_timeClose != "undefined") clearTimeout(cfx.loading_timeClose);
	var wb = cfx.swin_b;
	wb.bind("click", function() { cfx.swin_close() });
	var wt = cfx.loading_t;
	cfx.loading_show = false;
	if (typeof o.closeAnimate == "function") o.closeAnimate(wt, o.closeTimeAnimate, function() {
		wt.hide().html("");
		if (typeof o.endAnimate == "function") o.endAnimate();
	});
	else wt.hide().html("");
	if (!o.show_b)
		wb.fadeOut(o.closeTimeAnimate);
	wb.removeClass("loading");
};
cfx.loading = function(options) {
	var settings = { text: "cargando..", show_b: true, openTimeAnimate: "fast", openAnimate: function(w, t, f) { w.fadeOut(t, function() { f(w); }); }, endAnimate: null, timeClose: 10000 };
	var o = $.extend(settings, options);
	var wb = cfx.swin_b;
	wb.unbind("click");
	var wt = cfx.loading_t;
	wt.html(o.text);
	cfx.loading_show = true;
	wt.fadeIn(o.openTimeAnimate).center();
	if (o.show_b) {
		if (!wb.is(":visible"))
			wb.show().css({ opacity: 0, background: "#000000" }).stop().animate({ opacity: 0.9 }, "fast");
		else wb.stop().animate({ opacity: 0.9 }, "fast");
	}
	wb.addClass("loading");
	if (parseInt(o.timeClose)) {
		cfx.loading_timeClose = setTimeout(function() {
			cfx.loading_close({
				show_b: true,
				endAnimate: function() { cfx.swin("Se ha superado el tiempo de espera.<br />Por favor vuelva a intentarlo pasados unos segundos", { type: "error", timeClose: 10000 }); }
			});
		}, o.timeClose);
	}
};;
(function(f, h, $) { var a = "placeholder" in h.createElement("input"),
		d = "placeholder" in h.createElement("textarea"),
		i = $.fn,
		c = $.valHooks,
		k, j; if (a && d) { j = i.placeholder = function() { return this };
		j.input = j.textarea = true } else { j = i.placeholder = function() { var l = this;
			l.filter((a ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({ "focus.placeholder": b, "blur.placeholder": e }).data("placeholder-enabled", true).trigger("blur.placeholder"); return l };
		j.input = a;
		j.textarea = d;
		k = { get: function(m) { var l = $(m); return l.data("placeholder-enabled") && l.hasClass("placeholder") ? "" : m.value }, set: function(m, n) { var l = $(m); if (!l.data("placeholder-enabled")) { return m.value = n } if (n == "") { m.value = n; if (m != h.activeElement) { e.call(m) } } else { if (l.hasClass("placeholder")) { b.call(m, true, n) || (m.value = n) } else { m.value = n } } return l } };
		a || (c.input = k);
		d || (c.textarea = k);
		$(function() { $(h).delegate("form", "submit.placeholder", function() { var l = $(".placeholder", this).each(b);
				setTimeout(function() { l.each(e) }, 10) }) });
		$(f).bind("beforeunload.placeholder", function() { $(".placeholder").each(function() { this.value = "" }) }) }

	function g(m) { var l = {},
			n = /^jQuery\d+$/;
		$.each(m.attributes, function(p, o) { if (o.specified && !n.test(o.name)) { l[o.name] = o.value } }); return l }

	function b(m, n) { var l = this,
			o = $(l); if (l.value == o.attr("placeholder") && o.hasClass("placeholder")) { if (o.data("placeholder-password")) { o = o.hide().next().show().attr("id", o.removeAttr("id").data("placeholder-id")); if (m === true) { return o[0].value = n } o.focus() } else { l.value = "";
				o.removeClass("placeholder");
				l == h.activeElement && l.select() } } }

	function e() { var q, l = this,
			p = $(l),
			m = p,
			o = this.id; if (l.value == "") { if (l.type == "password") { if (!p.data("placeholder-textinput")) { try { q = p.clone().attr({ type: "text" }) } catch (n) { q = $("<input>").attr($.extend(g(this), { type: "text" })) } q.removeAttr("name").data({ "placeholder-password": true, "placeholder-id": o }).bind("focus.placeholder", b);
					p.data({ "placeholder-textinput": q, "placeholder-id": o }).before(q) } p = p.removeAttr("id").hide().prev().attr("id", o).show() } p.addClass("placeholder");
			p[0].value = p.attr("placeholder") } else { p.removeClass("placeholder") } } }(this, document, jQuery));

addeventAjax("data-placeholder", function(e) {
	$("input, textarea").placeholder();
});
cfx.simple_scrollUp = function() {
	var win = win || $(window);
	$("body,html").animate({ scrollTop: win.scrollTop() - win.height() / 2 });
};
cfx.simple_scrollDown = function() {
	var win = win || $(window);
	$("body,html").animate({ scrollTop: win.scrollTop() + win.height() / 2 });
};



function getSizeByFixedWidth($width, $height, $newWidth) {
	$ratio = $height / $width;
	$newHeight = $newWidth * $ratio;
	return $newHeight;
}

function getSizeByFixedHeight($width, $height, $newHeight) {
	$ratio = $width / $height;
	$newWidth = $newHeight * $ratio;
	return $newWidth;
}

function hexToRgb(hex_string, default_) {
	if (default_ == undefined) {
		default_ = null;
	}

	if (hex_string.substr(0, 1) == "#") {
		hex_string = hex_string.substr(1);
	}

	var r;
	var g;
	var b;
	if (hex_string.length == 3) {
		r = hex_string.substr(0, 1);
		r += r;
		g = hex_string.substr(1, 1);
		g += g;
		b = hex_string.substr(2, 1);
		b += b;
	} else if (hex_string.length == 6) {
		r = hex_string.substr(0, 2);
		g = hex_string.substr(2, 2);
		b = hex_string.substr(4, 2);
	} else {
		return default_;
	}

	r = parseInt(r, 16);
	g = parseInt(g, 16);
	b = parseInt(b, 16);
	if (isNaN(r) || isNaN(g) || isNaN(b)) {
		return default_;
	} else {
		return { r: r / 255, g: g / 255, b: b / 255 };
	}
}

function rgbToHex(r, g, b, Hash) {
	r = parseInt(r), g = parseInt(g), b = parseInt(b);
	return ((Hash || Hash == undefined) ? "#" : "") + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

if (!jQuery.cookie)
	jQuery.cookie = function(key, value, options) {
		if (arguments.length > 1 && (value === null || typeof value !== "object")) {
			options = jQuery.extend({}, options);
			if (value === null) {
				options.expires = -1;
			}
			if (typeof options.expires === "number") {
				var days = options.expires,
					t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			return (document.cookie = [
				encodeURIComponent(key), "=",
				options.raw ? String(value) : encodeURIComponent(String(value)),
				options.expires ? "; expires=" + options.expires.toUTCString() : "", // use expires attribute, max-age is not supported by IE
				options.path ? "; path=" + options.path : "",
				options.domain ? "; domain=" + options.domain : "",
				options.secure ? "; secure" : ""
			].join(""));
		}

		// key and possibly options given, get cookie...
		options = value || {};
		var result, decode = options.raw ? function(s) { return s; } : decodeURIComponent;
		return (result = new RegExp("(?:^|; )" + encodeURIComponent(key) + "=([^;]*)").exec(document.cookie)) ? decode(result[1]) : null;
	};