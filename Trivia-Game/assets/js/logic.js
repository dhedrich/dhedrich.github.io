$(document).ready(function () {
    // array of possible question objects
    var questions = [
        {
            question: "Which of the following is NOT the name of a piece of the Triforce?",
            options: [
                "Triforce of Power",
                "Triforce of Wisdom",
                "Triforce of Spirit",
                "Triforce of Courage"
            ],
            answer: "Triforce of Spirit",
            image: ""
        },
        {
            question: "Which Ocarina of Time dungeon is infamously regarded as one of the most difficult in the series?",
            options: [
                "Ganon's Castle",
                "Shadow Temple",
                "Dodongo Cavern",
                "Water Temple"
            ],
            answer: "Water Temple",
            image: ""
        },
        {
            question: "Which of the following installments in the series takes place EARLIEST in the offical Zelda timeline?",
            options: [
                "Skyward Sword",
                "A Link to the Past",
                "The Minish Cap",
                "The Legend of Zelda"
            ],
            answer: "Skyward Sword",
            image: ""
        },
        {
            question: "What is the name of Link's companion in Twilight Princess?",
            options: [
                "Navi",
                "Midna",
                "Tatl",
                "Ezlo"
            ],
            answer: "Midna",
            image: ""
        },
        {
            question: "In Ocarina of time, who are Koume and Kotake?",
            options: [
                "Zora brothers that run the diving mini-game",
                "Twin sorceress sisters",
                "Owners of the Happy Mask Shop",
                "Link's two dogs"
            ],
            answer: "Twin sorceress sisters",
            image: ""
        },
        {
            question:
                'What is the name of the Wind God in Wind Waker that teaches Link the "Wind\'s Requiem?"',
            options: [
                "Zephos",
                "Cyclos",
                "Valoo",
                "Nayru"
            ],
            answer: "Zephos",
            image: ""
        },
        {
            question: "According to lore, which of the following is NOT the name of one of the Golden Goddesses that created Hyrule?",
            options: [
                "Din",
                "Farore",
                "Nayru",
                "Hylia"
            ],
            answer: "Hylia",
            image: ""
        },
        {
            question: "What is the name of the giant monster Ganon uses to guard the Forsaken Fortress in The Wind Waker?",
            options: [
                "The Monstruous Helmaroc King",
                "Gohma",
                "Kalle Demos",
                "Molgera"
            ],
            answer: "The Monstruous Helmaroc King",
            image: ""
        },
        {
            question: "In Majora's Mask, the possessed Skull Kid seeks to destroy Clock Town by doing which of the following?",
            options: [
                "Erupting a nearby dormant volcano",
                "Crushing it with the moon",
                "Bringing in an ice age",
                "Awakening ancient beasts of destruction"
            ],
            answer: "Crushing it with the moon",
            image: ""
        },
        {
            question: "Who is the main villain in Skyward Sword?",
            options: [
                "Calamity",
                "Girahim",
                "Vaati",
                "Ganon"
            ],
            answer: "Girahim",
            image: ""
        },
        {
            question: "Which is NOT true of Tingle?",
            options: [
                "He is 35 years old",
                "He is left handed",
                "He has been under Uncle Rupee's Tingle Curse",
                "He has twin younger brothers"
            ],
            answer: "He is left handed",
            image: ""
        },
        {
            question: "What is the name of the region where Majora's Mask takes place?",
            options: [
                "Hyrule",
                "Termina",
                "Holodrum",
                "Labrynna"
            ],
            answer: "Termina",
            image: ""
        },
        {
            question: "In which game do Electric Wizzrobes first appear?",
            options: [
                "Breath of the Wild",
                "Wind Waker",
                "Twilight Princess",
                "The Legend of Zelda"
            ],
            answer: "Breath of the Wild",
            image: ""
        },
        {
            question: "Which of the following races do not appear in Ocarina of Time?",
            options: [
                "Goron",
                "Zora",
                "Shiekah",
                "Rito"
            ],
            answer: "Rito",
            image: ""
        },
        {
            question: "In the entire Legend of Zelda series, Link fights Ganon/Ganondorf in how many games?",
            options: [
                "5",
                "7",
                "9",
                "11"
            ],
            answer: "9",
            image: ""
        }
    ]

    // total correct/incorrect/unanswered num
    var scoreCorrect
    var scoreIncorrect
    var scoreUnanswered

    // active questions array, a copy of original questions array to be manipulated
    var activeQuestions

    // game active state bool
    var inPlay

    function initGame() { // initializes game
        // set game state to active
        inPlay = true

        // create copy of original questions array, shuffle it and select first 10 questions for gameplay
        activeQuestions = questions.slice()
        shuffle(activeQuestions)
        activeQuestions = activeQuestions.slice(0, 10)   // UNCOMMENT WHEN SUFFICIENT QUESTIONS HAVE BEEN ADDED 

        // initialize game scores
        scoreCorrect = 0
        scoreIncorrect = 0
        scoreUnanswered = 0
        newQuestion()
    }

    function newQuestion() { // main game logic
        // check for questions remaining in active question array
        if (activeQuestions.length > 0) {

            // initialize question timer
            var timeRemaining = 10
            $('#time-remaining').text("Time left: " + timeRemaining)

            // start question timeout
            var questionTimer = setInterval(function () {
                // decrement timer variable each second and update timer field
                timeRemaining--
                $('#time-remaining').text("Time left: " + timeRemaining)
            }, 1000)

            // when time runs out, increment unanswered score and queue cutscene, stop decrementing time remaining
            setInterval(function () {
                if (timeRemaining <= 0) {
                    scoreUnanswered++
                    displayCutScene("You ran out of time!", activeQuestions[0].answer)
                    timeRemaining = 10
                    clearInterval(questionTimer)
                }
            }, 1000)

            // populate current question field
            $('#current-question').html('<h2>' + activeQuestions[0].question + '</h2>')

            // empty current options field then populate from options array in active question object
            $('#current-options').empty()
            shuffle(activeQuestions[0].options)
            for (i = 0; i < activeQuestions[0].options.length; i++) {
                $('#current-options').append('<li class="option">' + activeQuestions[0].options[i] + '</li>')
            }

            // create click listeners for each option
            $('.option').on('click', function () {
                // check if correct answer was clicked, increment score accordingly and queue cutscene
                if (this.innerText === activeQuestions[0].answer) {
                    scoreCorrect++
                    displayCutScene("Correct!", activeQuestions[0].answer)
                } else {
                    scoreIncorrect++
                    displayCutScene("Incorrect.", activeQuestions[0].answer)
                }
                timeRemaining = 10
                clearInterval(questionTimer)
            })
        } else {
            // if no questions remain in active question array, ends the game and displays score
            endGame()
            timeRemaining = 10
            clearInterval(questionTimer)
        }
    }

    function displayCutScene(message, answer) { // display correct/incorrect/unanswered message and media for corresponding question
        $('#current-question').html('<h2>' + message + '</h2>')
        $('#current-options').html('<li>Correct answer: ' + answer + '</li>')
        setTimeout(function(){ // deletes current question in active questions array, then triggers new question logic
            activeQuestions.shift()
            newQuestion()
        }, 3000)
    }

    function shuffle(array) { // randomize order of items in an array (calling this function edits original array, does not create a copy)
        var i = 0
            , j = 0
            , temp = null
        for (i = array.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1))
            temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    }

    function endGame() { // ends the game and displays score
        inPlay = false
        $('#time-remaining').text("Time left: -")
        $('#current-question').html("<h2>You've reached the end! Here's how you did:</h2>")
        $('#current-options').html(
            '<li>Correct: ' + scoreCorrect + '</li>' +
            '<li>Incorrect: ' + scoreIncorrect + '</li>' +
            '<li>Unanswered: ' + scoreUnanswered + '</li>'
        )
        $('#new-game').show()
    }

    // click listener to start game if game is inactive
    $('#new-game').on('click', function () {
        if (!inPlay) {
            initGame()
            $(this).hide()
            $('.jumbotron').addClass('question-color')
        }
    })
})