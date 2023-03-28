
class Asteroid {
    constructor(game, radius = Math.random() *100, x, y) {

        this.r = radius //radius
        if(this.r < game.smallestAsteroidRadius) { this.r = game.smallestAsteroidRadius; } 
        this.xv = Math.random() *8 -4; 
        this.yv = Math.random() *8 -4; 
        this.x=x;
        this.y=y;

        if(x == undefined){ // spawn on random edge of world if no start position is given
            switch (Math.ceil(Math.random() * 4)) {
                case 1:
                    this.x = -this.r;
                    this.y = Math.random() * game.height;
                    break;
                case 2:
                    this.x = game.width + this.r;
                    this.y = Math.random() * game.height;
                    break;
                case 3:
                    this.x = Math.random() * game.width;
                    this.y = -this.r;
                    break;
                case 4:
                    this.x = Math.random() * game.width;
                    this.y = game.height + this.r;
                    break;
            }
        } 
           
    };

    tick(game) {
        this.x += this.xv;
        this.y += this.yv;
        this.wrap(game);
    }

    wrap (game) {
        if(this.x < 0 - this.r) { this.x = game.width + this.r; }
        if(this.x > game.width + this.r) { this.x = 0 - this.r; }
        if(this.y < 0 - this.r) { this.y = game.height + this.r; }
        if(this.y > game.height + this.r) { this.y = 0 - this.r; }
    }
}

module.exports = Asteroid;