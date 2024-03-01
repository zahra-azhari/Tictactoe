// 0 for playing
// 1 for winning player1 
// 2 for winning player2  
// 3 equalization

let player1 = "X";
let player1Win = 0;
let player2 = "O";
let player2Win = 0;
let turn = player1;
function nextMove(button) {
    setMove(button);
    if (checkWin() == 1) {
        player1Win++;
        alert("You Win!");
        document.getElementById("player1").innerHTML = player1Win;
        resetGame();
        return;
    } else if (checkWin() == 2) {
        player2Win++;
        alert("You Lost!");
        document.getElementById("player2").innerHTML = player2Win;
        resetGame();
        return;
    } else if (checkWin() == 3) {
        alert("No Win - No Lose");
        resetGame();
        return;
    }
    switchTurn();
    player2Turn();
    if (checkWin() == 1) {
        player1Win++;
        alert("You Win!");
        document.getElementById("player1").innerHTML = player1Win;
        resetGame();
        return;
    } else if (checkWin() == 2) {
        alert("You Lost!");
        player2Win++;
        document.getElementById("player2").innerHTML = player2Win;
        resetGame();
        return;
    } else if (checkWin() == 3) {
        alert("No Win - No Lose");
        resetGame();
        return;
    }
    switchTurn();
}

function switchFirstTurn() {
    if (player1 == "X") {
        player1 = "O";
        player2 = "X";
    } else {
        player1 = "X";
        player2 = "O";
    }
}

function switchTurn() {
    if (turn == player1) {
        turn = player2;
    } else {
        turn = player1;
    }
}


function setMove(button) {
    button.value = turn;
    button.innerHTML = turn;
    button.disabled = true;
}

function player2Turn() {
    let box = document.getElementById("box").getElementsByTagName("button");
    for (let i = 0; i < box.length; i++) {
        if (box[i].value == "") {
            box[i].value = player2;
            if (checkWin()) {
                setMove(box[i]);
                return;
            }
            box[i].value = "";
        }
    }
    for (let i = 0; i < box.length; i++) {
        if (box[i].value == "") {
            box[i].value = player1;
            if (checkWin()) {
                setMove(box[i]);
                return;
            }
            box[i].value = "";
        }
    }
    let move;
    do {
        move = parseInt(Math.random() * 10 - 1);
    } while (box[move].value != "");
    setMove(box[move]);
}


function checkWin() {
    let box = document.getElementById("box").getElementsByTagName("button");
    let matrix = [];
    let counter = 0;
    let winner = 3;
    for (let i = 0; i < 3; i++) {
        matrix[i] = [];
        for (let j = 0; j < 3; j++) {
            matrix[i][j] = box[counter++].value;
            if (matrix[i][j] == "")
                winner = 0;
        }
    }
    for (let i = 0; i < 3; i++) {
        if ((matrix[i][0] == player1 && matrix[i][1] == player1 && matrix[i][2] == player1) || (matrix[0][i] == player1 && matrix[1][i] == player1 && matrix[2][i] == player1)) {
            winner = 1;
        }
        if ((matrix[i][0] == player2 && matrix[i][1] == player2 && matrix[i][2] == player2) || (matrix[0][i] == player2 && matrix[1][i] == player2 && matrix[2][i] == player2)) {
            winner = 2;
        }
    }
    if ((matrix[0][0] == player1 && matrix[1][1] == player1 && matrix[2][2] == player1) || (matrix[0][2] == player1 && matrix[1][1] == player1 && matrix[2][0] == player1))
        winner = 1;
    if ((matrix[0][0] == player2 && matrix[1][1] == player2 && matrix[2][2] == player2) || (matrix[0][2] == player2 && matrix[1][1] == player2 && matrix[2][0] == player2))
        winner = 2;

    return winner;
}

function resetGame() {
    var buttons = document.getElementById("box").getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
        buttons[i].value = "";
        buttons[i].innerHTML = "";
    }
    switchFirstTurn();
    turn = "X";
    if (player2 == "X") {
        player2Turn();
        switchTurn();
    }
}