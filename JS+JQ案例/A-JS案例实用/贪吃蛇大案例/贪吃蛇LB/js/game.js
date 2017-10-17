(function(window, Food, Snake) {
	/**
	 * GAME START ! AHHAHHH !
	 * @param {Object} map
	 */
	function Game(map) {
		this.Snake = new Snake();
		this.Food = new Food();
		this.map = map;
		this.oldKey = 0;
		this.isStart = false;
		this.btn = document.getElementById("start");
	}
	/**
	 * LETS PLAY!
	 */
	Game.prototype.start = function() {
		var _this = this;
		this.btn.addEventListener("click", function() {
			clickFn.call(_this);
			snakeMove(_this);
		})
	}
	/**
	 * GAME OVER
	 * @param {Object} timer
	 */
	Game.prototype.end = function(timer){
		clearInterval(timer);
		alert("Game Over");
	}
	/**
	 * click事件
	 * @param {Object} _this
	 */
	function clickFn() {
		if(this.isStart) {
			return;
		}
		this.Snake.render(this.map);
		this.Food.render(this.map);
		this.isStart = true;
	}
	/**
	 * MOVE! SNAKE!
	 * @param {Object} _this
	 */
	function snakeMove(_this) {
	var maxX = _this.map.offsetWidth - _this.Snake.w;
	var maxY = _this.map.offsetHeight - _this.Snake.h;
		var timer = setInterval(function() {
			KeyDown(_this);
			_this.Snake.move(_this.Food, _this.map);
			_this.Snake.render(_this.map);
			//碰撞检测
			var headX = _this.Snake.body[0].x;
			var headY = _this.Snake.body[0].y
			for (var i = 1; i < _this.Snake.body.length; i++) {
				if(headX == _this.Snake.body[i].x && headY == _this.Snake.body[i].y){
					_this.end(timer);
				}
			}
			headX = headX*_this.Snake.w;
			headY = headY*_this.Snake.h;
			if(headX<0 || headX>maxX){
				_this.end(timer);
			}
			if(headY<0 || headY>maxY){
				_this.end(timer);
			}
		}, 200);
	}
	
	/**
	 *键盘输入
	 * @param {Object} _this
	 */
	function KeyDown(_this) {
		document.addEventListener("keyup", function(e) {
			e = e || event;
			if(_this.oldKey == e.keyCode) {
				return
			}
			//检测键盘不能按
			switch(true) {
				case _this.oldKey == 37 && e.keyCode == 39:
				case _this.oldKey == 38 && e.keyCode == 40:
				case _this.oldKey == 40 && e.keyCode == 38:
				case _this.oldKey == 39 && e.keyCode == 37:
					return;
					break;
			}
			switch(e.keyCode) {
				case 37:
					_this.Snake.direction = "left";
					break;
				case 38:
					_this.Snake.direction = "up";
					break;
				case 39:
					_this.Snake.direction = "right";
					break;
				case 40:
					_this.Snake.direction = "down";
					break;
			}
			_this.oldKey = e.keyCode;
		})

	}
	window.Game = Game;
})(window, Food, Snake)