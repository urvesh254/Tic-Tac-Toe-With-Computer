function computerTurn() {
    // AI to make its turn
    let bestScore = { score: -Infinity, depth: Infinity };
    let move = undefined;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            // Is the spot available?
            if (board[i][j] == "") {
                board[i][j] = AI;
                let score = minimax(board, 0, false);
                board[i][j] = "";
                if (
                    score.score > bestScore.score ||
                    (score.score == bestScore.score &&
                        score.depth < bestScore.depth)
                ) {
                    bestScore = score;
                    move = { i, j };
                }
            }
        }
    }
    if (move) {
        board[move.i][move.j] = AI;
        new DrawText(AI, move.i, move.j);
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
        return { score: scores[result], depth };
    }

    if (isMaximizing) {
        let bestScore = { score: -Infinity, depth: 0 };
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Is the spot available?
                if (board[i][j] == "") {
                    board[i][j] = AI;
                    let score = minimax(board, depth + 1, false);
                    board[i][j] = "";
                    if (score.score > bestScore.score) {
                        bestScore = score;
                    }
                    // bestScore = Math.max(score.score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = { score: Infinity, depth: 0 };
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Is the spot available?
                if (board[i][j] == "") {
                    board[i][j] = HUMAN;
                    let score = minimax(board, depth + 1, true);
                    board[i][j] = "";
                    // bestScore = Math.min(score.score, bestScore);
                    if (score.score < bestScore.score) {
                        bestScore = score;
                    }
                }
            }
        }
        return bestScore;
    }
}