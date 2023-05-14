"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
score0El.textContent = 0;
score1El.textContent = 0;
let playing = true;

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
const playerWin = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
  playing = false;
  diceEl.classList.add("hidden");
};

diceEl.classList.add("hidden");

btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      if (
        document.getElementById(`current--${activePlayer}`).textContent >= 20
      ) {
        document.getElementById(`score--${activePlayer}`).textContent =
          currentScore;
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        playerWin();
      }
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      playerWin();
    }
    switchPlayer();
  }
});
btnNew.addEventListener("click", function () {
  scores = [0, 0];
  currentScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  playing = true;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = 0;
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
});
