const phrase = "Hành Trình 15 Năm Của VietnamPlus Gắn Liền Với Những Ý Tưởng Sáng Tạo Mang Tính Đột Phá, Khơi Nguồn Cho Nhiều Trào Lưu Báo Chí Tại Việt Nam Như Longform, Báo Chí Dữ Liệu, Báo Chí Giải Pháp…";
const phrase2 = "“Tinh thần đoàn kết là điều khiến các thành viên của VietnamPlus tự hào hơn cả. Mỗi phóng viên, biên tập viên,.... đều là một câu chuyện, nhưng đó không phải là những câu chuyện đơn lẻ, mà chắp nối để tạo nên một tập thể vững mạnh.”";

const splitWords = (phrase) => {
    let body = [];
    phrase.split(" ").forEach( (word, i) => {
      const letters = splitLetters(word);
      body += `<p class="word">${letters}</p>`
    })
    return body
}

const splitLetters = (word) => {
    let letters = ""
    word.split("").forEach( (letter, i) => {
        letters += `<span class="char">${letter}</span>`
    })
    return letters;
}

function renderTextIntro() {
    let t = splitWords(phrase);
    let intro = document.getElementById('intro-content');
    intro.insertAdjacentHTML( 'beforeend', t);
}
renderTextIntro();

const splitWords1 = (phrase) => {
    let body = [];
    phrase.split(" ").forEach( (word, i) => {
      const letters = splitLetters1(word);
      body += `<p class="word1">${letters}</p>`
    })
    return body
}

const splitLetters1 = (word) => {
    let letters = ""
    word.split("").forEach( (letter, i) => {
        letters += `<span class="char1">${letter}</span>`
    })
    return letters;
}
function renderTextGiaiThuong() {
    let t = splitWords1(phrase2);
    let intro = document.getElementById('giaithuong-content');
    intro.insertAdjacentHTML( 'beforeend', t);
}
renderTextGiaiThuong();

gsap.registerPlugin(ScrollTrigger);

// let dauans = gsap.utils.toArray(".dauan-image");

// gsap.to(dauans, {
//     opacity: 1,
//     ease: "none",
//     stagger: 0.1,
//     scrollTrigger: {
//         trigger: "#dauan",
//         scrub: true,
//         start: `top`,
//         end: `+=${window.innerHeight / 1.5}`,
//     },
// })


window.addEventListener("load", function () {


    // gsap.fromTo( ".main", {
    //     backgroundColor: 'white'
    // }, {
    //     scrollTrigger: {
    //         trigger: "#lyric",
    //         scrub: true,
    //         end: "bottom bottom",
    //     },
    //     backgroundColor: '#4C0C0D'
    // });

    // gsap.to( "", {
    //     scrollTrigger: {
    //         trigger: "#dauan",
    //         scrub: true,
    //         end: "bottom bottom",
    //     },
    //     backgroundColor: '#4C0C0D'
    // });

    // const scrollColorElems = document.querySelectorAll("[data-bgcolor]");
    // scrollColorElems.forEach((colorSection, i) => {
    //     const prevBg = i === 0 ? "" : 'white';
    //     console.log(colorSection.dataset.bgcolor)

    //     ScrollTrigger.create({
    //         trigger: colorSection,
    //         scroller: ".main",
    //         start: "top 10%",
    //         // end: "bottom bottom",
    //         scrub: true,
    //         onEnter: () => {
    //             gsap.to(".bg-1", {
    //                 scrub: true,
    //                 backgroundColor: colorSection.dataset.bgcolor,
    //                 overwrite: "auto"
    //             })
    //             // gsap.to("#dauan", {
    //             //     backgroundColor: colorSection.dataset.bgcolor,
    //             //     overwrite: "auto"
    //             // })
    //         },
    //         onLeaveBack: () =>
    //             gsap.to(".bg-1", {
    //                 scrub: true,
    //                 backgroundColor: prevBg,
    //                 overwrite: "auto"
    //             })
    //     });
    // });

    let chars = gsap.utils.toArray(".char");

    gsap.to(chars, {
        opacity: 1,
        ease: "none",
        stagger: 0.5,
        scrollTrigger: {
            trigger: "#intro",
            scrub: true,
            pin: true,
            start: `top`,
            end: `+=${window.innerHeight / 1.5}`,
        },
    })


    if ($(window).width() > 768) {
        // console.log($(window).width())
        let pinBoxes = document.querySelectorAll(".vnp-dauan-list > *");
        let pinWrap = document.querySelector(".vnp-dauan-list");
        let pinWrapWidth = pinWrap.offsetWidth;
        let horizontalScrollLength = pinWrapWidth - window.innerWidth;
        
        function removeProps(){  
            console.log('Reverse Complete')
            // is there something i can run here to remove the props?  
          }
          
      
        gsap.to(".vnp-dauan-list", {
          scrollTrigger: {
            // scroller: pageContainer, //locomotive-scroll
            scrub: true,
            trigger: "#dauan",
            pin: true,
            // anticipatePin: 1,
            start: "top top",
            end: pinWrapWidth,
            maker: true
          },
          x: -horizontalScrollLength,
          ease: "none"
        });

        let tl = gsap.timeline({
            scrollTrigger: {
              trigger: document.querySelector('#dauan'),
              start: "top top",
              end: pinWrapWidth,
              scrub: true
            },
            onReverseComplete: () => removeProps()
          })

        let wordmark = document.querySelector('.bg-gradient-process');
        tl.to(wordmark, {
            width: "100vw"
        })

        console.log("load")
    }

  

    // const images = gsap.utils.toArray('img');
    // const showDemo = () => {
    // document.body.style.overflow = 'auto';
    // document.scrollingElement.scrollTo(0, 0);
    // gsap.to(document.querySelector('.loader'), { autoAlpha: 0 });
    
    let sectionimg = gsap.utils.toArray(".section-img");
    sectionimg.forEach((section, index) => {
        const w = section.querySelector('.wrapper');
        const [x, xEnd] = (index % 2) ? ['100%', (w.scrollWidth - section.offsetWidth) * -1] : [w.scrollWidth * -1, 0];
        gsap.fromTo(w, {  x  }, {
        x: xEnd,
        scrollTrigger: { 
            trigger: section, 
            scrub: 0.5 
        }
        });
    });
    // }

    
    let chars1 = gsap.utils.toArray(".char1");

    gsap.to(chars1, {
        opacity: 1,
        color: "#D90000",
        ease: "none",
        stagger: 0.5,
        scrollTrigger: {
            trigger: "#giaithuong",
            scrub: true,
            pin: true,
            start: `top`,
            end: `+=${window.innerHeight / 1.5}`,
        },
    })
    
  });