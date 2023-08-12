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
var topScoreScreen = document.getElementById("hiscores")
var correctCounter = 0
var currentPlayer = document.getElementById("name-input")
let allScores = JSON.parse(localStorage.getItem('allScores')) || [];


//Function to generate the questions and associate to correct answers
var questions = [
    {
        question: "What html element is used to invoke javascript? ",
        answers: ["<js>", "<java>", "<coffee>", "<script>"], answer: "<script>"
    },
    {
        question: "What is the correct character for housing arrays? ",
        answers: ["[]", "{}", "<>", "()"], answer: "[]"
    },
    {
        question: "What is the correct character for housing objects? ",
        answers: ["[]", "{}", "<>", "()"], answer: "{}"
    },
    {
        question: "Which operator tests for strict equality?",
        answers: ["=", "==", "===", "none of the above"], answer: "==="
    },
    {
        question: "Which operator assigns a value to a variable?",
        answers: ["=", "==", "===", "none of the above"], answer: "="
    },
    {
        question: "Which method adds a value to the end of an array?",
        answers: [".pop", ".splice", ".find", ".push"], answer: ".push"
    },
    {
        question: "Can objects be housed in arrays? ",
        answers: ["True", "False"], answer: "True"
    },
    {
        question: "Can you have an array within an array? ",
        answers: ["True", "False"], answer: "True"
    },
    {
        question: "What is the first position index of an array? ",
        answers: ["[1]", "[0]", "[prime]", "[initial]"], answer: "[0]"
    },
    {
        question: "Learning Javascript is the best",
        answers: ["True", "False"], answer: "True"
    }
]

// Function: Starts game timer
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

//Function: Display questions
function displayQuestions() {
    questionEl.innerText = ""
    answersEl.innerHTML = ""

    if (questionIndex < questions.length) {
        questionEl.innerText = questions[questionIndex].question;
        rightAnswer = questions[questionIndex].answer;
        let choices = questions[questionIndex].answers;
        var text = "";

        for (let i = 0; i < choices.length; i++) {
            const element = choices[i];
            let answerBtn = document.createElement("button");
            answerBtn.classList.add("answer-btn");
            answerBtn.innerText = element;
            answersEl.append(answerBtn);

        }
        
    } else {
        // alert("Game Over")
    }
}

//Function: Select answers
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
        gameScreen.style.display = "none"
        scoreScreen.style.display = "block"
        document.getElementById("player-score").textContent = correctCounter;
    }
}

function submitScore(event) {
    var playerName = document.getElementById("name-input").value
    var playerScore = correctCounter

    // console.log("Player Name:" + playerName);
    // console.log("Player Score: " + playerScore);

    let finalScore = {
        name: playerName,
        score: playerScore,
    }

    scoreScreen.style.display = "none";
    allScores.push(finalScore);
    console.log("Inside Final Score: ", finalScore)
    saveScores();
}

//Function: Save scores to local storage
function saveScores() {
    localStorage.setItem("allScores", JSON.stringify(allScores));
    showTopScores();
}

//Function: Show top scores table
function showTopScores() {

    allScores.sort(function(a, b) {return b.score-a.score})

    topScoreScreen.style.display = "block"
    // creates a <table> element and a <tbody> element
    const tbl = document.getElementById("hiscores-table");
    const tblBody = document.createElement("tbody");
    const tblHeader = document.createElement("thead");

    //Loop to add player initials to high score table
    for (let i = 0; i <= 10; i++) {
        // creates a table row
        const row = document.createElement("tr");
        const playerCell = document.createElement("td");
        const scoreCell = document.createElement("td");
        // const cellText = document.createTextNode(`cell in row ${i}, column ${j}`);
        const playerInit = document.createTextNode(`${allScores[i].name}`);
        const playerScore = document.createTextNode(`${allScores[i].score}`);
        playerCell.appendChild(playerInit);
        scoreCell.appendChild(playerScore);
        row.appendChild(playerCell);
        row.appendChild(scoreCell);
        tblBody.appendChild(row);
        playerCell.setAttribute("width", "50%")
        scoreCell.setAttribute("width", "50%")
    
    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    document.body.appendChild(tbl);
    // sets the border attribute of tbl to '2'
    tbl.setAttribute("align", "center");
    tbl.setAttribute("border", "2");
    tbl.setAttribute("width", "300px");

    
}

function repeatGame(event) {
    location.reload();
}

//Event Listeners
document.addEventListener("click", selectAnswer)
document.getElementById("beginBtn").addEventListener("click", startGame)
document.getElementById("repeatBtn").addEventListener("click", repeatGame)
document.getElementById("submitBtn").addEventListener("click", submitScore)
currentPlayer.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        submitScore();
    }
    });