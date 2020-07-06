//variables up top
//timer
//score - time left
//somehow high score
//array of objects where the objects are questions, the possible solutions are an element, and the answer is another element


var timer;
var questionArray = [
  {
    q: "cd [answer here] changes you to the home directory",
    a: "..",
    b: "!",
    c: "~",
    d: "It's not possible",
    correct: "c"
  },
  {
    q: "What is the tag called attached to an image incase there is no image?",
    a: "alt tag",
    b: "just-in-case tag",
    c: "picture tag",
    d: "error tag",
    correct: "a"
  }
]
console.log(questionArray)


//here are questions. Maybe think about randomizing answer order?
//1. cd [answer here] changes you to the home directoy
//a: .. b: ! c: ~ d: That's not possible
//correct: c
//2. What is the tag called attached to an image incase there is no image?
//a: alt tag b: just-in-case tag c: picture tag d: error tag
//correct: a
//3. What is the order, from first priority to last, in which CSS determines how to format things?
//a: type, class, ID, order b: class, type, order, ID c: order, type, ID, class d: ID, class, type, order
//correct: d
//4. Bootstrap works in grids of: 
//a: 4 b: 8 c: 12 d: 16
//correct: c
//5. What code do we use to request a true/false answer?
//a: alert b: confirm c: prompt d: boolean
//correct: d
//6. What can make up an array?
//a: numbers b: strings c: booleans d: all of the above
//correct: d
//7. How do we return a random integer between 1 and x?
//a: Math.random() b: Math.random()*x c: Math.floor(Math.random*10) d: Math.floor(Math.random*10+1)
//correct: d
//8. JavaScript is:
//a: Function Oriented b: Object Oriented c: Solving Oriented d: a programming language
//correct: both b and d (trick question?)


function easyClick() {
  console.log("whoopee")
}
//button to start quiz and timer
  //watching all the time
    //timer hit 0, game over
  //loop ask question, give multiple choices
    //right answer, increase score by one
    //wrong answer, decrease timer by 5? seconds
    //if no questions left
      //end game
  //loop

//after end game
  //give user score
  //ask user for initials
  //tell user what place they are in
  //show leaderboard

