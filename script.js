"use strict";

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  //Reseting internal state variables
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Reseting displayd UI elements
  diceEl.classList.add("hidden");
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // Make the 0 player the first one and remove the winner'class
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //Dinamiškai pažymime ir resetiname iki nulio aktyvaus žaidėjo tekstą
  currentScore = 0; //Nustatome, kad dabartinio žaidėjo prieš perjungiant į kitą žaidėją reikšmė yra lygi nuliui (ne vaizdine prasme kaip prieš tai žingsnyje)
  activePlayer = activePlayer === 0 ? 1 : 0; //Perjugiame  įkitą žaidėją - kitas tampa aktyvus
  player0El.classList.toggle("player--active"); //Toggle stilius
  player1El.classList.toggle("player--active");
};
// Rolling dice functionality

btnRoll.addEventListener("click", function () {
  console.log(scores);
  if (playing) {
    //1. Generating random dice roll

    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //3. Checked for rolled 1
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Swith to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score >=100
    if (scores[activePlayer] >= 100) {
      // 3. Finish the game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
