'use strict';

// Selecting elements
const player0ELement = document.querySelector('.player--0');
const player0ScoreBoard = document.querySelector('#score--0');
const player0CurrentScore = document.querySelector('#current--0');
const player1ELement = document.querySelector('.player--1');
const player1ScoreBoard = document.querySelector('#score--1');
const player1CurrentScore = document.querySelector('#current--1');
const diceElement = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Function to reset the game
const initializeGame = () => {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  player0CurrentScore.textContent = 0;
  player0ScoreBoard.textContent = 0;
  player0ELement.classList.add('player--active');
  player0ELement.classList.remove('player--winner');

  player1CurrentScore.textContent = 0;
  player1ScoreBoard.textContent = 0;
  player1ELement.classList.remove('player--active');
  player1ELement.classList.remove('player--winner');

  diceElement.classList.add('hidden');
};

// Function to switch the active player
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0ELement.classList.toggle('player--active');
  player1ELement.classList.toggle('player--active');
  currentScore = 0;
};

// Rolling dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    // Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //   Display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    //   Check for rolled 1:
    if (dice !== 1) {
      // Add to current Score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Hold Current score functionality
btnHold.addEventListener('click', () => {
  if (playing) {
    // Add current score to active player's score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    //   Check if player's score is >= 100 ? Finish game
    if (score[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceElement.classList.add('hidden');
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Reset game on Clicking the reset btn
btnNewGame.addEventListener('click', () => {
  initializeGame();
});
