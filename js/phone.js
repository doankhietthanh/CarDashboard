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
  {
    name: "John",
    avatar: "https://joeschmoe.io/api/v1/1",
    phone: "0987654321",
    time: "10:00",
    status: "phone_callback",
  },
  {
    name: "Alex",
    avatar: "https://joeschmoe.io/api/v1/2",
    phone: "0999922213",
    time: "12:00",
    status: "phone_forwarded",
  },
  {
    name: "Mary",
    avatar: "https://joeschmoe.io/api/v1/3",
    phone: "0987654321",
    time: "14:00",
    status: "phone_callback",
  },
  {
    name: "John",
    avatar: "https://joeschmoe.io/api/v1/1",
    phone: "0987654321",
    time: "16:00",
    status: "phone_callback",
  },
  {
    name: "Alex",
    avatar: "https://joeschmoe.io/api/v1/2",
    phone: "0999922213",
    time: "18:00",
    status: "phone_callback",
  },
  {
    name: "Mary",
    avatar: "https://joeschmoe.io/api/v1/3",
    phone: "0987654321",
    time: "20:00",
    status: "phone_missed",
  },
  {
    name: "John",
    avatar: "https://joeschmoe.io/api/v1/1",
    phone: "0987654321",
    time: "22:00",
    status: "phone_callback",
  },
];

const phonebookMain = document.querySelector(".phonebook-main");
listPersons.forEach((person) => {
  console.log(person.status);
  let color = "";
  if (person.status === "phone_callback") {
    color = "green";
  } else if (person.status === "phone_forwarded") {
    color = "blue";
  } else if (person.status === "phone_missed") {
    color = "red";
  }

  phonebookMain.innerHTML += `
  <div class="phonebook-person">
    <div class="phonebook-person-left">
    <div class="phonebook-person-avatar">
        <img src="${person.avatar}">
    </div>
    </div>
    <div class="phonebook-person-center">
    <div class="phonebook-person-name">
    <span>${person.name}</span>
    </div>
    <div class="phonebook-person-timer">
        <span>${person.time}</span>
    </div>
    </div>
    <div class="phonebook-person-right">
    <div class="phonebook-person-call">
        <span class="material-symbols-rounded" style="color: ${color}">
            ${person.status}
        </span>
    </div>
    </div>
  </div>
    `;
});
