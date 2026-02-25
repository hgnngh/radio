const audioPlayers = document.querySelectorAll('.audioPlayer');
audioPlayers.forEach(audio => {
    audio.setAttribute('preload', 'none');
});

const playAudioButtons = document.querySelectorAll('.playButton');
playAudioButtons.forEach(button => {
    button.setAttribute('isPlaying', false);
    button.setAttribute('onclick', 'togglePlayButton(this)');
    const textElement = button.querySelector('.text');
    textElement.textContent = "play";
});

const url_921 = "https://live.rtrfm.com.au/stream1";
const url_929 = "https://sa46.scastream.com.au/live/6ppm_128.stream/playlist.m3u8?listeningSessionID=692f1c770094e4de_6539070_rvg31Ft7_MTAzLjIxLjgxLjI6ODA!_0000006uaMg&downloadSessionID=0&dist=listnr-web&listenerid=462737760952f058a98c12747601c13e&awparams=companionAds%3Atrue&aw_0_1st.playerId=LiSTNR_Web_native&cb=2107ca90-0b1a-11f1-87f7-75681ac4cc76";
const url_937 = "https://28803.live.streamtheworld.com/NOVA_969_AAC48/HLS/playlist.m3u8?_cb=1771234529378&dist=neweb&lsid=cookie%3A49c972ea-bd85-4eef-940c-b9a959e19b4d&tta";
const url_945 = "https://sa46.scastream.com.au/live/6mix_128.stream/playlist.m3u8?listeningSessionID=692f1dcf00977a0f_6539202_PZhLWVre_MTAzLjIxLjgxLjY6ODA!_0000006t2vi&downloadSessionID=0&dist=listnr-web&listenerid=462737760952f058a98c12747601c13e&awparams=companionAds%3Atrue&aw_0_1st.playerId=LiSTNR_Web_native&cb=3bd0acb0-0b1b-11f1-8d71-edcaf884a4fd";
const url_961 = "https://28793.live.streamtheworld.com/ARN_96FMAAC/HLS/playlist.m3u8?clientType=web&host=webapp.AU&modTime=1771309633461&profileid=12003868329&terminalid=161&territory=AU&us_privacy=1-N-&callLetters=6NOW-FM&devicename=web-desktop&stationid=6708&dist=iheart&subscription_type=free&partnertok=eyJraWQiOiJpaGVhcnQiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsc2lkIjoiY29va2llOjQ5Yzk3MmVhLWJkODUtNGVlZi05NDBjLWI5YTk1OWUxOWI0ZCIsImF1ZCI6InRkIiwiY29wcGEiOjAsInByb2ZpbGVpZCI6IjEyMDAzODY4MzI5IiwiaXNzIjoiaWhlYXJ0IiwidXNfcHJpdmFjeSI6IjFZTk4iLCJkaXN0IjoiaWhlYXJ0IiwiZXhwIjoxNzcxMzk2MDM1LCJpYXQiOjE3NzEzMDk2MzUsIm9taWQiOjB9.koloT41wD21Mg7c12XFUVlb_-v6fCiP3jxIJZCQoFIM&country=AU&locale=en-AU&site-url=https%3A%2F%2Fwww.iheart.com%2Flive%2Fgold-96fm-6708%2F&an-uid=8003783047406867137&triton-uid=cookie%3A49c972ea-bd85-4eef-940c-b9a959e19b4d";
const url_977 = "https://streaming.abc-cdn.net.au/audio/hls/classicwa.m3u8?source=web";
const url_985 = "https://28803.live.streamtheworld.com/6SONAAC.aac?DIST=6SONwebsite";
const url_993 = "https://streaming.abc-cdn.net.au/audio/hls/triplejnsw.m3u8?source=web";
const url_1001 = "https://usa7.fastcast4u.com/proxy/curtinfm?mp=/1";
const url_1009 = "https://firstnationsmedia.stream/8028/stream";

