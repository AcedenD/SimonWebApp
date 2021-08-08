var buttonColors = ['red', 'blue', 'green', 'yellow'];

var gamePatterns = [];
var userClickedPatterns = [];

var level = 0;

var started = false;

function nextSequence() {
  userClickedPatterns = [];
  started = true;
  ++level;
  $('h1').text('Level ' + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePatterns.push(randomChosenColor);
  console.log(randomChosenColor);
  $('#' + randomChosenColor)
    .fadeOut(75)
    .fadeIn(75);
  playSound(randomChosenColor);
  // console.log(level);
}

function playSound(name) {
  var sound = new Audio('sounds/' + name + '.mp3');
  sound.play();
}

function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed');
  setTimeout(function () {
    $('#' + currentColor).removeClass('pressed');
  }, 80);
  // alert(currentColor);
}

function checkAnswer(currentLevel) {
  if (gamePatterns[currentLevel] === userClickedPatterns[currentLevel]) {
    console.log('success');

    if (gamePatterns.length === userClickedPatterns.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log('fail');
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    $('h1').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePatterns = [];
  started = false;
}

$(document).on('keypress', function () {
  if (started != true) {
    nextSequence();
  }
});

$('.btn').click(function () {
  var userChosenColor = $(this).attr('id');
  userClickedPatterns.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  if (started == true) {
    checkAnswer(userClickedPatterns.length - 1);
  }
  // console.log($(this).attr('class'));
  // console.log(userClickedPatterns);
});
