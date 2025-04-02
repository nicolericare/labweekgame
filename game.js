
const pictograms = [
    { emoji: "🎤👘", answers: ["microbe"] },
    { emoji: "🦴 🇲 ➡️", answers: ["bone marrow"] },
    { emoji: "🐜👁️🧍", answers: ["antibody", "anti body"] },
    { emoji: "🩸🏦", answers: ["blood bank", "bloodbank"] },
    { emoji: "🦶💉", answers: ["foot poke", "heel poke", "heel stick"] },
    { emoji: "🎙️🔭", answers: ["microscope", "micro scope", "micro-scope"] },
    { emoji: "🩸💨", answers: ["blood gas", "bloodgas"] },
    { emoji: "🍐 A 🌐", answers: ["parasite", "para site"] },
    { emoji: "🚶‍♂️📍Ni 🧰", answers: ["tourniquet", "torniquet", "turny kit"] },
    { emoji: "😀⚕️👩‍🔬🗓️", answers: ["happy medical lab week", "lab week"] }
];

let currentQuestion = 0;
let skippedQuestions = [];
let answeredQuestions = [];


const pictogram = document.getElementById("pictogram");
const userInput = document.getElementById("userInput");
const feedback = document.getElementById("feedback");
const gameContainer = document.querySelector(".game-container");
const endScreen = document.getElementById("end-screen");

// Load the current emoji
function loadPictogram() {
    pictogram.textContent = pictograms[currentQuestion].emoji;
    userInput.value = "";
    feedback.textContent = "";
}
//
// Check the user’s input
function checkAnswer() {
    const userAnswer = userInput.value.trim().toLowerCase();
    const validAnswers = pictograms[currentQuestion].answers.map(a => a.toLowerCase());

    if (validAnswers.includes(userAnswer)) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";

        //  Track this question as answered so it doesn't repeat
        answeredQuestions.push(currentQuestion);

        // Also remove it from the skipped list if it was skipped
        skippedQuestions = skippedQuestions.filter(i => i !== currentQuestion);

        setTimeout(() => {
            currentQuestion++;
            goToNextOrFinish();
        }, 1000);
    } else {
        feedback.textContent = "Try again!";
        feedback.style.color = "red";
    }
}


// Handle skipping a question
function skipQuestion() {
    skippedQuestions.push(currentQuestion);
    currentQuestion++;
    goToNextOrFinish();
}

// Go to next question or revisit skipped ones
function goToNextOrFinish() {
    // Go forward through unanswered questions
    while (currentQuestion < pictograms.length && answeredQuestions.includes(currentQuestion)) {
        currentQuestion++;
    }

    if (currentQuestion < pictograms.length) {
        loadPictogram();
    } else if (skippedQuestions.length > 0) {
        currentQuestion = skippedQuestions.shift();
        loadPictogram();
    } else {
        showEndScreen();
    }
}


// Show the end screen with confetti
function showEndScreen() {
    gameContainer.style.display = "none";
    endScreen.classList.remove("hidden");
    startConfetti();
}

// Confetti effect
function startConfetti() {
    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 2,
            speedY: Math.random() * 3 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`
        });
    }

    function updateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.y += p.speedY;
            if (p.y > canvas.height) p.y = 0;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(updateConfetti);
    }

    updateConfetti();
}

// Event listeners
document.getElementById("submitAnswer").addEventListener("click", checkAnswer);
document.getElementById("skipAnswer").addEventListener("click", skipQuestion);
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkAnswer();
    }
});

// Initial load
loadPictogram();
