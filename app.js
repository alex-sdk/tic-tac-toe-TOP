const gameBoard = (() => {
    const boardArray =
        ["", "", ""
        ,"", "", ""
        ,"", "", ""];
    
    const renderMarkers = (Arr, player) => {
        const squares = document.querySelectorAll(".squares");
        for (let i = 0; i < Arr.length; ++i){
            let square = squares.item(i)
            player.placeMarkers(square)
        }
    }
    return {
        renderMarkers,
        boardArray: boardArray
    };
})();
const players = (marker) => {
    const placeMarkers = (square) => {
        square.addEventListener("click", () => {
            square.innerText = marker;
            gameBoard.boardArray[square.id] = marker;
        });
    }
    return {
        placeMarkers
    };
};
const gameflow = (() => {
    const XButton = document.querySelector(".Xbutton");
    const OButton = document.querySelector(".Obutton");
    const StartButton = document.querySelector(".start");
    const RestartButton = document.querySelector(".restart");
    const playerVsPlayerBtn = document.querySelector(".playerVsPlayer");
    const playerVsAiBtn = document.querySelector(".playerVsAi");
    XButton.addEventListener("click", () => {
        if (!XButton.classList.contains("selected")) {
            XButton.classList.toggle("selected")
            XButton.classList.toggle("not-selected")
            OButton.classList.toggle("not-selected")
            OButton.classList.toggle("selected")
        }
    })
    OButton.addEventListener("click", () => {
        if (!OButton.classList.contains("selected")) {
            XButton.classList.toggle("selected")
            XButton.classList.toggle("not-selected")
            OButton.classList.toggle("not-selected")
            OButton.classList.toggle("selected")
        }
    })
    playerVsPlayerBtn.addEventListener("click", () => {
        if (!playerVsPlayerBtn.classList.contains("selected")) {
            playerVsPlayerBtn.classList.toggle("selected")
            playerVsPlayerBtn.classList.toggle("not-selected")
            playerVsAiBtn.classList.toggle("not-selected")
            playerVsAiBtn.classList.toggle("selected")
        }
    })
    playerVsAiBtn.addEventListener("click", () => {
        if (!playerVsAiBtn.classList.contains("selected")) {
            playerVsPlayerBtn.classList.toggle("selected")
            playerVsPlayerBtn.classList.toggle("not-selected")
            playerVsAiBtn.classList.toggle("not-selected")
            playerVsAiBtn.classList.toggle("selected")
        }
    })


    const playerVsPlayer = () => {

    }
    const playerVsAi = () => {

    }
})();
gameBoard.renderMarkers(gameBoard.boardArray, players())