function createBoard() { //já funciona
	const board = document.querySelector("#board");
	for (let i = 0; i < 4 * 4; i++) {
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

window.addEventListener("load", function(){
    
    createBoard();
    createKeyChart();

});