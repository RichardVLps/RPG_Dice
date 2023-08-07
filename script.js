const result = document.querySelector(".result");
const amount = document.querySelector("#amount");
const amountDice = document.querySelector("#amount__dice");

document.querySelector("#menos").addEventListener("click", () => {
  if (amount.textContent > 0) {
    amount.textContent--;
  }
});

document.querySelector("#mais").addEventListener("click", () => {
  amount.textContent++;
});

document.querySelector(".values__content:first-child .btn:first-child").addEventListener("click", () => {
  let diceNumber = parseInt(amountDice.textContent.replace("D", ""));
  if (diceNumber > 1) {
    diceNumber--;
    amountDice.textContent = diceNumber + "D";
  }
});

document.querySelector(".values__content:first-child .btn:last-child").addEventListener("click", () => {
  let diceNumber = parseInt(amountDice.textContent.replace("D", ""));
  diceNumber++;
  amountDice.textContent = diceNumber + "D";
});

const attackMode = document.querySelector(".attack__btn");

function numberGenerator(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

attackMode.addEventListener("click", () => {
  attackMode.classList.toggle("active");
  document.querySelector(".attack__img").src = attackMode.classList.contains("active") ? "./img/attack.png" : "./img/noAttack.png";
});

document.querySelectorAll(".dice").forEach((dice) => {

  dice.addEventListener("click", (dice) => {

    result.style.display = "flex";

    const diceFace = dice.currentTarget.querySelector(".dice__face").textContent;
    const diceList = { D4: 4, D6: 6, D8: 8, D10: 10, D12: 12, D20: 20 }[diceFace];
    const numDice = parseInt(amountDice.textContent.replace("D", ""));
    let rollResults = Array.from({ length: numDice }, () => numberGenerator(1, diceList));

    document.querySelector(".result__dice").textContent = numDice + diceFace + "+" + amount.textContent;

    const sum = rollResults.reduce((dice, e) => dice + e, 0) + parseInt(amount.textContent);
    const max = Math.max(...rollResults) + parseInt(amount.textContent);

    document.querySelector(".result__number").textContent = attackMode.classList.contains("active") ? sum : max;
    document.querySelector("#sequence").textContent = rollResults.join(", ");
    dice.stopPropagation();
    
  });
});

document.addEventListener("click", (outside) => {
  if (!result.contains(outside.target)) {
    result.style.display = "none";
  }
});

document.addEventListener("keydown", (esc) => {
  if (esc.key === "Escape") {
    result.style.display = "none";
  }
});