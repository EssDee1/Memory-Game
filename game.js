var gamePattern = [];
var userClickedPatterns = [];
var buttonArray = ['red', 'blue', 'green', 'yellow'];
var level = 0;
var started = false;

$(document).on('keydown', function(){

    if (started === false){
        $('#level-title').text('Level ' + level)
        nextSequence()
        started = true
    }
})



$('.btn').on('click', function(){
    var userChosenColor = $(this).attr('id');
    userClickedPatterns.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPatterns.length - 1)
})

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPatterns[currentLevel]){

        if (gamePattern.length === userClickedPatterns.length){
            setTimeout(() => {
                nextSequence()
            }, 1000);
        }
    } else{
        playSound('wrong')

        $('body').addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over');           
        }, 200);
        
        $('#level-title').text('Game Over. Press any key to start over.')

        startOver()
    }
}


function nextSequence(){

    userClickedPatterns = []

    level++;
    $('#level-title').text('Level ' + level)

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonArray[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);


}

    

function playSound(name){
    var audioSource = 'sounds/' + name + '.mp3';
    audioToPlay = new Audio(audioSource);
    audioToPlay.play();
}

function animatePress(currentColor){
    $('#' + currentColor).addClass('pressed');
    setTimeout(() => {
        $('#' + currentColor).removeClass('pressed')
    }, 100);

}

function startOver(){
    gamePattern = [];
    level = 0;
    started = false
}


