const choice = document.querySelectorAll("[data-color-choice]"),
  first = document.getElementById("firstChoice"),
  second = document.getElementById("secondChoice"),
  third = document.getElementById("thirdChoice"),
  fourth = document.getElementById("fourthChoice"),
  result = [first, second, third, fourth],
  randomColors = [];

let pickedColor = [],
  i = 0;

randomColor();

console.log(randomColors);

choice.forEach((button) => {
  button.addEventListener("click", () => {
    pickedColor.push(button.id);
    userChoice();
  });
});

document.getElementById("newGame").addEventListener("click", () => {
  location.reload();
});

function userChoice() {
  result[i].classList.add(`bg-${pickedColor[i]}`);
  i == 3 ? pushChoice() : i++;
  return;
}

function pushChoice() {
  const historyEl = document.createElement("div");
  historyEl.classList.add(
    "userChoice",
    "d-flex",
    "flex-row",
    "justify-content-around",
    "align-items-center"
  );
  historyEl.innerHTML = `<div
  class="bg-${pickedColor[0]} round-button border border-dark rounded-circle"
></div>
<div
  class="bg-${pickedColor[1]} round-button border border-dark rounded-circle"
></div>
<div
  class="bg-${pickedColor[2]} round-button border border-dark rounded-circle"
></div>
<div
  class="bg-${pickedColor[3]} round-button border border-dark rounded-circle"
></div>`;
  document.getElementById("history").appendChild(historyEl);
  verification();
  reset();
  return;
}
function reset() {
  i = 0;
  for (let j = 0; j < 4; j++) {
    result[j].classList.remove(`bg-${pickedColor[j]}`);
    console.log(j);
  }
  pickedColor = [];
  return;
}

function randomColor() {
  const colors = ["primary", "danger", "warning", "success"];
  for (let j = 0; j < 4; j++) {
    randomColors.push(colors[Math.round(Math.random() * 3)]);
  }
  return;
}

function verification() {
  let black = 0,
    white = 0,
    temp = [],
    userTemp = [];

  randomColors.map((el) => temp.push(el));
  pickedColor.map((el) => userTemp.push(el));

  userTemp.map((el, index) => {
    if (el == temp[index]) {
      black++;
      temp.splice(index, 1, "checked");
      userTemp.splice(index, 1, "userChecked");
    }
  });
  console.log(userTemp);
  userTemp.map((el, index) => {
    if (temp.includes(el)) {
      white++;
      temp.splice(temp.indexOf(el), 1, "checked");
      userTemp.splice(index, 1, "userChecked");
    }
  });
  const verified = document.createElement("div");
  verified.classList.add(
    "userChoice",
    "d-flex",
    "flex-row",
    "justify-content-around",
    "align-items-center"
  );
  for (let j = 0; j < black; j++) {
    const newBlack = document.createElement("div");
    newBlack.classList.add(
      "test-result",
      "border",
      "border-dark",
      "rounded-circle",
      "bg-dark"
    );
    verified.appendChild(newBlack);
  }
  for (let j = 0; j < white; j++) {
    const newWhite = document.createElement("div");
    newWhite.classList.add(
      "test-result",
      "border",
      "border-dark",
      "rounded-circle"
    );
    verified.appendChild(newWhite);
  }
  document.getElementById("verified-target").appendChild(verified);
  black == 4 ? win() : "didn't win";
  return;
}

function win() {
  document.getElementById("modal").classList.add("active");
  document.getElementById("overlay").classList.add("active");
}
