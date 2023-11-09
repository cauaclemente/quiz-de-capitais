const questions = [
    {
      question: "Qual é a capital do Brasil?",
      choices: ["Brasília", "Rio de Janeiro", "São Paulo", "Salvador"],
      answer: "Brasília",
    },
    {
      question: "Qual é a capital da Escocia?",
      choices: ["Dundee", "Edimburgo", "Lisboa", "Perth"],
      answer: "Edimburgo",
    },
    {
      question: "Qual é a capital da França?",
      choices: ["Roma", "Madri", "Paris", "Londres"],
      answer: "Paris",
    },
    {
      question: "Qual é a capital da Belgica?",
      choices: ["Bruxelas", "Bruges", "Gante", "Lovaina"],
      answer: "Bruxelas",
    },
    {
      question: "Qual é a capital da Itália?",
      choices: ["Veneza", "Milão", "Roma", "Nápoles"],
      answer: "Roma",
    },
    {
      question: "Qual é a capital do Canadá?",
      choices: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
      answer: "Ottawa",
    },
    {
      question: "Qual é a capital da Colombia?",
      choices: ["Bogotá", "Cali", "Medelín", "Barranquilla"],
      answer: "Bogotá",
    },
    {
      question: "Qual é a capital do Egito?",
      choices: ["Luxor", "Cairo", "Dahab", "Alexandria"],
      answer: "Cairo",
    },
  ];

const questionsElement = document.querySelector("#questions");
const choicesElements = document.querySelectorAll(".choice");
const nextButton = document.querySelector("#next");
const scoreElement = document.querySelector("#score");
const wrongElement = document.querySelector("#wrong");

let currentQuestion = 0;
let score = 0;
let wrong = 0;
let answerChosen = false;

function loadQuestion(){
    const currentQuestionData = questions[currentQuestion];
    questionsElement.innerText = currentQuestionData.question;

    const choices = suffleArry(currentQuestionData.choices);
    
    for (let i = 0; i < choicesElements.length; i++) {
        choicesElements[i].innerText = choices[i];
    }
    answerChosen = false;
}

function suffleArry(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while(0 !==currentIndex){
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue
    }
    return array
}

function checkAnswer(e) {
    if (answerChosen) return
    
    answerChosen = true;

    if (e.target.innerText === questions[currentQuestion].answer){
        score++;
        scoreElement.innerText = `Pontuação: ${score}`;
        alert("Opação correta!")
    }else {
        wrong++;
        wrongElement.innerText = `Erros: ${wrong}`;
        alert(`Opção errada, a resposta correta é: ${questions[currentQuestion].answer}`)
    }
}

choicesElements.forEach((btn) => {
    btn.addEventListener("click", checkAnswer);
})

function restartQuiz() {
    currentQuestion = 0
    score = 0
    wrong = 0
    scoreElement.innerText = "Pontuação: 0"
    wrongElement.innerText = "Erros: 0"
    loadQuestion()
}

nextButton.addEventListener("click", () => {
    if (!answerChosen) {
        alert("Por favor, responda as perguntas!")
    return;
    }

    currentQuestion ++;

    if(currentQuestion < questions.length) {
        loadQuestion();
    }else {
        alert(`Fim de jogo! você acertou ${score} de ${questions.length} perguntas`)    
        restartQuiz();
      }
})


loadQuestion()