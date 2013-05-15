var Game = {
    display: null,
    map: {},
    engine: null,
    player: null,
    
    init: function() {
        this.display = new ROT.Display({spacing:1.1});
        $("dungeon").appendChild(this.display.getContainer());
        
        this._generateMap();
        
        var scheduler = new ROT.Scheduler.Simple();
        scheduler.add(this.player, true);
        this.engine = new ROT.Engine(scheduler);
        this.engine.start();
    },
    
    _generateMap: function() {
        var digger = new ROT.Map.Digger();
        var freeCells = [];
        
        var digCallback = function(x, y, value) {
            if (value) { return; }
            
            var key = x+","+y;
            this.map[key] = ".";
            freeCells.push(key);
        }
        digger.create(digCallback.bind(this));
        this._drawWholeMap();
        this.player = this._createBeing(Player, freeCells);
    },
    
    _createBeing: function(what, freeCells) {
        var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        var key = freeCells.splice(index, 1)[0];
        var parts = key.split(",");
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);
        return new what(x, y);
    },
    
    _drawWholeMap: function() {
        for (var key in this.map) {
            var parts = key.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);
            this.display.draw(x, y, this.map[key]);
        }
    }
};

var Player = function(x, y) {
    this._x = x;
    this._y = y;
    this._draw();
}
    
Player.prototype.getSpeed = function() { return 100; }
Player.prototype.getX = function() { return this._x; }
Player.prototype.getY = function() { return this._y; }

Player.prototype.act = function() {
    Game.engine.lock();
    window.addEventListener("keydown", this);
}
    
Player.prototype.handleEvent = function(e) {
    var code = e.keyCode;
    var keyMap = {};
    keyMap[38] = 0;
    keyMap[33] = 1;
    keyMap[39] = 2;
    keyMap[34] = 3;
    keyMap[40] = 4;
    keyMap[35] = 5;
    keyMap[37] = 6;
    keyMap[36] = 7;

    if (!(code in keyMap)) { return; }
    var dir = ROT.DIRS[8][keyMap[code]];
    var newX = this._x + dir[0];
    var newY = this._y + dir[1];
    var newKey = newX + "," + newY;
    if (!(newKey in Game.map)) { return; }

    Game.display.draw(this._x, this._y, Game.map[this._x+","+this._y]);
    this._x = newX;
    this._y = newY;
    this._draw();
    window.removeEventListener("keydown", this);
    Game.engine.unlock();
}

Player.prototype._draw = function() {
    Game.display.draw(this._x, this._y, "@", "#ff0");
}

function updateTitle() {
	$s("name", c.name);
	$s("title", "LV" + c.level + " " + c.class);
}

function updateStatus() {
	$s("hp", c.hp);
	$("hp").style.color = c.hp > 0 ? '#ee0' : '#f00';
	$s("hpmax", c.hp);
	$("hpbar").value = c.hp;
	$("hpbar").max = c.hp;
	$s("mp", c.mp);
	$("mp").style.color = c.mp > 0 ? '#ee0' : '#f00';
	$s("mpmax", c.mp);
	$("mpbar").value = c.mp;
	$("mpbar").max = c.mp;
	$s("sp", c.sp);
	$("sp").style.color = c.sp > 0 ? '#ee0' : '#f00';
	$s("spmax", c.sp);
	$("spbar").value = c.sp;
	$("spbar").max = c.sp;
}

var c = JSON.parse(localStorage.yurisq);
updateTitle();
updateStatus();
$s("msg", "日志");
