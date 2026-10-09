'use strict';

const STARTING_SCORE = 20;
const MIN_NUMBER = 1;
const MAX_NUMBER = 20;

let secretNumber = generateSecretNumber();
let score = STARTING_SCORE;
let highscore = 0;
let isGameOver = false;

const messageEl = document.querySelector('.message');
const numberEl = document.querySelector('.number');
const guessInput = document.querySelector('.guess');
const scoreEl = document.querySelector('.score');
const highscoreEl = document.querySelector('.highscore');
const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.again');
const bodyEl = document.body;

function generateSecretNumber() {
    return Math.trunc(Math.random() * MAX_NUMBER) + MIN_NUMBER;
}

function displayMessage(message) {
    messageEl.textContent = message;
}

function handleGuess() {
    if (isGameOver) return;

    const rawValue = guessInput.value.trim();
    const guess = Number(rawValue);

    if (rawValue === '') {
        displayMessage('⛔ No number entered!');
        guessInput.focus();
        return;
    }

    if (guess < MIN_NUMBER || guess > MAX_NUMBER) {
        displayMessage(`⚠️ Number must be between ${MIN_NUMBER} and ${MAX_NUMBER}!`);
        guessInput.value = '';
        guessInput.focus();
        return;
    }

    if (guess === secretNumber) {
        isGameOver = true;
        displayMessage('🎉 Correct Number!');
        numberEl.textContent = secretNumber;
        
        bodyEl.classList.add('win-theme');
        guessInput.disabled = true;
        checkBtn.disabled = true;

        if (score > highscore) {
            highscore = score;
            highscoreEl.textContent = highscore;
        }
        return;
    }

    if (score > 1) {
        displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
        score--;
        scoreEl.textContent = score;
        guessInput.value = '';
        guessInput.focus();
    } else {
        isGameOver = true;
        score = 0;
        scoreEl.textContent = score;
        displayMessage('💥 Game Over! You lost.');
        numberEl.textContent = secretNumber;
        guessInput.disabled = true;
        checkBtn.disabled = true;
    }
}

function handleReset() {
    score = STARTING_SCORE;
    secretNumber = generateSecretNumber();
    isGameOver = false;

    displayMessage('Start Guessing...');
    scoreEl.textContent = score;
    numberEl.textContent = '?';
    guessInput.value = '';
    guessInput.disabled = false;
    checkBtn.disabled = false;
    bodyEl.classList.remove('win-theme');

    guessInput.focus();
}

checkBtn.addEventListener('click', handleGuess);
againBtn.addEventListener('click', handleReset);

guessInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleGuess();
    }
});

guessInput.focus();