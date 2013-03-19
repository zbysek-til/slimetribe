Game.Grid = {};
Game.Grid = {
    reset: function( first ) {
	first = ( first === "undefined" ) ? false : first;
	for( var x = 0; x < gameData.battle.plane.gridWidth; x++ ) {
	    if( first === true ) {
		gameData.battle.plane.grid[x] = [];
		heroes.left.grid[x] = [];
		heroes.left.monsters[x] = [];
		heroes.right.grid[x] = [];
		heroes.right.monsters[x] = [];
		monstersModels[x] = [];
		deathGridModels[x] = [];
	    }
	    for( var y = 0; y < gameData.battle.plane.gridHeight; y++ ) {
		if( first !== true && monstersModels[x][y] !== 0 ) scene.remove( monstersModels[x][y].root );
		gameData.battle.plane.grid[x][y] = 0;
		heroes.left.grid[x][y] = 0;
		heroes.left.monsters[x][y] = 0;
		heroes.right.grid[x][y] = 0;
		heroes.right.monsters[x][y] = 0;
		monstersModels[x][y] = 0;
		deathGridModels[x][y] = 0;
	    }
	}
    },
    generateMap: function() {
	var currX = gameData.battle.plane.halfStep;
	var currY = 0 - gameData.battle.plane.halfStep;
	currY += gameData.battle.plane.step;
	var initX = gameData.battle.plane.halfStep;
	for( x = gameData.battle.plane.gridWidth - 1; x >= 0;  x-- ) {
	    for( y = 0; y < gameData.battle.plane.gridHeight; y++ ) {
		Game.Scene.Graphics.addGridCube( { size: BATTLE_GRID.size, x: currX, y: 0, z: currY, gridX: x, gridY: y } );
		currX += gameData.battle.plane.step;
	    }
	    currX = initX;
	    currY += gameData.battle.plane.step;
	}
    },
    switchCube: function( params ) {
	gameData.battle.selection.hero.grid[params.x2][params.y2] = gameData.battle.selection.hero.grid[params.x][params.y];
	gameData.battle.selection.hero.monsters[params.x2][params.y2] = gameData.battle.selection.hero.monsters[params.x][params.y];
	gameData.battle.plane.grid[params.x2][params.y2] = gameData.battle.plane.grid[params.x][params.y];
	monstersModels[params.x2][params.y2] = monstersModels[params.x][params.y];
	gameData.battle.selection.hero.grid[params.x][params.y] = 0;
	gameData.battle.selection.hero.monsters[params.x][params.y] = 0;
	gameData.battle.plane.grid[params.x][params.y] = 0;
	monstersModels[params.x][params.y] = 0;
    },
    showGridPath: function( params, path ) {
	for( i in path ) {
	    Game.Scene.Graphics.setGridCube( gridModels[gridModelsCords[path[i].x][path[i].y]].object, params );
	}
    },
    clearGrid: function( params, except ) {
	for( i in gridModels ) {
	    if( typeof except === "undefined" || except != i ) Game.Scene.Graphics.setGridCube( gridModels[i].object, params );
	}
    },
    showGrid: function( params, pos ) {
	Game.Scene.Graphics.setGridCube( gridModels[gridModelsCords[pos.x][pos.y]].object, params );
    },
    showPlayer: function( pos ) {
	if( typeof gameData.battle.selection.hero.monsters[pos.x] === "undefined" ) return;
	var params = BATTLE_GRID.neutral;
	if( typeof gameData.battle.selection.hero.monsters[pos.x][pos.y] === "object" ) {
	    params = ( gameData.battle.selection.hero.monsters[pos.x][pos.y].speedRemain === 0 ) ? BATTLE_GRID.noMove : BATTLE_GRID.free;
	} else if( gameData.battle.selection.enemyHero.grid[pos.x][pos.y] !== 0 ) {
	    params = BATTLE_GRID.enemy;
	}
	Game.Grid.showGrid( params, pos );
    },

    
    
    generateCharacters: function( character, left, rot, x ) {
	var tempX = x;
	for( i in character.army ) {
	    var monsterPack = character.army[i];
	    for( p in monsterPack.pos ) {
		var monster = monsterPack.pos[p];
		++gameData.loader.jsonCount;
		++gameData.loader.jsonCountAll;
		tempX = ( x === undefined ) ? monster[0] : ( gameData.battle.plane.gridWidth - 1 ) - monster[0];
		var cords = Game.Grid.gridToCords( tempX, monster[1] );
		Game.Grid.addCharacter( monstersList[monsterPack.name], cords[1], 0, cords[0], tempX, monster[1], rot, left );
	    }
	}
    },
    casting: function() {
	try {
	    var raycaster = projector.pickingRay( mouse2D.clone(), camera );
	    var grid = [];
	    for( i in gridModels ) grid.push( gridModels[i].object );
	    var intersects = raycaster.intersectObjects( grid );
	    if ( intersects.length === 0 ) throw "no intersect";
	    var cords = Game.Grid.findById( intersects[0].object.id );
	    if( cords.length === 0 ) throw "no cords for intersect";
	    //cords.push( intersects[0].object.id );
	    //if( typeof monstersModels[cords[0]][cords[1]] === "object" ) cords.push( monstersModels[cords[0]][cords[1]] );
	} catch( e ) {
	    return false;
	}    
	return cords;
    },
    addCharacter: function( params, x, y, z, gridX, gridY, rotation, left ) {
	if( monstersModels[gridX] === undefined ) monstersModels[gridX] = [];
	gameData.battle.plane.grid[gridX][gridY] = 1;
	monstersModels[gridX][gridY] = new THREE.MD2CharacterComplex();
	monstersModels[gridX][gridY].scale = params.scale;
	monstersModels[gridX][gridY].controls = Game.Utils.cloneObj( controls );
	monstersModels[gridX][gridY].orientations = params.config.orientations;
	monstersModels[gridX][gridY].invert = params.config.invert;
	monstersModels[gridX][gridY].animationFPS = params.config.fps;
	monstersModels[gridX][gridY].loadParts( params.config );
	monstersModels[gridX][gridY].onLoadComplete = function () {
		monstersModels[gridX][gridY].enableShadows( true );
		monstersModels[gridX][gridY].setSkin( 0 );
		monstersModels[gridX][gridY].root.position.x = x;
		monstersModels[gridX][gridY].root.position.y = y;
		monstersModels[gridX][gridY].root.position.z = z;
		monstersModels[gridX][gridY].bodyOrientation = rotation;
		scene.add( monstersModels[gridX][gridY].root );
		var hero = ( left ) ? heroes.left : heroes.right;
		hero.grid[gridX][gridY] = monstersModels[gridX][gridY].root.id;
		hero.monsters[gridX][gridY] = Game.Utils.cloneObj( params );
		hero.monsters[gridX][gridY]['speedRemain'] = params.stats.speed;
		hero.monsters[gridX][gridY]['manaRemain'] = params.stats.mana;
		hero.monsters[gridX][gridY]['healthRemain'] = ( params.stats.health );
		--gameData.loader.jsonCount;
		Game.Html.updateLoadingBar();
		if( gameData.loader.jsonCount === 0 ) gameData.loader.jsonLoaded = true;
	};
    },
    findById: function( id ) {
	if( gridModels[id] ) {
	    var cords = gridModels[id].gridCords.split(':');
	    return cords;
	}
	return [];
    },
    gridToCords: function( x, y ) {
	x = parseInt( x );
	y = parseInt( y );
	var step = gameData.battle.plane.step;
	var halfStep = gameData.battle.plane.halfStep;
	var cords = [];
	cords[0] = ( ( gameData.battle.plane.gridWidth - ( x + 1 ) ) * step ) + halfStep;
	cords[1] = ( y * step ) + halfStep;
	return cords;
    },

    cordsToGrid: function( x, y ) {
	x = parseFloat( x );
	y = parseFloat( y );
	var step = gameData.battle.plane.step;
	var halfStep = gameData.battle.plane.halfStep;
	y -= halfStep;
	var cords = [];
	var gridX = Math.round( ( gameData.battle.world.ground.width - x ) / step );
	var gridY = Math.round( y / step );
	cords.push( gridX );
	cords.push( gridY );
	return cords;
    },
    select: function( params ) {
        gameData.battle.selection.selected = true;
        gameData.battle.selection.x = params.x;
        gameData.battle.selection.y = params.y;
        Game.Grid.showGrid( BATTLE_GRID.free, { x: params.x, y: params.y } );
        var posAbsolute = Game.Grid.cordsToGrid( params.x, params.y );
        Game.Scene.Lights.setPosition( torch, { x: posAbsolute[0], y: posAbsolute[1] } );
    },
    unselect: function( params ) {
        gameData.battle.selection.selected = false;
        //gameData.battle.selection.x = -1;
        //gameData.battle.selection.y = -1;
	
        Game.Grid.showGrid( BATTLE_GRID.none, { x: params.x, y: params.y } );
	
        Game.Scene.Lights.setPosition( torch, { x: -1000, y: -1000 } );
    }



}