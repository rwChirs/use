// 为了方便使用$符号 不然外界的因素去干扰$符号的使用 使用函数自执行调用来实现封装
(function($){
			
			$.fn.extend({
				"changeStyle":function(json){
					// 如果用户不传参数 那么最好按照一个默认配置走
					// 如果用户传入参数 那就按照用户的配置进行执行
					
					var defaultsSettings = {
						"color":"purple",
						"fontSize":"20px",
						"border":"1px solid black"
					}
					
					//想办法把默认和传入的配置 进行融合
					// 把默认的配置项 通过forin遍历 赋值给obj
					var settings = {
						
					}
					
					$.extend(settings,defaultsSettings, json);
					/*extend(settings,defaultsSettings);
					if(json) {
						extend(settings,json);
					}*/
					
					//封装一个小函数　用来去做对象的属性遍历
					
					function extend(obj,obj2) {
						for(var attr in obj2) {
							obj[attr] = obj2[attr];
						}
					}
					
					this.css({
						"color":settings.color,
						"fontSize":settings.fontSize,
						"border":settings.border
					});  // 基于jQuery开发插件 有一个大的好处 就是可以使用jQuery的语法
					
					return this;
				}
				
			})
			
			
			
			
	})(jQuery);