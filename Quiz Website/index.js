(function () {
    var questions = [{
        question: "What it stands for HTML?",
        choices: ["Hyper Markup Language", "Hyper Mark Language","Hypertext Markup Language", "Hypertext Language"],
        correctAnswer: 2
    }, {
        question: "What it stands for CSS?",
        choices: ["Cascading Sheet Style", "Cascading Style Sheet", "Cacading Style Sheet", "Cascading Shet Style"],
        correctAnswer: 1
    }, {
        question: "What it stands for JS?",
        choices: ["Java Script", "Javanese Script", "Japan Script", "Japanese Script"],
        correctAnswer: 0
    }, {
        question: "What is Structure of HTML?",
        choices: ["html, head, title, body", "head, title, body", "html and body", "!DOCTYPE HTML, html, head, title, body"],
        correctAnswer:  3
    }, {
        question: "HTML created in?",
        choices: ["2000", "1992", "1993", "2022"],
        correctAnswer: 2
    }, {
        question: "CSS created in?",
        choices: ["2015", "1996", "1960", "1972"],
        correctAnswer: 1
    }, {
        question: "Java Script created in?",
        choices: ["1995", "1980", "2005", "1999"],
        correctAnswer: 0
    }, {
        question: "How did you write Hello World in html?",
        choices: ["just straight up and write Hello World", "add element h1 then write Hello World inside the elemet", "add structure of html and add element h1 then write Hello World", "add structre of html and write Hello World in the body"],
        correctAnswer: 2
    }, {
        question: "What code using for Front End Web Developoment?",
        choices: ["Java, C++, Ruby", "C#, C++, Assembly", "HTML, CSS, Java", "HTML, CSS, Java Script"],
        correctAnswer: 3
    }, {
        question: "What code using for Back End Web Developoment?",
        choices: ["PHP", "Kotlin", "Java Script", "C++"],
        correctAnswer: 0
    }];

    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('#quiz'); //Quiz div object

    // Display initial question
    displayNext();

    // Click handler for the 'next' button
    $('#next').on('click', function (e) {
        e.preventDefault();

        // Suspend click listener during fade animation
        if (quiz.is(':animated')) {
            return false;
        }
        choose();

        // If no user selection, progress is stopped
        if (isNaN(selections[questionCounter])) {
            alert('Answer first question then you can next to another question, understood?');
        } else {
            questionCounter++;
            displayNext();
        }
    });

    // Click handler for the 'prev' button
    $('#prev').on('click', function (e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        choose();
        questionCounter--;
        displayNext();
    });

    // Click handler for the 'Start Over' button
    $('#start').on('click', function (e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        questionCounter = 0;
        selections = [];
        displayNext();
        $('#start').hide();
    });

    // Animates buttons on hover
    $('.button').on('mouseenter', function () {
        $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
        $(this).removeClass('active');
    });

    // Creates and returns the div that contains the questions and 
    // the answer selections
    function createQuestionElement(index) {
        var qElement = $('<div>', {
            id: 'question'
        });

        var header = $('<h2>Question ' + (index + 1) + ':</h2>');
        qElement.append(header);

        var question = $('<p>').append(questions[index].question);
        qElement.append(question);

        var radioButtons = createRadios(index);
        qElement.append(radioButtons);

        return qElement;
    }

    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
        var radioList = $('<p>');
        var item;
        var input = '';
        for (var i = 0; i < questions[index].choices.length; i++) {
            item = $('<li>');
            input = '<input type="radio" name="answer" value=' + i + ' />';
            input += questions[index].choices[i];
            item.append(input);
            radioList.append(item);
        }
        return radioList;
    }

    // Reads the user selection and pushes the value to an array
    function choose() {
        selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }

    // Displays next requested element
    function displayNext() {
        quiz.fadeOut(function () {
            $('#question').remove();

            if (questionCounter < questions.length) {
                var nextQuestion = createQuestionElement(questionCounter);
                quiz.append(nextQuestion).fadeIn();
                if (!(isNaN(selections[questionCounter]))) {
                    $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
                }

                // Controls display of 'prev' button
                if (questionCounter === 1) {
                    $('#prev').show();
                } else if (questionCounter === 0) {

                    $('#prev').hide();
                    $('#next').show();
                }
            } else {
                var scoreElem = displayScore();
                quiz.append(scoreElem).fadeIn();
                $('#next').hide();
                $('#prev').hide();
                $('#start').show();
            }
        });
    }

    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
        var score = $('<p>', { id: 'question' });

        var numCorrect = 0;
        for (var i = 0; i < selections.length; i++) {
            if (selections[i] === questions[i].correctAnswer) {
                numCorrect++;
            }
        }

        score.append('your correct number is ' + numCorrect + ' from ' + questions.length + ' questions');
        return score;
    }
})();