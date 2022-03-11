const road = document.querySelectorAll('.cell');
const scoreDisplay = document.querySelector('#score-display');

let duckPositionX = 1;

let gameSpeed = 250;
let jumpDescentDelay = gameSpeed; // CSS.
let score = 0;

let isStarted = false;

function initDuck() {
    road[duckPositionX].classList.add('duck');
}

function updateScoreDisplay() {
    scoreDisplay.innerText = `Score: ${score}`;
}

initDuck();
updateScoreDisplay();

function jump(event) {
    if (event.code === 'Space') {
        /**
         * Il gioco incomincia quando il giocatore
         * preme SPAZIO, non quando carica la pagina.
         * [EXTRA]
         */
        if (!isStarted) {
            isStarted = !isStarted;
            addPlant();
        }

        if (!event.repeat) {
            road[duckPositionX].classList.add('jump');

            setTimeout(() => {
                road[duckPositionX].classList.remove('jump');
            }, jumpDescentDelay);
        }
    }
}

function addPlant() {
    let genPositionMin = road.length / 2;
    let genPositionMax = road.length;

    /**
     * Aggiungo la classe .plant randomicamente
     * nella seconda metà di road.
     * [EXTRA]
     */
    let plantPositionX = Math.floor(Math.random() * (genPositionMax - genPositionMin) + genPositionMin);
    road[plantPositionX].classList.add('plant');

    console.info(`GenPosition: ${plantPositionX} - GameSpeed: ${gameSpeed}`);

    const plantAnimationX = setInterval(() => {
        score++;
        updateScoreDisplay();

        road[plantPositionX].classList.remove('plant'); // Delete.

        if (plantPositionX === 0) {
            clearInterval(plantAnimationX);
            addPlant();
            return;
        } else {
            plantPositionX--;
        }

        road[plantPositionX].classList.add('plant'); // Add.

        if (plantPositionX === duckPositionX) {
            if (!road[plantPositionX].classList.contains('jump')) {
                road[plantPositionX].classList.remove('duck');
                clearInterval(plantAnimationX);

                showAlert(`GAME OVER!`, false);
                return;
            } else if (road[plantPositionX].classList.contains('jump')) {
                updateGameSpeed();
            }
        }
    }, gameSpeed);
}

/**
 * Se il giocatore salta correttamente
 * la gameSpeed viene aumentata del 5 %; anche la transition viene corretta.
 * [EXTRA]
 */
function updateGameSpeed() {
    gameSpeed = Math.floor(gameSpeed * 0.95);
    road[duckPositionX].style.transition = `transform ${gameSpeed / 1000}s ease`;
}

document.addEventListener('keydown', jump);
