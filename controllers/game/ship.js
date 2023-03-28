
const Lazer = require('./lazer.js');

class Ship {
    constructor(game) {
        this.input = {forward:0, shoot:0, left:0, right: 0}
        this.x = game.width / 2; //starting x
        this.y = game.height / 2; //starting y
        this.r = 20; //radius
        this.lives = 50;
        this.reload = 0;
        this.speed = .3;
        this.torque = .06; //turning speed
        this.friction = .95;
        this.angle = 0;
        this.xv = 0;
        this.yv = 0;
    }

    tick(game) {
        this.move();
        this.shoot(game);
        this.wrap(game);
    }

    shoot(game) {
        if (this.reload > 0) { this.reload--; return;}
        if(this.input.shoot) { 
            game.lazers.push(new Lazer(this.x, this.y, this.angle, 10, 2));
            this.reload = 5;
        } 
    } 

    move(){
        this.xv *= this.friction;
        this.yv *= this.friction;
        this.x += this.xv;
        this.y += this.yv;
        this.angle += ((this.input.left - this.input.right) * this.torque) ;
        this.angle = this.angle % (2 * Math.PI); //make valid radian angle between 0 and 2 PI
        this.xv += Math.sin(this.angle) * this.input.forward * this.speed; 
        this.yv += Math.cos(this.angle) * this.input.forward * this.speed;
    }

    wrap (game) {
        if(this.x < 0 - this.r) { this.x = game.width + this.r; }
        if(this.x > game.width + this.r) { this.x = 0 - this.r; }
        if(this.y < 0 - this.r) { this.y = game.height + this.r; }
        if(this.y > game.height + this.r) { this.y = 0 - this.r; }
    }
}
module.exports = Ship