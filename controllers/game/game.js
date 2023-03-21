
class Game {

    constructor(tickrate) {
        this.ships = [];
        this.asteroids = [];
        this.lazers = [];
        this.tickInterval = setInterval(this.tick(this), 1000 / tickrate);
    }

    tick(game) {
        this.ships.forEach(ship => { ship.tick(game); });
        this.asteroids.forEach(asteroid => { asteroid.tick(game); });
        this.lazers.forEach(lazer => { lazer.tick(game); });
    }
}

module.exports = Game;