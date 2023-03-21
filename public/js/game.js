
game();

async function game() {

    const canvas = document.getElementById('game');
    const context = canvas.getContext('2d');
    const socket = io.connect();

    document.addEventListener('keydown', (event) => { input[event.key] = true; });
    document.addEventListener('keyup', (event) => { input[event.key] = false; });
    document.addEventListener('mousedown', (event) => { input.mouseDown = true;});
    document.addEventListener('mouseup', (event) => { input.mouseDown = false;});
    canvas.addEventListener('mousemove', (event) => { const rect = canvas.getBoundingClientRect(); 
    input.mouseX = event.clientX - rect.left; 
    input.mouseY = event.clientY - rect.top;});

    setInterval(() => { 

        socket.emit('input', {
            x: (input['d'] || input['ArrowRight'] ? 1 : 0) - (input['a'] || input['ArrowLeft'] ? 1 : 0),
            y: (input['w'] || input['ArrowUp'] || input[' '] ? 1 : 0) - (input['s'] || input['ArrowDown'] ? 1 : 0),
            mouseX: input.mouseX || 0, 
            mouseY: input.mouseY || 0, 
            mouseDown: input.mouseDown
        });

    }, 1000 / 60);
};
