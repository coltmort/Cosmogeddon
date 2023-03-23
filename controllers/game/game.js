const ship = require('./ship.js');

class Game {

    constructor(tickrate) {
        this.ships = [];
        this.asteroids = [];
        this.lazers = [];
        this.tickInterval = setInterval(this.tick(this), 1000 / tickrate);
        this.width = 1280;
        this.height = 720;
        this.ships.push(new Ship(this) )
    }

    tick(game) {
        this.ships.forEach(ship => { ship.tick(this); });
        this.asteroids.forEach(asteroid => { asteroid.tick(this); });
        this.lazers.forEach(lazer => { lazer.tick(this); });
        
    }
}

module.exports = Game;