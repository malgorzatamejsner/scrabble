
// pula liter
const letters = [
    {letter: "a", amount: 10},
    {letter: "b", amount: 1},
    {letter: "c", amount: 5},
    {letter: "d", amount: 3},
    {letter: "e", amount: 15},
    {letter: "f", amount: 15},
    {letter: "g", amount: 15}
];
//suma liter w puli
const lettersSum = letters.map(el => [el.amount]).reduce((prev, curr) => Number(prev) + Number(curr)); 
// kategorie liter do punktacji
const category = [
    {color: "yellow", points: 1},
    {color: "green", points: 2},
    {color: "blue", points: 3},
    {color: "pink", points: 5}
];
//  właściwości liter potrzebne do liczenia punktów
const letterProperties = [
    {letter: "a", category: category[0]},
    {letter: "b", category: category[2]},
    {letter: "c", category: category[1]},
    {letter: "d", category: category[1]},
    {letter: "e", category: category[0]},
    {letter: "f", category: category[3]},
    {letter: "g", category: category[1]}
]
// tablica z literami gracza
const playerLetters = ["", "", "", "", "", "", ""];
// tablica z literami wybranymi do wymiany w swapMode() - na indeksach z "1" są litery wybrane do wymiany
const swapSelected = [0,0,0,0,0,0,0];

// pobrane elementy
const sectionPlayer = document.querySelector(".player");
const playerFields = document.querySelector(".player__fields");
const playerField = document.querySelectorAll(".player__field");
const startBtn = document.querySelector(".player__btn--start");
const swapModeBtn = document.querySelector(".player__btn--swapMode");
const swapBtnOk = document.querySelector(".player__btn--swap-ok");
const swapBtnCancel = document.querySelector(".player__btn--swap-cancel");
const playerMessage = document.querySelector(".player__message");


// obsługa przycisków
startBtn.addEventListener("click", function(){
    startBtn.classList.add("player__btn--hidden");
    swapModeBtn.classList.remove("player__btn--hidden");
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
}
function swapModeOff(){
    buttonsVisibility();
    playerField.forEach((tiles) => tiles.removeEventListener("click", swapTiles));
    swapBtnOk.removeEventListener("click", swapOk);
    swapBtnCancel.removeEventListener("click", swapCancel);
    playerMessage.innerHTML = "";
}

// FUNKCJE !!! LITERY GRACZA !!!

// losowanie litery dla gracza
function drawLetter(){
    let whichLetter = Math.floor(Math.random()*letters.length);
    let result = letters[whichLetter].letter;

    // odejmowanie ilości wylosowanej litery w tablicy letters
    letters[whichLetter].amount--;

    if (letters[whichLetter].amount === 0){
        letters.splice(whichLetter,1);
    }
    return result;
}

// losowanie i wstawianie liter do player__fields
function playerInsertLetters(){
    //losowanie tylu liter, ile pustych player__fields
    while (playerLetters.some(el => el === "") && letters.length > 0){
        let index = playerLetters.findIndex(el => el === "");
        playerLetters[index] = drawLetter();
    }
    let findColor;
    for (let i = 0; i < playerLetters.length; i++){
        //znalezienie odpowiednich kolorów i punktacji dla wylosowanych liter
        findColor = letterProperties.findIndex(el => el.letter === playerLetters[i]);
        //wstawienie do player__fields
        playerFields.children[i].innerHTML = `<div data-id="${i}" draggable="true" ondragstart="event.dataTransfer.setData('text/plain',null)" class="letter-background letter-background--${letterProperties[findColor].category.color}">
        <div class="letter-background__global letter-background__top letter-background__top--${letterProperties[findColor].category.color}"></div>
        <div class="letter-background__global letter-background__middle letter-background__middle--${letterProperties[findColor].category.color}"></div>
        <div class="letter-background__global letter-background__bottom letter-background__bottom--${letterProperties[findColor].category.color}"></div>
        <div class="letter">${playerLetters[i].toUpperCase()}</div>
    </div>`
    }
    return;
}
// włączenie trybu wymiany liter
function swapMode(){
    // sprawdzenie czy wymiana możliwa
    if (lettersSum >= 7 && playerLetters.every(el => el !== "")){
        swapModeOn();
        playerMessage.innerHTML = `Wybierz litery, które chcesz wymienić`;
    }else{
        playerMessage.innerHTML = `Niestety, nie możesz teraz wymienić liter`;
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
        // sprawdzenie indeksu zmienionej litery
        if (swapSelected[el] === 1){
            // dodanie ilości wybranej do wymiany litery w tablicy letters 
            letters.forEach(i => {
                if (i.letter === playerLetters[el]){
                    i.amount++;
                }
            });
            // losowanie nowych liter w miejsce wybranych do wymiany
            playerLetters[el] = drawLetter();
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
        // if (tile.style.transform = "translateY(-10px)"){
            tile.style.transform = "translateY(0px)"
        // }
    })
    // wyzerowanie tablicy
    swapSelected.splice(0,7,0,0,0,0,0,0,0);
    return;
};
// FUNKCJE !!! PRZENOSZENIE NA PLANSZĘ !!!
let dragged;
document.addEventListener("drag", function(event){
}, false);
document.addEventListener("dragstart", function(event) {
    dragged = event.target;
}, false);
document.addEventListener("dragend", function(event) {}, false);
document.addEventListener("dragover", function(event) {
    event.preventDefault();
  }, false);
document.addEventListener("dragenter", function(event) {}, false);
document.addEventListener("dragleave", function(event) {}, false);
document.addEventListener("drop", function(event) {
// move dragged elem to the selected drop target
if (event.target.classList.contains("board__field")) {
    dragged.parentNode.removeChild( dragged );
    event.target.appendChild( dragged );
}
if (event.target.classList.contains("player__field")){
    dragged.parentNode.removeChild( dragged );
    event.target.appendChild( dragged );
}
}, false);