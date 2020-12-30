// console.log("sanity check");
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = -1;

$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        console.log("LEVEL PROBLEM??", level);
    }
});

$(".btn").click(function () {
    // console.log("button was clicked");

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // console.log("true");
        if (userClickedPattern.length === gamePattern.length) {
            // console.log("NEXT LEVEL");
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        // console.log("WRONG");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    console.log("randomColor:", randomChosenColour);
    // console.log("greenButton:", greenButton);
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour)
        .fadeIn(100)
        .fadeOut(150)
        .fadeIn(100);

    playSound(randomChosenColour);
}

function animatePress(currenColour) {
    $("#" + currenColour).addClass("pressed");
    console.log(currenColour, "randomChosenColour was pressed");
    setTimeout(function () {
        $("#" + currenColour).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
