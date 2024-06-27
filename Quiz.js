class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.score = 0;
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    checkAnswer(answer) {
        if (answer === this.getCurrentQuestion().correctAnswer) {
            this.score++;
        }
    }

    nextQuestion() {
        this.currentQuestionIndex++;
    }

    isQuizOver() {
        return this.currentQuestionIndex >= this.questions.length;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const quizzes = {
        history: [
            {
                question: "Who was the first President of the United States?",
                options: ["George Washington", "Thomas Jefferson", "John Adams", "Benjamin Franklin"],
                correctAnswer: 0
            },
            {
                question: "When did World War II end?",
                options: ["1945", "1939", "1918", "1963"],
                correctAnswer: 0
            }, {
                question: "What is the chemical symbol for water?",
                options: ["H2O", "O2", "H2", "HO"],
                correctAnswer: 0
            },
            {
                question: "What planet is known as the Red Planet?",
                options: ["Mars", "Earth", "Jupiter", "Saturn"],
                correctAnswer: 0
            }
        ],
       
    };

    const quiz = new Quiz(quizzes.history);

    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const nextButton = document.getElementById('next-button');
    const resultContainer = document.getElementById('result-container');

    function displayQuestion() {
        const currentQuestion = quiz.getCurrentQuestion();
        questionContainer.textContent = currentQuestion.question;
        optionsContainer.innerHTML = '';

        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => {
                quiz.checkAnswer(index);
                if (quiz.isQuizOver()) {
                    displayResult();
                } else {
                    quiz.nextQuestion();
                    displayQuestion();
                }
            });
            optionsContainer.appendChild(button);
        });

        updateProgress();
    }

    function updateProgress() {
        const progressContainer = document.getElementById('progress-container');
        progressContainer.textContent = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`;
    }

    function displayResult() {
        questionContainer.style.display = 'none';
        optionsContainer.style.display = 'none';
        nextButton.style.display = 'none';
        resultContainer.style.display = 'block';
        resultContainer.textContent = `You scored ${quiz.score} out of ${quiz.questions.length}`;
    }

    nextButton.addEventListener('click', () => {
        if (quiz.isQuizOver()) {
            displayResult();
        } else {
            quiz.nextQuestion();
            displayQuestion();
        }
    });

    displayQuestion();
});
