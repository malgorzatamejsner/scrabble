
// pula liter
const letters = [
    {letter: " ", amount: 2},
    {letter: "a", amount: 9},
    {letter: "ą", amount: 1},
    {letter: "b", amount: 2},
    {letter: "c", amount: 3},
    {letter: "ć", amount: 1},
    {letter: "d", amount: 3},
    {letter: "e", amount: 7},
    {letter: "ę", amount: 1},
    {letter: "f", amount: 1},
    {letter: "g", amount: 2},
    {letter: "h", amount: 2},
    {letter: "i", amount: 8},
    {letter: "j", amount: 2},
    {letter: "k", amount: 3},
    {letter: "l", amount: 3},
    {letter: "ł", amount: 2},
    {letter: "m", amount: 3},
    {letter: "n", amount: 5},
    {letter: "ń", amount: 1},
    {letter: "o", amount: 6},
    {letter: "ó", amount: 1},
    {letter: "p", amount: 3},
    {letter: "r", amount: 4},
    {letter: "s", amount: 4},
    {letter: "ś", amount: 1},
    {letter: "t", amount: 3},
    {letter: "u", amount: 2},
    {letter: "w", amount: 4},
    {letter: "y", amount: 4},
    {letter: "z", amount: 5},
    {letter: "ź", amount: 1},
    {letter: "ż", amount: 1}
];//suma liter w puli
let lettersSum = 0;
// kategorie liter do punktacji
const category = [
    {color: "white", points: 0},
    {color: "yellow", points: 1},
    {color: "green", points: 2},
    {color: "blue", points: 3},
    {color: "pink", points: 5}
];
//  właściwości liter potrzebne do liczenia punktów
const letterProperties = [
    {letter: " ", category: category[0]},
    {letter: "a", category: category[1]},
    {letter: "ą", category: category[4]},
    {letter: "b", category: category[3]},
    {letter: "c", category: category[2]},
    {letter: "ć", category: category[4]},
    {letter: "d", category: category[2]},
    {letter: "e", category: category[1]},
    {letter: "ę", category: category[4]},
    {letter: "f", category: category[4]},
    {letter: "g", category: category[3]},
    {letter: "h", category: category[3]},
    {letter: "i", category: category[1]},
    {letter: "j", category: category[3]},
    {letter: "k", category: category[2]},
    {letter: "l", category: category[2]},
    {letter: "ł", category: category[3]},
    {letter: "m", category: category[2]},
    {letter: "n", category: category[1]},
    {letter: "ń", category: category[4]},
    {letter: "o", category: category[1]},
    {letter: "ó", category: category[4]},
    {letter: "p", category: category[2]},
    {letter: "r", category: category[1]},
    {letter: "s", category: category[1]},
    {letter: "ś", category: category[4]},
    {letter: "t", category: category[2]},
    {letter: "u", category: category[3]},
    {letter: "w", category: category[1]},
    {letter: "y", category: category[2]},
    {letter: "z", category: category[1]},
    {letter: "ź", category: category[4]},
    {letter: "ż", category: category[4]}
]
// generowanie tablicy liter na planszy
const lettersOnBoard = [
    ["","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","","",""]
];
// tablica z literami gracza
const playerLetters = ["", "", "", "", "", "", ""];
// tablica z literami wybranymi do wymiany w swapMode() - na indeksach z "1" są litery wybrane do wymiany
const swapSelected = [0,0,0,0,0,0,0];
// tablica z niezatwierdzonymi literami na planszy
const draggedOnBoard = [];

// pobrane elementy
const board = document.querySelector(".board");
const sectionPlayer = document.querySelector(".player");
const playerFields = document.querySelector(".player__fields");
const playerField = document.querySelectorAll(".player__field");
const startBtn = document.querySelector(".player__btn--start");
const swapModeBtn = document.querySelector(".player__btn--swapMode");
const swapBtnOk = document.querySelector(".player__btn--swap-ok");
const swapBtnCancel = document.querySelector(".player__btn--swap-cancel");
const wordBtnOk = document.querySelector(".player__btn--word-ok");
const playerMessage = document.querySelector(".player__message");
const playerScore = document.querySelector(".player__score--score");
const playerPoints = document.querySelector(".player__score--points");
const freezer = document.querySelector(".freezer");
const lettersForBlank = document.querySelector(".freezer__letters-for-blank");
let isSwapModeOn = false;

