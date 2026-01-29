alert("The only rule is: you have to remember the previous pattern too and after each correct sequence the game will only flash the new colour but you have to click the sequence from the starting. All the best :)")
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        started = true;
        nextSequence();
    }
});

var gamePattern = [];
var userClickedPattern = [];
function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}
$(".btn").on("click", function(event){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    var butt = $(this);
    butt.addClass("pressed");
    setTimeout(function(){
        butt.removeClass("pressed");
    },100);
    checkAnswer(userClickedPattern.length-1);
});
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function checkAnswer(index){
    if(userClickedPattern[index]===gamePattern[index]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } else {
        console.log("wrong answer");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game over, Press Any Key to Restart");
        startOver();
    }
}
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}