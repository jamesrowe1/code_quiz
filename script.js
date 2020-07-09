//variables up top
//timer
//score - time left
//somehow high score
//array of objects where the objects are questions, the possible solutions are an element, and the answer is another element

//DOM vars
var difficultyButtonsEl = document.getElementById("difficultyButtons");
var answersEl = document.getElementById("answers");
var questionsEl = document.getElementById("questions");
var timerSpotEl = document.getElementById("timerSpot");
var gameOverScreenEl = document.querySelector("#gameOverScreen");
var gameOverMessageEl = document.querySelector("#congrats");
var initials = document.querySelector("#initials");
var highScoreModalBody = document.querySelector("#highScoreModalBody");
var highScoreTable = document.querySelector("#highScoreTable");

//Initialize Variables
var timer;
var currentQuestion = 0;
var answerChose = true;
var userDecision;
var gameOver;
var lengthOfQuiz = 0;
var highScoresArray = [];
var isAudioPlaying = false;

//audio vars
var audioSecondsLeft = new Audio("thinking-music.mp3");
var audioCorrect = new Audio("rightanswer.mp3");
var audioWrong = new Audio("wrong.mp3");

//array of objects where the objects are questions, the possible solutions are an array, and the answer is another element
var questionArray = [
  //1. cd [answer here] changes you to the home directoy
  //a: .. b: ! c: ~ d: That's not possible
  //correct: c
  {
    q: "cd [answer here] changes you to the home directory",
    possibleAnswers: ["..", "!", "~", "It's not possible"],
    correct: 2,
  },
  //2. What is the tag called attached to an image incase there is no image?
  //a: alt tag b: just-in-case tag c: picture tag d: error tag
  //correct: a
  {
    q: "What is the tag called attached to an image incase there is no image?",
    possibleAnswers: [
      "alt tag",
      "just-in-case tag",
      "picture tag",
      "error tag",
    ],
    correct: 0,
  },
  //3. What is the order, from first priority to last, in which CSS determines how to format things?
  //a: type, class, ID, order b: class, type, order, ID c: order, type, ID, class d: ID, class, type, order
  //correct: d
  {
    q:
      "What is the order, from first priority to last, in which CSS determines how to format things?",
    possibleAnswers: [
      "type, class, ID, order",
      "class, type, order, ID",
      "order, type, ID, class",
      "ID, class, type, order",
    ],
    correct: 3,
  },
  //4. Bootstrap works in grids of:
  //a: 4 b: 8 c: 12 d: 16
  //correct: c
  {
    q: "Bootstrap works in grids of:",
    possibleAnswers: ["4", "8", "12", "16"],
    correct: 2,
  },
  //5. What code do we use to request a true/false answer?
  //a: alert b: confirm c: prompt d: boolean
  //correct: d
  {
    q: "What code do we use to request a true/false answer?",
    possibleAnswers: ["alert", "confirm", "prompt", "boolean"],
    correct: 3,
  },
  //6. What can make up an array?
  //a: numbers b: strings c: booleans d: all of the above
  //correct: d
  {
    q: "What can make up an array?",
    possibleAnswers: ["numbers", "strings", "booleans", "all of the above"],
    correct: 0,
  },
  //7. How do we return a random integer between 1 and x?
  //a: Math.random() b: Math.floor(Math.random*10+1) c: Math.random()*x d: Math.floor(Math.random*10)
  //correct: d
  {
    q: "How do we return a random integer between 1 and x?",
    possibleAnswers: [
      "Math.random()",
      "Math.floor(Math.random*10+1",
      "Math.random()*x",
      "Math.floor(Math.random*10)",
    ],
    correct: 1,
  },
  //8. JavaScript is:
  //a: Function Oriented b: Object Oriented c: Solving Oriented d: Parameter Oriented
  //correct: b
  {
    q: "JavaScript is:",
    possibleAnswers: [
      "Function Oriented",
      "Object Oriented",
      "Solving Oriented",
      "Parameter Oriented",
    ],
    correct: 1,
  },
  //prepend question
  {
    q: "What command puts an element at the top of the page?",
    possibleAnswers: ["append", "prepend", "createElement", "querySelector"],
    correct: 0,
  },
];

function easyClick() {
  lengthOfQuiz = Math.floor(questionArray.length * 0.34);
  startQuiz();
}

function mediumClick() {
  lengthOfQuiz = Math.floor(questionArray.length * 0.67);
  startQuiz();
}

function hardClick() {
  lengthOfQuiz = questionArray.length;
  startQuiz();
}

//updates the timer
function updateTimer() {
  if (timer < 0) {
    timer = 0;
  }
  timerSpotEl.textContent = "Timer: " + timer;
}

