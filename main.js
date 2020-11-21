import Deck from './deck.js';

const cpuCardSlot = document.querySelector('.cpu-card-slot');
const playerCardSlot = document.querySelector('.player-card-slot');
const message = document.querySelector('.message')
const cpuScore = document.querySelector('.cpu-counter');
const playerScore = document.querySelector('.player-counter');

let playerDeck;
let cpuDeck;
let inRound;
let gameOver;

const CardValue = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'J': 11,
    'Q': 12,
    'K': 13,
    'A': 14,
}

document.addEventListener('click', () => {
    if (gameOver) {
        startGame();
        return
    }

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
    inRound = false;
    gameOver = false;

    roundRefresh()
}

function roundRefresh() {
    inRound = false;
    cpuCardSlot.innerHTML = '';
    playerCardSlot.innerHTML = '';
    message.innerText = 'Draw next card';

    updateCounter();
}

function flipCards() {
    inRound = true;
    const playerCard = playerDeck.pop();
    const cpuCard = cpuDeck.pop();
    playerCardSlot.appendChild(playerCard.getHTML());
    cpuCardSlot.appendChild(cpuCard.getHTML());

    updateCounter();

    if (roundWinner(playerCard, cpuCard)) {
        message.innerText = 'Win';
        playerDeck.push(playerCard);
        playerDeck.push(cpuCard);
    } else if (roundWinner(cpuCard, playerCard)) {
        message.innerText = 'Lose';
        cpuDeck.push(cpuCard);
        cpuDeck.push(playerCard);
    } else {
        message.innerText = 'Draw';
        cpuDeck.push(cpuCard);
        playerDeck.push(playerCard);
    }

    if (isGameOver(playerDeck)) {
        message.innerText = 'YOU LOSE!!';
        gameOver = true;
    } else if (isGameOver(cpuDeck)) {
        message.innerText = 'YOU WIN!!';
        gameOver = true;
    }
}

function updateCounter() {
    cpuScore.innerText = cpuDeck.numberOfCards;
    playerScore.innerText = playerDeck.numberOfCards;
}

function roundWinner(cardOne, cardTwo) {
    return CardValue[cardOne.value] > CardValue[cardTwo.value]
}

function isGameOver(deck) {
    return deck.numberOfCards === 0;
}