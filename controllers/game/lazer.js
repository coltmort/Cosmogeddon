
class Lazer {
    constructor(x, y, angle, speed, start) {
        this.x = x;
        this.y = y;
        this.xv = Math.sin(angle) * speed; 
        this.yv = Math.cos(angle) * speed;
        this.x += this.xv * start;
        this.y += this.yv * start;
    }

    tick(game) {
        this.x += this.xv;
        this.y += this.yv;
        if(this.x > game.width || this.x < 0 || this.y > game.height || this.y < 0) {
            game.lazers.splice(game.lazers.indexOf(this), 1);
        }
    }
}

module.exports = Lazer