const startButton = document.getElementById('start');
const score = document.getElementById('score');
const timerLabel = document.getElementById('timer-label');
const timerLabel2 = document.getElementById('timer-label-2');
// helper functions
function setHTML(el, text) {
  el.innerHTML = text;
}
startButton.addEventListener('click', (event) => {
  ob.start();
});
// create Object
const ob = new Object;
ob.score = 0;
ob.no = 0;
ob.inProgress = false;
ob.countDown = false;
ob.countDownStart = Date.now();
ob.startTime = Date.now();
// Object Methods
ob.start = function () {
  if (ob.inProgress) return;
  if (ob.countDown) return;
//  if (ob.no == 0) nextButton.disabled = false;
//  slide(false);
  ob.countDownStart = Date.now();
  ob.countDown = true;
}
ob.begin = function () {
//  if (ob.no == 0) nextButton.disabled = false;
  if (ob.inProgress) return;
  ob.score = 0;
  ob.no = 0;
  setHTML(score, ob.score);
  ob.countDown = false;
  currentSlide(2);  
  ob.startTime = Date.now()
  ob.inProgress = true;
}
ob.end = function () {
  ob.inProgress = false;
  showScores();
}
// Timer functions
function checkTimers() {
  if (ob.countDown) {
    const diff = 3 - Math.floor((Date.now() - ob.countDownStart) / 1000);
    if (diff > 0) {
      setHTML(timerLabel, "Starting in: "+ diff);
    } else {
      ob.begin();
    }
  }
  // 5 sec per question 10 question have to answer
  if (ob.inProgress) {
    const diff = (6 * 10) - Math.floor((Date.now() - ob.startTime) / 1000);
    if (diff > -1) {
      setHTML(timerLabel2, "Remaining: " + diff);
    } else {
      ob.end();
    }
  }
}
setInterval(checkTimers, 100);
var correct=[];
var incorrect=[];
var correctAnswers = "";
var slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function currentSlide(n) {
  showSlides(slideIndex = n);
}
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("grid");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";
}
function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}
Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
}
Quiz.prototype.guess = function(answer) {
  question = this.getQuestionIndex();
  if(question.isCorrectAnswer(answer)) {
    this.score = this.score + 1;
    correct.push(question);
  }
  else{
    //this.score = this.score - 1;
    //correctAnswers += question.text + "<br><font color='red'>"+ question.answer + "</font><br>";
  }
  this.questionIndex++;
}
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        showProgress();
    }
};
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'><font color='white'> Your score: " + quiz.score + "</font> </h2>";
    var found = false;
    for (i = 0; i < questions.length; i++) {
      for (j = 0; j < correct.length; j++) {
        if (questions[i].text == correct[j].text) {
          found = true;
          break;
        }else {
          found = false;
        }
      };
      if (!found){
        correctAnswers += questions[i].text + "<br><font color='red'>"+ questions[i].answer + "</font><br>";           
      }
    };
    
    if (quiz.score >= 0 && quiz.score < 10){
      gameOverHTML += "<h5 id='answers'> <u>The correct answers are:</u> " + "<br>" + correctAnswers + "</h5>";
    }
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
    if (quiz.score >= 7 && quiz.score <= 10) {
      document.getElementById("score").style.backgroundColor = "green";
    } else if (quiz.score >= 5 && quiz.score < 7) {
      document.getElementById("score").style.backgroundColor = "yellow";
    } else {
      document.getElementById("score").style.backgroundColor = "red";
    }
};
// create questions here

var questions = [
    new Question("Which type of galaxy is the Milky Way?", ["Elliptical galaxy", "Spiral galaxy","Irregular galaxy","Barred piral galaxy"], "Barred spiral galaxy"),
    new Question("The Andromeda Galaxy is approximately how many light-years away from Earth?", ["1 million light-years", "2.5 million light-years", "10 million light-years", "100 million light-years"], " 2.5 million light-years"),
    new Question("What is the unique feature that earned the Sombrero Galaxy its nickname?", ["It has a prominent dust lane", "It has a bright central bulge", "It has active star formation regions", " It resembles a wide-brimmed Mexican hat"], "It resembles a wide-brimmed Mexican hat"),
    
    new Question("The Whirlpool Galaxy is known for its interaction with which smaller companion galaxy?", ["Large Magellanic Cloud"," Small Magellanic Cloud ", "Centaurus A (NGC 5128)",  "Centaurus A (NGC 5128)"], "NGC 5195 "),
    new Question("How far away is the Whirlpool Galaxy from Earth?", ["1 million light-years","10 million light-years"," 23 million light-years","100 million light-years"], "23 million light-years"),
    new Question("What is the hybrid structure of Centaurus A, blending features of both elliptical and spiral galaxies, likely a result of?", ["Intense star formation","Black hole activity","Gravitational interaction with another galaxy","Formation of star clusters"], " Gravitational interaction with another galaxy"),
    new Question("Which region of the Milky Way Galaxy do we reside in? ", ["The Sagittarius Arm ","The Orion Arm","The Perseus Arm","The Scutum-Centaurus Arm"], "The Orion Arm"),
    new Question("How many light-years does the Milky Way Galaxy span in diameter?", ["Approximately 10,000 light-years ","Approximately 50,000 light-years","Approximately 100,000 light-years","Approximately 200,000 light-years"], "Approximately 100,000 light-years"),
    new Question("What is the inevitable future of the Milky Way Galaxy and the Andromeda Galaxy?", ["They will continue to move apart forever. ","They will collide and merge in about 4 billion years.","They will rotate around each other for eternity.","They will merge with a third neighboring galaxy."], "They will collide and merge in about 4 billion years. "),
    new Question("What type of black hole lies at the core of the Sombrero Galaxy?", ["Supermassive black hole"," Intermediate black hole","Micro black hole","Stellar black hole"], "Supermassive black hole")
];

// create quiz
var quiz = new Quiz(questions);
// display quiz
populate();