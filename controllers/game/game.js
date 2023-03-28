const Asteroid = require('./asteroid.js');

class Game {

    constructor(tickrate) {
        this.ships = {};
        this.asteroids = [];
        this.lazers = [];
        this.width = 1280;
        this.height = 720;
        this.asteroidSpawnRate = .01;
        this.smallestAsteroidRadius = 20;
        setInterval(()=> this.tick(), 1000/tickrate);
        }

        tick()  {
            Object.values(this.ships).forEach(ship => { ship.tick(this); });
            this.asteroids.forEach(asteroid => { asteroid.tick(this); });
            this.lazers.forEach(lazer => { lazer.tick(this); });
            if ( this.asteroids.length < 20 && Math.random() < this.asteroidSpawnRate) this.asteroids.push(new Asteroid(this)); 

            this.checkForGameOver();
        }

        checkForGameOver() {
            for (let ship of Object.values(this.ships)) { // if atleast one ship is alive, continue the game
                if (ship.lives > 0) { return } 
            }
            this.asteroids = []; // nice biproduct is that if no one is in the game the game will be reset 
            this.lazers = [];
            Object.values(this.ships).forEach(ship => { ship.reset(this); });

            // some sort of gameover message? 
            // your flock / fleet survived the asteroid field for x amount of minutes and managed to destroy x amount of asteroids
        }
    }

module.exports = Game;