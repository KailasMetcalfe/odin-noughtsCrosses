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
        if (value != "X" && value !=="O") return false;
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
    let currentPlayer;

    function initialiseGame(playerXName, playerOName) {
        // New Names initialised
        playerX.name = playerXName;
        playerO.name = playerOName;

        currentPlayer = playerX;
        gameBoard.resetBoard();
        displayController.updateGridDisplay();
        displayController.disableNames(true);
        displayController.displayActivePlayer(currentPlayer);
    }

    function playRound(row, column) {
        // Tries to update cell
        if (!gameBoard.updateCell(row, column, currentPlayer.piece)) {
            console.log("ERROR: Invalid position");
        }
        // If successful, continue with logic
        else {
            displayController.updateGridDisplay();
            if (checkWin()) {
                displayController.displayPlayerWon(currentPlayer);
                displayController.disableNames(false);
                displayController.disableGrid(true);
            }
            else if (checkTie()) {
                displayController.displayTie();
                displayController.disableNames(false);
                displayController.disableGrid(true);
            }
            else {
                currentPlayer === playerX ? currentPlayer = playerO : currentPlayer = playerX;
                displayController.displayActivePlayer(currentPlayer);
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
        const board = gameBoard.getBoard();
        let arr = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === "") return false;
            }
        }
        return true;
    }

    return {playRound, getCurrentPlayer, initialiseGame};
})();


const displayController = (() => {
    const display = document.querySelector("#display");

    function updateGridDisplay() {
        const btns = document.querySelectorAll("#board button")
        const board = gameBoard.getBoard();
        for (let btn of btns) {
            btn.textContent = board[btn.dataset.row][btn.dataset.column];
        }
    }

    function clearDisplay() {
        display.textContent = "";
    }

    function displayTie() {
        display.textContent = `It's' a tie!`
    }

    function displayPlayerWon(player) {
        display.textContent = `${player.name} (${player.piece}) has won!`
    }

    function displayActivePlayer(player) {
        display.textContent = `It's ${player.name}'s (${player.piece}) turn`
    }

    function disableNames(state) {
        if (typeof state != "boolean") console.log("ERROR");
        else {
            const playerXName = document.querySelector("#inputs #X-Name");
            const playerOName = document.querySelector("#inputs #O-Name");
            playerXName.disabled = state;
            playerOName.disabled = state;
        }
    }

    function disableStart(state) {
        if (typeof state != "boolean") console.log("ERROR");
        else {
            document.querySelector("#inputs #start").disabled = state;;
        }
    }


    function setupEventListeners() {
        const nameForm = document.querySelector("form");
        nameForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            disableGrid(false)
            gameController.initialiseGame(formData.get("X-Name"), formData.get("O-Name"));
        })

        const gridBtns = document.querySelectorAll("#board button");
        for (let btn of gridBtns) {
            btn.disabled = true;
            btn.addEventListener("click", (e) => {
                gameController.playRound(Number(e.target.dataset.row), Number(e.target.dataset.column));
            })
        }

    }

    function disableGrid(state) {
        if (typeof state != "boolean") console.log("ERROR");
        else {
            const gridBtns = document.querySelectorAll("#board button");
            for (let btn of gridBtns) {
                btn.disabled = state;
            }
        }
    }


    return {clearDisplay, displayTie, displayPlayerWon, displayActivePlayer, 
        updateGridDisplay, setupEventListeners, disableNames, disableStart, disableGrid}
})()


displayController.setupEventListeners();
