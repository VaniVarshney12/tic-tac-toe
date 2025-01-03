let curr = "X"; // Tracks current player ("X" or "O")
let array = Array(9).fill(null); // Represents the board
let mode = "2-player"; // Default game mode
let gameActive = true; // Tracks if the game is ongoing

// Function to select the game mode
function selectMode(selectedMode) {
    mode = selectedMode;
    resetGame();
    alert(`Mode selected: ${mode}`);
}

// Reset the game
function resetGame() {
    array.fill(null);
    curr = "X";
    gameActive = true;
    document.querySelectorAll(".col").forEach(cell => {
        cell.innerHTML = "";
    });
}

// Check for a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6]             // Diagonal
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (array[a] && array[a] === array[b] && array[a] === array[c]) {
            alert(`Winner is ${curr}`);
            gameActive = false;
            return;
        }
    }

    if (!array.includes(null)) {
        alert("It's a draw!");
        gameActive = false;
        return;
    }
}

// Handle player and computer moves
function handleclick(e) {
    if (!gameActive) return;

    const id = Number(e.id);
    if (array[id] !== null) return;

    // Player's move
    array[id] = curr;
    e.innerHTML = curr;
    checkWinner();
    if (!gameActive) return;

    // Switch turn
    curr = curr === "X" ? "O" : "X";

    // If playing against the computer, let it make a move
    if (mode === "play-computer" && curr === "O") {
        computerMove();
    }
}

// Computer move logic
function computerMove() {
    let emptyCells = array.map((val, idx) => (val === null ? idx : null)).filter(idx => idx !== null);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    // Simulate the computer's move
    array[randomIndex] = curr;
    document.getElementById(randomIndex).innerHTML = curr;
    checkWinner();

    // Switch back to the player
    curr = curr === "X" ? "O" : "X";
}

// Add buttons for game modes dynamically
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const modeSelection = document.createElement("div");
    modeSelection.innerHTML = keys
    container.insertBefore(modeSelection, container.firstChild);
});
