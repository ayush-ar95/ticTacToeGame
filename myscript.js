const boxes = document.querySelectorAll(".box");
const resetButton = document.querySelector(".reset-button");
const dialogBox = document.querySelector("dialog");
const pElement = dialogBox.querySelector("p");

let countBoxClicked = 0;
let defaultWinner = null;
let turnX = true; // playerO, playerX, initially player x will start the game.

// total possible winning scenarios.
const winningPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const disableBoxes = () => {
    for (box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (box of boxes) {
        box.disabled = false;
        box.textContent = "";
    }
};

const showWinner = (winner) => {
    defaultWinner = winner;
    pElement.textContent = `congratulations 🎉, winner is ${winner}`;
    dialogBox.classList.add("show");
    disableBoxes();
};

// if (!defaultWinner && countBoxClicked === 9) {
//     pElement.textContent = `draw, play again`;
//     dialogBox.classList.add("show");
// }

const checkWinner = () => {
    for (let pattern of winningPatterns) {
        let pos1Value = boxes[pattern[0]].textContent;
        let pos2Value = boxes[pattern[1]].textContent;
        let pos3Value = boxes[pattern[2]].textContent;

        if (pos1Value !== "", pos2Value !== "", pos3Value !== "") {
            if (pos1Value === pos2Value && pos2Value === pos3Value) {
                showWinner(pos1Value);
            }
        }
    }
};

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (turnX) {
            box.textContent = "X";
            turnX = false;
        } else {
            box.textContent = "O";
            turnX = true;
        }
        box.disabled = true;
        countBoxClicked++;
        console.log(countBoxClicked);
        checkWinner();
        if (countBoxClicked == 9 && defaultWinner === null) {
            pElement.textContent = `draw 💀, play again !`;
            dialogBox.classList.add("show");
        }
    });
});

resetButton.addEventListener("click", () => {
    turnX = true;
    countBoxClicked = 0;
    enableBoxes();
    defaultWinner = null;
    dialogBox.classList.remove("show");
});