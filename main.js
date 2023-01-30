const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/testmap.png");
ASSET_MANAGER.queueDownload("./img/background.png");
ASSET_MANAGER.queueDownload("./img/ForrestMap.png");

ASSET_MANAGER.queueDownload("./sprites/tempPlayer.png");
ASSET_MANAGER.queueDownload("./sprites/ChiefSprites.png");
ASSET_MANAGER.queueDownload("./sprites/Guns.png");

ASSET_MANAGER.queueDownload("./sprites/bricks.png");


ASSET_MANAGER.queueDownload("./images/cityfar.png")
ASSET_MANAGER.queueDownload("./images/nightsky.png")
ASSET_MANAGER.queueDownload("./images/cityclose.png")

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

	gameEngine.addEntity(new SceneManager(gameEngine));

	let nightsky = ASSET_MANAGER.getAsset("./images/nightsky.png")
	let cityclose = ASSET_MANAGER.getAsset("./images/cityclose.png")

	// for the parallax 
	let layer = new Layer(cityclose, 0.2);
	gameEngine.addEntity(layer);


	layer = new Layer(nightsky, 0);
	gameEngine.addEntity(layer)




	ctx.imageSmoothingEnabled = false;


	gameEngine.init(ctx);

	gameEngine.start();
});
