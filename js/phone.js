const keypadNumbers = document.querySelectorAll(".keypad-number");
let listNumbers = [];
keypadNumbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    console.log(number.getAttribute("value"));
    listNumbers.push(number.getAttribute("value"));
    renderResultKeypadUI(listNumbers.join(""));
  });
});

const renderResultKeypadUI = (value) => {
  const keypadResult = document.querySelector("#keypad-result");
  keypadResult.value = value;
};

const listPersons = [
  { name: "John", avatar: "./", phone: "0987654321", time: "10:00" },
  { name: "Alex", avatar: "./", phone: "0999922213", time: "12:00" },
  { name: "Mary", avatar: "./", phone: "0987654321", time: "14:00" },
  { name: "John", avatar: "./", phone: "0987654321", time: "16:00" },
  { name: "Alex", avatar: "./", phone: "0999922213", time: "18:00" },
];
