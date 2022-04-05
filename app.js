const gameBoard = (() => {
    const squares = document.querySelectorAll(".squares");
    const boardArray =
        ["", "", ""
        ,"", "", ""
        , "", "", ""];
    
    const winningStates =
    [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    
    return {
        boardArray: boardArray,
        squares,
        winningStates
    };
})();
const player = () => {
    let marker = undefined;
    let isTurn = Boolean;
    const placeMarkers = (player1, player2) => {
        gameBoard.squares.forEach(square => {
            square.addEventListener("click", () => {
                if (player1.isTurn) {
                    if (square.innerText == "") {
                        square.innerText = player1.marker;
                        gameBoard.boardArray[square.id] = player1.marker;   
                        player1.isTurn = false;
                        player2.isTurn = true;
                    }
                } else {
                    if (square.innerText == "") {
                        square.innerText = player2.marker;
                        gameBoard.boardArray[square.id] = player2.marker;
                        player2.isTurn = false;
                        player1.isTurn = true;
                    }
                }
                gameFlow.checkWinner()
            });
        });
    }
    return {
        placeMarkers,
        isTurn,
        marker,
    };
};
const gameFlow = (() => {
    const XButton = document.querySelector(".Xbutton");
    const OButton = document.querySelector(".Obutton");
    const StartButton = document.querySelector(".start");
    const RestartButton = document.querySelector(".restart");
    const playerVsPlayerBtn = document.querySelector(".playerVsPlayer");
    const playerVsAiBtn = document.querySelector(".playerVsAi");
    const player1 = player();
    const player2 = player();

    const startGame = () => {
        StartButton.addEventListener("click", () => {
            StartButton.disabled = true;
            if (playerVsPlayerBtn.classList.contains("selected")) {
                playerVsPlayer()
            } else {
                playerVsAi()
            }
        });
    }
    const restartGame = () => {
        RestartButton.addEventListener("click", () => {
            gameBoard.squares.forEach(square => {
                square.innerText = "";
            });
            resetData()
            StartButton.disabled = false;
        });
    }
    const resetData = () => {
            gameBoard.boardArray =
                        ["", "", ""
                        , "", "", ""
                        , "", "", ""];
            assignMarker()
            checkWinner.indicesOfO = [];
            checkWinner.indicesOfX = [];
    }

    const checkWinner = () => {
        let indicesOfX = [], i = -1;
        while ((i = gameBoard.boardArray.indexOf("X", i + 1)) != -1) {
            indicesOfX.push(i)
        }
        let indicesOfO = [], j = -1;
        while ((j = gameBoard.boardArray.indexOf("O", j + 1)) != -1) {
            indicesOfO.push(j)
        }
        const returnWinner = () => {
            if (compareArrays(indicesOfX)) {
                alert("X's Wins The Game!")
                resetData()
            } else if (compareArrays(indicesOfO)) {
                alert("O's Wins The Game!")
                resetData()
            } else if (drawCheck()) {
                resetData()
                alert("It's a draw")
            }
        }
        returnWinner()
    }
    const drawCheck = () => {
        i = 0;
        gameBoard.boardArray.forEach(element => {
            if (element != "") {
                i++;
            }
        });
        if (i == 9) {
            return true;
        } else {
            return false;
        }
    }
    const compareArrays = (indices) => {
        returnValue = false;
        gameBoard.winningStates.forEach(state => {
            const checker = (indices, state) => state.every(v => indices.includes(v));
            if (checker(indices, state)) {
                returnValue = true;
                return;
            }
        });
        return returnValue;
    }
    const assignMarker = () => {
    if (XButton.classList.contains("selected")) {
        player1.marker = "X";
        player2.marker = "O";
        } else {
            player1.marker = "O";
            player2.marker = "X";
        }
        player1.isTurn = true;
        player2.isTurn = false;
    }
    const toggleButton = (button1, button2) => {
        button1.addEventListener("click", () => {
            if (!button1.classList.contains("selected")) {
                button1.classList.toggle("selected")
                button1.classList.toggle("not-selected")
                button2.classList.toggle("not-selected")
                button2.classList.toggle("selected")
                assignMarker()
            }
        });
    }
    const playerVsPlayer = () => {
        assignMarker()
        player1.placeMarkers(player1, player2)
    }
    function playerVsAi() {
        assignMarker();
    }
    
    toggleButton(XButton, OButton, "X")
    toggleButton(OButton, XButton, "O")
    toggleButton(playerVsPlayerBtn, playerVsAiBtn, "pvp")
    toggleButton(playerVsAiBtn, playerVsPlayerBtn, "pva")
    startGame()
    restartGame()

    return {
        player1,
        player2,
        checkWinner
    }
})();