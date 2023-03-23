
class Asteroid {
    constructor(game, x, y, r, speed) {

        this.randomStarting(game);
        this.x = x;
        this.y = y;
        this.r = r; //radius
        this.xv = Math.random() * speed;
        this.yv = Math.random() * speed;
    };

   randomStarting(game) {
            switch (Math.ceil(Math.random() * 4)) {
                case 1:
                    this.x = -this.r;
                    this.y = Math.random() * game.heigt;
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

   randomNumBetween(min, max) {
        return min + Math.random() * (max - min);
    }

    tick(game) {
        game.ships.forEach(ship => {
            if ((Math.hypot(this.x - ship.x , this.y - ship.y)) < this.r + ship.r)
                ship.lives--
        });
    }
}