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
        delay: 2000,
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