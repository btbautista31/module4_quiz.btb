// Setting global variables
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
var scoreScreen = document.getElementById("scores")
var correctCounter = 0
var currentPlayer = document.getElementById("name-input")


//Function to generate the questions and associate to correct answers
var questions = [
    {
        question: "question1",
        answers: ["answer1", "answer2", "answer3", "answer4"], answer: "answer1"
    },
    {
        question: "question2",
        answers: ["answer1", "answer2", "answer3", "answer4"], answer: "answer2"
    },
    {
        question: "question3",
        answers: ["answer1", "answer2", "answer3", "answer4"], answer: "answer3"
    },
    {
        question: "question4",
        answers: ["answer1", "answer2", "answer3", "answer4"], answer: "answer4"
    }

]


//Object for collating top 10 scores
var highScores = [
    {
    playerName: [],
    playerScore: [],
    }

]

function startTimer() {
    interval = setInterval(() => {
        timerEl.textContent = timeLeft
        if (timeLeft < 1) {
            console.log("Game Over")
        } else {
            timeLeft--;
        }
    }, 1000);
}


function displayQuestions() {
    questionEl.innerText = ""
    answersEl.innerHTML = ""

    if (questionIndex < questions.length) {
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

function selectAnswer(event) {
    event.preventDefault();
    if (event.target && event.target.matches(".answer-btn")) {
        console.log(event.target.innerText)
        userAnswer = event.target.innerText;
        if (userAnswer === rightAnswer) {
            console.log(msgEl)
            msgEl.innerText = "Correct Answer"
            correctCounter++;
        } else {
            console.log(msgEl)
            msgEl.innerText = "Incorrect"
            // remove 10 seconds from the timer
            timeLeft -= 10;
            
        }
        questionIndex++;
        displayQuestions();
        endGame();
    }
}

//Function: Start timer and display questions
function startGame(event) {
    event.preventDefault()
    console.log("Game has started")
    startScreen.style.display = "none"
    gameScreen.style.display = "block"
    startTimer();
    displayQuestions();
}

//Function: End Game, Enter name, Score Display
function endGame() {
    if (questionIndex >= questions.length) {
        console.log("Out of questions")
        gameScreen.style.display = "none"
        scoreScreen.style.display = "block"
        document.getElementById("player-score").textContent = correctCounter;
        console.log(correctCounter)

    }

}

function submitScore (event) {
    var playerName = document.getElementById("name-input").value
    var playerScore = correctCounter
    console.log("Player Name:" + playerName);
    console.log("Player Score: " + playerScore);
}


//Event Listeners
document.addEventListener("click", selectAnswer)
document.getElementById("beginBtn").addEventListener("click", startGame)
document.getElementById("submitBtn").addEventListener("click", submitScore)
currentPlayer.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        submitScore();
    }
});