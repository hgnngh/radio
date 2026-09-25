const audioCtx = new AudioContext();
const barAnalyser = audioCtx.createAnalyser();

const bigBarCanvas = document.querySelector('.pageBarCanvas');
const bigBarCtx = bigBarCanvas.getContext("2d");

let BIG_WIDTH;
let BIG_HEIGHT;

const SMALL_WIDTH = 980;
const SMALL_HEIGHT = 50;

const smallBarCanvasElements = document.querySelectorAll('.stationBarCanvas');
smallBarCanvasElements.forEach(canvas => {
    canvas.setAttribute('width', SMALL_WIDTH);
    canvas.setAttribute('height', SMALL_HEIGHT);
});
let smallBarCanvas;
let smallBarCtx;

function initBarCanvas(canvasElement) {
    smallBarCanvas = canvasElement;
    smallBarCtx = smallBarCanvas.getContext("2d");

    BIG_WIDTH = bigBarCanvas.width;
    BIG_HEIGHT = bigBarCanvas.height;
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

    smallBarCtx.clearRect(0, 0, SMALL_WIDTH, SMALL_HEIGHT);
    bigBarCtx.clearRect(0, 0, BIG_WIDTH, BIG_HEIGHT);

    drawBar(dataArray, bufferLength);
}

function drawBar(dataArray, bufferLength) {
    requestAnimationFrame(() => drawBar(dataArray, bufferLength));
    barAnalyser.getByteFrequencyData(dataArray);
    drawSmallBars(dataArray, bufferLength);
    drawBigBars(dataArray, bufferLength);
}

function drawSmallBars(dataArray, bufferLength) {
    smallBarCtx.clearRect(0, 0, SMALL_WIDTH, SMALL_HEIGHT);
    const barWidth = (SMALL_WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;
        smallBarCtx.fillStyle = `rgb(${barHeight + 100} 50 50)`;
        smallBarCtx.fillRect(x, SMALL_HEIGHT - barHeight / 2, barWidth, barHeight);
        x += barWidth + 1;
    }
}

function drawBigBars(dataArray, bufferLength) {
    bigBarCtx.clearRect(0, 0, BIG_WIDTH, BIG_HEIGHT);
    const barWidth = (BIG_WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;
        bigBarCtx.fillStyle = `rgb(50 50 ${barHeight + 100})`;
        bigBarCtx.fillRect(Bx, BIG_HEIGHT - barHeight / 2, barWidth, barHeight);
        x += barWidth + 1;
    }
}