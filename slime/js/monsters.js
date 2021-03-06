var spellsList = {
    'boggy': { manaCost: 15, damage: 16, color: 'red', icon: '窪', name: 'Boggy' },
    'slime': { manaCost: 10, damage: 10, color: 'green', icon: '漦', name: 'Slime' },
    'darknessSlime': { manaCost: 15, damage: 16, color: 'purple', icon: '淄 漦', name: 'Darkness Slime' },
    'slimeMud': { manaCost: 10, damage: 11, color: 'orange', icon: '泥 漦', name: 'Slime Mud' },
    'mummify': { manaCost: 10, damage: 10, color: 'purple', icon: '窪', name: 'Mummify' },
    'ringOfFear': { manaCost: 9, damage: 10, color: 'purple', icon: '圈 恐', name: 'Ring Of Fear' },
    'earthElemental': { manaCost: 20, damage: 19, color: 'red', icon: '土', name: 'Earth' },
    'airElemental': { manaCost: 20, damage: 19, color: 'red', icon: '空', name: 'Air' },
    'waterElemental': { manaCost: 20, damage: 19, color: 'red', icon: '水', name: 'Water' },
    'fireElemental': { manaCost: 20, damage: 19, color: 'red', icon: '火', name: 'Fire' },
    'spiritElemental': { manaCost: 23, damage: 23, color: 'red', icon: '心靈', name: 'Spirit' }
};

