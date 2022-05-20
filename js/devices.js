import {
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

const listDevices = document.querySelector(".list-items");

const addBtn = document.querySelector(".modal-btn-add");
const nameDevices = document.querySelector(".modal-device-name");
const iconDevices = document.querySelectorAll(
  ".modal-choose-device .modal-device-icon span"
);

const status = document.querySelector(".modal-choose-status input");

const STATUS = {
  ACTIVE: "active",
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

const slider = $("#appearance7").data("roundSlider");

let activeId = "";

$("#appearance7").on("change", function (e) {
  if (activeId != "") {
    const db = getDatabase();
    set(ref(db, "devices/" + activeId + "/value"), e.value);
  }
});

document
  .querySelector(".box-device-controller input")
  .addEventListener("click", (e) => {
    if (activeId != "") {
      const db = getDatabase();
      set(
        ref(db, "devices/" + activeId + "/status"),
        e.target.checked ? STATUS.ACTIVE : STATUS.INACTIVE
      );
    }
  });

const Element = (id, status = STATUS.INACTIVE, data) => {
  console.log(data);
  const Device = document.createElement("div");
  Device.className = "item-device " + status;
  Device.id = id;
  const deviceData = data.find((item) => item[0] === id)[1];
  Device.addEventListener("click", () => {
    activeId = id;
    document.querySelector(".box-device-controller input").checked =
      deviceData.status === STATUS.ACTIVE;
    document.querySelector(".box-device-controller .device-title").textContent =
      deviceData.name;
    document.querySelector(
      ".box-device-controller .material-symbols-rounded"
    ).textContent = deviceData.icon;
    slider.setValue(deviceData.value ? deviceData.value : 0);
  });

  const Icon = document.createElement("span");
  Icon.className = "material-symbols-rounded";

  Icon.textContent = deviceData.icon;

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

  writeDevice(deviceID, statusDevice, name, icon);
});

const db = getDatabase();
const devicesRef = ref(db, "devices");
onValue(devicesRef, (snapshot) => {
  const data = snapshot.val();

  if (!data) {
    document.querySelector(".box-device-controller").style.display = "none";
  } else {
    document.querySelector(".box-device-controller").style.display = "flex";
  }

  document.querySelectorAll(".item-device").forEach((device) => {
    device.remove();
  });

  Object.entries(data).forEach(([key, value]) => {
    const device = Element(key, value.status, Object.entries(data));
    addDevice(device);
    if (activeId === "") {
      $(device).click();
    }
  });
});
