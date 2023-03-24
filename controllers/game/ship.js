
class Ship {
    constructor(game, x, y, r, lives, speed) {
        // const canvWidth = game.width; // find by id?
        // const canvHeight = game.height; // find by id?
        // const shipSize = 30; //30 px 
        this.input = {x:0, y:0}
        this.x = game.width / 2; //starting x
        this.y = game.height / 2; //starting y
        this.r = r; //radius
        this.lives = lives;
        this.speed = speed;
        this.xv = 0;
        this.yv = 0;
        this.friction = .93;
        // this.angle = 0 * (Math.pi / 180);

    }    

    tick(game) {
        this.xv *= this.friction;
        this.yv *= this.friction;
        this.x += this.xv;
        this.y += this.yv;
        this.xv +=this.input.x * this.speed;
        this.yv +=this.input.y * this.speed;
        if(this.x < 0 - this.r) {
            this.x = game.width + this.r;
        }         
        if(this.x > game.width + this.r) {
            this.x = 0 - this.r;
        } 
        if(this.y < 0 - this.r) {
            this.y = game.height + this.r;
        }         
        if(this.y > game.height + this.r) {
            this.y = 0 - this.r;
        } 

    }
}
module.exports = Ship