const gameBoard = (() => {

    const boardArray =
        ["", "", ""
        ,"", "", ""
        , "", "", ""];
    
    const winningStates =
    [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    
    const resetGameBoardArray = () => {
        gameBoard.boardArray =
                    ["", "", ""
                    ,"", "", ""
                    ,"", "", ""];
    }

    return {
        boardArray,
        winningStates,
        resetGameBoardArray
    };
})();
const player = () => {

    let marker = null;
    let isTurn = Boolean;


    const addClickEvents = (player1, player2) => {
        squares = document.querySelectorAll(".squares")
        
        squares.forEach(square => {

            square.addEventListener("click", () => {

                const placeMarker = (square, playerOne, playerTwo) => {

                    if (square.innerText == "") {
                        square.innerText = playerOne.marker;
                        gameBoard.boardArray[square.id] = playerOne.marker;   
                        playerOne.isTurn = false;
                        playerTwo.isTurn = true;
                    }
                }

                if (player1.isTurn) {
                    placeMarker(square, player1, player2)
                } else {
                    placeMarker(square, player2, player1)
                }
                gameFlow.checkWinner()
            });
        });
    }

    return {
        addClickEvents,
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
    const playerAI = player()

    const startGame = () => {
        restartGame()
        StartButton.addEventListener("click", () => {
            if (playerVsPlayerBtn.classList.contains("selected")) {
                assignMarker()
                disableButtons(true)
                player1.addClickEvents(player1, player2)
            } else {
                playerVsAi()
            }
        });
    }
    
    const restartGame = () => {
        RestartButton.addEventListener("click", () => {
            disableButtons(false)
            removeEventListeners()
            gameBoard.resetGameBoardArray()
        });
    }

    const checkWinner = () => {

        const getIndices = (string) => {
            let indices = [], i = -1;
            while ((i = gameBoard.boardArray.indexOf(string, i + 1)) != -1) {
                indices.push(i)
            }
            return indices;
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
                const checker = (indices, state) => state.every(element => indices.includes(element));
                if (checker(indices, state)) {
                    returnValue = true;
                    return;
                }
            });
            return returnValue;
        }

        if (compareArrays(getIndices("X"))) {
            alert("X's Wins The Game!")
            gameBoard.resetGameBoardArray()
        } else if (compareArrays(getIndices("O"))) {
            alert("O's Wins The Game!")
            gameBoard.resetGameBoardArray()
        } else if (drawCheck()) {
            alert("It's a draw")
            gameBoard.resetGameBoardArray()
        }
    }

    const assignMarker = () => {
        //whatever marker is selected becomes player1
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

    const removeEventListeners = () => {
        let i = 0;
        const squares = document.querySelectorAll(".squares")
        squares.forEach(square => {
            let newSquare = document.createElement('div');
            newSquare.id = i;
            newSquare.classList.add("squares")
            square.replaceWith(newSquare)
            i++;
        });
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

    const disableButtons = (bool) => {
        XButton.disabled = bool;
        OButton.disabled = bool;
        playerVsPlayerBtn.disabled = bool;
        playerVsAiBtn.disabled = bool;
        StartButton.disabled = bool;
    }

    function playerVsAi() {
    }
    
    toggleButton(XButton, OButton)
    toggleButton(OButton, XButton)
    toggleButton(playerVsPlayerBtn, playerVsAiBtn)
    toggleButton(playerVsAiBtn, playerVsPlayerBtn)
    
    startGame()

    return {
        player1,
        player2,
        playerAI,
        checkWinner
    }
})();