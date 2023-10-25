var randomNum1 = Math.floor((Math.random() * 6) + 1);
var randomNum2 = Math.floor((Math.random() * 6) + 1);

var randomDiceImage1 = "images/dice" + randomNum1 + ".png";
var randomDiceImage2 = "images/dice" + randomNum2 + ".png";

var dice1 = document.querySelector(".img1");
var dice2 = document.querySelector(".img2");
var winningText = document.querySelector("h1");

dice1.setAttribute("src", randomDiceImage1);
dice2.setAttribute("src", randomDiceImage2);

if (randomNum1 === randomNum2)
{
    winningText.textContent = "Draw";
}
else if (randomNum1 > randomNum2)
{
    winningText.textContent = "Player 1 Wins!";
}
else if (randomNum1 < randomNum2)
{
    winningText.textContent = "Player 2 Wins!";
}