var monstersList = { 
    'slizak': {
	scale: 5.76,
	color: 0x0099ff,
	ambient: 0xddff99,
	stats: { speed: 3, attack: 4, defense: 4, health: 67,
	    magicDefense: 4, magic: 1, mana: 0, healing: false, spell: false, magicAttack: false
	},
	config: {
	    baseUrl: "slime/md2/slizak/",

	    body: "slizak.js",
	    skins: [ "slizak.jpg" ],
	    weapons:  [ [ "weapon-blender2.js", "test-sword2.gif" ] ],
	    animations: {
		    move: "run",
		    idle: "stand",
		    attack: "attack",
		    defense: "defense",
		    death: "death"
	    },
	    runSpeed: 125,
	    walkSpeed: 125,
	    crouchSpeed: 25,
	    orientations: { b: 1.57, bl: 0.75, l: 6.2, fl: 5.57, f: 4.79, fr: 3.9, r: 3.14, br: 2.35 },
	    invert: { x: true, z: true },
	    fps: 11
	},
	sounds: {
	    baseUrl: "slime/sounds/battle/",
	    parts: {
		'move': 'slizak/move',
		'attack': 'slizak/attack',
		'death': 'slizak/death',
		'spell': 'magican/spell'
	    }
	}
    },
    'slizak-necro': {
	scale: 5.76,
	color: 0x0099ff,
	ambient: 0xddff99,
	stats: { speed: 3, attack: 4, defense: 4,
		magicDefense: 4, magic: 1, health: 67, mana: 0, healing: false, spell: false, magicAttack: false
	},
	config: {
	    baseUrl: "slime/md2/slizak/",

	    body: "slizak.js",
	    skins: [ "slizak-necro2.gif" ],
	    weapons:  [ [ "weapon-blender2.js", "test-sword2.gif" ] ],
	    animations: {
		    move: "run",
		    idle: "stand",
		    attack: "attack",
		    defense: "defense",
		    death: "death"
	    },
	    runSpeed: 125,
	    walkSpeed: 125,
	    crouchSpeed: 25,
	    orientations: { b: 1.57, bl: 0.75, l: 6.2, fl: 5.57, f: 4.79, fr: 3.9, r: 3.14, br: 2.35 },
	    invert: { x: true, z: true },
	    fps: 11
	},
	sounds: {
	    baseUrl: "slime/sounds/battle/",
	    parts: {
		'move': 'slizak/move',
		'attack': 'slizak/attack',
		'death': 'slizak/death',
		'spell': 'magican/spell'
	    }
	}
    },
    'slizak-swamp': {
	scale: 5.76,
	color: 0x0099ff,
	ambient: 0xddff99,
	stats: {
	    speed: 4, attack: 4, defense: 4, health: 67,
	    magicDefense: 4, magic: 1, mana: 0, healing: false, spell: false, magicAttack: false
	},
	config: {
	    baseUrl: "slime/md2/slizak/",

	    body: "slizak.js",
	    skins: [ "slizak-swamp2.gif" ],
	    weapons:  [ [ "weapon-blender2.js", "test-sword2.gif" ] ],
	    animations: {
		    move: "run",
		    idle: "stand",
		    attack: "attack",
		    defense: "defense",
		    death: "death"
	    },
	    runSpeed: 125,
	    walkSpeed: 125,
	    crouchSpeed: 25,
	    orientations: { b: 1.57, bl: 0.75, l: 6.2, fl: 5.57, f: 4.79, fr: 3.9, r: 3.14, br: 2.35 },
	    invert: { x: true, z: true },
	    fps: 11
	},
	sounds: {
	    baseUrl: "slime/sounds/battle/",
	    parts: {
		'move': 'slizak/move',
		'attack': 'slizak/attack',
		'death': 'slizak/death',
		'spell': 'magican/spell'
	    }
	}
    },
    'healer': {
	scale: 4.26,
	color: 0x0099ff,
	ambient: 0xddff99,
	stats: { speed: 3, attack: 3, defense: 4, magicDefense: 5, magic: 7, health: 74, 
		    mana: 21, healing: true, spell: false, magicAttack: false
	},
	config: {
	    baseUrl: "slime/md2/healer/",

	    body: "healer.js",
	    skins: [ "healer.gif" ],
	    weapons:  [ [ "weapon-blender2.js", "test-sword2.gif" ] ],
	    animations: {
		    idle: "stand",
		    healing: "healing",
		    attack: "attack",
		    move: "run",
		    defense: "defense",
		    death: "death"
	    },
	    runSpeed: 195,
	    walkSpeed: 125,
	    crouchSpeed: 25,
	    orientations: { b: 1.57, bl: 0.75, l: 6.2, fl: 5.57, f: 4.79, fr: 3.9, r: 3.14, br: 2.35 },
	    invert: { x: true, z: true },
	    fps: 11
	},
	sounds: {
	    baseUrl: "slime/sounds/battle/",
	    parts: {
		'move': 'healer/move',
		'attack': 'slizak/attack',
		'death': 'slizak/death',
		'healing': 'healer/heal'
	    }
	}
    },
    'healer-necro': {
	scale: 4.26,
	color: 0x0099ff,
	ambient: 0xddff99,
	stats: {
	    speed: 3, attack: 3, defense: 4,
	    magicDefense: 5, magic: 7, health: 74, mana: 21,
	    healing: true, spell: false, magicAttack: false
	},
	config: {
	    baseUrl: "slime/md2/healer/",

	    body: "healer.js",
	    skins: [ "healer-necro2.gif" ],
	    weapons:  [ [ "weapon-blender2.js", "test-sword2.gif" ] ],
	    animations: {
		    idle: "stand",
		    healing: "healing",
		    attack: "attack",
		    move: "run",
		    defense: "defense",
		    death: "death"
	    },
	    runSpeed: 195,
	    walkSpeed: 125,
	    crouchSpeed: 25,
	    orientations: { b: 1.57, bl: 0.75, l: 6.2, fl: 5.57, f: 4.79, fr: 3.9, r: 3.14, br: 2.35 },
	    invert: { x: true, z: true },
	    fps: 11
	},
	sounds: {
	    baseUrl: "slime/sounds/battle/",
	    parts: {
		'move': 'healer/move',
		'attack': 'slizak/attack',
		'death': 'slizak/death',
		'healing': 'healer/heal'
	    }
	}
    },
    'healer-swamp': {
	scale: 4.26,
	color: 0x0099ff,
	ambient: 0xddff99,
	stats: {
	    speed: 3, attack: 3, defense: 4,
	    magicDefense: 5, magic: 7, health: 74, mana: 21,
	    healing: true, spell: false, magicAttack: false
	},
	config: {
	    baseUrl: "slime/md2/healer/",

	    body: "healer.js",
	    skins: [ "healer-swamp2.gif" ],
	    weapons:  [ [ "weapon-blender2.js", "test-sword2.gif" ] ],
	    animations: {
		    idle: "stand", healing: "healing", attack: "attack", move: "run", defense: "defense", death: "death"
	    },
	    runSpeed: 195,
	    walkSpeed: 125,
	    crouchSpeed: 25,
	    orientations: { b: 1.57, bl: 0.75, l: 6.2, fl: 5.57, f: 4.79, fr: 3.9, r: 3.14, br: 2.35 },
	    invert: { x: true, z: true },
	    fps: 11
	},
	sounds: {
	    baseUrl: "slime/sounds/battle/",
	    parts: {
		'move': 'healer/move',
		'attack': 'slizak/attack',
		'death': 'slizak/death',
		'healing': 'healer/heal'
	    }
	}
    },
    'magican': {
	scale: 14.26,
	color: 0x0099ff,
	ambient: 0xddff99,
	stats: {
	    speed: 2, attack: 1, defense: 4, health: 80, 
	    magicDefense: 6, magic: 6, mana: 135,
	    healing: false, spell: true, magicAttack: true,
	    spellsList: [
		'slime', 'boggy'
	    ],
	    activeSpell: 'boggy'
	},
	config: {
	    baseUrl: "slime/md2/magican/",

	    body: "magican.js",
	    skins: [ "mage.gif" ],
	    weapons:  [ [ "weapon-blender2.js", "test-sword2.gif" ] ],
	    animations: {
		    idle: "stand",
		    healing: "healing",
		    attack: "spell",
		    spell: "spell",
		    move: "run",
		    defense: "defense",
		    death: "death"
	    },
	    runSpeed: 195,
	    walkSpeed: 125,
	    crouchSpeed: 25,
	    orientations: { b: 1.57, bl: 0.75, l: 6.2, fl: 5.57, f: 4.79, fr: 3.9, r: 3.14, br: 2.35 },
	    invert: { x: true, z: true },
	    fps: 11
	},
	sounds: {
	    baseUrl: "slime/sounds/battle/",
	    parts: {
		'move': 'healer/move',
		'attack': 'magican/attack',
		'death': 'slizak/death',
		'spell': 'magican/spell'
	    }
	}
    },
    'magican-necro': {
	scale: 14.26,
	color: 0x0099ff,
	ambient: 0xddff99,
	stats: {
	    speed: 2, attack: 1, defense: 4,
	    magicDefense: 6, magic: 6, health: 80, mana: 130,
	    healing: false, spell: true, magicAttack: true,
	    spellsList: [ 'darknessSlime', 'mummify', 'ringOfFear' ],
	    activeSpell: 'mummify'
	},
	config: {
	    baseUrl: "slime/md2/magican/",

	    body: "magican.js",
	    skins: [ "mage-necro.gif" ],
	    weapons:  [ [ "weapon-blender2.js", "test-sword2.gif" ] ],
	    animations: {
		    idle: "stand", healing: "healing", attack: "spell", spell: "spell", move: "run",
		    defense: "defense", death: "death"
	    },
	    runSpeed: 195,
	    walkSpeed: 125,
	    crouchSpeed: 25,
	    orientations: { b: 1.57, bl: 0.75, l: 6.2, fl: 5.57, f: 4.79, fr: 3.9, r: 3.14, br: 2.35 },
	    invert: { x: true, z: true },
	    fps: 11
	},
	sounds: {
	    baseUrl: "slime/sounds/battle/",
	    parts: {
		'move': 'healer/move',
		'attack': 'magican/attack',
		'death': 'slizak/death',
		'spell': 'magican/spell3'
	    }
	}
    },
    'magican-swamp': {
	scale: 14.26,
	color: 0x0099ff,
	ambient: 0xddff99,
	stats: {
	    speed: 2, attack: 1, defense: 4, health: 80,
	    magicDefense: 6, magic: 6, mana: 125,
	    healing: false, spell: true, magicAttack: true,
	    spellsList: [ 'slimeMud', 'boggy', 'darknessSlime' ],
	    activeSpell: 'boggy'
	},
	config: {
	    baseUrl: "slime/md2/magican/",

	    body: "magican.js",
	    skins: [ "mage-swamp.gif" ],
	    weapons:  [ [ "weapon-blender2.js", "test-sword2.gif" ] ],
	    animations: {
		    idle: "stand", healing: "healing", attack: "spell", spell: "spell",
		    move: "run", defense: "defense", death: "death"
	    },
	    runSpeed: 195,
	    walkSpeed: 125,
	    crouchSpeed: 25,
	    orientations: { b: 1.57, bl: 0.75, l: 6.2, fl: 5.57, f: 4.79, fr: 3.9, r: 3.14, br: 2.35 },
	    invert: { x: true, z: true },
	    fps: 11
	},
	sounds: {
	    baseUrl: "slime/sounds/battle/",
	    parts: {
		'move': 'healer/move',
		'attack': 'magican/attack',
		'death': 'slizak/death',
		'spell': 'magican/spell2'
	    }
	}
    },
    'octopus': {
	scale: 1.46,
	color: 0x0099ff,
	ambient: 0xddff99,
	stats: { speed: 3, attack: 5, defense: 5, health: 95,
	    magicDefense: 4, magic: 1, mana: 0, healing: false, spell: false, magicAttack: false
	},
	config: {
	    baseUrl: "slime/md2/octopus/",

	    body: "octopus.js",
	    skins: [ "octopus.jpg" ],
	    weapons:  [ [ "weapon-blender2.js", "test-sword2.gif" ] ],
	    animations: {
		    move: "run",
		    idle: "stand",
		    attack: "attack",
		    defense: "defense",
		    death: "death"
	    },
	    runSpeed: 125,
	    walkSpeed: 125,
	    crouchSpeed: 25,
	    orientations: { b: 1.57, bl: 0.75, l: 6.2, fl: 5.57, f: 4.79, fr: 3.9, r: 3.14, br: 2.35 },
	    invert: { x: true, z: true },
	    fps: 11
	},
	sounds: {
	    baseUrl: "slime/sounds/battle/",
	    parts: {
		'move': 'octopus/move',
		'attack': 'slizak/attack',
		'death': 'slizak/death',
		'spell': 'magican/spell'
	    }
	}
    },
    'octopus-necro': {
	scale: 1.46,
	color: 0x0099ff,
	ambient: 0xddff99,
	stats: { speed: 3, attack: 5, defense: 5, health: 95,
	    magicDefense: 4, magic: 1, mana: 0, healing: false, spell: false, magicAttack: false
	},
	config: {
	    baseUrl: "slime/md2/octopus/",

	    body: "octopus.js",
	    skins: [ "octopus-necro.jpg" ],
	    weapons:  [ [ "weapon-blender2.js", "test-sword2.gif" ] ],
	    animations: {
		    move: "run",
		    idle: "stand",
		    attack: "attack",
		    defense: "defense",
		    death: "death"
	    },
	    runSpeed: 125,
	    walkSpeed: 125,
	    crouchSpeed: 25,
	    orientations: { b: 1.57, bl: 0.75, l: 6.2, fl: 5.57, f: 4.79, fr: 3.9, r: 3.14, br: 2.35 },
	    
	    invert: { x: true, z: true },
	    fps: 11
	},
	sounds: {
	    baseUrl: "slime/sounds/battle/",
	    parts: {
		'move': 'octopus/move',
		'attack': 'slizak/attack',
		'death': 'slizak/death',
		'spell': 'magican/spell'
	    }
	}
    },
    'octopus-swamp': {
	scale: 1.46,
	color: 0x0099ff,
	ambient: 0xddff99,
	stats: { speed: 4, attack: 5, defense: 5, health: 95,
	    magicDefense: 4, magic: 1, mana: 0, healing: false, spell: false, magicAttack: false
	},
	config: {
	    baseUrl: "slime/md2/octopus/",

	    body: "octopus.js",
	    skins: [ "octopus-swamp.jpg" ],
	    weapons:  [ [ "weapon-blender2.js", "test-sword2.gif" ] ],
	    animations: {
		    move: "run",
		    idle: "stand",
		    attack: "attack",
		    defense: "defense",
		    death: "death"
	    },
	    runSpeed: 125,
	    walkSpeed: 125,
	    crouchSpeed: 25,
	    orientations: { b: 1.57, bl: 0.75, l: 6.2, fl: 5.57, f: 4.79, fr: 3.9, r: 3.14, br: 2.35 },
	    invert: { x: true, z: true },
	    fps: 11
	},
	sounds: {
	    baseUrl: "slime/sounds/battle/",
	    parts: {
		'move': 'octopus/move',
		'attack': 'slizak/attack',
		'death': 'slizak/death',
		'spell': 'magican/spell'
	    }
	}
    }
};
