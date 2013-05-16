var statusList = {
'轻伤': 'hp < 75',
'濒死': 'hp < 1',
'失神': 'mp < 1',
'睿智': 'int > 16',
'⑨': 'int < 6',
'迅捷': 'speed < 8',
'迟缓': 'speed > 12',
'近视': 'vision < 4',
'目盲': 'vision < 1',
'火焰耐性': 'resist.fr == 1',
'怕火': 'resist.fr < 0',
'火焰无视': 'resist.fr == 2',
'火焰免疫': 'resist.fr == 3',
'火焰反噬': 'resist.fr > 3',
};
function parseCharaStatus(c) {
	var f = new Array();
	for(var key in statusList) {
		if(eval('c.' + statusList[key])) {
			f.push(key)
		}
	}
	return f.concat(c.feat);
}

function chara() {
	return {
		'name': undefined, 'class': undefined,
		'level': 1, 'exp': 0, 'nextexp': 1000,
		'str': 10, 'con': 10,
		'dex': 10, 'agi': 10,
		'int': 10, 'wis': 10,
		'hp': 100, 'mp': 100, 'sp': 100,
		'vision': 5, 'speed': 10,
		'spell': [], 'feat': [], 'skill': {},
		'resist': {'fr': 0, 'cr': 0, 'tr': 0, 'er': 0,
				'lr': 0, 'dr': 0, 'pr': 0, 'mr': 0},
		'height': 155 + dd(2, 6) + n(6),
		'bust': 'B',
	};
}

function adventure() {
	var c = new chara();
	c.class = '勇者';
	c.inventory = {};
	c.spellslot = 0;
	return c;
}

function junk() {
	var c = new adventure();
	c.class = '战渣5';
	c.str = 5; c.con = 5;
	c.dex = 5; c.agi = 5;
	c.int = 5; c.wis = 5;
	c.hp = 50; c.mp = 50;
	c.vision = 3; c.speed = 13;
	c.resist = {'fr': -1, 'cr': -1, 'tr': -1, 'er': -1,
				'lr': -1, 'dr': -1, 'pr': -1, 'mr': -1}
	c.height = 150 + n(6);
	return c;
}

function marysue() {
	var c = new adventure();
	c.class = '玛丽苏';
	c.str = 18; c.con = 18;
	c.dex = 18; c.agi = 18;
	c.int = 18; c.wis = 18;
	c.hp = 200; c.mp = 200; c.sp = 99;
	c.vision = 6; c.speed = 8; c.spellsot = 3;
	c.resist = {'fr': 1, 'cr': 1, 'tr': 1, 'er': 1,
				'lr': 1, 'dr': 1, 'pr': 1, 'mr': 1}
	c.height = 160 + dd(3, 4) + n(6);
	c.bust = String.fromCharCode(65 + dd(2, 2));
	return c;
}
