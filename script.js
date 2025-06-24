// DOM Element

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz questions
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// QUIZ STATE VARS

let currentQuestionIndex = 0; // The index for our question
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event listener

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  //reset state
  answersDisabled = false;
  const currentQuestion = quizQuestions[currentQuestionIndex]; // The current question
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";
  questionText.textContent = currentQuestion.question;
  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const boutons = document.createElement("button");
    boutons.classList.add("answer-btn");
    boutons.textContent = answer.text;
    boutons.dataset.correct = answer.correct;
    answersContainer.append(boutons);

    boutons.addEventListener("click", selectAnswer);
  });
}

function selectAnswer(event) {
  //optimisation check
  if (answersDisabled) return;

  const clickedButton = event.target;
  const isCorrect = clickedButton.dataset.correct === "true";
  if (isCorrect) {
    clickedButton.classList.add("correct");
    answersDisabled = true;
    score++;
    scoreSpan.textContent = score;
  } else {
    clickedButton.classList.add("incorrect");
  }

  setTimeout(() => {
    currentQuestionIndex++;
    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      quizScreen.classList.remove("active");
      resultScreen.classList.add("active");
      finalResult();
    }
  }, 1000);
}

function finalResult() {
  finalScoreSpan.textContent = score;

  if (score >= 0 && score < 2) {
    // 0 and 1
    resultMessage.textContent = "Keep trying! You can do better!";
  } else if (score >= 2 && score <= 4) {
    //2 and 3 and 4
    resultMessage.textContent = "So close! You're almost there!";
  } else {
    // 5
    resultMessage.textContent = "Great job! You nailed it — 5/5!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
