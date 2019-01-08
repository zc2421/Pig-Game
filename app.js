/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

reset();


// document.getElementById("current-"+activePlayer).innerHTML = dice;
// document.querySelector("#current-"+activePlayer).textContent = dice;
//
// var x = document.querySelector("#score-"+activePlayer).textContent;
// console.log(x);


document.querySelector(".btn-roll").addEventListener('click',function(){
    if (!gamePlaying){return};

    //1.random number
    var dice = Math.floor(Math.random()*6)+1;

    //2.display result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';


    //3.update round score iff the number not 1
    if (dice !== 1){
        //add score
        roundScore += dice;
        document.querySelector("#current-"+activePlayer).textContent = roundScore;
    }else{
        //next player
        nextPlayer();
        console.log("Rolled a 1! Next player!");
    }


});


document.querySelector(".btn-hold").addEventListener('click',function(){
    if (!gamePlaying){return};

    //add round score to global score
    scores[activePlayer] += roundScore;

    //update the UI
    document.querySelector("#score-"+activePlayer).textContent = scores[activePlayer];

    //check if player wins the game
    if (scores[activePlayer] >= 20){
        document.querySelector("#name-"+activePlayer).textContent = "Winner!";
        document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
        document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner");
        document.querySelector(".dice").style.display = "none";
        gamePlaying = false;
    } else {
        nextPlayer();
    }
});

document.querySelector(".btn-new").addEventListener('click', reset);


function reset(){
    gamePlaying = true;
    scores = [0,0];
    roundScore = 0; //score for each round
    activePlayer = 0; //indicate first player

    document.querySelector(".dice").style.display ='none';

    document.getElementById("score-0").textContent = '0';
    document.getElementById("score-1").textContent = '0';
    document.getElementById("current-0").textContent = '0';
    document.getElementById("current-0").textContent = '0';
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");

}


function nextPlayer(){
    document.getElementById("current-"+activePlayer).textContent = "0";
    document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
    activePlayer = (activePlayer + 1) % 2;
    document.querySelector(".player-"+activePlayer+"-panel").classList.add("active");
    roundScore = 0;
    document.querySelector(".dice").style.display = "none";
}













