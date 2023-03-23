
class Ship {
    constructor(game, x, y, r, lives) {
        const canvWidth = game.width; // find by id?
        const canvHeight = game.height; // find by id?
        const shipSize = 30; //30 px 

        this.x = canv.width / 2; //starting x
        this.y = canv.height / 2; //starting y
        this.r = r; //radius
        this.lives = lives;
    }    

    tick(game) {

    }
}