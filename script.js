//storing card suits and images in an array
var suits = ["hearts", "diamonds", "spades", "clubs"];

var images = {
	hearts : ["./PNG-cards-1.3/ace_of_hearts.png", "./PNG-cards-1.3/2_of_hearts.png", "./PNG-cards-1.3/3_of_hearts.png", "./PNG-cards-1.3/4_of_hearts.png", "./PNG-cards-1.3/5_of_hearts.png", "./PNG-cards-1.3/6_of_hearts.png", "./PNG-cards-1.3/7_of_hearts.png", "./PNG-cards-1.3/8_of_hearts.png", "./PNG-cards-1.3/9_of_hearts.png", "./PNG-cards-1.3/10_of_hearts.png", "./PNG-cards-1.3/jack_of_hearts.png", "./PNG-cards-1.3/queen_of_hearts.png", "./PNG-cards-1.3/king_of_hearts.png"],
	diamonds : ["./PNG-cards-1.3/ace_of_diamonds.png", "./PNG-cards-1.3/2_of_diamonds.png", "./PNG-cards-1.3/3_of_diamonds.png", "./PNG-cards-1.3/4_of_diamonds.png", "./PNG-cards-1.3/5_of_diamonds.png", "./PNG-cards-1.3/6_of_diamonds.png", "./PNG-cards-1.3/7_of_diamonds.png", "./PNG-cards-1.3/8_of_diamonds.png", "./PNG-cards-1.3/9_of_diamonds.png", "./PNG-cards-1.3/10_of_diamonds.png", "./PNG-cards-1.3/jack_of_diamonds.png", "./PNG-cards-1.3/queen_of_diamonds.png", "./PNG-cards-1.3/king_of_diamonds.png"],
	spades : ["./PNG-cards-1.3/ace_of_spades.png", "./PNG-cards-1.3/2_of_spades.png", "./PNG-cards-1.3/3_of_spades.png", "./PNG-cards-1.3/4_of_spades.png", "./PNG-cards-1.3/5_of_spades.png", "./PNG-cards-1.3/6_of_spades.png", "./PNG-cards-1.3/7_of_spades.png", "./PNG-cards-1.3/8_of_spades.png", "./PNG-cards-1.3/9_of_spades.png", "./PNG-cards-1.3/10_of_spades.png", "./PNG-cards-1.3/jack_of_spades.png", "./PNG-cards-1.3/queen_of_spades.png", "./PNG-cards-1.3/king_of_spades.png"],
	clubs : ["./PNG-cards-1.3/ace_of_clubs.png", "./PNG-cards-1.3/2_of_clubs.png", "./PNG-cards-1.3/3_of_clubs.png", "./PNG-cards-1.3/4_of_clubs.png", "./PNG-cards-1.3/5_of_clubs.png", "./PNG-cards-1.3/6_of_clubs.png", "./PNG-cards-1.3/7_of_clubs.png", "./PNG-cards-1.3/8_of_clubs.png", "./PNG-cards-1.3/9_of_clubs.png", "./PNG-cards-1.3/10_of_clubs.png", "./PNG-cards-1.3/jack_of_clubs.png", "./PNG-cards-1.3/queen_of_clubs.png", "./PNG-cards-1.3/king_of_clubs.png"]	
};

//create a card object that is named, valued, suited and imaged based on the arguements
var cards = function cards(number, suit, image) {
	if (number === 1){
	this.name = "A";
	this.value = number;
	this.suit = suit;
	this.image = image;
	}
	else if ( number === 11) {
	this.name = "J";
	this.value = 10;
	this.suit = suit;
	this.image = image;
	}
	else if ( number === 12) {
	this.name = "Q";
	this.value = 10;
	this.suit = suit;
	this.image = image;
	}
	else if ( number === 13) {
	this.name = "K";
	this.value = 10;
	this.suit = suit;
	this.image = image;
	}
	else {
	this.name = number;
	this.value = number;
	this.suit = suit;
	this.image = image;
	}
}


//create an array of cards objects 1-13 and with four differents suits
//can input number of decks desired in the createDeck arguement
var createDeck = function createDeck(number) {
	var cardArray = [];
	for (var a = 0; a < number; a++) {
		for (var i = 1; i <= 13 ; i++) {
			var heartsCards = new cards(i, suits[0], images.hearts[i-1]);
			cardArray.push(heartsCards);
			var diamondsCads = new cards(i, suits[1], images.diamonds[i-1]);
			cardArray.push(diamondsCads);
			var spadesCards = new cards(i, suits[2], images.spades[i-1]);
			cardArray.push(spadesCards);
			var clubsCards = new cards(i, suits[3], images.clubs[i-1]);
			cardArray.push(clubsCards);

		}
	}
	return cardArray;
	
}


//arry to store the deck into
var fullDeck = [];





//declaring amount of cas player has
var playerCash = 0; 

//created modal and button to toggle out of modal and back to game as well as creating the deck of cards
var begin = $("#begin");
var deckNumber = 1;
begin.click(function() {
	if ($("#deckNumber").val() > 0 && $("#buyIn").val() > 0 && $("#namer").val() != "") {
		deckNumber = parseInt($("#deckNumber").val());
		fullDeck = createDeck(deckNumber);
		playerCash = parseInt($("#buyIn").val());
		$("#playerCash").text(playerCash);
		$("#startingPage").toggle();
		$("#container").toggle();
		$("#name").text($("#namer").val())
	}

	else if ($("#deckNumber").val() === "" || $("#buyIn").val() === "") {
		$("#warning").text("You must enter a value in all inputs");
	}
	else {
		$("#warning").text("Did you enter your name?");
	}
})



