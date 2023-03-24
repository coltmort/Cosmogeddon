
setup();

async function setup() {

    const canvas = document.getElementById('game');
    const context = canvas.getContext('2d');
    
    let input= {};
    document.addEventListener('keydown', (event) => { input[event.key] = true; });
    document.addEventListener('keyup', (event) => { input[event.key] = false; });
    
    const socket = io.connect();
    socket.on('tick', (data) => { draw(data) });
   
    function draw(game) { console.log(game);
      
        socket.emit('input', { //send input 
            x: (input['d'] || input['ArrowRight'] ? 1 : 0) - (input['a'] || input['ArrowLeft'] ? 1 : 0),
            y: (input['w'] || input['ArrowUp'] || input[' '] ? 1 : 0) - (input['s'] || input['ArrowDown'] ? 1 : 0)
        });

        context.fillStyle = '#1c1c1c';
        context.strokeStyle = '#cccccc'; 
        context.fillRect(0, 0, canvas.width, canvas.height);

        game?.aestroids?.forEach(aestroid => {
        });

        game?.ships?.forEach(ship => {
          //console.log (ship);
        });

        game?.lazers?.forEach(lazer => {
 
        });
    }
};
