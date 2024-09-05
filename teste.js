async function fetchData(){
    let words = await fetch('palavras/5letras.txt')
    .then(response => response.text())
    .then(text => {
        return text.split('\n');
    })
    return words;
}

const maxAttempts = 6;
let attempts = 0;
const usedKeys = {};

function createBoard() { 
	const board = document.querySelector("#board");
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

function submitGuess(targetWord) {
	const input = document.getElementById("guessInput");
	const guess = input.value.toUpperCase() + '\r';
	input.value = "";

	const board = document.getElementById("board");
	const targetCounts = {};

	for (const letter of targetWord) {
		targetCounts[letter] = (targetCounts[letter] || 0) + 1;
	}

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

	for (let i = 0; i < 5; i++) {
		const cell = board.children[attempts * 5 + i];
		const letter = guess[i];
		if (!cell.classList.contains("correct")) {
			if (targetCounts[letter]) {
				cell.classList.add("present");
                if (!usedKeys[letter]){
                    usedKeys[letter] = "present";
                }
				targetCounts[letter]--;
			} else {
				cell.classList.add("absent");
                if (!usedKeys[letter]){
                    usedKeys[letter] = "absent";                
                }
			}
		}
	}

	attempts++;
	updateKeyChart();
    // console.log("oieeeee");
    // console.log(targetWord);
    // console.log(guess);
    // console.log(guess == targetWord);
	if (guess == targetWord) {
		// setMessage("Congratulations! You guessed the word.");
        let modal = document.getElementById("modal");
        console.log(modal);
        console.log("tudo bemm");
        modal.classList.add("open");
	} else if (attempts >= maxAttempts) {
		setMessage(`Você perdeu =C A palavra era ${targetWord}.`);
	}
}

function setMessage(message) {
	document.getElementById("message").textContent = message;
}

function verificaEnvio(targetWord, words){
    let textoInput = document.querySelector("#guessInput");
    let envio = textoInput.value.toUpperCase();
    // console.log(envio);
    let achado = false;

    // console.log(usedKeys);

    for (let i = 0; i < envio.length; i++){ //REMOVER ISTO PARA OS NÍVEIS FÁCIL E MÉDIO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // console.log(envio[i]);
        // console.log(usedKeys[envio[i]]);
        if (usedKeys[envio[i]] == "absent"){
            achado = true;
        }
    }
    let verifica = envio.toLowerCase() + '\r'
    // console.log(verifica);
    // console.log(typeof(verifica));
    // console.log(words);
    // console.log(words.includes("sagaz\r"));
    // console.log(words.includes(verifica));
    // console.log(typeof(words[1]));

    if ((achado) && (attempts != 0)){ //REMOVER ISTO PARA OS NÍVEIS FÁCIL E MÉDIO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        setMessage("Você digitou uma letra que não há na palavra!");
    } else if (words.includes(verifica)){
        setMessage("");
        submitGuess(targetWord);
    } else{
        setMessage("Essa palavra não existe!");
    }
}

window.addEventListener("load", async function(){
    let btnEnvia = document.querySelector("#enviaBtn");
    let textoInput = document.querySelector("#guessInput");

    let words = await fetchData();
    // console.log(words.length);
    const targetWord = words[Math.floor(Math.random() * words.length)].toUpperCase();

	console.log(targetWord);

    textoInput.addEventListener('keypress', function(event) {
        if (event.keyCode == 13) {
            verificaEnvio(targetWord, words);
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
                if (usedKeys[letra] != "absent"){ //REMOVER ISTO PARA OS NÍVEIS FÁCIL E MÉDIO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    inputText.value += letra;
                }
            }
        });
    }

	btnEnvia.addEventListener("click", function(){
        verificaEnvio(targetWord, words);
    });
});