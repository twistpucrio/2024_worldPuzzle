async function fetchData(){
    let words = await fetch('palavras/5letras.txt')
    .then(response => response.text())
    .then(text => {
        return text.split('\n');
    })
    return words;
}

const maxAttempts = 5;
let attempts = 0;
const usedKeys = {};

function createBoard() { 
	const board = document.querySelector("#quadro");
	for (let i = 0; i < maxAttempts * 5; i++) {
		const cell = document.createElement("div");
		board.appendChild(cell);
	}
}

function createKeyChart() { 
	const keyChart = document.getElementById("teclado");
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
	const keyChart = document.getElementById("teclado").children;
	for (let i = 0; i < keyChart.length; i++) {
		const key = keyChart[i];
		const letter = key.textContent;
		key.className = usedKeys[letter] || "";
	}
}

function submitGuess(targetWord) {
	const input = document.getElementById("caixaAdivinha");
	const guess = input.value.toUpperCase() + '\r';
	input.value = "";

	const board = document.getElementById("quadro");
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
	if (guess == targetWord) {
        let modal = document.getElementById("modal_vit");
        modal.classList.add("open");
	} else if (attempts >= maxAttempts) {
        let modal = document.getElementById("modal_per");
        modal.classList.add("open");
        let paragrafo = document.getElementById("palavra_certa");
        paragrafo.innerText = targetWord;
		// setMessage(`Você perdeu =C A palavra era ${targetWord}.`);
	}
}

function setMessage(message) {
	document.getElementById("messagem").textContent = message;
}

function verificaEnvio(targetWord, words){
    let textoInput = document.querySelector("#caixaAdivinha");
    let envio = textoInput.value.toUpperCase();
    let achado = false;

    for (let i = 0; i < envio.length; i++){ 
        if (usedKeys[envio[i]] == "absent"){
            achado = true;
        }
    }
    let verifica = envio.toLowerCase() + '\r';

    if (words.includes(verifica)){
        setMessage("");
        submitGuess(targetWord);
    } else{
        setMessage("Essa palavra não existe!");
    }
}

window.addEventListener("load", async function(){
    let btnEnvia = document.querySelector("#btnEnvia");
    let textoInput = document.querySelector("#caixaAdivinha");

    let words = await fetchData();
    const targetWord = words[Math.floor(Math.random() * words.length)].toUpperCase();

	console.log(targetWord);

    textoInput.addEventListener('keypress', function(event) {
        if (event.keyCode == 13) {
            verificaEnvio(targetWord, words);
        }
    });
    
    createBoard();
    createKeyChart();

    const allButtons = document.querySelectorAll(".btnLetra");

    for (let button of allButtons) {
        button.addEventListener('click', function() {
            let inputText = document.querySelector("#caixaAdivinha");
            let letra = this.innerHTML;

            if (inputText.value.length < 5){
                if (usedKeys[letra] != "absent"){ 
                    inputText.value += letra;
                }
            }
        });
    }

	btnEnvia.addEventListener("click", function(){
        verificaEnvio(targetWord, words);
    });
});