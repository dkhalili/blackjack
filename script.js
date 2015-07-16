
//storing card numbers and suits in two different arrays
var suits = ["hearts", "diamonds", "spades", "clubs"];


//create a card object that is named, valued, and suited based on the arguements
var cards = function cards(number, suit) {
	if (number === 1){
	this.name = "A";
	this.value = number;
	this.suit = suit;
	}
	else if ( number === 11) {
	this.name = "J";
	this.value = 10;
	this.suit = suit;
	}
	else if ( number === 12) {
	this.name = "Q";
	this.value = 10;
	this.suit = suit;

	}
	else if ( number === 13) {
	this.name = "K";
	this.value = 10;
	this.suit = suit;

	}
	else {
	this.name = number;
	this.value = number;
	this.suit = suit;
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







dealerHand = [];
var dealerTotal = 0;

playerHand = []
var playerTotal = 0;

var aced = false;

var dealCard = function dealCard (hand, total) {
	var randomNumber = Math.floor(Math.random() * fullDeck.length);
	var dealtCard = fullDeck[randomNumber];
	hand.push(dealtCard);
	fullDeck.splice(randomNumber, 1);

	if (hand[hand.length - 1].name === "A" && total + 11 <= 21) {
		total += (hand[hand.length - 1].value + 10); 
		console.log("ace");
		return total;
	}
	else if ((total + hand[hand.length - 1].value > 21 && hand[0].name === "A" && aced === false) || (total + hand[hand.length - 1].value > 21 && hand[1].name === "A" && aced === false)) {
		aced = true;
		total += (hand[hand.length - 1].value - 10); 
		console.log("ace - 10");
		return total;
	}

	else {
	total += hand[hand.length - 1].value;
		return total;
	}

}



//player console for buttons that hit stay and placebet


var dealerTurn = false;

var playerBust = false;

var blackJack = false;

var playerCards = $("#playerCards");
var dealerCards = $("#dealerCards");


var startRound = function startRound() {
	playerHand = [];
	dealerHand = [];
	playerTotal = 0;
	dealerTotal = 0;
	playerBust = false;
	dealerBust = false;
	blackJack = false;
	aced = false;

	$("#winOrLose").text("");


	playerTotal = dealCard(playerHand, playerTotal);
	dealerTotal = dealCard(dealerHand, dealerTotal);
	playerTotal = dealCard(playerHand, playerTotal);
	dealerTotal = dealCard(dealerHand, dealerTotal);


	playerCards.text(playerTotal);
	dealerCards.text(dealerTotal);

	$("#buttons").toggle();


	if (playerTotal === 21) {
		blackJack = true;
		endRound();
	}
	else if (dealerTotal === 21) {
		endRound();
	}
}

var endRound = function endRound() {
	if (blackJack === true) {
		playerCash += (parseInt(betAmount.val()) * 1.5) + parseInt(betAmount.val());
		$("#playerCash").text(playerCash);
		$("#winOrLose").text("BlackJack!!!!");
	}
	else if (playerTotal === dealerTotal) {
		playerCash += parseInt(betAmount.val());
		$("#playerCash").text(playerCash);
		$("#winOrLose").text("push");
	}
	else if ((dealerBust === true && playerBust === false)|| playerBust === false && playerTotal > dealerTotal) {
		playerCash += parseInt(betAmount.val()) * 2;
		$("#playerCash").text(playerCash);
		$("#winOrLose").text("you win");
	} 
	else if ((playerBust === true && dealerBust === false) || dealerBust === false && dealerTotal > playerTotal) {
		$("#winOrLose").text("dealer wins");
		$("#playerCash").text(playerCash);

	}
	$("#buttons").toggle();

	if (fullDeck.length < 10) {
		$("#winOrLose").text("shuffling deck");
		fullDeck = createDeck(1);
	}
}

var dealerBust = false;

var dealerTurn = function dealerTurn() {

	if (dealerTotal < 17) {	
		dealerTotal = dealCard(dealerHand, dealerTotal);
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


var hit = $("#hit");

hit.click(function() {
	playerTotal = dealCard(playerHand, playerTotal);
	playerCards.text(playerTotal);

	if (playerTotal > 21) {
		playerBust = true;
		endRound();
	}	

})

var stay = $("#stay");

stay.click(function() {
	dealerTurn();
})











var placeBet = $("#placeBet");
var playerCash = 100;
var betAmount = $("#betAmount");
$("#playerCash").text(playerCash);

placeBet.click(function() {
	
	if (betAmount.val() === "") {
		$("#winOrLose").text("Please enter a bet");
	}
	else if (betAmount.val() <= playerCash) {
		playerCash -= parseInt(betAmount.val());
		$("#playerCash").text(playerCash);
		startRound();
	}
	else {
		$("#winOrLose").text("not enough cash");
	}
});

