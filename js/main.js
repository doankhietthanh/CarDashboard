import {
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

const circles = document.querySelectorAll(".circle");
const renderCircleUI = () => {
  circles.forEach((elem) => {
    const name = elem.getAttribute("name");
    const dots = elem.getAttribute("data-dots");
    const marked = elem.getAttribute("data-percent");
    const percent = Math.floor((dots * marked) / 100);
    const rotate = 360 / dots;
    const speed = document.querySelector(".text h2");

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

    speed.textContent = marked * 2.4;
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

// Speed
const db = getDatabase();
const getSpeed = ref(db, "speed/");
onValue(getSpeed, (snapshot) => {
  const value = snapshot.val();
  const data = (100 * value) / 240;
  document.getElementById("speed-value").setAttribute("data-percent", data);
  renderCircleUI();
  setTimeout(() => {
    document.querySelector(".speed h2").textContent = value;
  }, 1000);
});

// Gas
const getGas = ref(db, "gas/");
onValue(getGas, (snapshot) => {
  const data = snapshot.val();
  document.getElementById("gas-value").setAttribute("data-percent", data);
  renderCircleUI();
});

// Temperature
const getTemperature = ref(db, "Temperature/");
onValue(getTemperature, (snapshot) => {
  const data = snapshot.val();
  document.getElementById("temperature-value").textContent = data + "°C";
});

// Time
const pad = (val) => {
  return val < 10 ? "0" + val : val;
};
const h = new Date().getHours();
const m = new Date().getMinutes();
const output = pad(h) + ":" + pad(m);
document.getElementById("time-value").textContent = output;

// Modal
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
