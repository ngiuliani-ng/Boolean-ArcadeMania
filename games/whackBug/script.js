const timerDisplay = document.querySelector('#timer-display');
const levelDisplay = document.querySelector('#level-display');
const scoreDisplay = document.querySelector('#score-display');
const cells = document.querySelectorAll('.cell');

let timeLeft = 30;
let level = 1;
let score = 0;

let gameSpeed = 800;
let tempScore = 0;

function updateTimerDisplay() {
    timerDisplay.innerText = `Timer: ${timeLeft}s`;
}

function updateLevelDisplay() {
    levelDisplay.innerText = `Level: ${level}`;
}

function updateScoreDisplay() {
    scoreDisplay.innerText = `Score: ${score * level}`;
}

updateTimerDisplay();
updateLevelDisplay();
updateScoreDisplay();

let bugMotion = setInterval(moveBug, gameSpeed);
const countDown = setInterval(function () {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft === 0) {
        clearInterval(countDown);
        clearInterval(bugMotion);
        cleanAllBugs();

        showAlert(`GAME OVER!`, false);
    }
}, 1000);

for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];

    cell.addEventListener('click', function () {
        /**
         * Senza la condition "!cell.classList.contains('bug-splattered')"
         * era possibile colpire ed incrementare il punteggio più volte.
         * [EXTRA]
         */
        if (cell.classList.contains('bug') && !cell.classList.contains('bug-splattered')) {
            score++;
            updateScoreDisplay();

            cell.classList.add('bug-splattered');

            tempScore++;

            /**
             * Se il giocatore colpisce consecutivamente 2 bug
             * la gameSpeed viene incrementata del 15%.
             */
            if (tempScore === 2) {
                level++;
                updateLevelDisplay();

                gameSpeed = Math.floor(gameSpeed * 0.85);

                clearInterval(bugMotion);
                bugMotion = setInterval(moveBug, gameSpeed);

                tempScore = 0; // Reset.
            }
        } else if (!cell.classList.contains('bug')) {
            tempScore = 0; // Reset.
        }
    });
}

function cleanAllBugs() {
    for (let i = 0; i < cells.length; i++) {
        const cellToClean = cells[i];

        /**
         * "'bug-splattered'"
         * [EXTRA]
         */
        cellToClean.classList.remove('bug', 'bug-splattered');
    }
}

function moveBug() {
    cleanAllBugs();

    const randomCell = Math.floor(Math.random() * cells.length); // 0 → 8.
    const cell = cells[randomCell];

    cell.classList.add('bug');
}
