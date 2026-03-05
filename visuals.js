const barCanvas = document.getElementById("barCanvas");
const barCanvasCtx = barCanvas.getContext("2d");

const WIDTH = barCanvas.getAttribute("width");
const HEIGHT = barCanvas.getAttribute("height");

const audioCtx = new AudioContext();
const barAnalyser = audioCtx.createAnalyser();

function setUpAudioVisuals(stream) {
    audioCtx.resume();
    // pass in the stream
    source = audioCtx.createMediaStreamSource(stream);
    // connect between source and destination...?
    source.connect(audioCtx.destination);
    // setup analyser to capture audio from stream
    source.connect(barAnalyser);
    barAnalyser.connect(audioCtx.destination);

    setUpBarVisual();
}

function setUpBarVisual() {
    barAnalyser.fftSize = 256;
    const bufferLength = barAnalyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    barCanvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    drawBar(dataArray, bufferLength);
}

function drawBar(dataArray, bufferLength) {
    requestAnimationFrame(() => drawBar(dataArray, bufferLength));
    barAnalyser.getByteFrequencyData(dataArray);
    barCanvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    const barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;

        barCanvasCtx.fillStyle = `rgb(${barHeight + 100} 50 50)`;
        barCanvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);

        x += barWidth + 1;
    }
}