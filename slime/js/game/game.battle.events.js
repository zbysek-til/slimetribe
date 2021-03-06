Game.Battle.Events = {
    mouseDown: false,
    mouseMove: false,
    
    onDocumentMouseMove: function( event ) {
	if( tick % 5 === 0 ) Game.Html.showGUI();
	if( tribe[ gameData.battle.selection.player ].ai === true ) return false;
	if( Game.Battle.Events.mouseMove === true ) {
	    Game.Battle.Events.mouseMove = ( Game.Battle.Events.mouseDown === true ) ? false : true;
	    return;
	}
	Game.Battle.Events.mouseMove = true;
        Game.Battle.Events.onMouseMoveEvent( event );
	Game.Battle.Events.mouseMove = false;
    },
    onMouseMoveEvent: function( event ) {
	try {
	    mouse2D.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	    mouse2D.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	    document.body.style.cursor = 'default';
	    var cords = Game.Battle.Grid.casting();
	    if( !cords ) throw "nogrid";
	    gameData.battle.gui.cords = cords;
	    if( gameData.animation.run === true ) throw "animation";
	    Game.Battle.Grid.clearGrid( BATTLE_GRID.none );
	    //Is selected friendly
	    showPath = false;
	    if( gameData.battle.selection.selected === false ) {
		//Is nothing on this place?
		if( gameData.battle.selection.enemyHero.monsters[cords[0]][cords[1]] === 0 && gameData.battle.selection.hero.monsters[cords[0]][cords[1]] === 0 ) {
		    Game.Battle.Grid.showGrid( BATTLE_GRID.neutral, { x: cords[0], y: cords[1] } );
		    throw "noselected";
		}
		document.body.style.cursor = 'pointer';
		Game.Battle.Grid.showPlayer( { x: cords[0], y: cords[1] } );
		throw "selected";
	    }
	    
	    if( gameData.battle.selection.selected === true ) {
		var params = ( gameData.battle.selection.hero.monsters[gameData.battle.selection.x][gameData.battle.selection.y].speedRemain === 0 ) ? BATTLE_GRID.noMove : BATTLE_GRID.free;
		Game.Battle.Grid.showGrid( params, { x: gameData.battle.selection.x, y: gameData.battle.selection.y } );
		if( gameData.battle.selection.hero.monsters[gameData.battle.selection.x][gameData.battle.selection.y].speedRemain === 0 ) throw "nospeed";

		var from = [ gameData.battle.selection.x, gameData.battle.selection.y ];
		var to = [ cords[0], cords[1] ];
		
		//Neutral - move over map
		if( gameData.battle.selection.enemyHero.monsters[cords[0]][cords[1]] === 0 && gameData.battle.selection.hero.monsters[cords[0]][cords[1]] === 0 ) {
		    gameData.battle.selection.path = [];
		    gameData.battle.selection.path = aStar( from, to, gameData.battle.plane.grid, gameData.battle.plane.gridWidth, gameData.battle.plane.gridHeight, true );
		    gameData.battle.selection.movePath = [];
		    if( gameData.battle.selection.path.length <= ( gameData.battle.selection.hero.monsters[gameData.battle.selection.x][gameData.battle.selection.y].speedRemain + 1 ) ) {
			Game.Battle.Grid.showGridPath( BATTLE_GRID.free, gameData.battle.selection.path );
			gameData.battle.selection.movePath = Game.Battle.Animation.monsterCordsPath();
			document.body.style.cursor = 'pointer';
		    }
		//Friendly Action
		} else if( gameData.battle.selection.hero.grid[cords[0]][cords[1]] !== 0 ) {
		    if( gameData.battle.selection.hero.monsters[gameData.battle.selection.x][gameData.battle.selection.y].stats.healing === true && gameData.battle.selection.hero.monsters[gameData.battle.selection.x][gameData.battle.selection.y].manaRemain > 0 && gameData.battle.selection.hero.monsters[cords[0]][cords[1]].healthRemain < gameData.battle.selection.hero.monsters[cords[0]][cords[1]].stats.health ) {
			Game.Battle.Grid.showGrid( BATTLE_GRID.healer, { x: gameData.battle.selection.x, y: gameData.battle.selection.y } );
			document.body.style.cursor = 'pointer';
			Game.Battle.Grid.showGrid( BATTLE_GRID.healing, { x: cords[0], y: cords[1] } );
		    }
		    throw "show";
		//Enemy Action
		} else if( gameData.battle.selection.enemyHero.grid[cords[0]][cords[1]] !== 0 ) {
		    //Spell
		    if( gameData.battle.selection.hero.monsters[gameData.battle.selection.x][gameData.battle.selection.y].stats.magicAttack === true ) {
			if( gameData.battle.selection.hero.monsters[gameData.battle.selection.x][gameData.battle.selection.y].manaRemain <= spellsList[ gameData.battle.selection.hero.monsters[gameData.battle.selection.x][gameData.battle.selection.y].stats.activeSpell ].manaCost ) throw "nomana";
			Game.Scene.Graphics.setGridCube( gridModels[gridModelsCords[cords[0]][cords[1]]].object, BATTLE_GRID.magic );
			Game.Scene.Graphics.setGridCube( gridModels[gridModelsCords[gameData.battle.selection.x][gameData.battle.selection.y]].object, BATTLE_GRID.magican );
		    }
		    //Attack
		    if( gameData.battle.selection.hero.monsters[gameData.battle.selection.x][gameData.battle.selection.y].stats.magicAttack === false ) {
			var from = [ parseInt( gameData.battle.selection.x ), parseInt( gameData.battle.selection.y ) ];
			var params = BATTLE_GRID.neutral;
			
			var nearAttack = ( Game.Battle.findNearAttackPath( from, cords ) === true ) ? true : false;
			var path = gameData.battle.selection.path;
			
			var isPathAttack = Game.Battle.findNearAttackPath( cords, [ path[path.length - 1].x, path[path.length - 1].y ] );
			var pathAttack = ( nearAttack === false && path.length > 1 && isPathAttack === true ) ? true : false;

			if( pathAttack || nearAttack ) {
			    gameData.battle.selection.attackCords = cords;
			    gameData.battle.selection.attack = true;
			    document.body.style.cursor = 'pointer';
			} else {
			    gameData.battle.selection.attackCords = [];
			    gameData.battle.selection.attack = false;
			}

			
			//if( paths.length > 0 && gameData.battle.selection.attack === true ) gameData.battle.selection.path = paths[0];
			if( pathAttack && gameData.battle.selection.path.length < ( gameData.battle.selection.hero.monsters[gameData.battle.selection.x][gameData.battle.selection.y].speedRemain + 2 ) ) {
			    
			    //params = ( gameData.battle.selection.attack === false ) ? BATTLE_GRID.enemyFar : BATTLE_GRID.enemy;
			    //params = BATTLE_GRID.enemy;
			    Game.Battle.Grid.showGrid( params, { x: cords[0], y: cords[1] } );
			    //if( gameData.battle.selection.attack === false ) throw "enemyfar";
			    params = BATTLE_GRID.enemy;
			    Game.Battle.Grid.showGridPath( params, gameData.battle.selection.path );
			} else if( nearAttack ) {
			    gameData.battle.selection.path = [];
			    params = BATTLE_GRID.enemy;
			} else {
			    gameData.battle.selection.path = [];
			    var params = BATTLE_GRID.enemyFar;
			}
		    }
		    throw "show enemy";
		}
	    }
	    gameData.battle.gui.cords = cords;
	} catch ( e ) {
	    if( e !== "nogrid" && e !== "enemyfar" && e !== "animation" ) {
		Game.Battle.Grid.showPlayer( { x: cords[0], y: cords[1] } );
	    }
	}
    },
    onDocumentMouseDown: function( event ) {
	//event.preventDefault();
	if( Game.Battle.Events.mouseDown === true || gameData.animation.run === true ) return;
	Game.Battle.Events.mouseDown = true;
	if( event.type == "mousedown" && event.button === 0 ) Game.Battle.Events.onDocumentMouseLeftEvent( event );
	if( event.type == "mousedown" && event.button === 2 ) Game.Battle.Events.onDocumentMouseRightEvent( event );
	Game.Battle.Events.mouseDown = false;
    },
    onDocumentMouseRightEvent: function( event ) {
	try {
	    if( gameData.battle.selection.selected === false ) throw "nobody to unselect";
	    Game.Battle.Grid.unselect( { x: gameData.battle.selection.x, y: gameData.battle.selection.y } );
	} catch( e ) {

	}
    },
    onDocumentMouseLeftEvent: function( event ) {
	try {
	    if( gameData.battle.world.ready === false ) return;
	    var cords = Game.Battle.Grid.casting();
	    if( !cords ) throw "nocasting";
	    //Check try to select
	    if( gameData.battle.selection.selected === false ) {
		if( gameData.battle.selection.hero.grid[cords[0]][cords[1]] === 0 ) throw "noselect";
		if( gameData.battle.selection.hero.monsters[cords[0]][cords[1]].speedRemain === 0 ) throw "nospeed";
		Game.Battle.Grid.select( { x: cords[0], y: cords[1] } );
		throw "action";
	    }

	    var xFrom = parseInt( gameData.battle.selection.x );
	    var yFrom = parseInt( gameData.battle.selection.y );
	    var from = [ xFrom, yFrom ];
	    var to = cords;
	    
	    //Click on empty - move / unselect
	    if( gameData.battle.selection.hero.grid[cords[0]][cords[1]] === 0 && gameData.battle.selection.enemyHero.grid[cords[0]][cords[1]] === 0 ) {
		if( gameData.battle.selection.path.length !== 0 && gameData.battle.selection.path.length <= ( gameData.battle.selection.hero.monsters[xFrom][yFrom].speedRemain + 1 ) ) {
		    gameData.battle.selection.hero.monsters[xFrom][yFrom].speedRemain = 0;
		    var settings = { x: xFrom, y: yFrom, xT: parseInt( cords[0] ), yT: parseInt( cords[1] ), move: true, moveX: parseInt( gameData.battle.selection.path[ gameData.battle.selection.path.length - 1 ].x ), moveY: parseInt( gameData.battle.selection.path[ gameData.battle.selection.path.length - 1 ].y ), grid: gameData.battle.selection.hero.grid, enemyGrid: gameData.battle.selection.enemyHero.grid, withAttack: false, nearAttack: false, withDeath: false, withHealing: false, damage: 0, withSpell: false };
		    Game.Battle.Animation.animate( settings );
		    throw "action";
		}
		throw "click on empty area with selected";
	    }

	    
	    if( gameData.battle.selection.hero.monsters[cords[0]][cords[1]] !== 0 && gameData.battle.selection.hero.monsters[cords[0]][cords[1]].stats.speedRemain === 0 ) throw "nospeed";
	    //Is no monster, unselect
	    if( gameData.battle.selection.hero.grid[cords[0]][cords[1]] === 0 && gameData.battle.selection.enemyHero.grid[cords[0]][cords[1]] === 0 ) throw "unselect";
	    //Unselect - try to select myself again
	    if( gameData.battle.selection.hero.grid[cords[0]][cords[1]] !== 0 && gameData.battle.selection.hero.monsters[cords[0]][cords[1]] === gameData.battle.selection.hero.monsters[gameData.battle.selection.x][gameData.battle.selection.y] ) throw "unselect own";
	    //Healing
	    if( gameData.battle.selection.hero.grid[cords[0]][cords[1]] !== 0 && gameData.battle.selection.hero.monsters[gameData.battle.selection.x][gameData.battle.selection.y].stats.healing === true && gameData.battle.selection.hero.monsters[gameData.battle.selection.x][gameData.battle.selection.y].manaRemain > 0 && gameData.battle.selection.hero.monsters[cords[0]][cords[1]].healthRemain < gameData.battle.selection.hero.monsters[cords[0]][cords[1]].stats.health ) {
		Game.Battle.healing( { x: gameData.battle.selection.x, y: gameData.battle.selection.y }, { x: cords[0], y: cords[1] } );
		throw "action";
	    }
	    //Unselect - select other
	    if( gameData.battle.selection.hero.grid[cords[0]][cords[1]] !== 0 && gameData.battle.selection.hero.monsters[cords[0]][cords[1]] !== gameData.battle.selection.hero.monsters[gameData.battle.selection.x][gameData.battle.selection.y] ) {
		Game.Battle.Grid.unselect( { x: gameData.battle.selection.x, y: gameData.battle.selection.y } );
		Game.Battle.Grid.select( { x: cords[0], y: cords[1] } );		
		throw "action";
	    }
	    //No speed selected - exit
	    if( gameData.battle.selection.hero.monsters[gameData.battle.selection.x][gameData.battle.selection.y].speedRemain === 0 ) throw "no way to attack";
	    //Enemy attack
	    if( gameData.battle.selection.enemyHero.grid[cords[0]][cords[1]] !== 0 ) {
		//Spell
		if( gameData.battle.selection.hero.monsters[gameData.battle.selection.x][gameData.battle.selection.y].stats.magicAttack === true ) {
		    if( gameData.battle.selection.hero.monsters[gameData.battle.selection.x][gameData.battle.selection.y].manaRemain < 1 || gameData.battle.selection.hero.monsters[gameData.battle.selection.x][gameData.battle.selection.y].manaRemain < spellsList[ gameData.battle.selection.hero.monsters[gameData.battle.selection.x][gameData.battle.selection.y].stats.activeSpell ].manaCost ) throw "no mana";
		    Game.Battle.spell( { x: gameData.battle.selection.x, y: gameData.battle.selection.y }, { x: cords[0], y: cords[1] } );
		    throw "action";
		}
		if( gameData.battle.selection.attack === false ) throw "unselectfarattack";
		//Attack
		var monsterTarget = gameData.battle.selection.path[ gameData.battle.selection.path.length - 1 ];
		var xFrom = parseInt( gameData.battle.selection.x );
		var yFrom = parseInt( gameData.battle.selection.y );
		var attack = Game.Battle.calcAttack( gameData.battle.selection.hero.monsters[xFrom][yFrom], gameData.battle.selection.enemyHero.monsters[cords[0]][cords[1]] );
		
		if( typeof monsterTarget !== "undefined" && gameData.battle.selection.path.length !== 0 && gameData.battle.selection.hero.monsters[gameData.battle.selection.x][gameData.battle.selection.y].speedRemain > ( gameData.battle.selection.path.length - 2 ) ) {
		    var settings = { x: gameData.battle.selection.x, y: gameData.battle.selection.y, xT: parseInt( cords[0] ), yT: parseInt( cords[1] ), move: true, moveX: parseInt( gameData.battle.selection.path[ gameData.battle.selection.path.length - 1 ].x ), moveY: parseInt( gameData.battle.selection.path[ gameData.battle.selection.path.length - 1 ].y ),  grid: gameData.battle.selection.hero.grid, enemyGrid: gameData.battle.selection.enemyHero.grid, withAttack: true, withHealing: false, withDeath: attack.death, damage: attack.damage, nearAttack: false, withSpell: false };
		} else {
		    if( Game.Battle.findInGrid( { x: cords[0], y: cords[1], x2: gameData.battle.selection.x, y2: gameData.battle.selection.y } ) === false ) throw "is so far";
		    var settings = { x: gameData.battle.selection.x, y: gameData.battle.selection.y, xT: parseInt( cords[0] ), yT: parseInt( cords[1] ), grid: gameData.battle.selection.hero.grid, enemyGrid: gameData.battle.selection.enemyHero.grid, withAttack: true, withHealing: false, withDeath: attack.death, damage: attack.damage, nearAttack: true, withSpell: false };
		}
		Game.Battle.Animation.animate( settings );
		//throw "action";
		//Game.Battle.Grid.select( { x: cords[0], y: cords[1] } );
		throw "action";
	    }
	} catch ( e ) {
	    if( e !== "action" && e !== "nocasting" && e !== "noselect" ) Game.Battle.Grid.unselect( { x: gameData.battle.selection.x, y: gameData.battle.selection.y } );
	}
	return;
    },
    
    initialize: function() {
	    document.addEventListener( 'mousedown', Game.Battle.Events.onDocumentMouseDown, false );
	    document.addEventListener( 'contextmenu', Game.Battle.Events.onDocumentMouseDown, false );
	    document.addEventListener( 'mousemove', Game.Battle.Events.onDocumentMouseMove, false );
    },
    uninitialize: function() {
	    document.removeEventListener( 'mousedown', Game.Battle.Events.onDocumentMouseDown, false );
	    document.removeEventListener( 'contextmenu', Game.Battle.Events.onDocumentMouseDown, false );
	    document.removeEventListener( 'mousemove', Game.Battle.Events.onDocumentMouseMove, false );
    }
};
