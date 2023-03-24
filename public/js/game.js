
setup();



async function setup() {

    const canvas = document.getElementById('game');
    const context = canvas.getContext('2d');

    let input= {};
    document.addEventListener('keydown', (event) => { input[event.key] = true; });
    document.addEventListener('keyup', (event) => { input[event.key] = false; });

    const socket = io.connect();
    socket.on('tick', (data) => { draw(data) });

    function draw(game) {


        socket.emit('input', { //send input
            right: (input['d'] || input['ArrowRight'] ? 1 : 0),
            left: (input['a'] || input['ArrowLeft'] ? 1 : 0),
            forward: (input['w'] || input['ArrowUp'] ? 1 : 0),
            reverse: (input['s'] || input['ArrowDown'] ? 1 : 0)
        });


        context.fillStyle = '#1c1c1c';
        context.strokeStyle = '#cccccc';
        context.fillRect(0, 0, canvas.width, canvas.height);


        Object.values(game?.ships).forEach(ship => {
            context.save()

            context.translate(ship.x, ship.y)
            context.rotate(-ship.angle)

            context.beginPath()
            context.moveTo(0, -15)
            context.lineTo(-10, 10)
            context.quadraticCurveTo(0, 0, 10, 10)
            context.closePath()
            context.fillStyle = "red";
            context.fill()
            if(ship.input.forward){
                context.beginPath()
                context.moveTo(-8,9)
                context.lineTo(0,15)
                context.lineTo(8, 9)
                context.strokeStyle = "orange"
                context.stroke()
            }

            context.restore();


        });

    }
};
