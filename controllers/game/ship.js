
class Ship {
    constructor(game, x, y, r, lives, speed) {
        // const canvWidth = game.width; // find by id?
        // const canvHeight = game.height; // find by id?
        // const shipSize = 30; //30 px
        this.input = {}
        this.x = game.width / 2; //starting x
        this.y = game.height / 2; //starting y
        this.r = r; //radius

        this.lives = lives;

        this.speed = speed;

        this.velocity = 0
        this.acceleration = 0.08
        this.maxSpeed = 3
        this.friction = 0.01;
        this.angle = 0;
        this.heading = 0;
    }

    #move(){
        // forward and backward
        if(this.input.forward){
            this.velocity += this.acceleration
            this.heading = this.angle
            this.x -= Math.sin(this.angle) * this.velocity
            this.y -= Math.cos(this.angle) * this.velocity;
        } else {
            this.x -= Math.sin(this.heading) * this.velocity
            this.y -= Math.cos(this.heading) * this.velocity;

        }
        // if(this.input.reverse){
        //     this.velocity -= this.acceleration
        // }
        // maxspeed and slower backwards
        if(this.velocity > this.maxSpeed){
            this.velocity = this.maxSpeed
        }

        // if(this.velocity < -this.maxSpeed/2){
        //     this.velocity = -this.maxSpeed/2
        // }

        // adds friction
        if(this.velocity > 0){
            this.velocity -= this.friction
        }

        // if(this.velocity < 0){
        //     this.velocity += this.friction
        // }

        // removes drift
        if(Math.abs(this.velocity) < this.friction){
            this.velocity = 0
        }

        // fixes backward steering

        const flip = this.velocity > 0 ? 1 : -1

        if(this.input.right){
            this.angle -= 0.06
        }
// && (this.input.forward || this.input.reverse)
        if(this.input.left ){
            this.angle += 0.06
        }



        if(this.input.forward){
            this.heading = this.angle
            this.x -= Math.sin(this.angle) * this.velocity
            this.y -= Math.cos(this.angle) * this.velocity;
        } else {
            this.x -= Math.sin(this.heading) * this.velocity
            this.y -= Math.cos(this.heading) * this.velocity;
        }
    }

    tick(game) {
        this.#move()

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