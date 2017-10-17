(function(window, Food) {
	var ele = [];
	/**
	 * IM A SNAKE~A SOLID SNAKE~
	 * @param {Object} w
	 * @param {Object} h
	 * @param {Object} direction
	 */
	function Snake(w, h, direction) {
		this.w = w || 20;
		this.h = h || 20;

		this.direction = direction || "right";
		this.body = [{
				x: 7,
				y: 2,
				color: "red"
			},
			{
				x: 6,
				y: 2,
			},
			{
				x: 5,
				y: 2,
			},
			{
				x: 4,
				y: 2,
			},
			{
				x: 3,
				y: 2,
			},
			{
				x: 2,
				y: 2
			},
			{
				x: 1,
				y: 2
			}
		];
	}
	/**
	 * snake渲染
	 * @param {Object} map
	 */
	Snake.prototype.render = function(map) {
		var _this = this;
		//Clean Old Snake's Body'
		remove(_this);

		var fragment = document.createDocumentFragment();
		this.body.forEach(function(e) {
			var snake = document.createElement("div");
			snake.setAttribute("style", "width: " + _this.w + "px;height:" + _this.h + "px;left:" + e.x * _this.w + "px;top:" + e.y * _this.h + "px")
			if(e.color) {
				snake.style.background = e.color;
			}
			ele.push(snake);
			fragment.appendChild(snake);
		})
		map.appendChild(fragment);
	}
	/**
	 * Move事件
	 * @param {Object} food
	 */
	Snake.prototype.move = function(food, map) {
		for(var i = this.body.length - 1; i > 0; i--) {
			this.body[i].x = this.body[i - 1].x;
			this.body[i].y = this.body[i - 1].y;
		}
		switch(this.direction) {
			case "right":
				this.body[0].x += 1;
				break;
			case "left":
				this.body[0].x -= 1;
				break;
			case "up":
				this.body[0].y -= 1;
				break;
			case "down":
				this.body[0].y += 1;
				break;
		}

		var headX = this.body[0].x * this.w;
		var headY = this.body[0].y * this.h;

		if(headX == food.x && headY == food.y) {
			var last = this.body[this.body.length - 1];
			this.body.push({
				x: last.x,
				y: last.y
			});
			food.render(map)
		}
	}

	function remove(_this) {
		ele.forEach(function(e) {
			e.parentNode.removeChild(e);
		})
		ele = [];
	}
	window.Snake = Snake;
})(window, Food)