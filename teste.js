const words = [
	"APPLE",
	"BERRY",
	"CHERRY",
	"DATES",
	"EAGLE",
	"FABLE",
	"GRAPE",
	"HEART",
	"IMAGE",
	"JOKER",
	"KINGS",
	"LEMON",
	"MANGO",
	"NINJA",
	"OLIVE",
	"PIZZA",
	"QUICK",
	"RIVER",
	"STORM",
	"TRICK",
	"UNDER",
	"VIVID",
	"WORRY",
	"XENON",
	"YOUTH",
	"ZEBRA",
	"ALBUM",
	"BRAVE",
	"CRANE",
	"DRIVE",
	"ELITE",
	"FRAME",
	"GIANT",
	"HOUSE",
	"INTRO",
	"JUMPY",
	"KNEEL",
	"LUNCH",
	"MIGHT",
	"NOBLE",
	"OCEAN",
	"PAINT",
	"QUERY",
	"ROUGE",
	"SLEEP",
	"TANGO",
	"UNION",
	"VIRAL"
];

const targetWord = words[Math.floor(Math.random() * words.length)];
const maxAttempts = 6;
let attempts = 0;
const usedKeys = {};

function createBoard() {
	const board = document.querySelector("#board");
	const header = document.querySelector("#header");
    console.log(board);
    console.log(header);
	for (let i = 0; i < maxAttempts * 5; i++) {
		const cell = document.createElement("div");
		board.appendChild(cell);
	}
}

function createKeyChart() {
	const keyChart = document.getElementById("keyChart");
	for (let i = 65; i <= 90; i++) {
		const key = document.createElement("button");
        let letra = String.fromCharCode(i)
		key.textContent = letra;
        key.setAttribute("id", `env${letra}`);
        key.setAttribute("type", "button");
		keyChart.appendChild(key);
	}
}

function updateKeyChart() {
	const keyChart = document.getElementById("keyChart").children;
	for (let i = 0; i < keyChart.length; i++) {
		const key = keyChart[i];
		const letter = key.textContent;
		key.className = usedKeys[letter] || "";
	}
}

function submitGuess() {
	const input = document.getElementById("guessInput");
	const guess = input.value.toUpperCase();
	input.value = "";

	if (guess.length !== 5) {
		setMessage("Guess must be 5 letters long.");
		return;
	}

	if (attempts >= maxAttempts) {
		setMessage("No more attempts left.");
		return;
	}

	const board = document.getElementById("board");
	const targetCounts = {};
	const guessCounts = {};

	// Count occurrences of each letter in the target word
	for (const letter of targetWord) {
		targetCounts[letter] = (targetCounts[letter] || 0) + 1;
	}

	// First pass: mark correct letters
	for (let i = 0; i < 5; i++) {
		const cell = board.children[attempts * 5 + i];
		const letter = guess[i];
		cell.textContent = letter;
		if (letter === targetWord[i]) {
			cell.classList.add("correct");
			usedKeys[letter] = "correct";
			targetCounts[letter]--;
		}
	}

	// Second pass: mark present letters
	for (let i = 0; i < 5; i++) {
		const cell = board.children[attempts * 5 + i];
		const letter = guess[i];
		if (!cell.classList.contains("correct")) {
			if (targetCounts[letter]) {
				cell.classList.add("present");
				usedKeys[letter] =
					usedKeys[letter] !== "correct" ? "present" : usedKeys[letter];
				targetCounts[letter]--;
			} else {
				cell.classList.add("absent");
				usedKeys[letter] = usedKeys[letter] || "absent";
			}
		}
	}

	attempts++;
	updateKeyChart();
	if (guess === targetWord) {
		setMessage("Congratulations! You guessed the word.");
	} else if (attempts >= maxAttempts) {
		setMessage(`Game Over! The word was ${targetWord}.`);
	}
}

function setMessage(message) {
	document.getElementById("message").textContent = message;
}

window.addEventListener("load", function(){
    let btnEnvia = document.querySelector("#enviaBtn");
    
    createBoard();
    createKeyChart();

    
});