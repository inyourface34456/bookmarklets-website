var so_fav = new Array();
var so_d = document;
so_d.onkeypress = so_handleKeyEvent;
so_d.onmousemove = so_handleMouseMoveEvent;
so_opera = window.opera;
so_opera8 = window.opera && navigator.userAgent.indexOf("Opera 8") > -1;
var mDown = false;
var mx, my, offsetX, offsetY;

function so_init() {
	so_host = "http://slayeroffice.com";
	window.scrollTo(0, 0);

	so_sObj = so_d.body.appendChild(so_d.createElement("link"));
	so_sObj.rel = "Stylesheet";
	so_sObj.type = "text/css";
	so_sObj.id = "fss";
	so_sObj.href = so_host + "/tools/suite/suite.css";
	//sObj.href="styles.css";

	so_fav[so_fav.length] = new Array("Mouseover DOM Inspector", so_host + "/tools/modi/modi.js", so_host + "/?c=/content/tools/modi.html");
	so_fav[so_fav.length] = new Array("MODIv2", so_host + "/tools/modi/v2.0/modi_v2.0.js", so_host + "/tools/modi/v2.0/modi_help.html");

	if (!so_d.all) so_fav[so_fav.length] = new Array("Style Sheet Tweak", so_host + "/tools/style_tweak/style_tweak.js", so_host + "/?c=/content/tools/style_tweak.html");
	so_fav[so_fav.length] = new Array("Hidden Field Modifier", so_host + "/tools/hiddenFields/hiddenFields.js", so_host + "/?c=/content/tools/hiddenFields.html");
	so_fav[so_fav.length] = new Array("Object Dimensions", "y=prompt('Object Type:','div');d=document;n=d.getElementsByTagName(y).length;if(!n){alert('No Tags');}else{for(i=0;i<n;i++){j=d.getElementsByTagName(y)[i];w=j.offsetWidth;h=j.offsetHeight;t=j.offsetTop;l=j.offsetLeft;o=y=='div'?'span':'div';z=j.appendChild(d.createElement(o));s=z.style;s.font='9px arial';s.background='#FFF';s.border='1px solid #000';s.position='absolute';s.color='#000';s.top=t+'px';s.left=l+'px';s.padding='2px';void(z.innerHTML=w+' x '+ h);}}", so_host + "/?c=/content/tools/obj_dim.html");
	if (!so_d.all) so_fav[so_fav.length] = new Array("Style Sheet Viewer", so_host + "/tools/styleview/showStyleSheets.js", so_host + "/?c=/content/tools/styleview.html");
	so_fav[so_fav.length] = new Array("Show Source", so_host + "/tools/showSource/showSource.php?p=" + location.href, so_host + "/?c=/content/tools/showSource.html");
	so_fav[so_fav.length] = new Array("HTML Attribute Viewer", "h='';d=document;k=d.getElementsByTagName('*');for(i=0;i<k.length;i++){if(k[i].tagName!='!'){h+='<b>'+k[i].tagName+'</b><br>';for(z=0;z<k[i].attributes.length;z++)if(k[i].attributes[z].value&&k[i].attributes[z].specified&&k[i].attributes[z].nodeValue)h+='<li>'+k[i].attributes[z].name+'='+k[i].attributes[z].value+'<br>';h+='<hr>';}}m=d.body.appendChild(d.createElement('div'));s=m.style;s.position='absolute';s.top='0px';s.padding='5px';s.font='.8em arial';s.background='#fff';void(m.innerHTML=h);", so_host + "/?c=/content/tools/attrViewer.html");

	if (so_opera && !so_opera8) {
		so_fav[so_fav.length] = new Array("HTTP Response Header Viewer", so_host + "/tools/headerViewer/headerViewer.php?host=" + location.hostname, so_host + "/?c=/content/tools/headerViewer.html");
	} else {
		so_fav[so_fav.length] = new Array("HTTP Response Header Viewer", so_host + "/tools/headerViewer/headerViewer.js", so_host + "/?c=/content/tools/headerViewer.html");
	}

	if (so_d.all) {
		so_fav[so_fav.length] = new Array("Ruler", so_host + "/tools/ruler_WinIE6/ruler_ie.js", so_host + "/?c=/content/tools/ruler.html");
	} else {
		so_fav[so_fav.length] = new Array("Ruler", so_host + "/tools/suite/ruler_centricle.js", "http://centricle.com/tools/favelets");
	}
	so_fav[so_fav.length] = new Array("Resize Fonts", "void(f=prompt('New font size?','12pt'));for(i=0;i<document.getElementsByTagName('*').length;i++)void(document.getElementsByTagName('*')[i].style.fontSize=f);", so_host + "/?c=/content/tools/fontSize_favelet.html");

	if (!so_d.all || so_opera) so_fav[so_fav.length] = new Array("Javascript Object Tree", so_host + "/tools/js_tree/js_tree.js", so_host + "/?c=/content/tools/js_tree.html");
	so_fav[so_fav.length] = new Array("Remove Children", so_host + "/tools/removeChildren/removeChildren.js", so_host + "/?c=/content/tools/removeChildren.html");
	if (!so_d.all || so_opera) so_fav[so_fav.length] = new Array("Document Tree Chart", so_host + "/tools/dom_chart/dom_chart.js", so_host + "/?c=/content/tools/dom_chart.html");
	so_fav[so_fav.length] = new Array("Page Info", so_host + "/tools/pagenfo/pagenfo.js", so_host + "?c=/content/tools/pagenfo.html");
	if (so_d.all) {
		so_fav[so_fav.length] = new Array("Color List", so_host + "/tools/color_list/color_list_msie.js", so_host + "?c=/content/tools/color_list.html");
	} else {
		so_fav[so_fav.length] = new Array("Color List", so_host + "/tools/color_list/color_list_moz.js", so_host + "?c=/content/tools/color_list.html");
	}
	so_fav.sort();
	so_createList(so_fav);
}

