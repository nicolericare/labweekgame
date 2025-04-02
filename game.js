const pictograms = [
    { emoji: "🎤👘", answer: "microbe" },
    { emoji: "🦴 🇲 ➡️", answer: "bone marrow" },
    { emoji: "🐜👁️🧍", answer: "antibody" },
    { emoji: "🩸🏦", answer: "blood bank" },
    { emoji: "🦶💉", answer: "foot poke" },
    { emoji: "🎙️🔭", answer: "microscope" },
    { emoji: "🩸💨", answer: "blood gas" },
    { emoji: "🍐 A 🌐", answer: "parasite" },
    { emoji:  "🚶‍♂️📍Ni 🧰", answer: "torniquet" },
    { emoji: "😀⚕️👩‍🔬🗓️", answer: "happy medical lab week" }
];

let currentQuestion = 0;

const pictogramElement = document.getElementById("pictogram");
const userInput = document.getElementById("userInput");
const submitButton = document.getElementById("submitAnswer");
const feedback = document.getElementById("feedback");
const endScreen = document.getElementById("end-screen"); 

// Function to load the next pictogram
function loadPictogram() {
    pictogramElement.textContent = pictograms[currentQuestion].emoji;
    userInput.value = ""; 
    feedback.textContent = ""; 
}

// Initial load
loadPictogram();

// Function to check answer
function checkAnswer() {
    let userAnswer = userInput.value.trim().toLowerCase(); // Case insensitive
    let correctAnswer = pictograms[currentQuestion].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";

        setTimeout(() => {
            currentQuestion++;

            if (currentQuestion < pictograms.length) {
                loadPictogram();
            } else {
                // Show the end screen instead of replacing the container
                showEndScreen();
            }
        }, 1000); // Wait 1 second before showing next question

    } else {
        feedback.textContent = "Try again!";
        feedback.style.color = "red";
    }
}

// Event Listener for Clicking Submit Button
submitButton.addEventListener("click", checkAnswer);

// Event Listener for Pressing "Enter" Key
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevents form submission (if inside a form)
        checkAnswer();
    }
});

// Function to show the end screen
function showEndScreen() {
    document.querySelector(".game-container").style.display = "none"; // Hide game container
    endScreen.classList.remove("hidden"); // Show the end screen
    startConfetti(); 
}

// Confetti effect using canvas
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
        particles.forEach((p) => {
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
