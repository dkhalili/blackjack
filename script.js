
//storing card numbers and suits in two different arrays
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var suits = ["hearts", "diamonds", "spades", "clubs"];


//create a card object that is named, valued, and suited based on the arguements
var cards = function cards(number, suit) {
	if (number === 1){
	this.name = "A";
	this.value = [number, number + 10]
	this.suit = suit
	}
	else if ( number === 11) {
	this.name = "J";
	this.value = 10;
	this.suit = suit
	}
	else if ( number === 12) {
	this.name = "Q";
	this.value = 10;
	this.suit = suit

	}
	else if ( number === 13) {
	this.name = "K";
	this.value = 10;
	this.suit = suit

	}
	else {
	this.name = number;
	this.value = number;
	this.suit = suit
	}
}


//create an array of cards objects 1-13 and with four differents suits
//can input number of decks desired in the createDeck arguement
var createDeck = function createDeck(number) {
	var cardArray = [];
	for (var i = 1; i <= (13 * number) ; i++) {
		var heartsCards = new cards(i, suits[0]);
		cardArray.push(heartsCards);
		var diamondsCads = new cards(i, suits[1]);
		cardArray.push(diamondsCads);
		var spadesCards = new cards(i, suits[2]);
		cardArray.push(spadesCards);
		var clubsCards = new cards(i, suits[3]);
		cardArray.push(clubsCards);

	}
	return cardArray;
	
}


var fullDeck = [];
fullDeck = createDeck(1);





// var deckShuffled = [];
// var shuffleDeck = function createDeck(object) {
// 	for (var i = 0; i <= 52; i++)
// 	var classCount = Math.floor(Math.random() * 4) + 1;
// 	var numberCount = Math.floor(Math.random() * 13) + 1;
// 	deckShuffled[i] = object[classCount][numberCount];
// 	return deckShuffled;
// }



var dealCard = function dealCard (hand) {
	var randomNumber = Math.floor(Math.random() * fullDeck.length) + 1;
	var dealtCard = fullDeck[randomNumber];
	hand.push(dealtCard);
	fullDeck.pop(dealtCard);
}



//player console for buttons that hit stay and placebet
var dealerHand = [];
var dealerTotal = 0;

var playerHand = []
var playerTotal = 0;


var dealerTurn = false;

var playerBust = false;

var playerCards = $("#playerCards");
var dealerCards = $("#dealerCards");


var startRound = function startRound() {
	playerHand = [];
	dealerHand = [];
	playerTotal = 0;
	dealerTotal = 0;

	dealCard(playerHand);
	dealCard(dealerHand);
	dealCard(playerHand);
	dealCard(dealerHand);

	playerTotal = playerHand[0].value + playerHand[1].value;
	dealerTotal = dealerHand[0].value + dealerHand[1].value;


	playerCards.text(playerTotal);
	dealerCards.text(dealerTotal);
}

var endRound = function endRound() {
	if (playerTotal === dealerTotal) {
		console.log("push");
	}
	else if ((playerBust === true && dealerBust === false) || dealerTotal > playerTotal) {
		console.log("you lose");
	}
	else if (dealerBust === true && playerBust === false|| playerTotal > dealerTotal) {
		console.log("you win");
	} 

}


var hit = $("#hit");

hit.click(function() {
	dealCard(playerHand);
	playerTotal += playerHand[playerHand.length - 1].value;

	if (playerTotal > 21) {
		playerBust = true;
		dealerTurn();
	}	
	playerCards.text(playerTotal);
})

var stay = $("#stay");

stay.click(function() {
	dealerTurn();
})




var dealerBust = false;

var dealerTurn = function dealerTurn() {

	if (dealerTotal < 17) {	
		dealCard(dealerHand);
		dealerTotal += dealerHand[dealerHand.length - 1].value;
		dealerCards.text(dealerTotal);
		dealerTurn();
	}
	else if (dealerTotal > 21) {
		dealerBust = true;
		endRound();
	}
	else if (dealerTotal >= 17) {
		endRound();
	}
}









var placeBet = $("#placeBet");
var betAmount = $("#betAmount").val();
var playerCash = $("#playerCash").text();
var pot = $("#pot").text();

placeBet.click(function() {
	
	if (betAmount <= playerCash) {
		console.log("okay");
		playerCash -= betAmount;
		pot += betAmount;
	}
	else {
		console.log("not enough");
	}
});