function so_handleKeyEvent(so_e) {
	so_keyCode = so_d.all ? window.event.keyCode : so_e.keyCode;
	if (so_keyCode == 27) so_cleanUp();
}

function so_createList(so_listArray) {
	so_mHTML = "<h1 id=\"dragHeader\">slayeroffice favelet suite</h1><ul><table cellpadding=\"0\" cellspacing=\"0\">";
	for (so_i = 0; so_i < so_listArray.length; so_i++) {
		so_mHTML += "<tr><td><li title=\"" + so_listArray[so_i][0] + "\" onclick=\"so_invokeFavelet(" + so_i + ");return false;\"><a href=\"#null\" onclick=\"return false;\">-" + so_listArray[so_i][0] + "</a></li></td><td><a title=\"Get info for " + so_listArray[so_i][0] + "\" class=\"nfo\" target=\"_blank\" href=\"" + so_listArray[so_i][2] + "\"></a></td></tr>";
	}
	so_mHTML += "</table></ul>";
	so_createListContainer(so_mHTML);
}


function so_createListContainer(so_html) {
	so_mObj = so_d.body.appendChild(so_d.createElement("div"));
	so_mObj.id = "mListContainer";
	so_mObj.innerHTML = so_html;

	so_d.getElementById("dragHeader").onmousedown = so_captureOffset;
	so_d.getElementById("dragHeader").onmouseup = function() {
		mDown = false;
	};

	so_cObj = so_d.getElementById("mListContainer").appendChild(so_d.createElement("div"));
	so_cObj.className = "credits";
	so_cObj.innerHTML = "[esc] to <a href=\"javascript:so_cleanUp();\">close</a><br />slayeroffice favelet suite<br />version 1.1<br />last revision: 08.24.2004<br /><a href=\"http://slayeroffice.com\">slayeroffice.com</a>";
}

function so_invokeFavelet(so_index) {
	if (so_fav[so_index][1].indexOf("http") != 0) {
		eval(so_fav[so_index][1]);
	} else {
		so_jObj = so_d.body.appendChild(so_d.createElement("script"));
		so_jObj.id = "sss";
		so_jObj.language = "javascript";
		so_jObj.type = "text/javascript";
		so_jObj.src = so_fav[so_index][1];
	}
	so_cleanUp();
}

function so_cleanUp() {
	try {
		so_d.body.removeChild(so_d.getElementById("mListContainer"));
		so_d.body.removeChild(so_d.getElementById("fss"));
		window.onkeypress = null;
		so_d.onmousemove = null;
		so_d.body.removeChild(so_d.getElementById("fs"));
	} catch (err) {}
}

function so_captureOffset(e) {
	mDown = true;
	x = parseInt(so_mObj.offsetLeft);
	y = parseInt(so_mObj.offsetTop);

	if (so_d.all) {
		offsetX = window.event.clientX - x;
		offsetY = window.event.clientY - y;
	} else {
		offsetX = e.pageX - x;
		offsetY = e.pageY - y;
	}
}

function so_handleMouseMoveEvent(e) {
	mx = so_d.all ? window.event.clientX - offsetX : e.pageX - offsetX;
	my = so_d.all ? window.event.clientY - offsetY : e.pageY - offsetY;
	if (mDown) {
		so_mObj.style.top = my + "px";
		so_mObj.style.left = mx + "px";
	}
}

so_init();
