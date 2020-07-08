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
var gameOverScreenEl = document.querySelector("#gameOverScreen")
var gameOverMessageEl = document.querySelector(".modal-body")

//Initialize Variables
var timer;
var currentQuestion = 0;
var answerChose = true;
var userDecision;
var gameOver;
var lengthOfQuiz = 0;

//array of objects where the objects are questions, the possible solutions are an array, and the answer is another element
var questionArray = [
  //1. cd [answer here] changes you to the home directoy
  //a: .. b: ! c: ~ d: That's not possible
  //correct: c
  {
    q: "cd [answer here] changes you to the home directory",
    possibleAnswers: ["..", "!", "~", "It's not possible"],
    correct: 2
  },
  //2. What is the tag called attached to an image incase there is no image?
  //a: alt tag b: just-in-case tag c: picture tag d: error tag
  //correct: a
  {
    q: "What is the tag called attached to an image incase there is no image?",
    possibleAnswers: ["alt tag", "just-in-case tag", "picture tag", "error tag"],
    correct: 0
  },
  //3. What is the order, from first priority to last, in which CSS determines how to format things?
  //a: type, class, ID, order b: class, type, order, ID c: order, type, ID, class d: ID, class, type, order
  //correct: d
  {
    q: "What is the order, from first priority to last, in which CSS determines how to format things?",
    possibleAnswers: ["type, class, ID, order", "class, type, order, ID", "order, type, ID, class", "ID, class, type, order"],
    correct: 3
  },
  //4. Bootstrap works in grids of: 
  //a: 4 b: 8 c: 12 d: 16
  //correct: c
  {
    q: "Bootstrap works in grids of:",
    possibleAnswers: ["4", "8", "12", "16"],
    correct: 2
  },
  //5. What code do we use to request a true/false answer?
  //a: alert b: confirm c: prompt d: boolean
  //correct: d
  {
    q: "What code do we use to request a true/false answer?",
    possibleAnswers: ["alert", "confirm", "prompt", "boolean"],
    correct: 3
  },
  //6. What can make up an array?
  //a: numbers b: strings c: booleans d: all of the above
  //correct: d
  {
    q: "What can make up an array?",
    possibleAnswers: ["numbers", "strings", "booleans", "all of the above"],
    correct: 0
  },
  //7. How do we return a random integer between 1 and x?
  //a: Math.random() b: Math.floor(Math.random*10+1) c: Math.random()*x d: Math.floor(Math.random*10) 
  //correct: d
  {
    q: "How do we return a random integer between 1 and x?",
    possibleAnswers: ["Math.random()", "Math.floor(Math.random*10+1", "Math.random()*x", "Math.floor(Math.random*10)"],
    correct: 1
  },
  //8. JavaScript is:
  //a: Function Oriented b: Object Oriented c: Solving Oriented d: Parameter Oriented
  //correct: b
  {
    q: "JavaScript is:",
    possibleAnswers: ["Function Oriented", "Object Oriented", "Solving Oriented", "Parameter Oriented"],
    correct: 1
  },
  //prepend question
  {
    q: "What command puts an element at the top of the page?",
    possibleAnswers: ["append", "prepend", "createElement", "querySelector"],
    correct: 0
  },
]

function easyClick() {
  lengthOfQuiz = Math.floor(questionArray.length * .34);
  startQuiz();
}
function mediumClick() {
  lengthOfQuiz = Math.floor(questionArray.length * .67);
  startQuiz();
}
function hardClick() {
  lengthOfQuiz = questionArray.length;
  startQuiz();
}

//button to start quiz and timer
function startQuiz() {
  timer = 100;
  gameOver = false;
  difficultyButtonsEl.setAttribute("style", "display:none")
  questionsEl.setAttribute("style", "display: inline")
  answersEl.setAttribute("style", "display: inline")
  timerSpotEl.textContent = "Timer: " + timer;
  showQuestions()
  var timeLeft = setInterval(function () {
    if (gameOver === true) {
      clearInterval(timeLeft);
    } else {
      timer--;
    };

    timerSpotEl.textContent = "Timer: " + timer;
    //timer hit 0, game over
    if (timer <= 0) {
      clearInterval(timeLeft)
      gameOver = true;
      victory();
    } else if (gameOver === false) {
      //loop ask question, give multiple choices

    }
  }, 1000);
}

//show the next question
function showQuestions() {
  if (answerChose === true) {
    console.log("show questions" + currentQuestion)
    document.getElementById("questions").textContent = questionArray[currentQuestion].q;

    document.getElementById("answer0").textContent = questionArray[currentQuestion].possibleAnswers[0];
    document.getElementById("answer1").textContent = questionArray[currentQuestion].possibleAnswers[1];
    document.getElementById("answer2").textContent = questionArray[currentQuestion].possibleAnswers[2];
    document.getElementById("answer3").textContent = questionArray[currentQuestion].possibleAnswers[3];

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
  difficultyButtonsEl.setAttribute("style", "display:inline")
  questionsEl.setAttribute("style", "display: none")
  answersEl.setAttribute("style", "display: none")

  //reset variables
  gameOver = true;
  currentQuestion = 0;
  console.log("victory" + currentQuestion)
  answerChose = true;

  //set the Modal to pop up
  gameOverMessageEl.textContent = "Congratulations! Your Score is: " + timer
  $("#gameOverScreen").modal("toggle");

}

function closeModal() {
  //close the modal
  $("#gameOverScreen").modal("toggle");
}