// obsługa przycisków
startBtn.addEventListener("click", function(){
    startBtn.classList.add("player__btn--hidden");
    swapModeBtn.classList.remove("player__btn--hidden");
    dragOn();
    lettersSum = parseInt(letters.map(el => [el.amount]).reduce((prev, curr) => Number(prev) + Number(curr)));
});
function buttonsVisibility(){
    swapModeBtn.classList.toggle("player__btn--hidden");
    swapBtnOk.classList.toggle("player__btn--hidden");
    swapBtnCancel.classList.toggle("player__btn--hidden");
}
function swapModeOn(){
    buttonsVisibility();
    playerField.forEach((tiles) => tiles.addEventListener("click", swapTiles));
    swapBtnOk.addEventListener("click", swapOk);
    swapBtnCancel.addEventListener("click", swapCancel);
    document.removeEventListener("dragstart", drag, false);
    // wyłączenie drag and drop w trakcie wymiany liter
    dragOff();
    isSwapModeOn = true;
}
function swapModeOff(){
    buttonsVisibility();
    playerField.forEach((tiles) => tiles.removeEventListener("click", swapTiles));
    swapBtnOk.removeEventListener("click", swapOk);
    swapBtnCancel.removeEventListener("click", swapCancel);
    displayMessage("");
    dragOn();
    isSwapModeOn = false;
}
function displayMessage(msg){
    playerMessage.innerHTML = msg;
}
// FUNKCJE !!! LITERY GRACZA !!!

// losowanie litery dla gracza
function drawLetter(){
    let whichLetter = Math.floor(Math.random()*letters.length);
    let result = letters[whichLetter].letter;
    // odejmowanie ilości wylosowanej litery w tablicy letters
    letters[whichLetter].amount--;
    lettersSum--;

    if (letters[whichLetter].amount === 0){
        letters.splice(whichLetter,1);
    }
    return result;
}

// losowanie i wstawianie liter do player__fields
function playerInsertLetters(){
    let findColor;
    let blank;
    //losowanie tylu liter, ile pustych player__fields
    while (playerLetters.some(el => el === "") && letters.length > 0){
        let index = playerLetters.findIndex(el => el === "");
        playerLetters[index] = drawLetter();

        //znalezienie odpowiednich kolorów i punktacji dla wylosowanych liter
        findColor = letterProperties.findIndex(el => el.letter === playerLetters[index]);
        (playerLetters[index] === " ") ? blank = 'onclick="fillBlank(event);"' : blank = "";
        //wstawienie do player__fields
        playerFields.children[index].innerHTML =
        `<div draggable="true" ondragstart="event.dataTransfer.setData('text/plain',null)" ${blank} class="letter-background letter-background--${letterProperties[findColor].category.color}">
            <div class="letter-background__global letter-background__top letter-background__top--${letterProperties[findColor].category.color}"></div>
            <div class="letter-background__global letter-background__middle letter-background__middle--${letterProperties[findColor].category.color}"></div>
            <div class="letter-background__global letter-background__bottom letter-background__bottom--${letterProperties[findColor].category.color}"></div>
            <div class="letter">${playerLetters[index].toUpperCase()}</div>
        </div>`
    }
    return;
}
// włączenie trybu wymiany liter
function swapMode(){
    // sprawdzenie czy wymiana możliwa
    if (lettersSum >= 7){
        if(draggedOnBoard.length > 0){
            for(el of draggedOnBoard){
                playerLettersIndex = playerLetters.indexOf("");
                playerLetters[playerLettersIndex] = el.letter;
                playerFields.children[playerLettersIndex].appendChild(board.children[el.childNo].lastChild);
            }
            draggedOnBoard.length = 0;
        }
        swapModeOn();
        displayMessage(`Wybierz litery, które chcesz wymienić`);
    }else{
        displayMessage(`Niestety, nie możesz teraz wymienić liter`);
    };
    return;
};
// włączenie zaznaczanie wybranych liter
function swapTiles(event){
    let fieldNumber = event.target.parentElement.parentElement.dataset.field;
    if(swapSelected[fieldNumber] === 0){
        event.target.parentElement.style.transform = "translateY(-10px)";
        swapSelected[fieldNumber] = 1;
    }else if(fieldNumber){
        event.target.parentElement.style.transform = "translateY(0px)";
        swapSelected[fieldNumber] = 0;
    }
    return;
};
// zamiana liter po zatwierdzeniu
function swapOk(){
    swapModeOff();
    for (el in swapSelected){
        let lettersIndex;
        // sprawdzenie indeksu wymienianej litery
        if (swapSelected[el] === 1){
            lettersIndex = letters.findIndex(i => i.letter === playerLetters[el]);
            // dodanie wymienionych liter do puli
            (lettersIndex !== -1) ? letters[lettersIndex].amount++ : letters.push({letter: playerLetters[el], amount: 1});
            lettersSum++;
            // usuwanie litery z playerLetters
            playerLetters[el] = "";
            // odznaczenie - wyzerowanie indeksów liter wybranych do wymiany
            swapSelected[el] = 0;
        }
    }
    // wstawienie wylosowanych liter w miejsce poprzednich
    playerInsertLetters();
    return;
};
// anulowanie zamiany
function swapCancel(){
    swapModeOff();
    const tiles = document.querySelectorAll(".letter-background");
    // przesunięcie kafelków w playerFields 
    tiles.forEach(tile => {
        if (tile.style.transform = "translateY(-10px)"){
            tile.style.transform = "translateY(0px)"
        }
    })
    // wyzerowanie tablicy
    swapSelected.fill(0);
    return;
};
// PRZENOSZENIE LITER
let dragged;
let playerLettersIndex;
let currentLetter;
let draggedOnBoardIndex;
let mainWordPoints;
let score = 0;

