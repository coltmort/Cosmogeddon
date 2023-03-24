
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
            x: (input['d'] || input['ArrowRight'] ? 1 : 0) - (input['a'] || input['ArrowLeft'] ? 1 : 0),
            y: (input['w'] || input['ArrowUp'] || input[' '] ? 1 : 0) - (input['s'] || input['ArrowDown'] ? 1 : 0)
        });

        context.fillStyle = '#1c1c1c';
        context.strokeStyle = '#cccccc'; 
        context.fillRect(0, 0, canvas.width, canvas.height);

        

        Object.values(game?.ships).forEach(ship => {
            context.fillStyle = 'red';
            context.fillRect(ship.x, ship.y, ship.r, ship.r)
        //   console.log (ship);
        });

    }
};
