function changeBackgroundColor() {
    const color = document.getElementById('backgroundColor').value;
    if (color === 'matrix') {
        document.body.style.backgroundColor = 'black';
        startMatrixEffect();
    } else {
        document.body.style.backgroundColor = color;
        stopMatrixEffect();
    }
}

function startMatrixEffect() {
    let canvas = document.getElementById('matrix-bg');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'matrix-bg';
        document.body.appendChild(canvas);
    }
    canvas.style.display = 'block';
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const rainDrops = [];

    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }

    const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };

    window.matrixInterval = setInterval(draw, 30);
}

function stopMatrixEffect() {
    clearInterval(window.matrixInterval);
    const canvas = document.getElementById('matrix-bg');
    if (canvas) {
        canvas.style.display = 'none';
    }
}

// Function to change text size
function changeTextSize() {
    const textSize = document.getElementById('textSize').value;
    document.body.style.fontSize = textSize;
}