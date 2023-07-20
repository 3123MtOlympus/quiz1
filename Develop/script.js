const startButton = document.getElementById("startButton");
const quizPage = document.querySelector(".quiz-page");
const startPage = document.querySelector(".start-page");
const endPage = document.querySelector(".end-page");
const scoreElement = document.getElementById("score");
const countdownElement = document.getElementById("countdown");
const qaBody = document.querySelector(".qa_body");
const skipButton = document.getElementById("skip");
const finalScoreElement = document.getElementById("finalScore");
const saveScoreButton = document.getElementById("saveScoreButton");
const initialsInput = document.getElementById("initials");

let currentQuestionIndex = 0;
let score = 0;
let countdown;
const totalTime = 30;

startButton.addEventListener("click", startQuiz);
skipButton.addEventListener("click", skipQuestion);
saveScoreButton.addEventListener("click", saveScore);

    const quizQuestions = [
        {                                                                                                                                                                                                                                                                                                                                                                                                                                                
            question: "1. How many STATES are in the US?",
            answers: ["50 States", "25 States", "13 States", "56 States"],
            correctAnswerIndex: 0,
        },
        {
            question: "2. What is the capital city of the US?",
            answers: ["Los Angeles", "Miami", "New York City", "Washington DC"],
            correctAnswerIndex: 3,
        },
        {
            question: "3. Which city is known for the Golden Gate Bridge?",
            answers: ["Dallas", "Orlando", "San Francisco", "Detroit"],
            correctAnswerIndex: 2,
        },
        {
            question: "4. Who was the first president of the US?",
            answers: ["Abraham Lincoln", "Barack Obama", "Bill Clinton", "George Washington"],
            correctAnswerIndex: 3,
        },
    ];

function skipQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        showNextQuestion();
    } else {
        endQuiz();
    }
}

function startQuiz() {
    startPage.style.display = "none";
    quizPage.style.display = "block";
    currentQuestionIndex = 0;
    score = 0;
    countdown = totalTime;
    updateScore();
    showNextQuestion();
    startCountdown();
}

function showNextQuestion() {
    if (currentQuestionIndex < quizQuestions.length) {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        qaBody.innerHTML = `
            <h4>${currentQuestion.question}</h4>
            ${currentQuestion.answers
                .map((answer, index) => `<div class="qa_ans_row">
                        <input type="radio" name="answer" data-index="${index}">
                        <span>${answer}</span>
                    </div>`)
                .join("")}`;
    } else {
        endQuiz();
    }
}

function nextQuestion() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        const selectedAnswerIndex = parseInt(selectedAnswer.getAttribute("data-index"));
        const currentQuestion = quizQuestions[currentQuestionIndex];
        if (selectedAnswerIndex === currentQuestion.correctAnswerIndex) {
            score += 20;
        } else {
            countdown -= 10; 
            if (countdown < 0) countdown = 0;
            updateCountdown();
        }
        currentQuestionIndex++;
        updateScore();
        showNextQuestion();
    }
}

function endQuiz() {
    quizPage.style.display = "none";
    endPage.style.display = "block";
    finalScoreElement.textContent = score;
}

const quizScoreElement = document.getElementById("quizScore"); 


function updateScore() {
    scoreElement.textContent = score;
    quizScoreElement.textContent = `Score: ${score}`;

}

function updateCountdown() {
    countdownElement.textContent = countdown;
}

function startCountdown() {
    countdown = totalTime;
    updateCountdown();

    const interval = setInterval(() => {
        countdown--;
        updateCountdown();

        if (countdown <= 0 || currentQuestionIndex >= quizQuestions.length) {
            clearInterval(interval);
            endQuiz();
        }
    }, 1000);
}


function saveScore() {

}