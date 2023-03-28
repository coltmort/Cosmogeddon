
setup();

async function setup() {

    const canvas = document.getElementById('game');
    const context = canvas.getContext('2d');

    let input= {};
    document.addEventListener('keydown', (event) => { input[event.key] = true; });
    document.addEventListener('keyup', (event) => { input[event.key] = false; });

    const socket = io.connect();
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

        game?.lazers?.forEach(lazer => { // console.log(lazer);
            context.strokeStyle = "orange";
            context.beginPath()
            context.moveTo(lazer.x, lazer.y);
            context.lineTo(lazer.x - lazer.xv, lazer.y - lazer.yv);
            context.closePath()
            context.stroke(); 
        });

        Object.values(game?.ships).forEach(ship => { // console.log(ship)
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
        });

        game?.asteroids?.forEach(asteroid => { console.log(game.asteroids.length)
            context.strokeStyle = 'silver';
            context.beginPath();
            context.arc(asteroid.x, asteroid.y, asteroid.r, 0, 2 * Math.PI);
            context.fill(); 
            context.stroke(); 
        });
    }
};
