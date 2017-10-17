function animate(obj,json,callback) {
				// 用定时器之前 先清除定时器 保证页面上只有一个定时器
				clearInterval(obj.timer);
				// 设置一个变量iCur 当前值  初始化为0
				var iCur = 0;
				obj.timer = setInterval(function(){
					// 在定时器中每一次间隔中 采用forin遍历的形式 实现多值同时变化
					
					var onOff = true;
					
					for (var attr in json) {
						
						// 目标点 =  对象[键名]
						var target = json[attr];
						//如果你传入z序 这个东西不需要一点点变化 直接赋值到目标点
						if(attr == "z-index"){
							iCur = target;
							obj.style.zIndex = target;
						}else if (attr == "opacity") {
							iCur =  Math.round(getStyle(obj,attr)*100);// 
						} else {
							// iCur获取当前的需要运动物体属性  left ： 150px===> 150数字类型
							iCur =  parseFloat(getStyle(obj,attr));
						}
					
					  // 运动形式 取决于 速度的算法
					  // 速度 取决于 = （ 目标点 - 当前位置）/8
					   speed = (target - iCur) /8
						/*console.log(iCur + ":" + speed);*/
						// 由于缓冲运动无限趋近于终点 当速度为正的 时候 向上取整 当速度为负的时候 向下取整
					   speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
					
						// 判断 当前值 是否已经等于目标值 如果等于说明到了
						if (iCur != target) {
							onOff = false;
							if (attr == "opacity") {
								// 将变化后的值 进行赋值  
								// 标准浏览器下的赋值
								obj.style[attr]= (iCur + speed)/100;
								// IE6 7 8 下的赋值
								obj.style.filter = 'alpha(opacity='+  (iCur + speed)+')';
							} else {
								// 否则接着走
								obj.style[attr] = iCur + speed + "px";
							}
						} 
						
						
					}
				
					if(onOff) {
						// 清除定时器
						clearInterval(obj.timer);
						// 设定时器timer变量为空 清除里面的数字编号
						obj.timer = null;
						// 判断callback是否存在 如果存在 则执行callback
						(callback && typeof callback == "function" )&& callback.call(obj);
					}
				
				},30);
			}
		
	function getStyle(obj,attr) {
		return obj.currentStyle? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
	}