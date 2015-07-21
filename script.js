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
	this.value = 11;
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
	if ($("#deckNumber").val() > 0 && $("#namer").val() != "") {
		deckNumber = parseInt($("#deckNumber").val());
		fullDeck = createDeck(deckNumber);
		count = 0;
		playerCash = 500;
		$("#playerCash").text("$" + playerCash);
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

//count for card counting
var count = 0;


//function that deals cards to a specific hand and adjusts to hands total while printing the card image onto the screen

var dealtCard;

var dealCard = function dealCard (hand, total, cards) {
	var randomNumber = Math.floor(Math.random() * fullDeck.length);
	dealtCard = fullDeck[randomNumber];
	hand.push(dealtCard);
	fullDeck.splice(randomNumber, 1);
	
	var cardImage = $("<img>");
	if (hand === dealerHand) {
		cardImage.attr("id", hand.indexOf(dealtCard));
	}

	cardImage.attr("src", dealtCard.image);
	cards.append(cardImage);

	total += hand[hand.length - 1].value;

	
	//in order to determine if A is 1 or 11
	for (var i = 0; i < (hand.length); i++) {
		if (hand[i].name === "A" && total > 21 && hand[i].value === 11) {
			hand[i].value = 1;
			total -= 10; 
		}

	}

	return total;
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
	showConsole();
	dealerTotal = dealCard(dealerHand, dealerTotal, dealerCards);
	showConsole();
	playerTotal = dealCard(playerHand, playerTotal, playerCards);
	showConsole();
	dealerTotal = dealCard(dealerHand, dealerTotal, dealerCards);
	showConsole();

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

	$("#1").attr("src", dealerHand[1].image);

	if (blackJack === true) {
		playerCash += (parseInt(betAmount.val()) * 1.5) + parseInt(betAmount.val());
		$("#playerCash").text("$" + playerCash);
		$("#winOrLose").text("BlackJack! Winner Winner Chicken Dinner!");
	}
	else if ((doubleD === true && playerBust === false && playerTotal > dealerTotal) || (doubleD === true && dealerBust === true && playerBust === false)) {
		playerCash += parseInt(betAmount.val()) * 4;
		$("#playerCash").text("$" + playerCash);
		$("#winOrLose").text("The risk paid off! Double the reward!");
	}
	else if (playerTotal === dealerTotal) {
		playerCash += parseInt(betAmount.val());
		$("#playerCash").text("$" + playerCash);
		$("#winOrLose").text("Push");
	}
	else if ((dealerBust === true && playerBust === false)|| playerBust === false && playerTotal > dealerTotal) {
		playerCash += parseInt(betAmount.val()) * 2;
		$("#playerCash").text("$" + playerCash);
		$("#winOrLose").text($("#name").text() + " wins");
	} 
	else if ((playerBust === true && dealerBust === false) || dealerBust === false && dealerTotal > playerTotal) {
		$("#playerCash").text("$" + playerCash);
		$("#winOrLose").text("Dealer wins");

	}

	$("#betButtons").toggle();
	$("#gameInput").toggle();


	
	//when the cards are almost out this "reshuffles" the deck. basically creates a new deck
	if (fullDeck.length < 10) {
		$("#winOrLose").text("Shuffling deck.... Shuffled, place your bets!");
		fullDeck = createDeck(deckNumber);
		count = 0;
	}
}


//declared variable to determine if dealer busts
var dealerBust = false;


//dealer logic, when dealerTurn is called he plays according to dealer rules and ends the round
var dealerTurn = function dealerTurn() {
	$("#1").attr("src", dealerHand[1].image);

	if (dealerTotal < 17) {	
		dealerTotal = dealCard(dealerHand, dealerTotal, dealerCards);
		showConsole();

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
	if (playerHand.length === 2) {
		double.toggle();
	}

	playerTotal = dealCard(playerHand, playerTotal, playerCards);
	showConsole();

	if (playerTotal > 21 && playerHand.length === 3) {
		double.toggle();
		playerBust = true;
		endRound();
	}
	else if (playerTotal > 21) {
		playerBust = true;
		endRound();
	}	


})



//stay button function
var stay = $("#stay");

stay.click(function() {
	
	if (playerHand.length > 2) {
		double.toggle();		
	}
	
	dealerTurn();
})


//double-down button function
var double = $("#double");

double.click(function() {
	if (playerCash - parseInt(betAmount.val()) < 0) {
		$("#winOrLose").text("Not enough money");
	}
	else {
		playerCash -= parseInt(betAmount.val());
		$("#playerCash").text("$" + playerCash);
		playerTotal = dealCard(playerHand, playerTotal, playerCards);
		showConsole();

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
		$("#playerCash").text("$" + playerCash);
		$("#gameInput").toggle();
		startRound();
	}
	else {
		$("#winOrLose").text("Not enough money");

	}
});



var countCards = function countCards() {
	
	if (dealtCard.value < 7) {
		return count += 1;

	}
	else if (dealtCard.value > 9) {
		return count -= 1; 
	}
};








var show = $("#show");
var console = $("#consoleContent");


var showConsole = function showConsole() {
	$("#playerTotal").text("Your total : " + playerTotal);
	
	if (dealerHand.length > 0) {
		$("#dealerTotal").text("Dealer showing : " + dealerHand[0].name);
	}

	countCards();
	$("#count").text("Count(Hi-Lo) : " + count);

}


show.click(function() {
	console.toggle();

})






