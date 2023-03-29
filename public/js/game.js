
setup();

async function setup() {

    const canvas = document.getElementById('game');
    const context = canvas.getContext('2d');

    let input= {};
    document.addEventListener('keydown', (event) => { input[event.key] = true; });
    document.addEventListener('keyup', (event) => { input[event.key] = false; });

    let name = prompt( 'what name do you want?');
    const socket = io.connect();
    socket.emit('name', name);
    let game;
    socket.on('tick', (data) => { game = data; });

    setInterval(() => { socket.emit('input', { // send input 30 times a second
        right: (input['d'] || input['ArrowRight'] ? 1 : 0),
        left: (input['a'] || input['ArrowLeft'] ? 1 : 0),
        forward: (input['w'] || input['ArrowUp'] ? 1 : 0),
        shoot: (input['s'] || input['ArrowDown'] || input[' ']? 1 : 0)
    });}, 1000/30);

    setInterval(() => { draw(game) }, 1000/256); // draw as fast as possible
    function draw(game) { 

        socket.emit('input', { // send input
            right: (input['d'] || input['ArrowRight'] ? 1 : 0),
            left: (input['a'] || input['ArrowLeft'] ? 1 : 0),
            forward: (input['w'] || input['ArrowUp'] ? 1 : 0),
            shoot: (input['s'] || input['ArrowDown'] || input[' ']? 1 : 0)
        });

        context.lineWidth = 4; // background
        context.fillStyle = 'black';
        context.strokeStyle = 'silver';
        context.fillRect(0, 0, canvas.width, canvas.height);

        if(game.asteroidSpawnRate == 0) { //score
            if(game.score == 0) {
                document.getElementById('score').innerHTML = `<span style="color: white;"> New Game </span> starting soon!`;
            } else { 
                document.getElementById('score').innerHTML = `Your fleet destroyed <span style="color: white;">${game.score}</span> asteroids before defeat!`;
            }
        } else {
            document.getElementById('score').innerHTML = `<span style="color: white;">Score:</span> ${game.score}`;
        }

        game?.lazers?.forEach(lazer => { // console.log(lazer);
            context.strokeStyle = "orange";
            context.beginPath()
            context.moveTo(lazer.x, lazer.y);
            context.lineTo(lazer.x - lazer.xv, lazer.y - lazer.yv);
            context.closePath()
            context.stroke(); 
        });

        Object.values(game?.ships).forEach(ship => { // console.log(ship)
            if(ship.lives <= 0){ return } // don't draw dead ships

            context.save();
            context.translate(ship.x, ship.y)
            context.rotate(-ship.angle)
            if(ship.input.forward){ // flame
                context.beginPath()
                context.moveTo(-ship.r *.5 , -ship.r * .3)
                context.lineTo(0,-ship.r)
                context.lineTo(ship.r * .5 , -ship.r *.3)
                context.strokeStyle = "orange"
                context.fill();
                context.stroke()
            }
            context.strokeStyle = 'silver'; // ship body
            context.beginPath()
            context.moveTo(0, ship.r)
            context.lineTo(-ship.r * .6, -ship.r *.6)
            context.quadraticCurveTo(0, 0, ship.r *.6, -ship.r * .6)
            context.closePath()
            context.fill();
            context.stroke();
            context.restore();

            context.fillStyle = "orange" //name
            context.font = ship.r * 1.5 + "px sans-serif";
            context.textAlign = 'center';
            context.fillText(ship.name, ship.x, ship.y - ship.r * 2.5);
            context.fillStyle = "black"

            context.strokeStyle = "orange" // health bar
            context.beginPath();
            let healthWidth = ship.r * 3.5;
            context.moveTo(ship.x - (healthWidth / 2), ship.y - ship.r * 2);
            context.lineTo(( ship.x - (healthWidth / 2)) + ( healthWidth * ( ship.lives / ship.maxlives)), ship.y - (ship.r * 2 ));
            context.stroke();
            context.strokeStyle = 'silver';
        });

        game?.asteroids?.forEach(asteroid => { // console.log(game.asteroids.length)
            context.strokeStyle = 'silver';
            context.beginPath();
            context.arc(asteroid.x, asteroid.y, asteroid.r, 0, 2 * Math.PI);
            context.fill(); 
            context.stroke(); 
        });
    }
};
