const waveCanvas = document.getElementById("waveCanvas");
const waveCanvasCtx = waveCanvas.getContext("2d");
const barCanvas = document.getElementById("barCanvas");
const barCanvasCtx = barCanvas.getContext("2d");

const WIDTH = waveCanvas.getAttribute("width");
const HEIGHT = waveCanvas.getAttribute("height");

const audioCtx = new AudioContext();
const waveAnalyser = audioCtx.createAnalyser();
const barAnalyser = audioCtx.createAnalyser();

function setUpAudioVisuals(stream) {
    audioCtx.resume();
    // pass in the stream
    source = audioCtx.createMediaStreamSource(stream);
    // connect between source and destination...?
    source.connect(audioCtx.destination);
    // setup analyser to capture audio from stream
    source.connect(waveAnalyser);
    source.connect(barAnalyser);
    waveAnalyser.connect(audioCtx.destination);
    barAnalyser.connect(audioCtx.destination);

    setUpWaveVisual();
    setUpBarVisual();
}

function setUpWaveVisual() {
    // capture analyser data into array
    waveAnalyser.fftSize = 2048;
    const bufferLength = waveAnalyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    waveCanvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    drawWave(dataArray, bufferLength);
}

function setUpBarVisual() {
    barAnalyser.fftSize = 256;
    const bufferLength = barAnalyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    barCanvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    drawBar(dataArray, bufferLength);
}

function drawWave(dataArray, bufferLength) {
    requestAnimationFrame(() => drawWave(dataArray, bufferLength));
    waveAnalyser.getByteTimeDomainData(dataArray);
    // Fill solid color
    waveCanvasCtx.fillStyle = "rgb(200 200 200)";
    waveCanvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
    // Begin the path
    waveCanvasCtx.lineWidth = 2;
    waveCanvasCtx.strokeStyle = "rgb(0 0 0)";
    waveCanvasCtx.beginPath();
    // Draw each point in the waveform
    const sliceWidth = WIDTH / bufferLength;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * (HEIGHT / 2);
        if (i === 0) {
            waveCanvasCtx.moveTo(x, y);
        } else {
            waveCanvasCtx.lineTo(x, y);
        }
        x += sliceWidth;
    }
    // Finish the line
    waveCanvasCtx.lineTo(WIDTH, HEIGHT / 2);
    waveCanvasCtx.stroke();
}

function drawBar(dataArray, bufferLength) {
    requestAnimationFrame(() => drawBar(dataArray, bufferLength));
    barAnalyser.getByteFrequencyData(dataArray);
    barCanvasCtx.fillStyle = "rgb(0 0 0)";
    barCanvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
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