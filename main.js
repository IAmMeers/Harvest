const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();


ASSET_MANAGER.queueDownload("./levelTest1.png");
ASSET_MANAGER.queueDownload("./sprites/G1_MIDDLE_TOP.png");
ASSET_MANAGER.queueDownload("./img/testmap.png");
ASSET_MANAGER.queueDownload("./img/background.png");
ASSET_MANAGER.queueDownload("./sprites/tempPlayer.png")
ASSET_MANAGER.queueDownload("./sprites/ChiefSprites.png");
ASSET_MANAGER.queueDownload("./sprites/sniper1.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	console.log("Hello world");



	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;
	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;


	//document.documentElement.style.cursor = 'none';

	canvas.requestPointerLock = canvas.requestPointerLock ||
		canvas.mozRequestPointerLock;



	document.exitPointerLock = document.exitPointerLock ||
		document.mozExitPointerLock;



	console.log(floorCollisions);

	// canvas.onclick = () => {
	// 	canvas.requestPointerLock();
	// }

	if (document.pointerLockElement === canvas ||
		document.mozPointerLockElement === canvas) {
		console.log('The pointer lock status is now locked');
	} else {
		console.log('The pointer lock status is now unlocked');
	}



	// Attempt to unlock




	ctx.imageSmoothingEnabled = false;


	new SceneManager(gameEngine);




	ctx.imageSmoothingEnabled = false;
	// Add the Character
	gameEngine.addEntity(new MasterChief(gameEngine));

	gameEngine.init(ctx);

	gameEngine.start();
});
