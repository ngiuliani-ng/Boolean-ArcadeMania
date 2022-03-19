const grid = document.querySelector('#grid');
const gridSize = 15; // CSS.
const cells = [];

const scoreDisplay = document.querySelector('#score-display');

let score = 0;
let alienAnimationX = undefined;
let isStarted = false;

function initGrid() {
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');

        cells.push(cell);
        cell.classList.add('cell');

        grid.appendChild(cell);
    }
}

function updateScoreDisplay() {
    scoreDisplay.innerText = `Score: ${score}`;
}

initGrid();
updateScoreDisplay();

let aliens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
let aliensKilled = [];

function drawAlien() {
    for (let i = 0; i < aliens.length; i++) {
        if (!aliensKilled.includes(i)) {
            cells[aliens[i]].classList.add('alien');
        }
    }
}

function removeAlien() {
    for (let i = 0; i < aliens.length; i++) {
        cells[aliens[i]].classList.remove('alien');
    }
}

/**
 * @param 'toRightEdge'
 * @param 'toLeftEdge'
 */
let moveDirection = 'toRightEdge';
let step = 1;

function moveAlien() {
    /**
     * @description
     * Se true l'oggetto è sul bordo Sinistro.
     * @example
     * 0 % 15 = 0;
     * 15 % 15 = 0;
     * 30 % 15 = 0;
     */
    const onLeftEdge = (aliens[0] % gridSize) === 0;
    /**
     * @description
     * Se true l'oggetto è sul bordo Destro.
     * @example
     * 14 % 15 = 14;
     * 29 % 15 = 14;
     * 44 % 15 = 14;
     */
    const onRightEdge = (aliens[aliens.length - 1] % gridSize) === (gridSize - 1);

    removeAlien();

    if (moveDirection === 'toRightEdge' && onRightEdge) {
        aliens = aliens.map(i => i + gridSize + 1);
        moveDirection = 'toLeftEdge';
        step = -1;
    }

    if (moveDirection === 'toLeftEdge' && onLeftEdge) {
        aliens = aliens.map(i => i + gridSize - 1);
        moveDirection = 'toRightEdge';
        step = 1;
    }

    for (let i = 0; i < aliens.length; i++) {
        aliens[i] = aliens[i] + step;
    }

    checkVictoryAliens();
    drawAlien();
}

drawAlien(); // Init.

let spaceshipPositionX = 217;

function drawSpaceship() {
    cells[spaceshipPositionX].classList.add('spaceship');
}

function removeSpaceship() {
    cells[spaceshipPositionX].classList.remove('spaceship');
}

drawSpaceship(); // Init.

function moveSpaceship(event) {
    /**
     * @description
     * Se true l'oggetto è sul bordo Sinistro.
     * @example
     * 210 % 15 = 0;
     */
    const onLeftEdge = (spaceshipPositionX % gridSize) === 0;
    /**
     * @description
     * Se true l'oggetto è sul bordo Destro.
     * @example
     * 214 % 15 = 14;
     */
    const onRightEdge = (spaceshipPositionX % gridSize) === (gridSize - 1);

    if (event.code === 'ArrowLeft' && !onLeftEdge) {
        removeSpaceship();
        spaceshipPositionX--;
        drawSpaceship();
    }

    if (event.code === 'ArrowRight' && !onRightEdge) {
        removeSpaceship();
        spaceshipPositionX++;
        drawSpaceship();
    }
}

document.addEventListener('keydown', moveSpaceship);

function spaceshipShoot(event) {
    if (event.code !== 'Space' || event.repeat) return;
    /**
     * Il gioco incomincia quando il giocatore
     * preme SPAZIO, non quando carica la pagina.
     * [EXTRA]
     */
    if (!isStarted) {
        isStarted = !isStarted;

        alienAnimationX = setInterval(() => {
            moveAlien();
        }, 500);
    }

    let laserPositionX = spaceshipPositionX;

    const laserAnimationX = setInterval(() => {
        cells[laserPositionX].classList.remove('laser');

        laserPositionX = laserPositionX - gridSize;

        if (laserPositionX < 0) {
            clearInterval(laserAnimationX);
            return;
        }

        if (cells[laserPositionX].classList.contains('alien')) {
            clearInterval(laserAnimationX);

            const alienKilled = aliens.indexOf(laserPositionX);
            aliensKilled.push(alienKilled);

            score++;
            updateScoreDisplay();

            cells[laserPositionX].classList.remove('alien');
            cells[laserPositionX].classList.add('boom');

            setTimeout(() => {
                cells[laserPositionX].classList.remove('boom');
            }, 200);

            checkVictoryHumans();
            return;
        }

        cells[laserPositionX].classList.add('laser');
    }, 200);
}

document.addEventListener('keydown', spaceshipShoot);

function checkVictoryAliens() {
    for (let i = 0; i < aliens.length; i++) {
        if (!aliensKilled.includes(aliens[i]) && aliens[i] === spaceshipPositionX) {
            clearInterval(alienAnimationX);

            showAlert('GAME OVER!', false);
        }
    }
}

function checkVictoryHumans() {
    if (aliensKilled.length === aliens.length) {
        clearInterval(alienAnimationX);

        showAlert('HAI VINTO!', true);
    }
}
