const grid = document.querySelector('#grid');

const cards = ['alien', 'bug', 'duck', 'rocket', 'spaceship', 'tiktac'];
const deck = [...cards, ...cards]; // Spread Syntax.

let pick = [];
let errorCounter = 0;

deck.sort(function () {
    /**
     * Sottraendo a 0.5 un numero compreso tra 0 ed 1 (Math.random())
     * riesco ad ottenere un risultato positivo o negativo,
     * ordinando quindi randomicamente l'array deck.
     */
    return (0.5 - Math.random());
});

for (let i = 0; i < deck.length; i++) {
    const card = document.createElement('div');

    card.classList.add('card');
    card.setAttribute('data-name', deck[i]);

    card.addEventListener('click', flipCard);

    grid.appendChild(card);
}

function flipCard(e) {
    /**
     * Prima di girare una carta devo capire se posso farlo.
     * Senza questo controllo era possibile girare più di 2 carte.
     * [EXTRA]
     */
    if (pick.length === 2) return;

    /**
     * Il parameter "event", o "e", è un oggetto contentente informazioni
     * sull'azione che è appena avvenuta, in questo caso "click".
     */
    const card = e.target;

    if (card.classList.contains('flipped')) return;

    card.classList.add(card.getAttribute('data-name'), 'flipped');

    pick.push(card);

    if (pick.length === 2) {
        setTimeout(checkForMatch, 500);
    }
}

function checkForMatch() {
    const card1 = pick[0];
    const card2 = pick[1];
    const card1Name = card1.getAttribute('data-name');
    const card2Name = card2.getAttribute('data-name');

    if (card1Name === card2Name) {
        hasWon = checkVictory();

        if (hasWon) {
            showAlert('HAI VINTO!', hasWon);
        }
    } else {
        card1.classList.remove(card1Name, 'flipped');
        card2.classList.remove(card2Name, 'flipped');

        errorCounter++;
        showErrors();
    }

    pick = []; // Reset.
}

function checkVictory() {
    const flippedCards = document.querySelectorAll('.flipped');

    if (flippedCards.length === deck.length) return true;
    return false;
}

function showErrors() {
    const errors = document.querySelector('#errors');

    errors.innerText = `Errors: ${errorCounter}`;
}
