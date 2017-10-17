(function($){
	
	// 放置到全局
	var json = {};
	
	$.fn.extend({
		
		tab:function(options){
			
			// 将可扩展的配置项 思考好 先给一个默认设置
			
			var defaultSettings= {
				"btnVal":["按钮1","按钮2","按钮3"],
				"divCon":["111","222","333"],
				"evType":"click"
			}
			
			// 使用 jQuery里面提供好的$.extend() 实现对象的属性遍历
			
			
			$.extend(json,defaultSettings,options);
			
			// 需要生成页面上的所有的标签
			
			create.call(this);
			
			// 下面实现一下功能
			eventFn.call(this);
		}
		
		
	})
	
	// 用来生成input标签和div标签
	function create() {
		
		//根据json数据循环生成input
		for(var i = 0; i < json.btnVal.length; i++) {
			
			var oBtn = $('<input type="button" value="'+json.btnVal[i]  +'"/>')
			if(i==0) {
				oBtn.addClass("active");
			}
			this.append(oBtn);
		}
		
		// 生成div
		
		for(var i = 0; i < json.divCon.length; i++) {
			
			var oDiv = $("<div>"+ json.divCon[i] +"</div>");
			if(i==0){
				oDiv.show();
			}
			this.append(oDiv);
		}
		
	}
	
	
	// 来实现一下具体的功能
	function eventFn() {
		// 给每一个input 添加单击事件
		var that = this;
		this.children("input").on(json.evType,function(){
			
			// 让当前单击的的input加上类 让别人移除类
			
			$(this).addClass("active").siblings("input").removeClass("active");
			
			// 让当前对应的div 显示 让别的div隐藏
			that.children("div").eq($(this).index()).show().siblings("div").hide();
		})
		
		
		
	}
	
})(jQuery);
