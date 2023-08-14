const currentTime = document.querySelector("h1");
const content = document.querySelector(".content");
const setAlarmBtn = document.querySelector("button");
const selectMenu = document.querySelectorAll("select");
let ringtone = new Audio("./ringtone.mp3");
let alarmTime,
  isAlarmSet = false;
// console.log(selectMenu)

for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  // console.log(i);
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  // console.log(i);
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  // console.log(i);
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  let date = new Date();
  h = date.getHours();
  m = date.getMinutes();
  s = date.getSeconds();

  ampm = "AM";
  if (h > 12) {
    h = h - 12;
    ampm = "PM";
  }
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  // console.log(`${h}:${m}:${s}`)
  currentTime.innerHTML = `${h}:${m}:${s}:${ampm}`;

  if (alarmTime == `${h}:${m}:${ampm}`) {
    ringtone.play();
  }
}, 1000);

function setAlarm() {
  if (isAlarmSet) {
    alarmTime = "";
    ringtone.pause();
    content.classList.remove("disable");
    setAlarmBtn.innerHTML = "Set Alarm";
    return (isAlarmSet = false);
  }

  alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value}`;
  console.log(alarmTime);

  if (
    alarmTime.includes("Hour") ||
    alarmTime.includes("Minute") ||
    alarmTime.includes("AM/PM")
  ) {
    alert("Please select a valid time to set alarm !");
  }
  isAlarmSet = true;

  content.classList.add("disable");
  setAlarmBtn.innerHTML = "Stop Alarm";
}

setAlarmBtn.addEventListener("click", setAlarm);
