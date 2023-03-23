
game();

async function game() {

    const canvas = document.getElementById('game');
    const context = canvas.getContext('2d');
    const socket = io.connect();
    
    let input= {};
    document.addEventListener('keydown', (event) => { input[event.key] = true; });
    document.addEventListener('keyup', (event) => { input[event.key] = false; });
   

    setInterval(() => { 

        socket.emit('input', {
            x: (input['d'] || input['ArrowRight'] ? 1 : 0) - (input['a'] || input['ArrowLeft'] ? 1 : 0),
            y: (input['w'] || input['ArrowUp'] || input[' '] ? 1 : 0) - (input['s'] || input['ArrowDown'] ? 1 : 0)
        });

    }, 1000 / 60);
};
