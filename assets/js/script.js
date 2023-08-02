// Function to start the quiz
var questionIndex = 0
var questionEl = document.getElementById("question")
var answersEl = document.getElementById("answer-choices")
var msgEl = document.getElementById("message")
var rightAnswer = ""
var userAnswer = ""
var timerEl = document.getElementById("timer")
var timeLeft = 90
var interval
var startScreen = document.getElementById("start")
var gameScreen = document.getElementById("game")

//Function to generate the questions and associate to correct answers
var questions = [
    {
        question: "question1",
        answers: ["answer1", "answer2", "answer3", "answer4"], answer: "answer2"
    },
    {
        question: "question2",
        answers: ["answer1", "answer2", "answer3", "answer4"], answer: "answer1"
    },
    {
        question: "question3",
        answers: ["answer1", "answer2", "answer3", "answer4"], answer: "answer4"
    },
    {
        question: "question4",
        answers: ["answer1", "answer2", "answer3", "answer4"], answer: "answer3"
    }

]
function startTimer () {
    interval = setInterval(() => {
        timerEl.textContent = timeLeft
        if (timeLeft < 1) {
            console.log("Game Over")
            
        } else {
            timeLeft --;
        }    
    }, 1000);
}


function displayQuestions() {
    questionEl.innerText = ""
    answersEl.innerHTML = ""
    // msgEl.innerText = ""
    if (questionIndex<questions.length) {
        questionEl.innerText = questions[questionIndex].question
        rightAnswer = questions[questionIndex].answer
    let choices = questions[questionIndex].answers
    for (let i = 0; i < choices.length; i++) {
        const element = choices[i];
        let answerBtn = document.createElement("button")
        answerBtn.classList.add("answer-btn")
        answerBtn.innerText = element
        answersEl.append(answerBtn)
        
    }
    } else {
        alert("Game Over")
    }
}

function startGame(event) {
    event.preventDefault()
    console.log("Game has started")
    startScreen.style.display = "none"
    gameScreen.style.display = "block"
    startTimer();
    displayQuestions();

}
function selectAnswer (event) {
    event.preventDefault();
    if (event.target && event.target.matches(".answer-btn")) {
        console.log(event.target.innerText)
        userAnswer = event.target.innerText;
        if (userAnswer === rightAnswer) {
            console.log(msgEl)
            msgEl.innerText = "Correct Answer"
            
        } else {
            console.log(msgEl)    
            msgEl.innerText = "Incorrect"
            // remove 10 seconds from the timer
            timeLeft -= 10;
        }
        questionIndex ++;
        displayQuestions();
    }
}
//
//Function to collate high scores
document.addEventListener("click", selectAnswer)
document.getElementById("beginBtn").addEventListener("click", startGame)