//declaring variables to store dealer and player hands
dealerHand = [];
var dealerTotal = 0;

playerHand = []
var playerTotal = 0;
//boolean function to be able to tell if there is an ace or now
var aced = false;

//function that deals cards to a specific hand and adjusts to hands total while printing the card image onto the screen
var dealCard = function dealCard (hand, total, cards) {
	var randomNumber = Math.floor(Math.random() * fullDeck.length);
	var dealtCard = fullDeck[randomNumber];
	hand.push(dealtCard);
	fullDeck.splice(randomNumber, 1);
	
	var cardImage = $("<img>");
	if (hand === dealerHand) {
		cardImage.attr("id", hand.indexOf(dealtCard));
	}

	cardImage.attr("src", dealtCard.image);
	cards.append(cardImage);

	//in order to determine if A is 1 or 11
	if (hand[hand.length - 1].name === "A" && total + 11 <= 21) {
		total += (hand[hand.length - 1].value + 10); 
		return total;
	}
	else if ((total + hand[hand.length - 1].value > 21 && hand[0].name === "A" && aced === false) || (total + hand[hand.length - 1].value > 21 && hand[1].name === "A" && aced === false)) {
		aced = true;
		total += (hand[hand.length - 1].value - 10); 
		return total;
	}

	else {
	total += hand[hand.length - 1].value;
		return total;
	}

}



//declared booleans to keep track of certain aspects of the game
var dealerTurn = false;
var playerBust = false;
var blackJack = false;
var doubleD = false;

var playerCards = $("#playerCards");
var dealerCards = $("#dealerCards");


//function that begins each round by reseting variables and dealing cards to the players
var startRound = function startRound() {
	playerHand = [];
	dealerHand = [];
	playerTotal = 0;
	dealerTotal = 0;
	playerBust = false;
	dealerBust = false;
	blackJack = false;
	aced = false;
	doubleD = false;
	playerCards.empty();
	dealerCards.empty();


	$("#winOrLose").text("");


	playerTotal = dealCard(playerHand, playerTotal, playerCards);
	dealerTotal = dealCard(dealerHand, dealerTotal, dealerCards);
	playerTotal = dealCard(playerHand, playerTotal, playerCards);
	dealerTotal = dealCard(dealerHand, dealerTotal, dealerCards);

	//setting the second dealer card to the back picture
	$("#1").attr("src", "http://cdn.shopify.com/s/files/1/0200/7616/products/back_3098132_1024x1024.png?v=1383058425");

	$("#betButtons").toggle();

	//blackjack logic
	if (playerTotal === 21) {
		blackJack = true;
		endRound();
	}
	else if (dealerTotal === 21) {
		endRound();
	}
}

//function that determines the winner at the end of the round and adds cash to playercash if necessary
var endRound = function endRound() {
	if (blackJack === true) {
		playerCash += (parseInt(betAmount.val()) * 1.5) + parseInt(betAmount.val());
		$("#playerCash").text(playerCash);
		$("#winOrLose").text("Winner Winner Chicken Dinner!");
	}
	else if ((doubleD === true && playerBust === false && playerTotal > dealerTotal) || (doubleD === true && dealerBust === true && playerBust === false)) {
		playerCash += parseInt(betAmount.val()) * 4;
		$("#playerCash").text(playerCash);
		$("#winOrLose").text("the risk paid off, double the reward!");
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
	$("#betButtons").toggle();
	$("#gameInput").toggle();

	
	//when the cards are almost out this "reshuffles" the deck. basically creates a new deck
	if (fullDeck.length < 10) {
		$("#winOrLose").text("shuffling deck.... Shuffled, lets go!");
		fullDeck = createDeck(deckNumber);
	}
}


//declared variable to determine if dealer busts
var dealerBust = false;


//dealer logic, when dealerTurn is called he plays according to dealer rules and ends the round
var dealerTurn = function dealerTurn() {
	$("#1").attr("src", dealerHand[1].image);

	if (dealerTotal < 17) {	
		dealerTotal = dealCard(dealerHand, dealerTotal, dealerCards);
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


//hit button function
var hit = $("#hit");

hit.click(function() {
	playerTotal = dealCard(playerHand, playerTotal, playerCards);

	if (playerTotal > 21) {
		playerBust = true;
		endRound();
	}	

})



//stay button function
var stay = $("#stay");

stay.click(function() {
	dealerTurn();
})


//double-down button function
var double = $("#double");

double.click(function() {
	if (playerCash - parseInt(betAmount.val()) < 0) {
		$("#winOrLose").text("not enough cash");
	}
	else {
		playerCash -= parseInt(betAmount.val());
		playerTotal = dealCard(playerHand, playerTotal, playerCards);
		if (playerTotal <= 21) {
			doubleD = true;
			dealerTurn();
		}

		else if (playerTotal > 21) {
			playerBust = true;
			endRound();
		}	
		
	}
})







//starting the round by placing a bet
var placeBet = $("#placeBet");
var betAmount = $("#betAmount");
$("#playerCash").text(playerCash);

placeBet.click(function() {
	if (playerCash === 0) {
		$("#startingPage").toggle();
		$("#container").toggle();
	}
	else if (betAmount.val() === "" || betAmount.val() === 0) {
		$("#winOrLose").text("Please enter a bet");
	}
	else if (betAmount.val() <= playerCash) {
		playerCash -= parseInt(betAmount.val());
		$("#playerCash").text(playerCash);
		$("#gameInput").toggle();
		startRound();
	}
	else {
		$("#winOrLose").text("not enough cash");

	}
});

