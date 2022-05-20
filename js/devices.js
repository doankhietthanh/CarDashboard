import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyADGBqao_XouP0L5Nb7yKsJN-8nHJSaeks",
  authDomain: "iotfinal-ef2ab.firebaseapp.com",
  projectId: "iotfinal-ef2ab",
  storageBucket: "iotfinal-ef2ab.appspot.com",
  messagingSenderId: "374095180954",
  appId: "1:374095180954:web:ed483505712059a46d1b23",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const listDevices = document.querySelector(".list-items");

const addBtn = document.querySelector(".modal-btn-add");
const nameDevices = document.querySelector(".modal-device-name");
const iconDevices = document.querySelectorAll(
  ".modal-choose-device .modal-device-icon span"
);

const status = document.querySelector(".modal-choose-status input");

const STATUS = {
  ACTIVE: "active",
  BUSY: "busy",
  INACTIVE: "inactive",
};

function removeAccents(str) {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ",
    "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ",
  ];
  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
}

function convertToSlug(text) {
  return removeAccents(text)
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

const Element = (id, status = STATUS.INACTIVE, data) => {
  const Device = document.createElement("div");
  Device.className = "item-device " + status;
  Device.id = id;
  Device.addEventListener("click", () => {
    const deviceData = data.find((item) => item[0] === id)[1];
    console.log(deviceData);
  });

  const Icon = document.createElement("span");
  Icon.className = "material-symbols-rounded";

  Icon.textContent = "tv_gen";

  const Status = document.createElement("div");
  Status.className = "item-status";

  Device.appendChild(Icon);
  Device.appendChild(Status);

  return Device;
};

const addDevice = (element) => {
  listDevices.insertBefore(element, listDevices.firstChild);
};

function writeDevice(deviceID, status, name, icon) {
  const db = getDatabase();
  set(ref(db, "devices/" + deviceID), {
    status,
    name,
    icon,
  });
}

iconDevices.forEach((icon) => {
  icon.addEventListener("click", () => {
    iconDevices.forEach((icon) => {
      icon.classList.remove("active");
    });
    icon.classList.add("active");
  });
});

addBtn.addEventListener("click", () => {
  const deviceID = convertToSlug(nameDevices.value);
  const statusDevice = status.checked ? STATUS.ACTIVE : STATUS.INACTIVE;
  const name = nameDevices.value;
  let icon = "";
  for (let i = 0; i < iconDevices.length; i++) {
    if (iconDevices[i].classList.contains("active")) {
      icon = iconDevices[i].textContent.trim();
      break;
    }
  }

  const device = Element(deviceID, status);

  console.log({
    deviceID,
    statusDevice,
    name,
    icon,
  });

  writeDevice(deviceID, statusDevice, name, icon);
});

const db = getDatabase();
const devicesRef = ref(db, "devices");
onValue(devicesRef, (snapshot) => {
  const data = snapshot.val();
  document.querySelectorAll(".item-device").forEach((device) => {
    device.remove();
  });
  Object.entries(data).forEach(([key, value]) => {
    const device = Element(key, value.status, Object.entries(data));
    addDevice(device);
  });
});
