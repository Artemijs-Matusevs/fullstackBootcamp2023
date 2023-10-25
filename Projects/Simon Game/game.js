var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var firstTime = true;
var level = 0;

//Generate random number from 1 to 4.
function nextSequence()
{
    var randomNumber = Math.floor(((Math.random() * 4) + 1));
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    $("h1").text("Level " + level);
    level++;
}


function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}


function checkAnswer (currentLevel)
{
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        console.log("Win"); 
        if(userClickedPattern.length === gamePattern.length)
        {
            userClickedPattern = [];
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
    }
    else{
        console.log("Loss");
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)
        startOver();
    }
}


function startOver()
{
    level = 0;
    gamePattern = [];
    firstTime = true;
    userClickedPattern = [];
}


$(".btn").click(function(event)
{
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);

    playSound(event.target.id);
    animatePress(event.target.id);
    checkAnswer(userClickedPattern.length - 1);
})


$(document).keypress(function(){
    if (firstTime === true)
    {
        nextSequence();
        firstTime = false;

    }

})

