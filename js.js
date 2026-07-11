function Player(name, piece) {
    this.name = name;
    this.piece = piece;
}


const gameBoard = (() => {
    let board = [["","",""],["","",""],["","",""]];

    function resetBoard() {
        board = [["","",""],["","",""],["","",""]];
    }

    function updateCell(row, column, value) {
        if (value !== "X" && value !=="O") return false;
        else if (![0, 1, 2].includes(row) || ![0, 1, 2].includes(column)) return false;
        else if (board[row][column] !== "") return false;
        
        board[row][column] = value;
        return true;
    }

    function getRow(row) {
        if (![0, 1, 2].includes(row)) return false;
        return board[row];
    }

    function getColumn(column) {
        if (![0, 1, 2].includes(column)) return false;
        return [board[0][column], board[1][column], board[2][column]];
    }

    function getBoard() {
        return board;
    }

    return {resetBoard, updateCell, getBoard, getRow, getColumn};
})();


const gameController = (() => {
    const playerX = new Player("player1", "X");
    const playerO = new Player("player2", "O");
    let currentPlayer = playerX;


    function playRound(row, column) {
        // Tries to update cell
        if (!gameBoard.updateCell(row, column, currentPlayer.piece)) {
            console.log("ERROR: Invalid position");
        }
        // If successful, continue with logic
        else {
            if (checkWin()) {console.log(`WINNER: ${currentPlayer.name}`);}
            else if (checkTie()) {console.log("TIE");}
            else {
                currentPlayer === playerX ? currentPlayer = playerO : currentPlayer = playerX;
            }
        }
    }

    function allEqual(arr) {return arr.every(val => val === arr[0])};

    function getCurrentPlayer() {return currentPlayer;}
    function checkWin() {
        const board = gameBoard.getBoard();
        for (let i = 0; i < 3; i++) {
            // Checks if row is equal
            if (allEqual(gameBoard.getRow(i)) && 
            ["X", "O"].includes(board[i][0])) {return true;}

            // Checks if column is equal
            if (allEqual(gameBoard.getColumn(i)) && 
            ["X", "O"].includes(board[0][i])) {return true;}
        }

        // Checks if leading diagonal (/) is equal
        if (allEqual([board[0][0], board[1][1], board[2][2]]) && 
            ["X", "O"].includes(board[0][0])) {return true;}

        // Checks if antidiagonal (\) is equal
        if (allEqual([board[0][2], board[1][1], board[2][0]]) && 
            ["X", "O"].includes(board[0][2])) {return true;}

        return false;
    }

    function checkTie() {
        const board = gameBoard.getBoard();a
        let arr = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                arr.push(board[i][j]);
            }
        }
        if (allEqual(arr) && ["X", "O"].includes(arr[0])) {return true;}
        return false;
    }
    return {playRound, getCurrentPlayer};
})();


const displayController = (() => {

    function updateGridDisplay() {

    }

    function displayInfo() {

    }

    function setupEventListeners() {

    }

    function retrievePlayerNames() {
        
    }
})
