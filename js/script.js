// function scenesMethod() {
//     var scenes = document.querySelectorAll('.scene');
//     console.log(scenes);
//     for (let i = 0; i < scenes.length; i++) {
//         var parallaxInstance = new Parallax(scenes[i], {
//             relativeInput: true,
//             clipRelativeInput: true,
//         });
//         console.log(parallaxInstance);
//     }
// }


AOS.init();
// scenesMethod();

const vnp_video_modau = ($(window).width() > 768) ? document.getElementById('vnp-video-modau') : document.getElementById('vnp-video-modau1');
const vnp_play = document.getElementById('vnp-play');
playState = 'pause';

vnp_video_modau.addEventListener('click', () => {
    if(playState === 'play') {
        vnp_video_modau.play();
        playState = 'pause';
        $('.vnp-play').hide();
    } else {
        vnp_video_modau.pause();
        $('.vnp-play').show();
        playState = 'play';
    }
});

function playVideo(play = true, on = false) {
    if (vnp_video_modau) {
        if (play) {
            if (on) {
                vnp_video_modau.play();
                $('.vnp-play').hide();
                playState = 'pause';
            }
        } else {
            vnp_video_modau.pause();
            $('.vnp-play').show();
            playState = 'play';
        }
    }
}

function start() {
    $('#loading').hide();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playVideo(true, true);
    // triggerVideo();
}


$(window).on('load', function () {
    let max = 0;
    let loading = setInterval(function () {
        if (max >= 3) {
            $('#loading-text').hide();
            $('#loading-click').show();
            clearInterval(loading);
        } else {
            if (max !== 3) {
                $('.wave').removeClass(`v${max}`);
                max = max + 1;
                $('.wave').addClass(`v${max}`);
            }
        }

    }, 1000);
    console.log('Loaded');
});


var swiper11 = new Swiper(".vnp-giaithuong-slide", {

    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: true,
    freeMode: false,
    loop: true,
    mousewheel: false,
    keyboard: {
        enabled: true
    },

    // Enabled autoplay mode
    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    },
    breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 30
        }
    }
 
});
var swiper22 = new Swiper(".vnp-dauan-slide", {

    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
    freeMode: false,
    loop: true,
    mousewheel: false,
    keyboard: {
        enabled: true
    },

    // Enabled autoplay mode
    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    },
    breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 0
        },
        1200: {
          slidesPerView: 1,
          spaceBetween: 0
        }
    }
 
});


