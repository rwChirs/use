(function(window) {
var ele = [];
	/**
	 * FOOD ! I NEED FOOD !
	 * @param {Object} w
	 * @param {Object} h
	 * @param {Object} x
	 * @param {Object} y
	 * @param {Object} color
	 */
	function Food(w, h, x, y, color) {
		this.w = w || 20;
		this.h = h || 20;
		this.x = x || 0;
		this.y = y || 0;
		this.color = color || "green";
	}
	/**
	 * food渲染
	 * @param {Object} map
	 */
	Food.prototype.render = function(map) {
		remove();
		
		var food = document.createElement("div")
		this.x = (Math.ceil(Math.random() * (map.offsetWidth / this.w)) - 1) * this.w;
		this.y = (Math.ceil(Math.random() * (map.offsetHeight / this.h)) - 1) * this.h;
		food.setAttribute("style", "width: " + this.w + "px;height: " + this.h + "px;left: " + this.x + "px;top: " + this.y + "px;background: " + this.color + ";");
		map.appendChild(food);
		
		ele.push(food);
	}
	/**
	 * remove
	 */
	function remove(){
		ele.forEach(function(e){
			e.parentNode.removeChild(e);
		})
		ele = [];
	}
	
	window.Food = Food;
})(window)