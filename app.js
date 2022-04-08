const gameBoard = (() => {

    let numberOfMarkers = 0;

    let boardArray =
        ["", "", ""
        ,"", "", ""
            , "", "", ""];
    
    
    const winningStates =
    [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    
    const resetData = () => {
        gameBoard.boardArray =
                    ["", "", ""
                    ,"", "", ""
                , "", "", ""];
        gameBoard.numberOfMarkers = 0;
    }

    return {
        boardArray,
        winningStates,
        numberOfMarkers,
        resetData
    };
})();
const player = () => {
    let marker = null;
    let isTurn = Boolean;

    return {
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
        assignMarker()
        StartButton.addEventListener("click", () => {
            if (playerVsPlayerBtn.classList.contains("selected")) {
                addClickEvents(player1, player2)
            } else {
                addClickEvents(player1, playerAI)
            }
            disableButtons(true)
        });
    }
    
    const restartGame = () => {
        RestartButton.addEventListener("click", () => {
            assignMarker()
            disableButtons(false)
            removeEventListeners()
            gameBoard.resetData()
        });
    }

    const checkWinner = () => {

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
        const getIndices = (string) => {
            let indices = [], i = -1;
            while ((i = gameBoard.boardArray.indexOf(string, i + 1)) != -1) {
                indices.push(i)
            }
            return indices;
        }

        const compareArrays = (indices) => {
            returnValue = false;
            gameBoard.winningStates.forEach(winningState => {
                const checker = (indices, winningState) => winningState.every(element => indices.includes(element));
                if (checker(indices, winningState)) {
                    returnValue = true;
                    return;
                }
            });
            return returnValue;
        }

        if (compareArrays(getIndices("X"))) {
            alert("X's Wins The Game!")
            gameBoard.resetData()
        } else if (compareArrays(getIndices("O"))) {
            alert("O's Wins The Game!")
            gameBoard.resetData()
        } else if (drawCheck()) {
            alert("It's a draw")
            gameBoard.resetData()
        }
    }
    
    const addClickEvents = (playerX, playerY) => {
        squares = document.querySelectorAll(".squares")
        
        squares.forEach(square => {

            square.addEventListener("click", () => {

                const placeMarker = (square, playerX, playerY) => {
                    gameBoard.numberOfMarkers += 2;
                    if (square.innerText == "") {
                        square.innerText = playerX.marker;
                        gameBoard.boardArray[square.id] = playerX.marker;

                        if (playerY === playerAI && gameBoard.numberOfMarkers < 9) {
                            let AISquare = squares.item(gpt3());
                            while (AISquare.innerText != "") {
                                AISquare = squares.item(gpt3())
                            }
                            AISquare.innerText = playerY.marker;
                            gameBoard.boardArray[AISquare.id] = playerY.marker;
                            return;
                        }
                        playerX.isTurn = false;
                        playerY.isTurn = true;
                    }
                }

                if (playerX.isTurn) {
                    placeMarker(square, playerX, playerY)
                } else {
                    placeMarker(square, playerY, playerX)
                }
                checkWinner()
            });
        });
    }
        
    const assignMarker = () => {
        //whatever marker is selected becomes player1
        if (XButton.classList.contains("selected")) {
            player1.marker = "X";
            player2.marker = "O";
            playerAI.marker = "O"
            } else {
                player1.marker = "O";
                player2.marker = "X";
                playerAI.marker = "X";
            }
        player1.isTurn = true;
        player2.isTurn = false;
        playerAI.isTurn = false;
    }

    const removeEventListeners = () => {
        let i = 0;
        const squares = document.querySelectorAll(".squares")
        squares.forEach(square => {
            let newSquare = document.createElement('div');
            newSquare.id = i;
            newSquare.classList.add("squares")
            newSquare.classList.add("flex-center")
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

    const gpt3 = () => {
        return Math.floor(Math.random() * 8.99)
    }
    
    toggleButton(XButton, OButton)
    toggleButton(OButton, XButton)
    toggleButton(playerVsPlayerBtn, playerVsAiBtn)
    toggleButton(playerVsAiBtn, playerVsPlayerBtn)
    
    startGame()
})();