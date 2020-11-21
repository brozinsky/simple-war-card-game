import Deck from './deck.js';

const cpuCardSlot = document.querySelector('.cpu-card-slot');
const playerCardSlot = document.querySelector('.player-card-slot');
const text = document.querySelector('.message')

const cpuScore = document.querySelector('.cpu-counter');
const playerScore = document.querySelector('.player-counter');


let playerDeck;
let cpuDeck;
let inRound;

document.addEventListener('click', () => {
    if (inRound) {
        roundRefresh();
    }
    else {
        flipCards();
    }
})

startGame();
function startGame() {
    const deck = new Deck();
    deck.shuffle();
    const deckHalf = Math.ceil(deck.numberOfCards / 2);
    playerDeck = new Deck(deck.cards.slice(0, deckHalf));
    cpuDeck = new Deck(deck.cards.slice(deckHalf, deck.numberOfCards));

    roundRefresh()
}

function roundRefresh() {
    inRound = false;
    cpuCardSlot.innerHTML = '';
    playerCardSlot.innerHTML = '';
    text.innerText = '';
    updateCounter();
}

function flipCards() {
    inRound = true;
    const playerCard = playerDeck.pop();
    const cpuCard = cpuDeck.pop();
    playerCardSlot.appendChild(playerCard.getHTML());
    cpuCardSlot.appendChild(cpuCard.getHTML());

}

function updateCounter() {
    cpuScore.innerText = cpuDeck.numberOfCards;
    playerScore.innerText = playerDeck.numberOfCards;
}


