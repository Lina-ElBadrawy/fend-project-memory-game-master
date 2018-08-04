/*
 * Create a list that holds all of your cards
 */
let pairedCardValues=[];
let openCards=[];

document.addEventListener("DOMContentLoaded", function(event) { 
    //- shuffle the list of cards using the provided "shuffle" method below
    pairedCardValues = prepareArray();
    pairedCardValues = shuffle(pairedCardValues);

    //- loop through each card and create its HTML
    var frag = document.createDocumentFragment();
    var deck = document.getElementById('deck');
    for(var cardValue of pairedCardValues){
        let cardElement=document.createElement("li");
        //-------For testing only---------
        //cardElement.classList.add("show");
        //--------------------------------
        cardElement.classList.add("card");
        let cardFont= document.createElement("i");
        cardElement.appendChild(cardFont);
        cardElement.addEventListener("click",toggleCard)
        cardFont.classList.add("fa");
        cardFont.classList.add(cardValue.split(' ')[1]);
        frag.appendChild(cardElement);     
    }
    //- add each card's HTML to the page
    deck.appendChild(frag);

   
  });
function toggleCard(card){

    card = card.target;
    //If user tend to open a card
    if(!card.classList.contains("open")){
        // Open card action : - Set class= open , show - Add card to open list
        card.classList.add("open");
        card.classList.add("show");
        openCards.push(card);
        if(openCards&&openCards.length>0 && openCards.length%2==0){
            let card1=openCards[openCards.length-2];
            let card2=openCards[openCards.length-1];
            let match= checkMatching(card1,card2);
            if(match){
                card1.classList.add('match'); 
                card2.classList.add('match');                
            }
            else{
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

            if(openCards.length==pairedCardValues.length){
                alert("You won");
            }

        }
        
    }

}
  function toggle(card){
      let openedCards=[];   
      let openCards=[];
      let openedCardsList=[];   
      let allCards=[];
      let otherCards=[];

      if(!card.target.classList.contains("open")){
        
        openedCards = document.getElementsByClassName("open");
        if(openedCards.length<2){
            card.target.classList.add("open");
            card.target.classList.add("show");

            if(openedCards.length>=2){
                
            }

            //openedCards.push(card);
            //openedCards = document.getElementsByClassName("open");
           
           /*Disable all other cards
            otherCards=document.querySelectorAll('li:not(.open)');
            if(openedCards.length>=2){               
                    //lock other cards;                   
                    if(otherCards && otherCards.length>0){
                        for(var otherCard of otherCards){
                            otherCard.classList.add("disabled");
                        }
                    }
            }
            else{
                otherCards=document.querySelectorAll('li:not(.open)');
                for(var otherCard of otherCards){
                    otherCard.classList.remove("disabled");
                }
            }*/
        }
        else{            
           
        } 
    }
    else{
        card.target.classList.remove("open");
        card.target.classList.remove("show");
        card.target.classList.remove("match");
        card.target.classList.remove("mismatch");
        
        otherCards=document.querySelectorAll('li:not(.open)');
        for(var otherCard of otherCards){
            otherCard.classList.remove("disabled");
        }
    }
    if(openedCards.length==2){
        let isMatching = checkMatching(openedCards)
        if(isMatching){
            for(var openCard of openedCards){
                openCard.classList.add('match');
            }
        }
        else{
            for(var openCard of openedCards){
                openCard.classList.add('mismatch');
            }
        }
    }

  }
function checkMatching(card1, card2){    
        return  card1.firstChild.classList.value==card2.firstChild.classList.value;

}

function prepareHTMLTemplates(){

}
function prepareArray(){
    let cardValues=["fa fa-diamond",
    "a fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-bomb",
    "a fa-leaf",
    "fa fa-bicycle"
    ];
    let pairedCardValues=[...cardValues,...cardValues];
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
