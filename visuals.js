const audioCtx = new AudioContext();
const barAnalyser = audioCtx.createAnalyser();

const WIDTH = 980;
const HEIGHT = 50;

let barCanvas;
let barCtx;

const barCanvasElements = document.querySelectorAll('.barCanvas');
barCanvasElements.forEach(canvas => {
    canvas.setAttribute('width', WIDTH);
    canvas.setAttribute('height', HEIGHT);
});

function initBarCanvas(canvasElement) {
    barCanvas = canvasElement;
    barCtx = barCanvas.getContext("2d");
}

function setUpAudioVisuals(stream, canvasElement) {
    initBarCanvas(canvasElement);

    audioCtx.resume();
    // pass in the stream
    source = audioCtx.createMediaStreamSource(stream);
    // connect between source and destination...?
    source.connect(audioCtx.destination);
    // setup analyser to capture audio from stream
    source.connect(barAnalyser);
    barAnalyser.connect(audioCtx.destination);

    barAnalyser.fftSize = 256;
    const bufferLength = barAnalyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    barCtx.clearRect(0, 0, WIDTH, HEIGHT);

    drawBar(dataArray, bufferLength);
}

function drawBar(dataArray, bufferLength) {
    requestAnimationFrame(() => drawBar(dataArray, bufferLength));
    barAnalyser.getByteFrequencyData(dataArray);
    barCtx.clearRect(0, 0, WIDTH, HEIGHT);
    const barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;

        barCtx.fillStyle = `rgb(${barHeight + 100} 50 50)`;
        barCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);

        x += barWidth + 1;
    }
}