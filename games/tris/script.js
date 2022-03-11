const cells = document.querySelectorAll('.cell');

let turn = 0;
let sign;

const cellSigns = [];

let hasWon = false; // Default.

for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];

    cell.addEventListener('click', function () {
        /**
         * Prima di inserire un sign devo capire lo stato della partita.
         * Senza questo controllo era possibile far vincere entrambi i giocatori.
         * [EXTRA]
         */
        hasWon = checkVictory();

        if (!hasWon) {
            if (cellSigns[i]) return;

            turn++;

            if (turn % 2 === 0) {
                sign = 'O';
            } else {
                sign = 'X';
            }

            cell.innerText = sign;
            cellSigns[i] = sign;

            hasWon = checkVictory();

            if (hasWon) {
                return showAlert(`${sign} HA VINTO!`, hasWon);
            } else if (!hasWon && turn === 9) {
                return showAlert('PAREGGIO!', hasWon);
            }
        }
    });
}

function checkVictory() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];

        const a = combination[0];
        const b = combination[1];
        const c = combination[2];

        if (cellSigns[a] && (cellSigns[a] === cellSigns[b]) && (cellSigns[b] === cellSigns[c])) {
            return true;
        }
    }

    return false;
}
