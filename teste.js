const words = [
    "AMIGO",
    "CANSA",
    "FESTA",
    "GRITO",
    "HELIO",
    "JOVEM",
    "LENTE",
    "MAGIA",
    "NINHO",
    "PODER",
    "REINO",
    "SOLAR",
    "TIGRE",
    "VENTO",
    "BICHO",
    "DENTES",
    "ELITE",
    "FAMIA",
    "LIVRO",
    "MUNDO",
    "OLHAR",
    "PAIS",
    "QUEDA",
    "SONHO",
    "TERRA",
    "ZEBRA",
    "ALUNO",
    "BEIRA",
    "CAIXA",
    "DIALOG",
    "ENTRE",
    "FLORE",
    "GOLPE",
    "JOGO",
    "LIMPO",
    "MOEDA",
    "NOME",
    "PENSA",
    "RESTA",
    "SABIA",
    "TROCA",
    "VIAJE",
    "XAXIM",
    "ZEBRO",
    "FIM",
    "PASSA"
];

const targetWord = words[Math.floor(Math.random() * words.length)];
const maxAttempts = 6;
let attempts = 0;
const usedKeys = {};

function createBoard() { //já funciona
	const board = document.querySelector("#board");
	for (let i = 0; i < maxAttempts * 5; i++) {
		const cell = document.createElement("div");
		board.appendChild(cell);
	}
}

function createKeyChart() { //já funciona
	const keyChart = document.getElementById("keyChart");
	for (let i = 65; i <= 90; i++) {
		const key = document.createElement("button");
        let letra = String.fromCharCode(i)
		key.textContent = letra;
        key.setAttribute("id", `env${letra}`);
        key.setAttribute("type", "button");
        key.setAttribute("class", "btnLetra");
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
    let textoInput = document.querySelector("#guessInput");

    textoInput.addEventListener('keypress', function(event) {
        if (event.keyCode == 13) {
            // let palavra = this.innerHTML;
            // if (usedKeys[letra] == "absent"){
            //     setMessage("Você digitou uma letra que não há na palavra!");
            // }
            submitGuess();
        }
    });
    
    createBoard();
    createKeyChart();

    var allButtons = document.querySelectorAll(".btnLetra");

    for (var i = 0; i < allButtons.length; i++) {
        allButtons[i].addEventListener('click', function() {
            let inputText = document.querySelector("#guessInput");
            let letra = this.innerHTML;

            if (inputText.value.length < 5){
                if (usedKeys[letra] != "absent"){
                    inputText.value += letra;
                }
            }
        });
    }

	console.log(targetWord);
	btnEnvia.addEventListener("click", submitGuess);
    
});