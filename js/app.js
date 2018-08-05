/*
 * Create a list that holds all of your cards
 */
let pairedCardValues = [];
let openCards = [];
let numberOfMoves = 0;
let score = 0;
let gameEnded = false;
var startTime;
var timerInterval;
var totalTime="";

function init() {

    pairedCardValues = [];
    openCards = [];
    score = 0;
    numberOfMoves = -1;
    gameEnded = false;

    updateMove();

    //- shuffle the list of cards using the provided "shuffle" method below
    pairedCardValues = prepareArray();
    pairedCardValues = shuffle(pairedCardValues);

    //- loop through each card and create its HTML
    var frag = document.createDocumentFragment();
    var deck = document.getElementById('deck');
    for (var cardValue of pairedCardValues) {
        let cardElement = document.createElement("li");
        //-------For testing only---------
        //cardElement.classList.add("show");
        //--------------------------------
        cardElement.classList.add("card");
        let cardFont = document.createElement("i");
        cardElement.appendChild(cardFont);
        cardElement.addEventListener("click", toggleCard)
        cardFont.classList.add("fa");
        cardFont.classList.add(cardValue.split(' ')[1]);
        frag.appendChild(cardElement);
    }
    //- add each card's HTML to the page
    deck.appendChild(frag);

    //hide("winPopup");
    show("gameBoard");
    initTimer();
}

document.addEventListener("DOMContentLoaded", function (event) {

    init();
    document.getElementById("reset").addEventListener("click", ResetGame);

});
function initTimer() {
    let startTime = new Date().getTime();
    //console.log("Timer started") 
    timerInterval = setInterval(function () {
        var now = new Date().getTime();
        var t = now - startTime;
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((t % (1000 * 60)) / 1000);
        totalTime= minutes + "m " + seconds + "s ";
        document.getElementById("timer").innerHTML =totalTime;
        if (gameEnded) {
            clearInterval(timerInterval);
            //console.log(timerInterval," cleared inside intrval")           
        }
    }, 1000);

}
function updateScore() {

}
function updateMove() {
    numberOfMoves++;
    document.getElementById("moves").innerText = numberOfMoves;

}
function ResetGame() {
    gameEnded = true;
    //  console.logtimerInterval, " before clearing"
    clearInterval(timerInterval);
    // console.log(timerInterval," cleared")        
    var deck = document.getElementById('deck');
    deck.innerHTML = "";
    init();

}
function toggleCard(card) {

    card = card.target;
    //If user tend to open a card
    if (!card.classList.contains("open")) {
        // Open card action : - Set class= open , show - Add card to open list
        card.classList.add("open");
        card.classList.add("show");
        openCards.push(card);
        if (openCards && openCards.length > 0 && openCards.length % 2 == 0) {
            let card1 = openCards[openCards.length - 2];
            let card2 = openCards[openCards.length - 1];
            let match = checkMatching(card1, card2);
            if (match) {
                card1.classList.add('match');
                card2.classList.add('match');
            }
            else {
                card.classList.add('mismatch');
                setTimeout(() => {
                    card1.classList.remove("open");
                    card1.classList.remove("show");
                    card1.classList.remove("mismatch");

                    card2.classList.remove("open");
                    card2.classList.remove("show");
                    card2.classList.remove("mismatch");

                }, 1000);
                openCards.splice(-2, 2);

            }
            updateMove();
            if (openCards.length == pairedCardValues.length) {
                gameEnded = true;
                clearInterval(timerInterval);
                hide("gameBoard");
                show("winPopup");
                document.getElementById("winInfo").innerText=`With ${numberOfMoves} Moves and ${score} Starts in ${totalTime}`;

            }

        }

    }

}
function show(element) {
    let e = document.getElementById(element);
    if (e)
    document.getElementById(element).classList.remove('hide');
}
function hide(element) {
    let e = document.getElementById(element);
    if (e)
        document.getElementById(element).classList.add('hide');
}

function checkMatching(card1, card2) {
    return card1.firstChild.classList.value == card2.firstChild.classList.value;
}

function prepareArray() {
    let cardValues = ["fa fa-diamond",
        "a fa-paper-plane-o",
        "fa fa-anchor",
        "fa fa-bolt",
        "fa fa-cube",
        "fa fa-bomb",
        "a fa-leaf",
        "fa fa-bicycle"
    ];
    let pairedCardValues = [...cardValues, ...cardValues];
    return pairedCardValues;

}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
