const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart-btn');

const fruits = [
  { name: 'apple', 
    img: './images/apple.png' 
  },
  { name: 'banana', 
    img: './images/banana.png' 
  },
  { name: 'mango', 
    img: './images/mango.png' 
  },
  { name: 'grapes', 
    img: './images/grapes.png' 
  },
  { name: 'orange', 
    img: './images/orange.png' 
  },
  { name: 'strawberry', 
    img: './images/strawberry.png' 
  },
  { name: 'kiwi', 
    img: './images/kiwi.png' 
  },
  { name: 'papaya', 
    img: './images/papaya.png' 
  }
];

// Double the array to create pairs
const cards = [...fruits, ...fruits];

let flippedCards = [];
let matchedCards = [];

// Shuffle the cards
function shuffleCards(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Initialize the game
function initGame() {
  // Clear the game board and reset states
  gameBoard.innerHTML = '';
  flippedCards = [];
  matchedCards = [];

  // Shuffle and generate card HTML
  const shuffledCards = shuffleCards(cards);
  shuffledCards.forEach((card) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.name = card.name;
    
const frontDiv = document.createElement('div');
frontDiv.classList.add('front');

const backDiv = document.createElement('div');
backDiv.classList.add('back');

// Create the img element
const imgElement = document.createElement('img');
imgElement.src = card.img; 
imgElement.alt = card.name; 

// Append the img to the back div
backDiv.appendChild(imgElement);

// Clear the cardElement    
cardElement.textContent = '';  
cardElement.appendChild(frontDiv);
cardElement.appendChild(backDiv);

    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
  });
}

// Flip card function
function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains('flip') && !matchedCards.includes(this)) {
    this.classList.add('flip');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

// Check if two flipped cards match
function checkMatch() {
  const [card1, card2] = flippedCards;
  const value1 = card1.dataset.name;
  const value2 = card2.dataset.name;

  if (value1 === value2) {
    // Cards match, keep them flipped
    matchedCards.push(card1, card2);
    flippedCards = [];
  } else {
    // Cards don't match, flip them back after 1 second
    setTimeout(() => {
      card1.classList.remove('flip');
      card2.classList.remove('flip');
      flippedCards = [];
    }, 1000);
  }

  // Check if the game is won
  if (matchedCards.length === cards.length) {
    setTimeout(() => {
      alert('Congratulations! You won!');
    }, 500);
  }
}

// Restart the game
restartButton.addEventListener('click', initGame);

// Start the game on page load
initGame();
