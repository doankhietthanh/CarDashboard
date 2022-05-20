const sliders = document.querySelectorAll(".slider > div");
const containerCover = document.querySelector(".container-cover");

sliders.forEach((slider, index) => {
  slider.addEventListener("click", (e) => {
    sliders.forEach((remove) => {
      remove.querySelector("span").classList.remove("active");
    });

    slider.querySelector("span").classList.add("active");
    console.log(`transform: translateY(${-100 * index}%)`);
    containerCover.style = `transform: translateY(${(-100 / 4) * index}%)`;
  });
});
