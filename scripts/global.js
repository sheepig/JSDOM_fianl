/*************************公共函数************************/
//addLoadEvent
function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}

//inserAfter
function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if(parent.firstChild == targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

//addClass
function addClass(element,value) {
  if (!element.className) {
    element.className = value;
  } else {
    newClassName = element.className;
    newClassName+= " ";
    newClassName+= value;
    element.className = newClassName;
  }
}

//highlightPage
function highlightPage(){
	//检查DOM方法
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	//遍历所有链接
	var header = document.getElementsByTagName("header")
	if(header.length == 0) return false;
	var navs = header[0].getElementsByTagName("nav");
	if(navs.length == 0) return false;
	//发现与当前URL匹配的链接，添加here类
	var links = navs[0].getElementsByTagName("a");
	var linkurl;
	for(var i = 0;i < links.length;i++){
		linkurl = links[i].getAttribute("href");
		if(window.location.href.indexOf(linkurl) != -1){
			links[i].className = "here";
			//设置body元素的id属性
			var linktext = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id",linktext);
		}
	}
}
addLoadEvent(highlightPage);

//moveElement
function moveElement(elementID,final_x,final_y,interval){//元素id,目的地址xy，移动速度
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	//获取元素位置信息
	var elem = document.getElementById(elementID);
	//复位moveElement属性
	if(elem.moveElemet){
		clearTimeout(elem.moveElement);
	}
	//检查并初始化位置
	if(!elem.style.left){
		elem.style.left = "0px";
	}
	if(!elem.style.top){
		elem.style.top = "0px";
	}
	//起始位置
	xpos = parseInt(elem.style.left);
	ypos = parseInt(elem.style.top);
	var dist = 0;
	//是否到达目的地
	if(xpos == final_x && ypos == final_y){
		return true;
	}
	//移动位置
	if(xpos < final_x){
		dist = Math.ceil((final_x - xpos)/10);
		xpos = xpos + dist;
	}
	if(xpos > final_x){
		dist = Math.ceil((xpos - final_x)/10);
		xpos = xpos - dist;
	}
	if(ypos < final_y){
		dist = Math.ceil((final_y  - ypos)/10);
		ypos = ypos + dist;
	}
	if(ypos > final_y){
		dist = Math.ceil((ypos - final_y)/10);
		ypos = ypos - dist;
	}
	//更新位置
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	//函数延时
	var repeat = "moveElement('" + elementID + "'," + final_x + "," + final_y + "," + interval + ")";
	movement = setTimeout(repeat,interval);
}
/*************************index************************/
//prepareSlideshow
function prepareSlideshow(){
	//DOM检查
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	
	if(!document.getElementById("intro")) return false;
	var intro = document.getElementById("intro");
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	//边框
	var frame = document.createElement("img");
	frame.setAttribute("src","images/frame.gif");
	frame.setAttribute("alt","");
	frame.setAttribute("id","frame");
	slideshow.appendChild(frame);
	var preview = document.createElement("img");
	preview.setAttribute("src","images/slideshow.gif");
	preview.setAttribute("alt","a glimpse of what awaits you");
	preview.setAttribute("id","preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);

	var links = intro.getElementsByTagName("a");
	var destination;
	for(var i = 0;i < links.length;i++){
		links[i].onmouseover = function(){
			destination = this.getAttribute("href");
			if(destination.indexOf("index.html") != -1){
				moveElement("preview",0,0,5);
			}
			if(destination.indexOf("about.html") != -1){
				moveElement("preview",-150,0,5);
			}
			if(destination.indexOf("photos.html") != -1){
				moveElement("preview",-300,0,5);
			}
			if(destination.indexOf("live.html") != -1){
				moveElement("preview",-450,0,5);
			}
			if(destination.indexOf("contact.html") != -1){
				moveElement("preview",-600,0,5);
			}
		}
	}
}
addLoadEvent(prepareSlideshow);

/*************************About************************/
//showSection
function showSection(id){
	var sections = document.getElementsByTagName("section");
	for(var i = 0;i < sections.length;i++){
		if(sections[i].getAttribute("id") != id){
			sections[i].style.display = "none";
		}else{
			sections[i].style.display = "block";
		}
	}
}

//prepareInternalnav
function prepareInternalnav(){
	//检查DOM方法
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	//遍历提取链接
	var articles = document.getElementsByTagName("article");
	if(articles.length == 0) return false;
	var navs = articles[0].getElementsByTagName("nav");
	if(navs.length == 0) return false;
	//添加onclick事件
	var nav = navs[0];
	var links = nav.getElementsByTagName("a");
	for(var i = 0;i < links.length;i++){
		var sectionId = links[i].getAttribute("href").split("#")[1];
		if(!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display = "none";
		links[i].destination = sectionId;
		links[i].onclick = function(){
			showSection(this.destination);
			return false;
		}
	}
}
addLoadEvent(prepareInternalnav);
	
/*************************photos************************/
//showPic
function showPic(whichPic){
    if(!document.getElementById("placeholder")) return false;
	var source = whichPic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src",source);
	
	if(!document.getElementById("description")) return false;
	if(whichPic.getAttribute("title")){
		var text = whichPic.getAttribute("title");
	}else{
		var text = "";
	}
	var description = document.getElementById("description");
	if(description.firstChild.nodeType == 3){
		description.firstChild.nodeValue = text;
	}
	return false;
	
}
//preparePlaceholder
function preparePlaceholder(){
	if(!document.getElementById) return false;
	if(!document.createTextNode) return false;
	if(!document.createElement) return false;
	if(!document.getElementById("imagegallery")) return false;
	var placeholder = document.createElement("img");
	placeholder.setAttribute("src","images/placeholder.gif");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("alt","my image gallery");
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var destext = document.createTextNode("choose an image");
	description.appendChild(destext);
	var gallery = document.getElementById("imagegallery");
	insertAfter(description,gallery);
	insertAfter(placeholder,description);
}
//prepareGallery
function prepareGallery(){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for(var i = 0;i < links.length;i++){
		links[i].onclick = function(){
			return showPic(this);
		}
	}
}	
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
	
/*************************live************************/
function stripeTables(){
	if(!document.getElementsByTagName) return false;
	var tables = document.getElementsByTagName("table");
	for(var i = 0;i < tables.length;i++){
		var odd = false;
		var rows = tables[i].getElementsByTagName("tr");
		for(var j = 0;j < rows.length;j++){
			if(odd == true){
				addClass(rows[j],"odd")
				odd = false;
			}else{
				odd = true;
			}
		}
	}
}
function highlightRows(){
	if(!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
	for(var i = 0;i < rows.length;i++){
		rows[i].oldClassName = rows[i].className;
		rows[i].onmouseover = function(){
			addClass(this,"highlight");
		}
		rows[i].onmouseout = function(){
			this.className = this.oldClassName;
		}
	  }
	}
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);

/*************************contact************************/
//focusLabels
function focusLabels(){
	if(!document.getElementsByTagName) return false;
	var labels = document.getElementsByTagName("label");
	for(var i = 0;i < labels.length;i++){
		if(labels[i].getAttribute("for")) continue;
		labels[i].onclick = function(){
			var id = this.getAttribute("for");
			if(!document.getElementById(id)) return false;
			var element = document.getElementById(id);
			element.focus();
		}
	}
}
addLoadEvent(focusLabels);
	
//resetFields
function resetFields(whichform){
	if(Modernizr.input.placeholder) return;
	for(var i = 0;i < whichform.elements.length;i++){
		var element = whichform.elements[i];
		if(element.type == "submit") continue;
		var check = element.placeholder || element.getAttribute('placeholder');
		if(!check) continue;
		element.onfocus = function(){
			var text = this.placeholder || this.getAttribute('placeholder');
			if(this.value == text){
				this.className = '';
				this.value = "";
			}
		}
		element.onblur = function(){
			if(this.value == ""){
				this.className = 'placeholder';
				this.value = this.placeholder || this.getAttribute('placeholder');
			}
		}
	element.onblur();
	}
}	
	
function prepareForms(){
	for(var i = 0;i < document.forms.length;i++){
		var thisform = document.forms[i];
		resetFields(thisform);
		thisform.onsubmit = function(){
			return validateform(this);
		}
	}
}	
addLoadEvent(prepareForms);
//是否填写表单校验
function isFilled(field){
	if(field.value.replace(' ',''),length == 0) return false;
	var palceholder = field.placeholder || field.getAttribute('palceholder');
	return (field.value != placeholder);
}
function isEmail(field){
	return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}
//validateform
function validateform(whichform){
	for(var i = 0;i < whichform.elements.length;i++){
		var element = whichform.elements[i];
		if(element.required == "required"){
			if(!isFilled(element)){
				alert("Please fill in the " + element.name + " field.");
				return false;
			}
			if(!isEmail(element)){
				alert("The " + element.name + " field must be a valid email address.");
				return false;
			}
		}
	}
	return true;
}
	
	
	
	
	
	
	

