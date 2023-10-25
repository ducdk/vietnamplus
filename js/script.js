AOS.init();

function playVideo(play = true, on = false) {
    const vnp_video_modau = document.getElementById('vnp-video-modau');
    if (vnp_video_modau) {
        if (play) {
            if (on) {
                vnp_video_modau.play();
                $('.vnp-play').hide();
            }
        } else {
            vnp_video_modau.pause();
            $('.vnp-play').show();
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
        if (max >= 5) {
            $('#loading-text').hide();
            $('#loading-click').show();
            clearInterval(loading);
        } else {
            if (max !== 5) {
                $('.wave').removeClass(`v${max}`);
                max = max + 1;
                $('.wave').addClass(`v${max}`);
            }
        }

    }, 1000);
    console.log('Loaded');
});



var swiper = new Swiper(".vnp-timeline-model", {
    effect: "cards",
    grabCursor: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
var swiper1 = new Swiper(".vnp-timeline-wrap", {});

swiper.on('slideNextTransitionEnd', function (event) {
    swiper1.slideNext()
});
swiper.on('slidePrevTransitionEnd', function (event) {
    swiper1.slidePrev()
});
