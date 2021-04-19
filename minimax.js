let ai = AI;
let human = HUMAN;

function computerTurn() {
    // AI to make its turn
    let bestScore = -Infinity;
    let move = undefined;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            // Is the spot available?
            if (board[i][j] == "") {
                board[i][j] = ai;
                let score = minimax(board, 0, false);
                board[i][j] = "";
                if (score >= bestScore) {
                    bestScore = score;
                    move = { i, j };
                }
            }
        }
    }
    if (move) {
        board[move.i][move.j] = AI;
        new DrawImage(SOURCE[AI], move.i, move.j);
    }
}

let scores = {
    X: 10,
    O: -10,
    Tie: 0,
};

function minimax(board, depth, isMaximizing) {
    let result = checkWinCondition(false);
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Is the spot available?
                if (board[i][j] == "") {
                    board[i][j] = ai;
                    let score = minimax(board, depth + 1, false);
                    board[i][j] = "";
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Is the spot available?
                if (board[i][j] == "") {
                    board[i][j] = human;
                    let score = minimax(board, depth + 1, true);
                    board[i][j] = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}
