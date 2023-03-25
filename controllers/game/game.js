const Asteroid = require('./asteroid.js');

class Game {

    constructor(tickrate) {
        this.ships = {};
        this.asteroids = [];
        this.lazers = [];
        this.width = 1280;
        this.height = 720;
        this.asteroidSpawnRate = .01;
        setInterval(()=> this.tick(), 1000/tickrate);
        }

        tick()  {
            Object.values(this.ships).forEach(ship => { ship.tick(this); });
            this.asteroids.forEach(asteroid => { asteroid.tick(this); });
            this.lazers.forEach(lazer => { lazer.tick(this); });
            if ( this.asteroids.length < 20 && Math.random() < this.asteroidSpawnRate) this.asteroids.push(new Asteroid(this)); 
        }
    }

module.exports = Game;