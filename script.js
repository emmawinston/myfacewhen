$(document).ready(function() {

var gamepadInfo = document.getElementById("gamepad-info");
var winner = false;
var ready = false;
var prompt = "";
var gamepads = {};
var currentVerb = RiTa.randomWord('vb');
var currentNoun = RiTa.randomWord('nn');
var rhymeVerb = RiTa.similarBySound(currentVerb);
var rhymeNoun = RiTa.similarBySound(currentNoun);
var article = "";
var rhymeArticle = "";
var phrases = [];

function generateWords() {
  currentVerb = RiTa.randomWord('vb');
  var currentNoun = RiTa.randomWord('nn');
  var rhymeVerb = RiTa.randomItem(RiTa.rhymes(currentVerb));
  var rhymeNoun = RiTa.randomItem(RiTa.rhymes(currentNoun));

function checkVerb() {
    // oh for god's sake. take out the words which tend to generate questionable stuff
    if (RiTa.isVerb(rhymeVerb) == false
        || currentVerb == "excite"
        || currentVerb == "mount"
        || currentVerb == "enter"
        || currentVerb == "ride"
        || rhymeVerb == "excite"
        || rhymeVerb == "mount"
        || rhymeVerb == "enter"
        || rhymeVerb == "ride") {
        console.log(rhymeVerb);
        currentVerb = RiTa.randomWord('vb');
        rhymeVerb = RiTa.randomItem(RiTa.rhymes(currentVerb));
        console.log(rhymeVerb);
        console.log('rolling again');
        return checkVerb();
    } else {
      console.log("verb is " + currentVerb + ", rhyme is " + rhymeVerb);
    }
  }

  function checkNoun() {
    // oh for god's sake. take out the words which tend to generate questionable stuff
    if (RiTa.isNoun(rhymeNoun) == false
        || currentNoun == "hole"
        || currentNoun == "black"
        || currentNoun == "white"
        || currentNoun == "column"
        || currentNoun == "slave"
        || rhymeNoun == "hole"
        || rhymeNoun == "black"
        || rhymeNoun == "white"
        || rhymeNoun == "column"
        || rhymeNoun == "slave") {
        console.log(rhymeNoun);
        currentNoun = RiTa.randomWord('nn');
        rhymeNoun = RiTa.randomItem(RiTa.rhymes(currentNoun));
        console.log(rhymeNoun);
        console.log('rolling again');
        return checkNoun();
    } else {
      console.log("noun is " + currentNoun + ", rhyme is " + rhymeNoun);
      checkArticle();
      console.log("article is " + article);
      console.log("rhymearticle is " + rhymeArticle);
    }
  }

  function checkArticle() {
    if (currentNoun.charAt(0) == "a" ||
        currentNoun.charAt(0) == "e" ||
        currentNoun.charAt(0) == "i" ||
        currentNoun.charAt(0) == "o" ||
        currentNoun.charAt(0) == "u") {
        article = "an";
    } else {
        article = "a";
    }

    if (rhymeNoun.charAt(0) == "a" ||
        rhymeNoun.charAt(0) == "e" ||
        rhymeNoun.charAt(0) == "i" ||
        rhymeNoun.charAt(0) == "o" ||
        rhymeNoun.charAt(0) == "u") {
        rhymeArticle = "an";
    } else {
        rhymeArticle = "a";
    }
  }

  checkVerb();
  checkNoun();

  phrases = [
    `I have to pretend to be interested in ${RiTa.pluralize(currentNoun)}`,
    `I eat an entire ${currentNoun}`,
    `I accidentally buy ${article} ${currentNoun} instead of ${rhymeArticle} ${rhymeNoun}`,
    `I really want to ${currentVerb} a ${currentNoun}`,
    `my friend starts to ${currentVerb} to me`,
    `someone throws ${article} ${currentNoun} at me`,
    `I ${currentVerb} someone's ${currentNoun}`,
    `I want to ${currentVerb} but I have to ${rhymeVerb} instead`,
    `I'm trying to ${currentVerb} ${article} ${currentNoun}, but I ${rhymeVerb} ${rhymeArticle} ${rhymeNoun} instead`,
    `I accidentally ${currentVerb} ${article} ${currentNoun} instead of ${rhymeVerb}ing ${rhymeArticle} ${rhymeNoun}`,
    `I ${currentVerb} a ${currentNoun}`,
    `my ${currentNoun} suddenly starts to ${currentVerb}`
  ];

};

const beep = new Audio("beep.mp3");
const fanfare = new Audio("fanfare.mp3");
const kazoo = new Audio("kazoo.mp3");
const tick = new Audio("tick.mp3");
const go = new Audio("go.mp3");
const ring = new Audio("ring.mp3");
const pop = new Audio("pop.mp3");
const whoosh = new Audio("whoosh.mp3");

var state = 0;
$(".main").show();
$("#cursors").hide();
$("#maingame").hide();
$("#tie").hide();
$("#voting").hide();
$("#awards").hide();
$("#header").show();
$("#splash").show();
$("#prompt").hide();
$("#timesup").hide();
$(".waiting").hide();
$("#reloader").hide();
$("#p0join").hide();
$("#p1join").hide();
$("#p2join").hide();
$("#p3join").hide();
generateWords();
sentence();
const gamepad = new Gamepad();

function checkState() {
  if (state == 0) {
    $(".main").show();
    $("#maingame").hide();
    $("#tie").hide();
    $("#voting").hide();
    $("#cursors").hide();
    $("#header").show();
    $("#splash").show();
    $("#awards").hide();
    $("#prompt").hide();
    $("#timesup").hide();
    $(".waiting").hide();
    $("#reloader").hide();
    $("#p0join").hide();
    $("#p1join").hide();
    $("#p2join").hide();
    $("#p3join").hide();
    winner = false;
  }
  else if (state == 1) {
    $(".main").show();
    $("#maingame").hide();
    $("#tie").hide();
    $("#splash").hide();
    $("#awards").hide();
    $("#header").hide();
    $("#awards").hide();
    $("#voting").hide();
    $("#cursors").hide();
    $("#prompt").show();
    $("#timesup").hide();
    $(".waiting").show();
    $("#startcounter").hide();
    $("#reloader").hide();
    setTimeout(toStart, 5000);
  }
  else if (state == 2) {
    $(".main").show();
    $("#maingame").show();
    $("#tie").hide();
    $("#splash").hide();
    $("#awards").hide();
    $("#header").hide();
    $("#awards").hide();
    $("#voting").hide();
    $("#cursors").show();
    $("#startcounter").hide();
    $("#timesup").hide();
    $(".waiting").hide();
    $("#prompt").addClass("smaller");
    $("#reloader").hide();
    countDown();
  }
  else if (state == 3) {
    $(".main").show();
    $("#timesup").hide();
    $("#voting").show();
    $("#cursors").show();
    $("#maingame").hide();
    $("#tie").hide();
    $("#awards").hide();
    $("#header").hide();
    $("#splash").hide();
    $("#timesup").hide();
    $(".waiting").hide();
    $("#reloader").hide();
    startVoting();
  }
  else if (state == 4) {
    $(".main").show();
    $("#awards").show();
    $("#cursors").hide();
    $("#tie").hide();
    $("#splash").hide();
    $("#maingame").hide();
    $("#voting").hide();
    $("#header").hide();
    $("#timesup").hide();
    $(".waiting").hide();
    console.log("state is" + state);
    setTimeout(lastScreen, 2000);
  }
  else if (state == 5) {
    $(".main").show();
    $("#awards").hide();
    $("#tie").show();
    $("#cursors").hide();
    $("#splash").hide();
    $("#maingame").hide();
    $("#voting").hide();
    $("#header").hide();
    $("#timesup").hide();
    $(".waiting").hide();
    $("#reloader").hide();
  }
}

  $( "#start" ).click(function() {
    state = 1;
    checkState();
  });

  $( ".reset" ).click(function() {
    location.reload();
  });


/*----------------------------------------------*/

// COUNTDOWN TO START

function toStart() {
  $("#startcounter").show();
  beep.play();
  var count = 2, timer = setInterval(function() { // should be 3
    $("#counterstart").html(count--);
    beep.play();
    if(count < 0) {
      beep.pause();
      go.play();
      clearInterval(timer);
      changeState(2);
    }
  }, 1000);
};


function lastScreen() {
  $("#reloader").show();
  ready = true;
};

/*----------------------------------------------*/
    /* DRAG AND DROP */

		//Makes the pieces draggable & sets options
		$("#piecesArea div div > img").draggable({
				//Makes it so that the pieces' z-index can be reordered
		stack: '#piecesArea > img', min: 500,scroll: false,
				distance: 0
		});

  $("#awards > img").draggable({
				//Makes it so that the pieces' z-index can be reordered
		stack: '#piecesArea > img', min: 500,scroll: false,
				distance: 0
		});

		//Sets what happens when you release a piece
		$(".facearea").droppable({
			drop: function(event, ui){
				//this is so that the element "sticks" even when tab is changed.
				ui.draggable.addClass("draggedout");
			},
			//changes current tab to the tab the piece belongs to when dragged out of body area
			out: function(event, ui){
				ui.draggable.removeClass("draggedout");
				var whichTab = ui.draggable.parent().attr("id");
				$("#piecesArea").tabs('select' , whichTab);
			}
		});

  var onDragOver = function(event) {
    event.preventDefault();
    if(!$(".dropzone").hasClass("dragover"))
        $(".dropzone").addClass("dragover");
    };

    $(".dropzone").on("dragover", onDragOver);

/*----------------------------------------------*/

// GENERATE SENTENCE

function sentence() {
  var randomNumber = Math.floor(Math.random() * (phrases.length));
  prompt = (phrases[randomNumber]);
  $('.sentence').text(prompt);
}

/*----------------------------------------------*/

// COUNTDOWN TIMER

function countDown() {
  var count = 59, timer = setInterval(function() { //should be 59
    tick.play();
    $("#counter").html(count--);
    if(count < 0) clearInterval(timer);
    if (count < 0) {
      tick.pause();
      kazoo.play();
      showtimesup( function() {
        $(".facearea").addClass("white");
        console.log("white");
        snapshot("#area1", "facevote1", 244);
        snapshot("#area2", "facevote2", 244);
        snapshot("#area3", "facevote3", 244);
        snapshot("#area4", "facevote4", 244, changeState, 3, function() { $("#timesup").hide(); });
      });

    }
  }, 1000);
};

function showtimesup(callback) {
  $("#timesup").show();
  console.log("timesup");
    setTimeout(function(){
      callback(); // callback to add white backgrounds
    }, 1000);
};


function snapshot(element, newparent, size, callback, newState) {
  var el = $(element);
  var offset = el.offset();
  var offsetx = (offset.left);
  var offsety = (offset.top);

  html2canvas(document.body, {useCORS: true, x: offsetx, y: offsety, width: size, height: size, scale: window.devicePixelRatio*2}).then(function(canvas) {

  var getFullCanvas = canvas;

      // generate an image element
  var imageData = document.createElement('img');

      // get the data from the canvas and apply it to the image
  imageData.src = getFullCanvas.toDataURL("image/png");

      // now append the image to the previewImage div
  document.getElementById(newparent).appendChild(imageData);

  setTimeout(function(){
    if(callback) callback(newState);
  }, 3000);

  });
}

function changeState(newState) {
  state = newState;
  whoosh.play();
  checkState();
  console.log(state);
}

  /*----------------------------------------------*/

// VOTING


var face1Votes = 0;
var face2Votes = 0;
var face3Votes = 0;
var face4Votes = 0;
var clicks = 0;
var p0HasVoted = false;
var p1HasVoted = false;
var p2HasVoted = false;
var p3HasVoted = false;

var p0HasJoined = false;
var p1HasJoined = false;
var p2HasJoined = false;
var p3HasJoined = false;

function startVoting() {
  face1Votes = 0;
  face2Votes = 0;
  face3Votes = 0;
  face4Votes = 0;
  clicks = 0;
  p0HasVoted = false;
  p1HasVoted = false;
  p2HasVoted = false;
  p3HasVoted = false;
}

function checkClicks() {
  if ((clicks >= 4) || (p0HasVoted && p1HasVoted && p2HasVoted && p3HasVoted)) {
    if (state == 3 && face1Votes > face2Votes && face1Votes > face3Votes && face1Votes > face4Votes) {
      winner = "face1";
      $('#winnertie').html("PLAYER 1 WINS! <img src='emojihearteyes.png' width='40px' />");
      $('#winner').append( $('#facevote1>img') );
      fanfare.play();
      // start confetti
      $.confetti.start();

      // stop confetti after 2 seconds
      setTimeout(function () {
        $.confetti.stop();
      }, 1000);
      changeState(4);
    }
    else if (state == 3 && face2Votes > face1Votes && face2Votes > face3Votes && face2Votes > face4Votes) {
      winner = "face2";
      $('#winnertie').html("PLAYER 2 WINS! <img src='emojitongueout.png' width='40px' />");
      $('#winner').append( $('#facevote2>img') );
      fanfare.play();
      // start confetti
      $.confetti.start();

      // stop confetti after 2 seconds
      setTimeout(function () {
        $.confetti.stop();
      }, 1000);
      changeState(4);
    }
    else if (state == 3 && face3Votes > face1Votes && face3Votes > face2Votes && face3Votes > face4Votes) {
      winner = "face3";
      $('#winnertie').html("PLAYER 3 WINS! <img src='emojigrin.png' width='40px' />");
      $('#winner').append( $('#facevote3>img') );
      fanfare.play();
      // start confetti
      $.confetti.start();

      // stop confetti after 2 seconds
      setTimeout(function () {
        $.confetti.stop();
      }, 1000);
      changeState(4);
    }
    else if (state == 3 && face4Votes > face1Votes && face4Votes > face2Votes && face4Votes > face3Votes) {
      winner = "face4";
      $('#winnertie').html("PLAYER 4 WINS! <img src='emojibeam.png' width='40px' />");
      $('#winner').append( $('#facevote4>img') );
      fanfare.play();
      // start confetti
      $.confetti.start();

      // stop confetti after 2 seconds
      setTimeout(function () {
        $.confetti.stop();
      }, 1000);
      changeState(4);
    }
    else if (state == 3 && face1Votes == face2Votes && face1Votes > face3Votes && face1Votes > face4Votes) {
      winner = "player12";
      $('#winnertie').html("It's a tie! Players 1 and 2 win! <img src='emojikiss.png' width='40px' />");
      $('#winner').append( $('#facevote1>img') );
      $('#winner').append( $('#facevote2>img') );
      fanfare.play();
      // start confetti
      $.confetti.start();

      // stop confetti after 2 seconds
      setTimeout(function () {
        $.confetti.stop();
      }, 1000);
      changeState(4);
    }
    else if (state == 3 && face1Votes == face3Votes && face1Votes > face2Votes && face1Votes > face4Votes) {
      winner = "player13";
      $('#winnertie').html("It's a tie! Players 1 and 3 win! <img src='emojipout.png' width='40px' />");
      $('#winner').append( $('#facevote1>img') );
      $('#winner').append( $('#facevote3>img') );
      fanfare.play();
      // start confetti
      $.confetti.start();

      // stop confetti after 2 seconds
      setTimeout(function () {
        $.confetti.stop();
      }, 1000);
      changeState(4);
    }
    else if (state == 3 && face1Votes == face4Votes && face1Votes > face2Votes && face1Votes > face3Votes) {
      winner = "player14";
      $('#winnertie').html("It's a tie! Players 1 and 4 win! <img src='emojigrin.png' width='40px' />");
      $('#winner').append( $('#facevote1>img') );
      $('#winner').append( $('#facevote4>img') );
      fanfare.play();
      // start confetti
      $.confetti.start();

      // stop confetti after 2 seconds
      setTimeout(function () {
        $.confetti.stop();
      }, 1000);
      changeState(4);
    }
    else if (state == 3 && face2Votes == face3Votes && face2Votes > face4Votes) {
      winner = "player23";
      $('#winnertie').html("It's a tie! Players 2 and 3 win! <img src='emojiwackywink.png' width='40px' />");
      $('#winner').append( $('#facevote2>img') );
      $('#winner').append( $('#facevote3>img') );
      fanfare.play();
      // start confetti
      $.confetti.start();

      // stop confetti after 2 seconds
      setTimeout(function () {
        $.confetti.stop();
      }, 1000);
      changeState(4);
    }
    else if (state == 3 && face2Votes == face4Votes && face2Votes > face3Votes) {
      winner = "player24";
      $('#winnertie').html("It's a tie! Players 2 and 4 win! <img src='emojihearteyes.png' width='40px' />");
      $('#winner').append( $('#facevote2>img') );
      $('#winner').append( $('#facevote4>img') );
      fanfare.play();
      // start confetti
      $.confetti.start();

      // stop confetti after 2 seconds
      setTimeout(function () {
        $.confetti.stop();
      }, 1000);
      changeState(4);
    }
    else if (state == 3 && face3Votes == face4Votes && face3Votes > face2Votes && face3Votes > face1Votes) {
      winner = "player34";
      $('#winnertie').html("It's a tie! Players 3 and 4 win! <img src='emojiwink.png' width='40px' />");
      $('#winner').append( $('#facevote3>img') );
      $('#winner').append( $('#facevote4>img') );
      fanfare.play();
      // start confetti
      $.confetti.start();

      // stop confetti after 2 seconds
      setTimeout(function () {
        $.confetti.stop();
      }, 1000);
      changeState(4);
    }
    else if (state == 3 && face1Votes == face2Votes && face1Votes == face3Votes && face1Votes > face4Votes) {
      winner = "player123";
      $('#winnertie').html("It's a THREE WAY tie! Players 1, 2 and 3 win! <img src='emojibeam.png' width='40px' />");
      $('#winner').append( $('#facevote1>img') );
      $('#winner').append( $('#facevote2>img') );
      $('#winner').append( $('#facevote3>img') );
      fanfare.play();
      // start confetti
      $.confetti.start();

      // stop confetti after 2 seconds
      setTimeout(function () {
        $.confetti.stop();
      }, 1000);
      changeState(4);
    }
    else if (state == 3 && face2Votes == face3Votes && face2Votes == face4Votes && face2Votes > face1Votes) {
      winner = "player234";
      $('#winnertie').html("It's a THREE WAY tie! Players 2, 3 and 4 win! <img src='emojigrin.png' width='40px' />");
      $('#winner').append( $('#facevote2>img') );
      $('#winner').append( $('#facevote3>img') );
      $('#winner').append( $('#facevote4>img') );
      fanfare.play();
      // start confetti
      $.confetti.start();

      // stop confetti after 2 seconds
      setTimeout(function () {
        $.confetti.stop();
      }, 1000);
      changeState(4);
    }
    else if (state == 3 && face1Votes == face3Votes && face1Votes == face4Votes && face1Votes > face2Votes) {
      winner = "player134";
      $('#winnertie').html("It's a THREE WAY tie! Players 1, 3 and 4 win! <img src='emojitongue.png' width='40px' />");
      $('#winner').append( $('#facevote1>img') );
      $('#winner').append( $('#facevote3>img') );
      $('#winner').append( $('#facevote4>img') );
      fanfare.play();
      // start confetti
      $.confetti.start();

      // stop confetti after 2 seconds
      setTimeout(function () {
        $.confetti.stop();
      }, 1000);
      changeState(4);
    }
    else if (state == 3 && face1Votes == face2Votes && face1Votes == face4Votes && face1Votes > face3Votes) {
      winner = "player124";
      $('#winnertie').html("It's a THREE WAY tie! Players 1, 2 and 4 win! <img src='emojibeam.png' width='40px' />");
      $('#winner').append( $('#facevote1>img') );
      $('#winner').append( $('#facevote2>img') );
      $('#winner').append( $('#facevote4>img') );
      fanfare.play();
      // start confetti
      $.confetti.start();

      // stop confetti after 2 seconds
      setTimeout(function () {
        $.confetti.stop();
      }, 1000);
      changeState(4);
    }
    else if (state == 3 && face1Votes == face2Votes && face1Votes == face3Votes && face1Votes == face4Votes) {
      winner = "everybody";
      $('#winnertie').html("It's a tie, and EVERYBODY WINS! <img src='emojiscream.png' width='40px' />");
      $('#winner').width('80%');
      $('#winner').append( $('#facevote1>img').width('25%') );
      $('#winner').append( $('#facevote2>img').width('25%') );
      $('#winner').append( $('#facevote3>img').width('25%') );
      $('#winner').append( $('#facevote4>img').width('25%') );
      fanfare.play();
      // start confetti
      $.confetti.start();

      // stop confetti after 2 seconds
      setTimeout(function () {
        $.confetti.stop();
      }, 1000);
      changeState(4);
    }
  }
}; //check clicks

function clickLogic() {
  clicks++;
  checkClicks();
}

function voteFace1() {
  face1Votes++;
  clickLogic();
}

function voteFace2() {
  face2Votes++;
  clickLogic();
}

function voteFace3() {
  face3Votes++;
  clickLogic();
}

function voteFace4() {
  face4Votes++;
  clickLogic();
}

$("#facevote1").click( voteFace1 );
$("#facevote2").click( voteFace2 );
$("#facevote3").click( voteFace3 );
$("#facevote4").click( voteFace4 );


/*----------------------------------------------*/

// GAMEPADS

var cursor0 = document.getElementById("cursor0");
var cursor1 = document.getElementById("cursor1");
var cursor2 = document.getElementById("cursor2");
var cursor3 = document.getElementById("cursor3");
var x0 = 35;
var y0 = 430;
var x1 = 1665;
var y1 = 430;
var x2 = 35;
var y2 = 936;
var x3 = 1665;
var y3 = 936;

var cursorMinX = 0;
var cursorMinY = 0;
var cursorMaxX = 1878;
var cursorMaxY = 1038;

var held0 = [];
var held1 = [];
var held2 = [];
var held3 = [];

// const gamepad = new Gamepad();

gamepad.on('connect', e => {
    console.log(`controller ${e.index} connected!`);
    if (e.index == 0) {
      $(cursor0).show();
    };
    if (e.index == 1) {
      $(cursor1).show();
    };
    if (e.index == 2) {
      $(cursor2).show();
    };
    if (e.index == 3) {
      $(cursor3).show();
    };
});

gamepad.on('disconnect', e => {
    console.log(`controller ${e.index} disconnected!`);
    if (e.index == 0) {
      $(cursor0).hide();
    };
    if (e.index == 1) {
      $(cursor1).hide();
    };
    if (e.index == 2) {
      $(cursor2).hide();
    };
    if (e.index == 3) {
      $(cursor3).hide();
    };
});

var movementFactor = 5;


// CURSORS
// joystick left/right
gamepad.on('hold', 'stick_axis_left', e => {
  if (e.player == 0) {

      x0 += e.value[0] * movementFactor;
      x0 = Math.min(Math.max(cursorMinX, x0), cursorMaxX);
      cursor0.style.left = x0 + "px";

      y0 += e.value[1] * movementFactor;
      y0 = Math.min(Math.max(cursorMinY, y0), cursorMaxY);
      cursor0.style.top = y0 + "px";

    for (var img of held0) {
      img.elem.style.left = ((x0 - img.startx)) + "px";
      img.elem.style.top = ((y0 - img.starty)) + "px";
    }
  }
  else if (e.player == 1) {

      x1 += e.value[0] * movementFactor;
      x1 = Math.min(Math.max(cursorMinX, x1), cursorMaxX);
      cursor1.style.left = x1 + "px";

      y1 += e.value[1] * movementFactor;
      y1 = Math.min(Math.max(cursorMinY, y1), cursorMaxY);
      cursor1.style.top = y1 + "px";

    for (var img of held1) {
      img.elem.style.left = ((x1 - img.startx)) + "px";
      img.elem.style.top = ((y1 - img.starty)) + "px";
    }
  }
  else if (e.player == 2) {

      x2 += e.value[0] * movementFactor;
      x2 = Math.min(Math.max(cursorMinX, x2), cursorMaxX);
      cursor2.style.left = x2 + "px";

      y2 += e.value[1] * movementFactor;
      y2 = Math.min(Math.max(cursorMinY, y2), cursorMaxY);
      cursor2.style.top = y2 + "px";

    for (var img of held2) {
      img.elem.style.left = ((x2 - img.startx)) + "px";
      img.elem.style.top = ((y2 - img.starty)) + "px";
    }
  }
  else if (e.player == 3) {

      x3 += e.value[0] * movementFactor;
      x3 = Math.min(Math.max(cursorMinX, x3), cursorMaxX);
      cursor3.style.left = x3 + "px";

      y3 += e.value[1] * movementFactor;
      y3 = Math.min(Math.max(cursorMinY, y3), cursorMaxY);
      cursor3.style.top = y3 + "px";

    for (var img of held3) {
      img.elem.style.left = ((x3 - img.startx)) + "px";
      img.elem.style.top = ((y3 - img.starty)) + "px";
    }
  }
});

gamepad.on('press', 'button_2', () => {
  if (state == 0) {
    console.log('button 1 was pressed!');
    location.reload();
  }
});

gamepad.on('press', 'button_1', (e) => {
  // console.log('button a was pressed!'+ Date.now());
  if (state == 4 && ready == true) {
    location.reload();
    p0HasJoined = false;
    p1HasJoined = false;
    p2HasJoined = false;
    p3HasJoined = false;
  }
  else if (state == 0 && e.player == 0 && p0HasJoined == false) {
    if (p0HasJoined == false) {
      p0HasJoined = true;
      $("#p0join").show();
      ring.play();
      if (p0HasJoined == true && p1HasJoined == true && p2HasJoined == true && p3HasJoined == true) {
        setTimeout(function(){ changeState(1); }, 1000);
      }
    }
  }
  else if (state == 0 && e.player == 1 && p1HasJoined == false) {
    if (p1HasJoined == false) {
      p1HasJoined = true;
      $("#p1join").show();
      ring.play();
      if (p0HasJoined == true && p1HasJoined == true && p2HasJoined == true && p3HasJoined == true) {
        setTimeout(function(){ changeState(1); }, 1000);
      }
    }
  }
  else if (state == 0 && e.player == 2 && p2HasJoined == false) {
    if (p2HasJoined == false) {
      p2HasJoined = true;
      $("#p2join").show();
      ring.play();
      if (p0HasJoined == true && p1HasJoined == true && p2HasJoined == true && p3HasJoined == true) {
        setTimeout(function(){ changeState(1); }, 1000);
      }
    }
  }
  else if (state == 0 && e.player == 3 && p3HasJoined == false) {
    if (p3HasJoined == false) {
      p3HasJoined = true;
      $("#p3join").show();
      ring.play();
      if (p0HasJoined == true && p1HasJoined == true && p2HasJoined == true && p3HasJoined == true) {
        setTimeout(function(){ changeState(1); }, 1000);
      }
    }
  }
  else if (e.player == 0) {
    if (state == 2) {
    $('.wrapper').find('img').each(function(i) {
      if ( isOverlapping(cursor0, this)) {
        pop.play();
        held0.push(
          {elem: this,
           startx: x0 - $(this).cssFloat('left'), //offset it to account for where we pick it up
           starty: y0 - $(this).cssFloat('top')
          }
        );
      }
    });
  }
    // VOTING
    if (!p0HasVoted) {
      if (isOverlapping(cursor0, $("#facevote1")[0])) {
        p0HasVoted = true;
        voteFace1();
        ring.play();
      }
      if (isOverlapping(cursor0, $("#facevote2")[0])) {
        p0HasVoted = true;
        voteFace2();
        ring.play();
      }
      if (isOverlapping(cursor0, $("#facevote3")[0])) {
        p0HasVoted = true;
        voteFace3();
        ring.play();
      }
      if (isOverlapping(cursor0, $("#facevote4")[0])) {
        p0HasVoted = true;
        voteFace4();
        ring.play();
      }
    }
  }
  else if (e.player == 1) {
    if (state == 2) {
    $('.wrapper').find('img').each(function(i) {
      if ( isOverlapping(cursor1, this)) {
        pop.play();
        held1.push(
          {elem: this,
           startx: x1 - $(this).cssFloat('left'), //offset it to account for where we pick it up
           starty: y1 - $(this).cssFloat('top')
          }
        );
      }
    });
  }
    if (!p1HasVoted) {
      if (isOverlapping(cursor1, $("#facevote1")[0])) {
        p1HasVoted = true;
        voteFace1();
        ring.play();
      }
      if (isOverlapping(cursor1, $("#facevote2")[0])) {
        p1HasVoted = true;
        voteFace2();
        ring.play();
      }
      if (isOverlapping(cursor1, $("#facevote3")[0])) {
        p1HasVoted = true;
        voteFace3();
        ring.play();
      }
      if (isOverlapping(cursor1, $("#facevote4")[0])) {
        p1HasVoted = true;
        voteFace4();
        ring.play();
      }
    }
  }
  else if (e.player == 2) {
    if (state == 2) {
    $('.wrapper').find('img').each(function(i) {
      if ( isOverlapping(cursor2, this)) {
        pop.play();
        held2.push(
          {elem: this,
           startx: x2 - $(this).cssFloat('left'), //offset it to account for where we pick it up
           starty: y2 - $(this).cssFloat('top')
          }
        );
      }
    });
  }
    if (!p2HasVoted) {
      if (isOverlapping(cursor2, $("#facevote1")[0])) {
        p2HasVoted = true;
        voteFace1();
        ring.play();
      }
      if (isOverlapping(cursor2, $("#facevote2")[0])) {
        p2HasVoted = true;
        voteFace2();
        ring.play();
      }
      if (isOverlapping(cursor2, $("#facevote3")[0])) {
        p2HasVoted = true;
        voteFace3();
        ring.play();
      }
      if (isOverlapping(cursor2, $("#facevote4")[0])) {
        p2HasVoted = true;
        voteFace4();
        ring.play();
      }
    }
  }
  else if (e.player == 3) {
    if (state == 2) {
    $('.wrapper').find('img').each(function(i) {
      if ( isOverlapping(cursor3, this)) {
        pop.play();
        held3.push(
          {elem: this,
           startx: x3 - $(this).cssFloat('left'), //offset it to account for where we pick it up
           starty: y3 - $(this).cssFloat('top')
          }
        );
      }
    });
  }
    if (!p3HasVoted) {
      if (isOverlapping(cursor3, $("#facevote1")[0])) {
        p3HasVoted = true;
        voteFace1();
        ring.play();
      }
      if (isOverlapping(cursor3, $("#facevote2")[0])) {
        p3HasVoted = true;
        voteFace2();
        ring.play();
      }
      if (isOverlapping(cursor3, $("#facevote3")[0])) {
        p3HasVoted = true;
        voteFace3();
        ring.play();
      }
      if (isOverlapping(cursor3, $("#facevote4")[0])) {
        p3HasVoted = true;
        voteFace4();
        ring.play();
      }
    }
  }

  $("#debug").text(" held0:" + held0.length + " held1:" + held1.length + " held2:" + held2.length + " held3:" + held3.length + " pressed:" + e.player);

});


gamepad.on('release', 'button_1', (e) => {
  // console.log('button a was released!' + Date.now());
  if (e.player == 0) {
    held0 = [];
  }
  else if (e.player == 1) {
    held1 = [];
  }
  else if (e.player == 2) {
    held2 = [];
  }
  else if (e.player == 3) {
    held3 = [];
  }

  $("#debug").text(" held0:" + held0.length + " held1:" + held1.length + " held2:" + held2.length + " held3:" + held3.length+ " released:" + e.player);

});

function isOverlapping(e1, e2){
  if( e1.length && e1.length > 1 ){
    e1 = e1[0];
  }
  if( e2.length && e2.length > 1 ){
    e2 = e2[0];
  }
  var rect1 = e1 instanceof Element ? e1.getBoundingClientRect() : false;
  var rect2 = e2 instanceof Element ? e2.getBoundingClientRect() : false;

  //window.console ? console.log(rect1, rect2 ) : null ;
  var overlap = null;
  if( rect1 && rect2 ){
    overlap = !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
      )
    return overlap;
  } else {
    return overlap;
  }
}

jQuery.fn.cssFloat = function (prop) {
    return parseFloat(this.css(prop)) || 0;
};

}); // document ready
