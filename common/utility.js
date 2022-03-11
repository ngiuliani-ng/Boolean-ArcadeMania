function showAlert(message, hasWon) {
    const gameArea = document.querySelector('.game-area');

    let alertMessage = undefined;

    if (hasWon) {
        alertMessage = `
        <div class="game-alert">
            <div class="message win">${message}</div>
        </div>
        `;
    } else if (!hasWon) {
        alertMessage = `
        <div class="game-alert">
            <div class="message draw">${message}</div>
        </div>
        `;
    }

    gameArea.innerHTML = gameArea.innerHTML + alertMessage;
}
