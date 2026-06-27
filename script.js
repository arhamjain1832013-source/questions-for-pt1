// ============================
// Grade 8 Science Master
// Script.js
// Part 1
// ============================

let questions = [];
let quizQuestions = [];
let currentQuestion = {};
let score = 0;
let currentIndex = 0;

window.onload = async function () {
    await loadQuestions();
};

async function loadQuestions() {

    try {

        const response = await fetch("questions.json");

        questions = await response.json();

        console.log("Questions Loaded:", questions.length);

    } catch (error) {

        alert("Unable to load questions.json");

        console.error(error);

    }

}

function shuffle(array){

    for(let i=array.length-1;i>0;i--){

        let j=Math.floor(Math.random()*(i+1));

        [array[i],array[j]]=[array[j],array[i]];

    }

    return array;

}
// ============================
// PART 2
// Start Quiz + Setup Questions
// ============================

function startQuiz() {

    let chapter = document.getElementById("chapter").value;

    // filter questions by chapter
    quizQuestions = questions.filter(q => q.chapter === chapter);

    if (quizQuestions.length === 0) {
        alert("No questions found for this chapter!");
        return;
    }

    // reset values
    score = 0;
    currentIndex = 0;

    // shuffle questions (no pattern, random order)
    quizQuestions = shuffle(quizQuestions);

    // show quiz section
    document.getElementById("quiz").classList.remove("hidden");

    // hide start card
    document.querySelector(".card").classList.add("hidden");

    // load first question
    showQuestion();
}

function showQuestion() {

    if (currentIndex >= quizQuestions.length) {
        endQuiz();
        return;
    }

    currentQuestion = quizQuestions[currentIndex];

    document.getElementById("question").innerText =
        currentQuestion.question;

    let optionsHTML = "";

    currentQuestion.options.forEach((opt, index) => {
        optionsHTML += `
            <div class="option" onclick="selectAnswer(${index}, this)">
                ${opt}
            </div>
        `;
    });

    document.getElementById("options").innerHTML = optionsHTML;

    document.getElementById("score").innerText =
        "Score: " + score;
}