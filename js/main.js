const circles = document.querySelectorAll(".circle");

const renderCircleUI = () => {
  circles.forEach((elem) => {
    const name = elem.getAttribute("name");
    const dots = elem.getAttribute("data-dots");
    const marked = elem.getAttribute("data-percent");
    const percent = Math.floor((dots * marked) / 100);
    const rotate = 360 / dots;
    const speed = document.querySelector(".text h2");
    speed.textContent = marked * 2.4;
    let points = "";
    for (let i = 0; i < dots; i++) {
      if (name === "speed") {
        points += `<div class="points" style="--i: ${
          i / 1.5
        }; --rot: ${rotate}deg"></div>`;
      } else if (name === "control") {
        points += `<div class="points" style="--i: ${
          i + 1
        }; --rot: ${rotate}deg"></div>`;
      } else if (name === "gas") {
        points += `<div class="points" style="--i: ${
          i / 1.5
        }px; --rot: ${rotate}"></div>`;
      }
    }
    elem.innerHTML = points;
    const pointsMarked = elem.querySelectorAll(".points");
    for (let i = 0; i < percent; i++) {
      pointsMarked[i].classList.add("marked");
    }
  });
};

renderCircleUI();

$("#appearance7").roundSlider({
  radius: 80,
  width: 20,
  handleSize: "+16",
  handleShape: "dot",
  sliderType: "min-range",
  step: 5,
  value: 0,
  change: (e) => {
    renderControlUI(e.value);
  },
});

const renderControlUI = (value) => {
  console.log(value);
  const controlValue = document.getElementById("control-value");
  controlValue.setAttribute("data-percent", value);

  renderCircleUI();
};

const btnAddItem = document.getElementById("btn-add-item");
let isModalAddIem = false;
btnAddItem.addEventListener("click", () => {
  if (isModalAddIem) {
    document.querySelector(".modal-add-items").classList.remove("show");
    document.querySelector(".box-choose-items").style =
      "width: calc(100% + 300px)";
    isModalAddIem = false;
  } else {
    document.querySelector(".modal-add-items").classList.add("show");
    document.querySelector(".box-choose-items").style = "width: 100%";
    isModalAddIem = true;
  }
});

const btnModalRemove = document.querySelector(".modal-btn-remove");
btnModalRemove.addEventListener("click", () => {
  document.querySelector(".modal-add-items").classList.remove("show");
  document.querySelector(".box-choose-items").style =
    "width: calc(100% + 300px)";
  isModalAddIem = false;
});
