

class Game {

    constructor(tickrate) {
        this.ships = {};
        this.asteroids = [];
        this.lazers = [];
        this.width = 1280;
        this.height = 720;


        setInterval(()=> this.tick(), 1000/tickrate);

        }
         tick()  {
            Object.values(this.ships).forEach(ship => { ship.tick(this); });
            // this.asteroids.forEach(asteroid => { asteroid.tick(this); });
            this.lazers.forEach(lazer => { lazer.tick(this); });
         }
    }

module.exports = Game;