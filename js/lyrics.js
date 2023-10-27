import lottieWeb from 'https://cdn.skypack.dev/lottie-web';

const playIconContainer = document.getElementById('play-icon');
const audioPlayerContainer = document.getElementById('audio-player-container');
const seekSlider = document.getElementById('seek-slider');
const volumeSlider = document.getElementById('volume-slider');
const muteIconContainer = document.getElementById('mute-icon');
let playState = 'play';
let muteState = 'unmute';

const playAnimation = lottieWeb.loadAnimation({
  container: playIconContainer,
  path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/pause/pause.json',
  renderer: 'svg',
  loop: false,
  autoplay: false,
  name: "Play Animation",
});

const muteAnimation = lottieWeb.loadAnimation({
    container: muteIconContainer,
    path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/mute/mute.json',
    renderer: 'svg',
    loop: false,
    autoplay: false,
    name: "Mute Animation",
});

playAnimation.goToAndStop(14, true);

playIconContainer.addEventListener('click', () => {
    if(playState === 'play') {
        audio.play();
        playAnimation.playSegments([14, 27], true);
        requestAnimationFrame(whilePlaying);
        playState = 'pause';
    } else {
        audio.pause();
        playAnimation.playSegments([0, 14], true);
        cancelAnimationFrame(raf);
        playState = 'play';
    }
});

muteIconContainer.addEventListener('click', () => {
    if(muteState === 'unmute') {
        muteAnimation.playSegments([0, 15], true);
        audio.muted = true;
        muteState = 'mute';
    } else {
        muteAnimation.playSegments([15, 25], true);
        audio.muted = false;
        muteState = 'unmute';
    }
});

const showRangeProgress = (rangeInput) => {
    if(rangeInput === seekSlider) audioPlayerContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
    else audioPlayerContainer.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
}

seekSlider.addEventListener('input', (e) => {
    showRangeProgress(e.target);
});
volumeSlider.addEventListener('input', (e) => {
    showRangeProgress(e.target);
});





/** Implementation of the functionality of the audio player */

const audio = document.querySelector('audio');
const durationContainer = document.getElementById('duration');
const currentTimeContainer = document.getElementById('current-time');
const outputContainer = document.getElementById('volume-output');
let raf = null;

const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}

const displayDuration = () => {
    durationContainer.textContent = calculateTime(audio.duration);
}

const setSliderMax = () => {
    seekSlider.max = Math.floor(audio.duration);
}

const displayBufferedAmount = () => {
    const bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1));
    audioPlayerContainer.style.setProperty('--buffered-width', `${(bufferedAmount / seekSlider.max) * 100}%`);
}

const whilePlaying = () => {
    seekSlider.value = Math.floor(audio.currentTime);
    currentTimeContainer.textContent = calculateTime(seekSlider.value);
    audioPlayerContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
    raf = requestAnimationFrame(whilePlaying);
}

if (audio.readyState > 0) {
    displayDuration();
    setSliderMax();
    displayBufferedAmount();
} else {
    audio.addEventListener('loadedmetadata', () => {
        displayDuration();
        setSliderMax();
        displayBufferedAmount();
    });
}

audio.addEventListener('progress', displayBufferedAmount);

seekSlider.addEventListener('input', () => {
    currentTimeContainer.textContent = calculateTime(seekSlider.value);
    if(!audio.paused) {
        cancelAnimationFrame(raf);
    }
});

seekSlider.addEventListener('change', () => {
    audio.currentTime = seekSlider.value;
    if(!audio.paused) {
        requestAnimationFrame(whilePlaying);
    }
});

volumeSlider.addEventListener('input', (e) => {
    const value = e.target.value;

    outputContainer.textContent = value;
    audio.volume = value / 100;
});

function renderLyric() {
    let text = "[ti:Love Me Harder]\n[total:236220]\n[offset:0]\n[00:00.61]Ariana Grande、The Weeknd - Love Me Harder\n[00:03.21]Tell me something I need to know\n[00:07.72]Then take my breath and never let it go\n[00:12.76]If you just let me invade your space\n[00:17.48]I'll take the pleasure, take it with the pain\n[00:22.92]And defend the moment I bit my lip\n[00:27.78]Baby in that moment you'll know this is\n[00:32.67]Something bigger than us \n[00:34.22]And be a bliss\n[00:37.45]Give me a reason to believe it\n[00:41.05]'Cause if you want to keep me \n[00:44.12]You gotta, gotta, gotta, gotta, got to love me harder\n[00:50.74]And if you really need me\n[00:53.84]You gotta, gotta, gotta, gotta, got to love me harder\n[00:58.60]Baby, love me harder\n[01:03.85]Love me, love me, love me\n[01:08.70]Harder harder harder\n[01:10.85]I know your motives and you know mine\n[01:15.53]The ones that love me I tend to leave behind\n[01:20.63]If you know about me and choose to stay\n[01:25.13]Then take this pleasure and take it with the pain\n[01:30.77]And defend the moment you bite your lip\n[01:35.31]When I get you moanin you know it's real\n[01:40.47]Can you feel the preasure between your hips\n[01:45.42]I'll make it feel like the first time\n[01:48.94]Cause if you want to keep me \n[01:51.99]You gotta, gotta, gotta, gotta, got to love me harder\n[01:56.82](I'mma love you harder)\n[01:58.74]And if you really need me \n[02:01.80]You gotta, gotta, gotta, gotta, got to love me harder\n[02:06.55](Love love me harder)\n[02:11.59]Love me, love me, love me\n[02:16.53]Harder harder harder\n[02:21.45]Love me, love me, love me\n[02:26.23]Harder harder harder\n[02:30.19]So what will I do if I can't figure it out\n[02:34.28](figure it out)\n[02:35.23]You have to try try try again\n[02:39.91]So what will I do if I can't figure it out\n[02:44.54]I'm gonna leave leave leave 'cause\n[02:47.22]'Cause if you want to keep me \n[02:50.28]You gotta, gotta, gotta, gotta, got to love me harder\n[02:55.05](I'mma love you love you love you)\n[02:56.76]And if you really need me \n[02:59.92]You gotta, gotta, gotta, gotta, got to love me harder\n[03:04.47](Love me love me baby)\n[03:06.42]'Cause if you want to keep me \n[03:09.62]You gotta, gotta, gotta, gotta, got to love me harder\n[03:14.42](Hold me harder)\n[03:16.44]And if you really need me \n[03:19.31]You gotta, gotta, gotta, gotta, got to love me harder\n[03:24.18](I'mma love you harder)\n[03:29.36]Love me, love me, love me, love me\n[03:34.18]Harder, harder, harder\n[03:35.95]Oh, you got to love me, love me, baby\n[03:38.80]Love me, love me, love me\n[03:40.54]Just a little bit harder, harder, baby\n[03:43.86]Harder, harder, harder\n";
    let audio = document.getElementById("player");
    let lrc = new Lyricer({"showLines": 5, "clickable": false});
    lrc.setLrc(text);

    audio.addEventListener("timeupdate", function() {
            lrc.move(audio.currentTime);
    });

    window.addEventListener('lyricerclick', function(e){
        if (e.detail.time > 0) {
            audio.currentTime = e.detail.time;
        }
    });
}
renderLyric()