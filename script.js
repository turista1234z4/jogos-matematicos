document.addEventListener("DOMContentLoaded", () => {
    const locations = document.querySelectorAll(".location");
    const questionElement = document.getElementById("question");
    const answerElement = document.getElementById("answer");
    const feedbackElement = document.getElementById("feedback");
    const submitButton = document.getElementById("submit-answer");
    const congratulationsElement = document.getElementById("congratulations");
    let tema = false;

    let currentQuestion = null;
    let correctAnswers = 0;

    locations.forEach(location => {
        location.addEventListener("click", () => {
            currentQuestion = location;
            questionElement.textContent = location.getAttribute("data-question");
            answerElement.value = "";
            feedbackElement.textContent = "";
        });
    });

    submitButton.addEventListener("click", () => {
        if (!currentQuestion) {
            feedbackElement.textContent = "Selecione uma localização primeiro!";
            return;
        }

        const userAnswer = answerElement.value.trim();
        const correctAnswer = currentQuestion.getAttribute("data-answer");

        if (userAnswer === correctAnswer) {
            feedbackElement.textContent = "Correto!";
            feedbackElement.style.color = "green";
            if (!currentQuestion.classList.contains("correct")) {
                currentQuestion.classList.add("correct");
                correctAnswers++;
            }
            if (correctAnswers === locations.length) {
                displayCongratulations();
            }
        } else {
            feedbackElement.textContent = "Incorreto. Tente novamente.";
            feedbackElement.style.color = "red";
        }
    });

    function displayCongratulations() {
        feedbackElement.textContent = "";
        congratulationsElement.textContent = "Parabéns! Você completou todas as perguntas!";
        congratulationsElement.style.display = "block";
    }
});

let sequence = [];
        let nextNumber;

        function generateSequence() {
            const start = Math.floor(Math.random() * 10);
            const step = Math.floor(Math.random() * 5) + 1;
            sequence = [start, start + step, start + 2 * step, start + 3 * step];
            nextNumber = start + 4 * step;
            document.getElementById('sequence').innerText = sequence.join(', ');
            document.getElementById('message').innerText = '';
            document.getElementById('guess').value = '';
        }

        function checkGuess() {
            const guess = parseInt(document.getElementById('guess').value);
            if (guess === nextNumber) {
                document.getElementById('message').innerText = 'Correto! Bem feito!';
            } else {
                document.getElementById('message').innerText = 'Errado. Tente novamente!';
            }
        }

        // Gera uma sequência inicial ao carregar a página
        window.onload = generateSequence;

        document.getElementById('theme-toggle').addEventListener('change', function() {
            tema = true;
            if(tema == true){
            document.body.classList.toggle('dark-theme');
            }
        });

        document.getElementById('theme-toggle2').addEventListener('change', function() {
            tema = false;
            if(tema == false){
            document.body.classList.toggle('colorblind-theme');
            }
        });

        