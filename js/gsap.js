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