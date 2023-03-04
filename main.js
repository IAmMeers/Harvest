const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/ChiefSprites.png");
ASSET_MANAGER.queueDownload("./sprites/Guns.png");


ASSET_MANAGER.queueDownload("./sprites/GruntSprites.png");
ASSET_MANAGER.queueDownload("./sprites/grunt.png");
ASSET_MANAGER.queueDownload("./sprites/elite.png");
ASSET_MANAGER.queueDownload("./sprites/brute.png");

ASSET_MANAGER.queueDownload("./sprites/Grass Blocks.png");
ASSET_MANAGER.queueDownload("./sprites/EarthBlocks.png");
ASSET_MANAGER.queueDownload("./sprites/EarthBlocks2.png");
ASSET_MANAGER.queueDownload("./sprites/EarthBlocks3.png");
ASSET_MANAGER.queueDownload("./sprites/BuildingBlocks.png");
ASSET_MANAGER.queueDownload("./sprites/BuildingDoor.png");
ASSET_MANAGER.queueDownload("./sprites/Healthpack.png");
ASSET_MANAGER.queueDownload("./sprites/HaloPod1.png");
ASSET_MANAGER.queueDownload("./sprites/HaloPod2.png");
ASSET_MANAGER.queueDownload("./sprites/tree1.png");
ASSET_MANAGER.queueDownload("./sprites/tree2.png");
ASSET_MANAGER.queueDownload("./sprites/BasicTrees.png");

ASSET_MANAGER.queueDownload("./images/FOREST.png")
ASSET_MANAGER.queueDownload("./images/cityfar.png")
ASSET_MANAGER.queueDownload("./images/nightsky.png")
ASSET_MANAGER.queueDownload("./images/cityclose.png")
ASSET_MANAGER.queueDownload("./images/nightBG.png")
ASSET_MANAGER.queueDownload("./images/backtrees.png")
ASSET_MANAGER.queueDownload("./images/fronttrees.png")
ASSET_MANAGER.queueDownload("./images/haloring.png");
ASSET_MANAGER.queueDownload("./images/covenantGlass.png");
ASSET_MANAGER.queueDownload("./images/cityFlames.png");
ASSET_MANAGER.queueDownload("./images/skyBurning.png");

ASSET_MANAGER.queueDownload("./music/Halo.mp3");
ASSET_MANAGER.queueDownload("./sounds/assault_rifle_dryfire.wav");
ASSET_MANAGER.queueDownload("./sounds/assault_rifle_fire_brown2_1.wav");
ASSET_MANAGER.queueDownload("./sounds/assault_rifle_fire_brown2_2.wav");
ASSET_MANAGER.queueDownload("./sounds/assault_rifle_fire_brown2_3.wav");
ASSET_MANAGER.queueDownload("./sounds/assault_rifle_fire_brown2_4.wav");
ASSET_MANAGER.queueDownload("./sounds/ar_ammo_ar_reload.wav");
ASSET_MANAGER.queueDownload("./sounds/plasma_rifle_fire_plasmarifle1.wav")

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	//console.log("Hello world");



	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;
	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;



	//document.documentElement.style.cursor = 'none';

	canvas.requestPointerLock = canvas.requestPointerLock ||
		canvas.mozRequestPointerLock;



	document.exitPointerLock = document.exitPointerLock ||
		document.mozExitPointerLock;



	//console.log(floorCollisions);

	if (document.pointerLockElement === canvas ||
		document.mozPointerLockElement === canvas) {
		console.log('The pointer lock status is now locked');
	} else {
		console.log('The pointer lock status is now unlocked');
	}




	let scene = new SceneManager(gameEngine);
	gameEngine.sceneManager = scene;
	gameEngine.addEntityToFront(scene);



	// layer = new Layer(nightsky, 0);
	// gameEngine.addEntity(layer)

	ctx.imageSmoothingEnabled = false;


	gameEngine.init(ctx);

	gameEngine.start();
});
