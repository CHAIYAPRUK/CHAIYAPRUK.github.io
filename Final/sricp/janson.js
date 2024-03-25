// Array ของคำศัพท์ที่ใช้ในเกม
const words = ['apple', 'banana', 'orange', 'grape', 'watermelon', 'pineapple', 'kiwi', 'strawberry', 'blueberry', 'melon'];

// คัดสรรคำศัพท์สำหรับเกมจับคู่คำศัพท์
const selectedWords = words.slice(0, words.length / 2);

// คัดสรรคำศัพท์ที่เหลือสำหรับเกมจับคู่คำศัพท์
const gameWords = [...selectedWords, ...selectedWords];

// ฟังก์ชันสับคำศัพท์ในอาร์เรย์
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// สับคำศัพท์ในอาร์เรย์ gameWords
shuffleArray(gameWords);

// สร้างตารางเกมบอร์ด
const gameBoard = document.getElementById('game-board');
gameWords.forEach(word => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.word = word;
    card.innerText = '?';
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
});

// เก็บข้อมูลการเปิดการ์ดปัจจุบัน
let flippedCards = [];

// ฟังก์ชันเปิดการ์ด
function flipCard() {
    if (flippedCards.length < 2) {
        this.innerText = this.dataset.word;
        this.classList.add('flipped');
        flippedCards.push(this);
        
        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// ฟังก์ชันตรวจสอบการตรงกันของการ์ด
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.word === card2.dataset.word) {
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
        resetCards();
    } else {
        setTimeout(() => {
            card1.innerText = '?';
            card2.innerText = '?';
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            resetCards();
        }, 1000);
    }
}

// ฟังก์ชันรีเซ็ตการ์ด
function resetCards() {
    flippedCards = [];
}

// Reset button
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetGame);

function resetGame() {
    // Clear game board
    gameBoard.innerHTML = '';

    // Shuffle game words
    shuffleArray(gameWords);

    // Create new game board
    gameWords.forEach(word => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.word = word;
        card.innerText = '?';
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });

    clearInterval(interval);
    seconds = 0;
    minutes = 0;
    clockDisplay.innerHTML = "00:00";
    startButton.disabled = false;
    stopButton.disabled = true;
    // Add your game reset logic here
    // Reset flipped cards
    resetCards();
}

// ปุ่ม Start
const startButton = document.getElementById('start-button');

function startGame() {
    startButton.disabled = true; // ปิดปุ่ม Start
    startClock(); // เริ่มนับเวลา
    // เพิ่มโค้ดสำหรับเริ่มเกมของคุณที่นี่
}

const clockDisplay = document.getElementById('clock');
const stopButton = document.getElementById('stop-button');
let seconds = 0;
let minutes = 0;
let interval;

startButton.addEventListener('click', startGame);
stopButton.addEventListener('click', stopGame);

function startGame() {
    interval = setInterval(updateClock, 1000);
    startButton.disabled = true;
    stopButton.disabled = false;
    // Add your game logic here
}

function stopGame() {
    clearInterval(interval);
    startButton.disabled = false;
    stopButton.disabled = true;
    // Add your stop game logic here
}

function updateClock() {
    seconds++;
    if (seconds == 60) {
        seconds = 0;
        minutes++;
    }
    const displaySeconds = seconds < 10 ? "0" + seconds : seconds;
    const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
    clockDisplay.innerHTML = displayMinutes + ":" + displaySeconds;
}
