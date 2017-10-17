// 手动封装了一个获取class类的兼容性函数
//getByClass("box")
function getByClass(myClass){
	
	var arr = [];
	
	var allEles = document.getElementsByTagName("*");
	
	for(var i = 0; i < allEles.length; i++) {
		
		var arrClassNames = allEles[i].className.split(" ")
		
		for(var j = 0; j < arrClassNames.length; j++) {
			
			if(arrClassNames[j]==myClass) {
				arr.push(allEles[i]);
				break;
			}
			
		}
	}
	return arr;
	
}
// 封装了一个获取样式的兼容性函数
function getStyle(obj,attr) {
	return obj.currentStyle? obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}

// 做了一个dom二级事件的兼容函数处理
function bind(obj,evType,evFn) {
	if(obj.addEventListener) {
		obj.addEventListener(evType,evFn,false);
	}else if(obj.attachEvent) {
		obj.attachEvent("on"+evType,evFn);
	}else {
		obj["on"+evType]= evFn;
	}
	
}



function ZaG(arg) {
	
	return new zQuery(arg);// 通过zag函数 包装一下元素 返回一个jq对象（zQ对象）
}
// zQuery构造函数
function zQuery(arg){
	// 建立一个数组 用来存获取到的元素
	this.ele = [];
	
	
	// 在jQuery中如果参数 是匿名函数 他代码的是文档加载完毕之后再执行 windown.load = function()
	
	// 如果传入的是匿名函数  类型是函数
	if(typeof arg == "function") {// 在jQuery中所有的事件都是通过addEventListener 并且做了兼容
		bind(window,"load",arg);
	} else if (typeof arg == "string") {// 如果传入的参数 是字符类类型的数据 那么代表的意思我要开始获取元素了
		// 至于具体获取什么元素 要根据字符串里面得第一个字符进行判断
		
		switch(arg.charAt(0)) {// "#box"
			case "#":
			this.ele.push(document.getElementById(arg.slice(1)));
			break;
			case ".": //".box" "div" "p"
 			this.ele = getByClass(arg.slice(1));
			break;
			default:
			this.ele = document.getElementsByTagName(arg);
			break;
		}
		
		
	}
}
// 一个参数 （json） 二个参数 设置
zQuery.prototype.css = function(attr,value){
	
	if(arguments.length == 1) {
		
		// 你传入的一个json格式数据 代表设置
		if(typeof arguments[0] == "object") {
			
			for(var i = 0; i < this.ele.length; i++) {
				
				for(var k in arguments[0]) {
					
					this.ele[i].style[k] = arguments[0][k];
				}
				
			}
			
		}else {
			// 读取的时候 是读取第一个元素
			return getStyle(this.ele[0],attr)
		}
		
	} else if(arguments.length == 2) {
		for(var i = 0; i < this.ele.length; i++) {
			
			this.ele[i].style[attr] = value;
			
		}
	}
	
	return this;// 为了解决 链式操作的方法
}

zQuery.prototype.html = function(value){
	
	if(value){
		
		for(var i = 0; i < this.ele.length; i++) {
			
			this.ele[i].innerHTML = value;
			
		}
		return this;
	}else {
		return this.ele[0].innerHTML;
	}
	
}
zQuery.prototype.click = function(fn){
	
	for(var i = 0; i < this.ele.length; i++) {
		
		bind(this.ele[i],"click",fn);
		
	}
}
// 这是jq内部的工具方法的一个实现原理
ZaG.extend = function(obj){
	
	for(var attr in obj) {
		
		ZaG[attr] = obj[attr];
		
	}
	
}

// 这是jQuery的内部的插件的实现原理
ZaG.fn = zQuery.prototype;

ZaG.fn.extend = function(obj){
	
	for(var attr in obj) {
		zQuery.prototype[attr] = obj[attr];
	}
	
}
