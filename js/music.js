const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAY_STORE_KEY = "playStore";

const player = $(".player");
const playlist = $(".playlist");
const progress = $(".progress");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const repeatBtn = $(".btn-repeat");
const randomBtn = $(".btn-random");

const playBtn2 = $(".btn-toggle-play-2");
const nextBtn2 = $(".btn-next-2");
const prevBtn2 = $(".btn-prev-2");
const name2 = $(".music-name");
const auth2 = $(".music-auth");
const cdThumb2 = $(".cd-thumb-2");
const progress2 = $(".music-progress");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PLAY_STORE_KEY)) || {},
  songs: [
    {
      name: "Ái Nộ",
      singer: "Masew, Khôi Vũ",
      path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1021/AiNo1-MasewKhoiVu-7078913.mp3?st=ngcoKLRyRorVu8KqUeS1wg&e=1638762705",
      image:
        "https://avatar-nct.nixcdn.com/song/2021/08/30/2/1/a/e/1630316309035.jpg",
    },
    {
      name: "Bước Qua Nhau",
      singer: "Vũ",
      path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/BuocQuaNhau-Vu-7120388.mp3?st=I9W59X1Odyi9QRGTehWfHg&e=1638708688",
      image:
        "https://avatar-nct.nixcdn.com/song/2021/11/19/6/d/9/1/1637317177185.jpg",
    },
    {
      name: "Muộn Rồi Mà Sao Còn",
      singer: "Sơn Tùng M-TP",
      path: "https://c1-ex-swe.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=tD-Ln6qGqkdH659AeuHsjQ&e=1638782546",
      image:
        "https://avatar-nct.nixcdn.com/song/2021/04/29/9/1/f/8/1619691182261.jpg",
    },
    {
      name: "Thức Giấc",
      singer: "Da LAB",
      path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1018/ThucGiac-DaLAB-7048212.mp3?st=1LcQhTisk8WrOQuzK4p86Q&e=1638782708",
      image:
        "https://avatar-nct.nixcdn.com/song/2021/07/14/8/c/f/9/1626231010810.jpg",
    },
    {
      name: "Độ Tộc 2",
      singer: "Masew, Độ Mixi, Phúc Du, Pháo",
      path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1020/DoToc2-MasewDoMixiPhucDuPhao-7064730.mp3?st=ehahZN3-iX9xYdBFgDgGcg&e=1638782785",
      image:
        "https://avatar-nct.nixcdn.com/song/2021/08/10/b/2/e/0/1628579601228.jpg",
    },
    {
      name: "Chúng Ta Sau Này",
      singer: "T.R.I",
      path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1010/ChungTaSauNay-TRI-6929586.mp3?st=l56Wr1fLE9fMnFehhpo5xg&e=1638782875",
      image:
        "https://avatar-nct.nixcdn.com/song/2021/01/27/5/2/2/b/1611738358661.jpg",
    },
    {
      name: "Dịu Dàng Em Đến",
      singer: "ERIK, NinjaZ",
      path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1021/DiuDangEmDen-ERIKNinjaZ-7078877.mp3?st=QmjyqbnGv3jClPKm4oA1YQ&e=1638782938",
      image:
        "https://avatar-nct.nixcdn.com/song/2021/08/30/2/1/a/e/1630307726211.jpg",
    },
    {
      name: "Hương",
      singer: "Văn Mai Hương, Negav",
      path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1010/Huong-VanMaiHuongNegav-6927340.mp3?st=PvHOWlRnF6TymvggYGding&e=1638783027",
      image:
        "https://avatar-nct.nixcdn.com/song/2021/01/22/9/f/2/1/1611280898757.jpg",
    },
    {
      name: "Miên Man",
      singer: "DUTZUX",
      path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/MienMan-DUTZUX-7120884.mp3?st=yTOFq5aH8FGEvbm-_n_KTA&e=1638783090",
      image:
        "https://avatar-nct.nixcdn.com/song/2021/11/19/6/d/9/1/1637320885751.jpg",
    },
    {
      name: "có hẹn với thanh xuân",
      singer: "MONSTAR",
      path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1020/cohenvoithanhxuan-MONSTAR-7050201.mp3?st=PjrrnZ2dZ3ffA6R7dRrppQ&e=1638783161",
      image:
        "https://avatar-nct.nixcdn.com/song/2021/07/16/f/4/9/8/1626425507034.jpg",
    },
  ],
  setConfig: function (key, value) {
    app.config[key] = value;
    localStorage.setItem(PLAY_STORE_KEY, JSON.stringify(app.config));
  },
  render: function () {
    const htmls = app.songs.map((song, index) => {
      return `<div class="song ${
        index === app.currentIndex ? "active" : ""
      }"data-index=${index}>
                <div class="thumb"
                    style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <span class="material-symbols-rounded">
                    more_horiz
                </span>
          </div>`;
    });
    playlist.innerHTML = htmls.join("");
  },
  handleEvents: function () {
    //Xử lí xoay CD
    const cdWidth = cd.offsetWidth;
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity,
    });
    cdThumbAnimate.pause();

    //Xử lí cuộn CD
    document.addEventListener("scroll", () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    });

    //Xử lí click audio
    playBtn.addEventListener("click", () => {
      if (app.isPlaying) {
        audio.pause();
        playBtn.textContent = "play_arrow";
        playBtn2.textContent = "play_arrow";
      } else {
        audio.play();
        playBtn.textContent = "pause";
        playBtn2.textContent = "pause";
      }
    });

    playBtn2.addEventListener("click", () => {
      if (app.isPlaying) {
        audio.pause();
        playBtn2.textContent = "play_arrow";
        playBtn.textContent = "play_arrow";
      } else {
        audio.play();
        playBtn2.textContent = "pause";
        playBtn.textContent = "pause";
      }
    });

    audio.addEventListener("play", () => {
      app.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    });

    audio.addEventListener("pause", () => {
      app.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    });

    // Xử lí chỉnh time bài hát
    audio.addEventListener("timeupdate", () => {
      const progressPercent = Math.floor(
        (audio.currentTime / audio.duration) * 100
      );
      progress.value = progressPercent;
      progress2.value = progressPercent;
    });

    progress.addEventListener("change", (e) => {
      audio.currentTime = (e.target.value / 100) * audio.duration;
    });

    progress2.addEventListener("change", (e) => {
      audio.currentTime = (e.target.value / 100) * audio.duration;
    });

    //Khi next, prev, random bài hát
    nextBtn.addEventListener("click", () => {
      if (app.isRandom) {
        app.randomSong();
      } else {
        app.nextSong();
      }
      audio.play();
      app.scrollToActiveSong();
      app.render();
    });

    nextBtn2.addEventListener("click", () => {
      if (app.isRandom) {
        app.randomSong();
      } else {
        app.nextSong();
      }
      audio.play();
    });

    prevBtn.addEventListener("click", () => {
      if (app.isRandom) {
        app.randomSong();
      } else {
        app.prevSong();
      }
      audio.play();
      app.scrollToActiveSong();
      app.render();
    });

    prevBtn2.addEventListener("click", () => {
      if (app.isRandom) {
        app.randomSong();
      } else {
        app.prevSong();
      }
      audio.play();
    });

    randomBtn.addEventListener("click", () => {
      app.isRandom = !app.isRandom;
      app.setConfig("isRandom", app.isRandom);
      randomBtn.classList.toggle("active", app.isRandom);

      app.isRepeat = false;
      repeatBtn.classList.toggle("active", app.isRepeat);
    });

    repeatBtn.addEventListener("click", () => {
      app.isRepeat = !app.isRepeat;
      app.setConfig("isRepeat", app.isRepeat);
      repeatBtn.classList.toggle("active", app.isRepeat);

      app.isRandom = false;
      randomBtn.classList.toggle("active", app.isRandom);
    });

    // Khi bài hát kết thúc
    audio.addEventListener("ended", () => {
      if (app.isRepeat) {
        audio.play();
      } else {
        app.nextSong();
      }

      if (app.isRandom) {
        app.randomSong();
      }
      audio.play();
    });

    //Khi click vào song vào
    playlist.addEventListener("click", (e) => {
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode && !e.target.closest(".option")) {
        if (songNode) {
          app.currentIndex = Number(songNode.getAttribute("data-index"));
          app.loadCurrentSong();
          app.render();
          audio.play();
        }
      }
    });
  },

  defineProperties: function () {
    Object.defineProperty(app, "currentSong", {
      get: function () {
        app.setConfig("currentIndex", app.currentIndex);
        return app.songs[app.currentIndex];
      },
    });
  },
  loadConfig: function () {
    app.currentIndex = app.config.currentIndex;
    app.isRandom = app.config.isRandom;
    app.isRepeat = app.config.isRepeat;

    repeatBtn.classList.toggle("active", app.isRepeat);
    randomBtn.classList.toggle("active", app.isRandom);
  },
  loadCurrentSong: function () {
    heading.textContent = app.currentSong.name;
    cdThumb.style.backgroundImage = `url("${app.currentSong.image}")`;
    audio.src = app.currentSong.path;

    name2.textContent = app.currentSong.name;
    auth2.textContent = app.currentSong.singer;
    cdThumb2.src = `${app.currentSong.image}`;
  },
  nextSong: function () {
    app.currentIndex++;
    if (app.currentIndex >= app.songs.length) {
      app.currentIndex = 0;
    }
    app.loadCurrentSong();
  },
  prevSong: function () {
    if (app.currentIndex <= 0) {
      app.currentIndex = app.songs.length;
    }
    app.currentIndex--;
    app.loadCurrentSong();
  },
  randomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * app.songs.length);
    } while (newIndex === app.currentIndex);

    app.currentIndex = newIndex;
    app.loadCurrentSong();
  },

  scrollToActiveSong: function () {
    setTimeout(() => {
      if (this.currentIndex < 2) {
        const scrollSong = $(".song.active");
        scrollSong.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      } else {
        const scrollSong = $(".song.active");
        scrollSong.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 300);
  },
  start: function () {
    app.defineProperties();
    app.loadConfig();
    app.loadCurrentSong();
    app.handleEvents();
    app.render();
  },
};

app.start();
