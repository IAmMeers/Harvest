class Ground {
    constructor(game, x, y, w, width, height, imgX, imgY) {
        Object.assign(this, { game, x, y, w, width, height, imgX, imgY });

        // this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bricks.png");
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/citytiles.png");






        this.BB = new BoundingBox(this.x, this.y, this.w, this.height);
        this.leftBB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH)
        this.rightBB = new BoundingBox(this.x + PARAMS.BLOCKWIDTH, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH)







        // this.floorCollisions2D = [];

        // //for every 50 tiles, create a new subarray
        // for (let i = 0; i < floorCollisions.length; i += 50) {
        //     this.floorCollisions2D.push(floorCollisions.slice(i, i + 50));

        // }



    };

    update() {
    };

    // drawMinimap(ctx, mmX, mmY) {
    //     ctx.fillStyle = "Brown";
    //     ctx.fillRect(mmX + this.x / PARAMS.BITWIDTH, mmY + this.y / PARAMS.BITWIDTH, this.w / PARAMS.BITWIDTH, PARAMS.SCALE * 2);
    // };

    draw(ctx) {
        let brickCount = this.w / PARAMS.BLOCKWIDTH;
        //    for (var i = 0; i < brickCount; i++) {



        // ctx.drawImage(this.spritesheet, 0, 0, 16, 16, this.x + i * PARAMS.BLOCKWIDTH - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        // ctx.drawImage(this.spritesheet, 0, 0, 16, 16, this.x + i * PARAMS.BLOCKWIDTH - this.game.camera.x, this.y + PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);


        // ctx.fillRect(this.x - this.game.camera.x, this.y, this.width, this.height);
        ctx.drawImage(this.spritesheet, this.imgX, this.imgY, 32, 32, Math.round(this.x - this.game.camera.x), Math.round(this.y - this.game.camera.y), PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);

        //  ctx.fillRect(this.x + i * PARAMS.BLOCKWIDTH - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        // ctx.fillRect(this.x + i * PARAMS.BLOCKWIDTH - this.game.camera.x, this.y + PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);

        //  }
        ctx.strokeStyle = 'red';
        // ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        //  if (this.BB.x !== -1 && this.BB.y !== -1 && this.BB.width !== -1 && this.BB.height !== -1) {
        // ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        // }





    };


};