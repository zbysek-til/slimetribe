(function(){
	var tick = 0;
	//var imagesList = [ { id: 'map', url: 'slime-genesis/textures/ground/map02light.png', w: 128, h: 128 } ];
	var images = 
	{
	    loaded: false,
	    list: [ { id: 'map', url: 'slime-genesis/textures/ground/map02light.png', w: 128, h: 128 } ]
	};

	var resources = 
	{
	    images: 
	    {
			map: { image: {}, canvas: {}, w: 128, h: 128 }
	    }
	};

	var settings =
    {
		graphics: 
		{
		    shadows: 'low',
		    antialiasing: true,
		    models: { name: 'Low', id: 'low', groundGridX: 127, groundGridY: 127, divider: 3 }
		}
    };

    var world =
    {
		ready: false,
		ground: { width: 4096, height: 4096 },
		skybox: { size: 4096, imagesPath: "slime-genesis/images/skybox/space/", loaded: false },
		ambientObjects: [],
		ambientMap: [],
		collisionMap: [],
		heightMap: []
	
    };

	var gameData = 
	{
	    character: 
	    {
			loaded: false,
			health: 100,
			object: {},
			md2: {},
			gyro: {},
			md2base: {},
			stats: {},
			controls: 
			{
			    reverseY: false,
			    reverseX: false
			},
			position: 
			{
			    x: 0, y: 87.6, z: 0
			},
			currentPosition: 
			{
			    x: 0, y: 72.6, z: 0
			},
			torch: {}
	    },

	    player: 
	    {
			config: 
			{
				baseUrl: "slime-genesis/md2/slizak/",
				
			    body: "slizak.json",
			    skins: [ "slizak-red.gif" ],
			    weapons:  [ [ "weapon-blender2.json", "test-sword2.gif" ] ],
			    animations: {
				    move: "run",
				    idle: "stand",
				    attack: "attack",
				    grow: "grow"
			    },
			    runSpeed: 130,
			    walkSpeed: 130,
			    crouchSpeed: 25
			},
			params: 
			{
			    scale: 3.430
			},
			items: 
			{
			    'rock1': 1,
			    'mushrom1': 0
			},
			stats: 
			{
			    health: 90,
			    healthRemain: 90,
			    experience: 0,
			    level: 1,
			    attack: 3,
			    defense: 4
			}
	    }
	};


	var gameMenu = {
	    'main': {
		'new': { 'name': 'New Game' },
		'load': { 'name': 'Load Game' },
		'character': { 'name': 'Character Editor' },
		'settings': {
		    'graphics': { 
			'shadows': [
			    { 'name': 'None', 'id': 'none' },
			    { 'name': 'Low', 'id': 'low' },
			    { 'name': 'Medium', 'id': 'medium' },
			    { 'name': 'High', 'id': 'high' }
			],
			'antialiasing': [
			    { 'name': 'Yes', 'id': true },
			    { 'name': 'No', 'id': false }
			],
			'postprocessing': [
			    { 'name': 'None', 'id': 'none' },
			    { 'name': 'Low', 'id': 'low' },
			    { 'name': 'High', 'id': 'high' }
			],
			'models': [
			    { 'name': 'Low', 'id': 'low', 'groundGridX': 32, 'groundGridY': 32 },
			    { 'name': 'Medium', 'id': 'medium', 'groundGridX': 128, 'groundGridY': 128 },
			    { 'name': 'High', 'id': 'High', 'groundGridX': 512, 'groundGridY': 512 },
			]
		    },
		    'controls': {
			'define': [
			    { 'name': 'Up', 'id': 'UP' },
			    { 'name': 'Down', 'id': 'DOWN' },
			    { 'name': 'Left', 'id': 'LEFT' },
			    { 'name': 'Right', 'id': 'RIGHT' },
			    { 'name': 'Jump', 'id': 'JUMP' },
			    { 'name': 'Sprint', 'id': 'SPRINT' },
			    { 'name': 'Use', 'id': 'USE' },
			    { 'name': 'Attack', 'id': 'ATTACK' },
			    { 'name': 'Defense', 'id': 'DEFENSE' }
			],
			'sensitivity': [
			    { 'name': 'Low', 'id': 'low' },
			    { 'name': 'High', 'id': 'high' }
			]
		    }
		}
	    }
	}
	
	Data = function()
	{
		this.getImagesList = function()
		{
			return images.list;
		};

		this.getImagesLoaded = function()
		{
			return images.loaded;
		};

		this.setImagesLoaded = function( state )
		{
			images.loaded = state;
		};

		this.getSkyboxLoaded = function()
		{
			return world.skybox.loaded;
		};

		this.setSkyboxLoaded = function( state )
		{
			world.skybox.loaded = state;
		};

		this.getResourcesImage = function( id )
		{
			return resources.images[ id ];
		};

		this.getSettings = function( section )
		{
			if( false === utils.has( settings, section ) ) return false;
			return settings[section];
		};

		this.getWorld = function( section )
		{
			if( false === utils.has( world, section ) ) return false;
			return world[section];
		};

		this.getWorldReady = function()
		{
			return world.ready;
		};

		this.setWorldReady = function( state )
		{
			world.ready = state;
		};

		this.getPlayer = function()
		{
			return gameData.player;
		};

		this.getCharacter = function()
		{
			return gameData.character;
		};

	}
})();

var groundHeightMap;
var vectorsGround = [];
var vectors = [];
var w;
var characters = [];
var nCharacters = 0;
var cameraControls;
var controls = {
	moveForward: false,
	moveBackward: false,
	moveLeft: false,
	moveRight: false,
	jump: false,
	attack: false,
	block: false,
	grow: false,
	lockForward: false,
	lockBackward: false,
	lockLeft: false,
	lockRight: false
};

var t = 0;