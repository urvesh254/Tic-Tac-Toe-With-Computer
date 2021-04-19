let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

const BOARD_LENGTH = 3;
const WIDTH = 500;
const HEIGHT = 500;
const AI = "X";
const HUMAN = "O";
const SOURCE = {
    X: "assets/X1.png",
    O: "assets/O1.png",
};

let board;
let emptySpace;

let resetGame = () => {
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];
    emptySpace = 9;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    exitMessage("");
    drawBoard();
};

class DrawImage {
    constructor(src, y, x) {
        this.image = new Image(WIDTH / 3, WIDTH / 3);
        this.image.src = src;
        this.isLoaded = false;
        this.image.onload = () => {
            x = x * (WIDTH / 3);
            y = y * (HEIGHT / 3);
            ctx.drawImage(this.image, x, y);
            this.isLoaded = true;
        };
        this.id = setInterval(() => {
            if (this.isLoaded) {
                clearInterval(this.id);
            }
        }, 1000);
    }
}

let drawLine = (x1, y1, x2, y2, color = "black", lineWidth = 5) => {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.stroke();
};

let drawBoard = () => {
    drawLine(WIDTH / 3, 0, WIDTH / 3, HEIGHT);
    drawLine((WIDTH / 3) * 2, 0, (WIDTH / 3) * 2, HEIGHT);
    drawLine(0, HEIGHT / 3, WIDTH, HEIGHT / 3);
    drawLine(0, (HEIGHT / 3) * 2, WIDTH, (HEIGHT / 3) * 2);
};

let equals3 = (a, b, c) => {
    return a == b && b == c && a != "";
};

let checkWinCondition = (isDrawLine = true) => {
    let winner = null;

    // horizontal
    for (let i = 0; i < 3; i++) {
        if (equals3(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0];
            isDrawLine
                ? drawLine(
                      0,
                      (HEIGHT / 3) * i + HEIGHT / 6,
                      WIDTH,
                      (HEIGHT / 3) * i + HEIGHT / 6,
                      "red",
                      10
                  )
                : "";
        }
    }

    // Vertical
    for (let i = 0; i < 3; i++) {
        if (equals3(board[0][i], board[1][i], board[2][i])) {
            winner = board[0][i];
            isDrawLine
                ? drawLine(
                      (WIDTH / 3) * i + WIDTH / 6,
                      0,
                      (WIDTH / 3) * i + WIDTH / 6,
                      HEIGHT,
                      "red",
                      10
                  )
                : "";
        }
    }

    // Diagonal
    if (equals3(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
        isDrawLine ? drawLine(0, 0, WIDTH, HEIGHT, "red", 10) : "";
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
        winner = board[2][0];
        isDrawLine ? drawLine(WIDTH, 0, 0, HEIGHT, "red", 10) : "";
    }

    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == "") {
                openSpots++;
            }
        }
    }

    if (winner == null && openSpots == 0) {
        return "Tie";
    } else {
        return winner;
    }
};

let gameStatus = () => {
    let result = checkWinCondition();
    if (result == AI) {
        exitMessage("You Lost!");
    } else if (result == HUMAN) {
        exitMessage("You Win!");
    } else if (result == "Tie") {
        exitMessage("Tie!!");
    }
};

let exitMessage = (msg) => {
    let div = document.getElementById("result");
    div.textContent = msg;
    console.log(msg);
};

canvas.addEventListener("click", () => {
    if (emptySpace < 1 || checkWinCondition(false)) {
        return;
    }

    let rect = canvas.getBoundingClientRect();

    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    let row = Math.floor(y / (HEIGHT / 3));
    let col = Math.floor(x / (WIDTH / 3));

    if (board[row][col]) {
        alert("This placed is filled, Try another.");
        return;
    }

    emptySpace--;
    board[row][col] = HUMAN;
    new DrawImage(SOURCE[HUMAN], row, col);
    gameStatus();

    computerTurn();
    gameStatus();
    emptySpace--;
});

window.onload = resetGame();
