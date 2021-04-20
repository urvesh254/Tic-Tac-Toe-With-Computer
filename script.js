let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const BOARD_LENGTH = 3;
let WIDTH = canvas.width;
let HEIGHT = canvas.height;
const AI = "X";
const HUMAN = "O";

let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];
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

class DrawText {
    constructor(text, y, x, fontSize = 155) {
        let fillText = (text, x, y, fontSize) => {
            if (WIDTH < 350) {
                ctx.font = "60px Comic Sans MS";
            } else {
                ctx.font = "120px Comic Sans MS";
            }
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillText(text, x, y + 15, fontSize);
        };

        fillText(
            text,
            (WIDTH / 3) * x + WIDTH / 6,
            (WIDTH / 3) * y + WIDTH / 6
        );
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
        exitMessage("You Lost! 😢");
    } else if (result == HUMAN) {
        exitMessage("You Win! 🥇");
    } else if (result == "Tie") {
        exitMessage("Tie!!");
    }
};

let exitMessage = (msg) => {
    let div = document.getElementById("result");
    div.textContent = msg;
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
    new DrawText(HUMAN, row, col);
    gameStatus();

    computerTurn();
    gameStatus();
    emptySpace--;
});

let boardAttrChang = () => {
    let w = Math.min(420, window.innerWidth - 100);
    let h = Math.min(420, window.innerHeight - 100);
    let min = Math.min(w, h);
    canvas.width = min;
    canvas.height = min;

    WIDTH = min;
    HEIGHT = min;

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    drawBoard();

    for (let i = 0; i < BOARD_LENGTH; i++) {
        for (let j = 0; j < BOARD_LENGTH; j++) {
            new DrawText(board[i][j], i, j, 155);
        }
    }
    checkWinCondition();
};
window.onload = () => {
    boardAttrChang();
    resetGame();
};

window.onresize = () => boardAttrChang();
