const questions = [
  {
    question: "which is largest ani mal in the world?",
    answers: [
      { text: "Elephant", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Giraffe", correct: false },
      { text: "Great White Shark", correct: false }
    ]
  },
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false }
    ]
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Saturn", correct: false }
    ]
  },
  {
    question: "What is the chemical symbol for water?",
    answers: [
      { text: "H2O", correct: true },
      { text: "CO2", correct: false },
      { text: "O2", correct: false },
      { text: "NaCl", correct: false }
    ]
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    answers: [
      { text: "Harper Lee", correct: true },
      { text: "Mark Twain", correct: false },
      { text: "Ernest Hemingway", correct: false },
      { text: "F. Scott Fitzgerald", correct: false }
    ]
  }
]

const questionelement = document.getElementById("question");
const answerbutton = document.getElementById("answer-buttons");
const nextbutton = document.getElementById("next-btn");

let currentquestionindex = 0;
let score = 0;

function startQuiz() {
  currentquestionindex = 0;
  score = 0;
  nextbutton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  let currentquestion = questions[currentquestionindex];
  let questionno = currentquestionindex + 1;
  questionelement.innerHTML = questionno + ".   " + currentquestion.question;

  answerbutton.innerHTML = "";

  currentquestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerbutton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  })
}

function selectAnswer(e) {
  const selectedbtn = e.target;
  const iscorrect = selectedbtn.dataset.correct === "true";
  if (iscorrect) {
    selectedbtn.classList.add("correct");
    score++;
  }
  else {
    selectedbtn.classList.add("incorrect");
  }
  Array.from(answerbutton.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextbutton.style.display = "block";
}

function resetstate() {
  nextbutton.style.display = "none";
  answerbutton.innerHTML = "";
}

function handlenextquestion() {
  currentquestionindex++;
  if (currentquestionindex < questions.length) {
    showQuestion();
  }
  else {
    showscore();
  }
}

nextbutton.addEventListener("click", () => {
  if (currentquestionindex < questions.length) {
    handlenextquestion();
  } else {
    startQuiz();
  }
})

function showscore() {
  resetstate();
  questionelement.innerHTML = `you scored ${score} out of ${questions.length}!`;
  nextbutton.innerHTML = "Play Again";
  nextbutton.style.display = "block";
}

startQuiz();