const stationLiveStreams = new Map();
stationLiveStreams.set(document.getElementById("audio_921"), url_921);
stationLiveStreams.set(document.getElementById("audio_929"), url_929);
stationLiveStreams.set(document.getElementById("audio_937"), url_937);
stationLiveStreams.set(document.getElementById("audio_945"), url_945);
stationLiveStreams.set(document.getElementById("audio_961"), url_961);
stationLiveStreams.set(document.getElementById("audio_977"), url_977);
stationLiveStreams.set(document.getElementById("audio_985"), url_985);
stationLiveStreams.set(document.getElementById("audio_993"), url_993);
stationLiveStreams.set(document.getElementById("audio_1001"), url_1001);
stationLiveStreams.set(document.getElementById("audio_1009"), url_1009);

function fetchAndPlayLiveStream(audioElement) {
    let liveStreamURL = stationLiveStreams.get(audioElement);
    // make the url different so that it refreshes each time you press play
    liveStreamURL += "#" + new Date().getTime();
    audioElement.src = liveStreamURL;
    audioElement.load();
    audioElement.play();
}

function turnOffAllStations() {
    const playAudioButtons = document.querySelectorAll('.playButton');
    playAudioButtons.forEach(button => {
        if (button.isPlaying) {
            turnOffStation(button);
        }
    });
}

function turnOffStation(buttonElement) {
    const audioElement = buttonElement.querySelector('.audioPlayer');
    audioElement.pause();
    const textElement = buttonElement.querySelector('.text');
    textElement.textContent = "play";
    buttonElement.isPlaying = false;
}

function turnOnStation(buttonElement) {
    const audioElement = buttonElement.querySelector('.audioPlayer');
    turnOffAllStations();
    fetchAndPlayLiveStream(audioElement);
    buttonElement.isPlaying = true;
    audioElement.onplaying = () => { handleAudioPlaying(buttonElement); };
    audioElement.onwaiting = () => { handleAudioLoading(buttonElement); };
    audioElement.onerror = () => { handleAudioError(buttonElement); };
}

function handleAudioPlaying(buttonElement) {
    const textElement = buttonElement.querySelector('.text');
    textElement.textContent = "stop playing";
    setUpAudioCanvas();
}
function handleAudioLoading(buttonElement) {
    const textElement = buttonElement.querySelector('.text');
    textElement.textContent = "loading...";
}
function handleAudioError(buttonElement) {
    const textElement = buttonElement.querySelector('.text');
    textElement.textContent = "oh no! there was an error!";
}

function togglePlayButton(buttonElement) {
    if (buttonElement.isPlaying) {
        turnOffStation(buttonElement);
    }
    else {
        turnOnStation(buttonElement);
    }
}

const canvas = document.querySelector("canvas");
const canvasCtx = canvas.getContext("2d");
canvasCtx.fillStyle = "green";
// Add a rectangle at (10, 10) with size 100x100 pixels
canvasCtx.fillRect(10, 10, 100, 100);

function setUpAudioCanvas() {

    audioCtx = new AudioContext();
    // get the audio element
    soundSource = document.getElementById("audio_921");
    stream = soundSource.srcObject;

    document.getElementById('tester').textContent = stream; // TESTING
    canvasCtx.fillStyle = "red";
    canvasCtx.fillRect(10, 10, 100, 100);

    // pass it into the audio context
    source = audioCtx.createMediaStreamSource(stream);

    // connect between source and destination...?
    source.connect(audioCtx.destination);
    // setup analyser to capture audio from stream
    const analyser = audioCtx.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    // capture analyser data into array
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    // canvasCtx.clearRect(0, 0, 1000, 1000);
    draw();
}

function draw() {
    const drawVisual = requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);
    // Fill solid color
    canvasCtx.fillStyle = "rgb(200 200 200)";
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
    // Begin the path
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "rgb(0 0 0)";
    canvasCtx.beginPath();
    // Draw each point in the waveform
    const sliceWidth = WIDTH / bufferLength;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * (HEIGHT / 2);

        if (i === 0) {
            canvasCtx.moveTo(x, y);
        } else {
            canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
    }

    // Finish the line
    canvasCtx.lineTo(WIDTH, HEIGHT / 2);
    canvasCtx.stroke();
}