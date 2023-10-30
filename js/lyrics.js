import lottieWeb from 'https://cdn.skypack.dev/lottie-web';

const playIconContainer = document.getElementById('play-icon');
const iconplay = document.getElementById('iconplay');
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
iconplay.addEventListener('click', () => {
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
    let text = `
    [ti:VietnamPlus Ca]\n
    [total:236220]\n
    [offset:0]\n
    [00:00.61]VietnamPlus Ca\n
    [00:21.21]2008, chục con người trong một tòa soạn nhỏ\n
    [00:23.21]Giữa thời buổi báo chí cạnh tranh cũng ngày một khó\n
    [00:26.21]Những trục trặc đến tới tấp kể từ ngày bấm nút\n
    [00:28.21]Làm tin không ai đọc, ai ai cũng hẫng hụt\n
    [00:32.21]Có những khi đi làm tin bị nhầm với báo khác\n
    [00:34.21]Tòa soạn chật đến nỗi phải đứng ngoài hành lang\n
    [00:36.21]Hồi ấy phòng lãnh đạo 8 mét vuông siêu nhỏ\n
    [00:38.21]Nào các em ngồi xuống có mấy ý tưởng điên rồ\n
    [00:42.21]VietnamPlus\n
    [00:45.21]Là nơi những cánh tay bắt đầu\n
    [00:51.21]Vươn xa\n
    [00:53.21]VietnamPlus\n
    [00:56.21]Để ta thấy thanh xuân đáng giá\n
    [01:00.21]Hơn bao giờ\n
    [01:02.21]2010, VietnamPlus mobile ra đời\n
    [01:04.21]Là khẳng định đẳng cấp không cần phải nhiều lời\n
    [01:07.21]Dân chơi nào 12 tháng tận 9 lần họp báo\n
    [01:09.21]Sản phẩm mới ra liên tiếp toàn là chất lượng cao\n
    [01:12.21]2011, nhiều dấu ấn thách thức ngày một lớn\n
    [01:14.21]Có người đi, có người ở quyết tâm càng cao hơn\n
    [01:17.21]Anh chị em có nhớ năm 2013\n
    [01:19.21]Rapnews Plus được ra đời, tạo ra bước đột phá\n
    [01:23.21]Chúng ta đã càn quét bao nhiêu trang web, bao giải thưởng\n
    [01:26.21]Người ngoài mà có khen cũng phẩy tay chuyện thường\n
    [01:29.21]Tòa soạn nhỏ ngày nào, chật chội của chúng ta\n
    [01:31.21]Giờ là top sáng tạo, bầu bởi WANIFRA\n
    [01:33.21]Như thế đã đủ chưa anh ơi\n
    [01:35.21]Như thế đã đủ chưa chị ơi\n
    [01:37.21]Chừng đó đã đủ chưa chị ơi\n
    [01:39.21]Chưa đủ đâu, tiếp đi anh em ơi\n
    [01:41.21]VietnamPlus\n
    [01:43.21]Là nơi khác chi đâu mái nhà\n
    [01:45.21]Yêu thương\n
    [01:47.21]VietnamPlus\n
    [01:49.21]Để ta thấy yêu những mơ ước\n
    [01:51.21]Như chưa từng\n
    [01:53.21]Triết lý thành công ở đời này công nhận cấm có sai\n
    [01:55.21]Ở con người, ở tập thể không phải của riêng một ai\n
    [01:58.21]Ta có thể không là những ngôi sao trong làng báo\n
    [02:01.21]Nhưng mỗi người, mỗi con tim đầy nhiệt huyết sáng tạo\n
    [02:03.21]2,3 giờ sáng vẫn lên Facebook í ới nhau\n
    [02:06.21]Có tin nóng xách xe lên đi trong đêm cho máu\n
    [02:09.21]Những đêm trắng biên tập tin sáng hôm sau\n
    [02:02.21]Kệ chồng cứ càu nhàu, vợ làu bàu đằng sau\n
    [02:05.21]Nếu làm việc căng một, thì chơi phải căng 10\n
    [02:08.21]Từ trước cho đến nay chưa từng quên tiếng cười\n
    [02:11.21]Hôm nay lãnh đạo lại gọi anh em ta vào\n
    [02:14.21]Xong hết việc chưa anh em làm vài cốc bia nào\n
    [02:17.21]VietnamPlus\n
    [02:20.21]Là nơi để đam mê bắt đầu\n
    [02:23.21]Quanh ta\n
    [02:26.21]VietnamPlus\n
    [02:29.21]Hành trình ta chưa từng kết thúc\n
    [02:31.21]Chưa bao giờ\n

    `;
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