//button to start quiz and timer
function startQuiz() {
  //How long the game will last
  timer = 60;
  //Ensure gameOver= false so the game happens
  gameOver = false;

  //hide the difficulty buttons
  difficultyButtonsEl.setAttribute("style", "display:none");

  //show the questions
  questionsEl.setAttribute("style", "display: inline");

  //show the possible answers
  answersEl.setAttribute("style", "display: inline");

  //update the timer spot
  updateTimer();

  //call the showQuestions function
  showQuestions();

  //run the timer interval with 1 second interval
  var timeLeft = setInterval(function () {
    //if the game is over, stop the timer
    if (gameOver === true) {
      clearInterval(timeLeft);
    } else {
      timer--;
    }

    //update the timer spot
    updateTimer();

    //lets play some crunch time music
    if (timer <= 31 && isAudioPlaying === false && gameOver === false) {
      audioSecondsLeft.play();
      isAudioPlaying = true;
    }
    //timer hit 0, game over. Hits less than 0 (many wrong answers)
    if (timer <= 0) {
      clearInterval(timeLeft);
      gameOver = true;
      //can't get score lower than 0
      timer = 0;
      updateTimer();
      victory();
    } else if (gameOver === false) {
      //loop ask question, give multiple choices
    }
  }, 1000);
}

//show the next question
function showQuestions() {
  //check to make sure an answer was selected
  if (answerChose === true) {
    document.getElementById("questions").textContent =
      questionArray[currentQuestion].q;

    document.getElementById("answer0").textContent =
      questionArray[currentQuestion].possibleAnswers[0];
    document.getElementById("answer1").textContent =
      questionArray[currentQuestion].possibleAnswers[1];
    document.getElementById("answer2").textContent =
      questionArray[currentQuestion].possibleAnswers[2];
    document.getElementById("answer3").textContent =
      questionArray[currentQuestion].possibleAnswers[3];

    answerChose = false;
  }
}

//see the users answer choice
function userChose(choice) {
  answerChose = true;
  userDecision = choice;
  checkAnswer();
  if (gameOver === false) {
    showQuestions();
  }
}

//check the answer and subtract 5 seconds if wrong
function checkAnswer() {
  //if user gets wrong, timer drops 5 seconds
  if (userDecision !== questionArray[currentQuestion].correct) {
    timer = timer - 5;
    updateTimer();
    audioWrong.play();
  } else {
    audioCorrect.play();
  }
  //increment currentQuestion
  currentQuestion++;

  //if currentQuestion is the last question, game is over
  if (currentQuestion === lengthOfQuiz) {
    gameOver = true;
    victory();
  }
}

function victory() {
  //disappear questions and answers reappear difficulty choices
  difficultyButtonsEl.setAttribute("style", "display:inline");
  questionsEl.setAttribute("style", "display: none");
  answersEl.setAttribute("style", "display: none");

  //stop music
  audioCorrect.pause();
  audioCorrect.currentTime = 0;
  audioWrong.pause();
  audioWrong.currentTime = 0;
  audioSecondsLeft.pause();
  audioSecondsLeft.currentTime = 0;
  isAudioPlaying = false;

  //reset variables
  gameOver = true;
  currentQuestion = 0;
  answerChose = true;

  //set the Modal to pop up
  gameOverMessageEl.textContent =
    "Congratulations! Your Score is: " +
    timer +
    ". Please enter your initials below.";
  $("#gameOverScreen").modal("toggle");
}

//click submit button on game over screen
function submitScore() {
  var userInitScore = {
    initials: initials.value,
    score: timer,
  };
  //add the user initials and score to the high score array
  highScoresArray.push(userInitScore);

  //sorting high score array by score
  var sortedHighScoreArray = highScoresArray.sort(function (a, b) {
    return b.score - a.score;
  });
  localStorage.setItem("highscores", JSON.stringify(sortedHighScoreArray));
  closeModal();
}

//view the high scores in a modal
function viewHighScores() {
  //get the sorted High Score array from local storage
  var sortedHighScoreArray = JSON.parse(localStorage.getItem("highscores"));
  //clear the modal
  //highScoreModalBody.textContent = "Rank----Initials----Score";

  //clear the high score table of all the cells but the header
  $("#highScoreTable td").remove();

  //add rows to the table to show the high score rankings
  if (sortedHighScoreArray !== null) {
    for (var i = 0; i < sortedHighScoreArray.length; i++) {
      //new row added to hightscoretable
      var newRow = highScoreTable.insertRow();
      //there will only be 3 things put in table, rank, initials, and score
      for (var j = 0; j < 3; j++) {
        var newCell = newRow.insertCell(j);
        if (j === 0) {
          //insert the rank
          var newText = document.createTextNode(Number(i + 1) + ".");
        } else if (j === 1) {
          //insert the initials
          var newText = document.createTextNode(
            sortedHighScoreArray[i].initials
          );
        } else if (j === 2) {
          //insert the score
          var newText = document.createTextNode(sortedHighScoreArray[i].score);
        }
        //here is where the above logic is actually applied
        newCell.appendChild(newText);
      }
      // var score = document.createElement("P");
      // score.innerText =
      //   Number(i + 1) +
      //   ".       " +
      //   sortedHighScoreArray[i].initials +
      //   "            " +
      //   sortedHighScoreArray[i].score;
      // var linebreak = document.createElement("br");
      // highScoreModalBody.append(linebreak);
      // highScoreModalBody.append(score.textContent);

      //put the next score one line below
    }
  }
}

//clear the high scores
function clearHighScores() {
  $("#highScoreTable td").remove();
  localStorage.removeItem("highscores");
  highScoresArray = [];
}

function closeModal() {
  //close the modal
  $("#gameOverScreen").modal("toggle");
}
