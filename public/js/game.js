
game();

async function game() {

    const canvas = document.getElementById('game');
    const context = canvas.getContext('2d');
    
    let input= {};
    document.addEventListener('keydown', (event) => { input[event.key] = true; });
    document.addEventListener('keyup', (event) => { input[event.key] = false; });
    
    const socket = io.connect();
    let game;
    socket.on('tick', (data) => { game = data; });

    setInterval(draw() , 1000 / 128);
   
    function draw() { 
      
        socket.emit('input', { //send input 
            x: (input['d'] || input['ArrowRight'] ? 1 : 0) - (input['a'] || input['ArrowLeft'] ? 1 : 0),
            y: (input['w'] || input['ArrowUp'] || input[' '] ? 1 : 0) - (input['s'] || input['ArrowDown'] ? 1 : 0)
        });

        context.fillStyle = '#1c1c1c';
        context.strokeStyle = '#cccccc'; 
        context.fillRect(0, 0, canvas.width, canvas.height);

        game.aestroids.forEach(aestroid => {

        });

        game.ships.forEach(ship => {

        });

        game.lazers.forEach(lazer => {
 
        });
    }
};