function drag(){};
function dragstart(event){
    let parent = event.target.parentElement;
    dragged = event.target;
// podnoszenie litery z planszy
    if (parent.classList.contains("board__field")){
        playerLettersIndex = -1;
        draggedOnBoardIndex = draggedOnBoard.findIndex(el => el.row === parseInt(parent.dataset.row) && el.col === parseInt(parent.dataset.col));
        currentLetter = draggedOnBoard[draggedOnBoardIndex].letter;
    }
// podnoszenie litery z player fields
    if (parent.classList.contains("player__field")){
        draggedOnBoardIndex = -1;
        playerLettersIndex = parent.dataset.field;
        currentLetter = playerLetters[playerLettersIndex];
    }
};
function dragover(event){
    event.preventDefault();
};
function drop(event){
    if (event.target.classList.contains("board__field") || event.target.classList.contains("player__field")){
        event.target.appendChild(dragged);
        // upuszczenie litery na planszy
        if (event.target.classList.contains("board__field")) {
            let row = parseInt(event.target.dataset.row);
            let col = parseInt(event.target.dataset.col);
            let contact = "";

            if (col > 0 && lettersOnBoard[row][col - 1] !== ""){
                contact += "L";
            }
            if (col < 14 && lettersOnBoard[row][col + 1] !== ""){
                contact += "R";
            }
            if (row > 0 && lettersOnBoard[row - 1][col] !== ""){
                contact += "T";
            }
            if (row < 14 && lettersOnBoard[row + 1][col] !== ""){
                contact += "B";
            }
            // jeśli litera jest przeniesiona z pola gracza
            if (playerLettersIndex >= 0 && draggedOnBoardIndex < 0){
                playerLetters[playerLettersIndex] = "";
                // dodanie litery i jej pozycji na planszy do tablicy
                draggedOnBoard.push({
                    letter: currentLetter, 
                    row: row, 
                    col: col,
                    childNo: row * (15) + col,
                    contact: contact
                });
            }
            // jeśli litera jest przeniesiona z innego pola na planszy
            if (playerLettersIndex < 0 && draggedOnBoardIndex >= 0){
                // zmiana pozycji danej litery w tablicy
                draggedOnBoard[draggedOnBoardIndex].row = row;
                draggedOnBoard[draggedOnBoardIndex].col = col;
                draggedOnBoard[draggedOnBoardIndex].childNo = row * (15) + col;
                draggedOnBoard[draggedOnBoardIndex].contact = contact;
            }
        }
        // upuszczenie litery na player fields
        if (event.target.classList.contains("player__field")){
            playerLetters[event.target.dataset.field] = currentLetter;
            // jeśli litera jest przeniesiona z innego pola gracza
            if (playerLettersIndex >= 0 && draggedOnBoardIndex < 0){
                playerLetters[playerLettersIndex] = "";
                
            }
            // jeśli litera jest przeniesiona z pola na planszy
            if (playerLettersIndex < 0 && draggedOnBoardIndex >= 0){
                draggedOnBoard.splice(draggedOnBoardIndex,1);
                mainWordPoints = 0;
            }
        }
        if(draggedOnBoard.length > 0){
            word();
        };
    }
    // wyświetlenie przycisku
    if (mainWordPoints > 0){
        if (wordBtnOk.classList.contains("player__btn--hidden")){
            wordBtnOk.classList.remove("player__btn--hidden");
        }
    }else{
        if (!wordBtnOk.classList.contains("player__btn--hidden")){
            wordBtnOk.classList.add("player__btn--hidden");
            playerPoints.innerHTML= "";
        }
    }
};
function dragOn(){
    document.addEventListener("drag", drag, false);
    document.addEventListener("dragstart", dragstart, false);
    document.addEventListener("dragend", drag, false);
    document.addEventListener("dragover", dragover, false);
    document.addEventListener("dragenter", drag, false);
    document.addEventListener("dragleave",drag, false);
    document.addEventListener("drop", drop, false);
}
function dragOff(){
    document.removeEventListener("drag", drag, false);
    document.removeEventListener("dragstart", dragstart, false);
    document.removeEventListener("dragend", drag, false);
    document.removeEventListener("dragover", dragover, false);
    document.removeEventListener("dragenter", drag, false);
    document.removeEventListener("dragleave",drag, false);
    document.removeEventListener("drop", drop, false);
    wordBtnOk.classList.add("player__btn--hidden");
}
// wyrazy na planszy
function word(){
    mainWordPoints = 0;
    let cols = draggedOnBoard.map(el => el.col);
    let rows = draggedOnBoard.map(el => el.row);
    let currentRow = draggedOnBoard[0].row;
    let minCol = Math.min.apply(Math, cols);
    let maxCol = Math.max.apply(Math, cols);
    let currentCol = draggedOnBoard[0].col;
    let minRow = Math.min.apply(Math, rows);
    let maxRow = Math.max.apply(Math, rows);
    let orientation;
    let lettersAround = [];
    // warunek dla pierwszego wyrazu na planszy
    if(lettersOnBoard[7][7] === ""){
        if(draggedOnBoard.length > 1){
            // jeśli wyraz ułożony w poziomie (wierszu)
            if(draggedOnBoard.every(el => el.row === 7) && draggedOnBoard.some(el => el.col === 7)){
                // sprawdzenie, czy nie ma przerw w wyrazie
                if(maxCol - minCol === draggedOnBoard.length - 1){
                    orientation = "row";
                    return countPoints(orientation, maxCol, minCol, currentRow, lettersAround);
                }
                return;
            }
            // jeśli wyraz ułożony w pionie (kolumna)
            else if(draggedOnBoard.every(el => el.col === 7) && draggedOnBoard.some(el => el.row === 7)){
            // sprawdzenie, czy nie ma przerw w wyrazie
                if(maxRow - minRow === draggedOnBoard.length - 1){
                    orientation = "col";
                    return countPoints(orientation, maxRow, minRow, currentCol, lettersAround);
                }
                return;
            }
            else{
                return;
            }
        }
        else{
            return;
        }
    }
    // dla kolejnych wyrazów na planszy
    else{
        // warunek czy coś jest obok danej litery w lettersOnBoard
        if(draggedOnBoard.some(el => el.contact !== "")){
            // jeśli wyraz ułożony w poziomie (wierszu)
            if(draggedOnBoard.every(el => el.row === currentRow) && (draggedOnBoard.length > 1 || draggedOnBoard[0].contact.includes("L") ||  draggedOnBoard[0].contact.includes("R"))){
                orientation = "row";
                // stworzenie tablicy liter z currentRow
                lettersAround = lettersOnBoard[currentRow].slice(minCol, maxCol + 1).filter(el => el !== "");
                // sprawdzenie, czy nie ma przerw w wyrazie
                if(maxCol - minCol - lettersAround.length === draggedOnBoard.length - 1){
                    return countPoints(orientation, maxCol, minCol, currentRow, lettersAround);
                }
                // jeśli są przerwy w wyrazie
                return;
            }
            // jeśli wyraz ułożony w pionie (kolumna)
            else if(draggedOnBoard.every(el => el.col === currentCol)){
                orientation = "col";
                // stworzenie tablicy liter z currentCol
                for (item of lettersOnBoard){
                    lettersAround.push(item[currentCol]);
                }
                lettersAround = lettersAround.slice(minRow, maxRow + 1).filter(el => el !== "");
                
                // sprawdzenie, czy nie ma przerw w wyrazie
                if(maxRow - minRow - lettersAround.length === draggedOnBoard.length - 1){
                    return countPoints(orientation, maxRow, minRow, currentCol, lettersAround);
                }
                // jeśli są przerwy w wyrazie
                return;
            }
            // jeśli litery na planszy są ułożone inaczej
            else{
                return;
            }
        }
        else{
            return;
        }           
    }
}
// zatwierdzenie słowa ułożonego na planszy
function wordOk(){
    // sprawdzenie czy są wybrane litery w pustych kafelkach
    for (el of draggedOnBoard){
        if (draggedOnBoard.some(item => board.children[item.childNo].lastElementChild.lastElementChild.textContent === " ")){
            alert("Wybierz literę w pustym kafelku");
            return;
        }
    }
    for (el of draggedOnBoard){
        lettersOnBoard[el.row][el.col] = el.letter;
        board.children[el.childNo].lastChild.removeAttribute("draggable");
        board.children[el.childNo].lastChild.removeAttribute("onclick");
    }
    draggedOnBoard.length = 0;
    playerInsertLetters();
    score += mainWordPoints;
    playerScore.innerHTML = `Wynik: ${score} pkt `;
    playerPoints.innerHTML= "";
    wordBtnOk.classList.add("player__btn--hidden");
}

// liczenie punktów
function countPoints(orientation, mainMax, mainMin, currentRowOrCol, lettersAround){
    let crossedWordPoints = 0;
    let crossedWordPointsAll = 0;
    let mainWordBonus = 1;
    let crossedWordBonus = 1;
    let propIndex;
    let crossedWord = false;
    let crossedMax = currentRowOrCol;
    let crossedMin = currentRowOrCol;
    // szukanie liter wyrazu poza literami w draggedOnBoard
    if (orientation == "row"){
            // znalezienie liter wyrazu przed literami przełożonymi na planszę
        while (mainMin > 0 && lettersOnBoard[currentRowOrCol][mainMin-1] !== ""){
            // liczenie punktów za litery przed wyrazem
            mainWordPoints += letterProperties[letterProperties.findIndex(item => item.letter ===  lettersOnBoard[currentRowOrCol][mainMin-1])].category.points;
            mainMin--;
        }
        // znalezienie liter wyrazu za literami przełożonymi na planszę
        while (mainMax < 14 && lettersOnBoard[currentRowOrCol][mainMax+1] !== ""){
            // liczenie punktów za litery za wyrazem
            mainWordPoints += letterProperties[letterProperties.findIndex(item => item.letter ===  lettersOnBoard[currentRowOrCol][mainMax+1])].category.points;
            mainMax++;
        }
    }
    if (orientation === "col"){
        // znalezienie liter wyrazu przed literami przełożonymi na planszę
        while (mainMin > 0 && lettersOnBoard[mainMin-1][currentRowOrCol] !== ""){
            // liczenie punktów za litery przed wyrazem
            mainWordPoints += letterProperties[letterProperties.findIndex(item => item.letter ===  lettersOnBoard[mainMin-1][currentRowOrCol])].category.points;
            mainMin--;
        }
        // znalezienie liter wyrazu za literami przełożonymi na planszę
        while (mainMax < 14 && lettersOnBoard[mainMax+1][currentRowOrCol] !== ""){
            // liczenie punktów za litery za wyrazem
            mainWordPoints += letterProperties[letterProperties.findIndex(item => item.letter ===  lettersOnBoard[mainMax+1][currentRowOrCol])].category.points;
            mainMax++;
        }
    }
    // liczenie punktów za litery w środku wyrazu
    lettersAround.forEach((el) => {
        mainWordPoints += letterProperties[letterProperties.findIndex(item => item.letter ===  el)].category.points;
    });
    // liczenie punktów za litery w draggedOnBoard
    draggedOnBoard.forEach((el) => {
        crossedWordPoints = 0;
        crossedWordBonus = 1;

        if ((orientation === "row" && (el.contact.includes("T") || el.contact.includes("B"))) || (orientation === "col" && (el.contact.includes("L") || el.contact.includes("R")))){
            crossedWord = true;
        }
        propIndex =  letterProperties.findIndex(item => item.letter === el.letter);
        // bonus za zgodność koloru litery z kolorem pola na planszy
        if (board.children[el.childNo].classList.contains(`board__field--color-${letterProperties[propIndex].category.color}`)){
            mainWordPoints += letterProperties[propIndex].category.points * 3;
            if (crossedWord === true){
                crossedWordPoints = letterProperties[propIndex].category.points * 3;
            }
        }
        else{
            mainWordPoints += letterProperties[propIndex].category.points;
            if (crossedWord === true){
                crossedWordPoints = letterProperties[propIndex].category.points;
            }
        }
        // bonus dla wyrazów za pola x2 i x3 na planszy
        if (board.children[el.childNo].classList.contains("board__field--color-grey-3")){
            mainWordBonus *= 3;
            crossedWordBonus = 3;
        }
        if (board.children[el.childNo].classList.contains("board__field--color-grey-2")){
            mainWordBonus *= 2;
            crossedWordBonus = 2;
        }
        if (crossedWord === true){
            if (orientation === "row"){
                    // liczenie punktów za litery nad literami z draggedOnBoard
                while (crossedMin > 0 && lettersOnBoard[crossedMin-1][el.col] !== ""){
                    crossedWordPoints += letterProperties[letterProperties.findIndex(item => item.letter ===  lettersOnBoard[crossedMin-1][el.col])].category.points;
                    crossedMin--;
                }
                // liczenie punktów za litery pod literami z draggedOnBoard
                while (crossedMax < 14 && lettersOnBoard[crossedMax+1][el.col] !== ""){
                    crossedWordPoints += letterProperties[letterProperties.findIndex(item => item.letter ===  lettersOnBoard[crossedMax+1][el.col])].category.points;
                    crossedMax++;
                }
            }
            if (orientation === "col"){
                // liczenie punktów za litery przed literami z draggedOnBoard
                while (crossedMin > 0 && lettersOnBoard[el.row][crossedMin-1] !== ""){
                    crossedWordPoints += letterProperties[letterProperties.findIndex(item => item.letter ===  lettersOnBoard[el.row][crossedMin-1])].category.points;
                    crossedMin--;
                }
                // liczenie punktów za litery za literami z draggedOnBoard
                while (crossedMax < 14 && lettersOnBoard[el.row][crossedMax+1] !== ""){
                    crossedWordPoints += letterProperties[letterProperties.findIndex(item => item.letter ===  lettersOnBoard[el.row][crossedMax+1])].category.points;
                    crossedMax++;
                }
            }
            
            crossedWordPoints *= crossedWordBonus;
            crossedWordPointsAll += crossedWordPoints;
            crossedWord = false;
            crossedMin = currentRowOrCol;
            crossedMax = currentRowOrCol;
        }
    });
    draggedOnBoard.length === 7 ? mainWordPoints = (mainWordPoints * mainWordBonus) + 50 + crossedWordPointsAll : mainWordPoints = (mainWordPoints * mainWordBonus) + crossedWordPointsAll;
    playerPoints.innerHTML= `+ ${mainWordPoints} pkt`;
    return mainWordPoints;
};
// generowanie liter w divie freezer__letters-for-blank
for (el of letterProperties){
    lettersForBlank.innerHTML += `<div onclick="fill(event)"; class="freezer__letters-for-blank__letter letter-background letter-background--white">
    <div class="letter-background__global letter-background__top letter-background__top--white"></div>
    <div class="letter-background__global letter-background__middle letter-background__middle--white"></div>
    <div class="letter-background__global letter-background__bottom letter-background__bottom--white"></div>
    <div class="letter">${el.letter.toUpperCase()}</div></div>`;
}
// podstawianie liter w blankach
let chosenBlank = "";
// funkcja wywoływana po kliknięciu w biały kafelek
function fillBlank(e){
    if (!isSwapModeOn){
        freezer.classList.remove("freezer__hidden");
        chosenBlank = e.target;
    }
    return;
}
// funkcja wywoływana po kliknięciu w wybraną literę dla białego kafelka
function fill(event){
    freezer.classList.add("freezer__hidden");
    chosenBlank.innerHTML = event.target.textContent;
    return;
}