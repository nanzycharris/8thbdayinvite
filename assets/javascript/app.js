function hideIntro() {
    $(".card-body").empty()
}

$(document).ready(function () {
    var options = [
        {
            question: "When will we celebrate Teresa's 8th birthday?",
            choice: ["Sunday, March 8th, 2020", "Monday, February 30th, 2020", "Thursday, October 30th, 2020"],
            answer: 0,
        },
        {
            question: "Where will we celebrate Teresa's 8th birthday?",
            choice: ["Taqueria Leo's in Reynosa", "Build-a-Bear at Galleria Mall", "Jabba The Hut's Bar"],
            answer: 1,
        },
        {
            question: "Where will we go to have pizza and cake for Teresa's 8th birthday?",
            choice: ["Mos Eisley Cantina", "The Mandalorian", "Lucciano's Pizzeria"],
            answer: 2,
        },
        {
            question: "Can you guess which theme Teresa chose for her 8th birthday celebration?",
            choice: ["Unicorns", "Frozen 2", "Star Wars"],
            answer: 2,
        },
    ];

    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 25;
    var intervalId;
    var userGuess = "";
    var running = false;
    var qCount = options.length;
    var pick;
    var index = 0;
    var newArray = [];
    var holder = [];
    var text = "www.ugift529.com"
    var URL = "https://www.ugift529.com/"


    $("#reset").hide();

    // Start the game by clicking Start button
    $("#start").on("click", function () {
        $("#start").hide();
        hideIntro();
        displayQuestion();
        runTimer();
        for (var i = 0; i < options.length; i++) {
            holder.push(options[i]);
        }
    })

    // Start the timer
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }

    // Timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time left: " + timer + "</h3>");
        timer--;

        // Out of time 
        if (timer === 0) {
            unanswerCount++;
            $("#answerblock").html("<p>Time is up! The answer is: " + pick.choice[pick.answer] + "</p>");
            stop();
            nextQuestion();
        }
    }

    // Timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }

    // Display the question and answer choices
    function displayQuestion() {
        // Questions display in the order they are written
        pick = options[index];

        $("#questionblock").html("<h2>" + pick.question + "</h2>");
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            // Check the answer
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);
        }

        // Click function to select answer and outcomes
        $(".answerchoice").on("click", function () {
            userGuess = parseInt($(this).attr("data-guessvalue"));
            // Correct guess or wrong guess 
            if (userGuess === pick.answer) {
                stop();
                correctCount++;
                userGuess = "";
                $("#answerblock").html("<p>Correct!</p>");
                nextQuestion();
            } else {
                stop();
                wrongCount++;
                userGuess = "";
                $("#answerblock").html("<p>Wrong. The correct answer is: " + pick.choice[pick.answer] + "</p>");
                nextQuestion();
            }
        })
    }

    function nextQuestion() {
        $("#answerblock").append();
        newArray.push(pick);
        index++

        var nextQ = setTimeout(function () {
            $("#answerblock").empty();
            timer = 25;

            // Ending the game winning or losing
            if (((wrongCount + unanswerCount) < correctCount) && ((wrongCount + unanswerCount + correctCount) === qCount)) {
                $("#questionblock").empty();
                $("#questionblock").html("<h3>Great job! You're a winner and we want you to be part of our rebellion!<br><br>Come join the resistance at Teresa's 8th Birthday Party: <br><br>Date: Sunday, March 8th, 2020 at 2:30 p.m. <br><br>Place: Build-a-Bear at Galleria Mall <br><br>Afterwards, come downstairs for pizza and cake at Lucciano's Pizzeria. <br><br>In lieu of presents, please make a gift to Teresa's college fund.<br><br> To donate, click here: <a href='https://www.ugift529.com' target='_blank'>www.ugift529.com</a> and use the code N7W - N5Y <br> <br>Please RSVP via text message to Nancy.<br><br>We look forward to seeing you there!</h3>");
                $("#timeleft").hide();
            } else if (((wrongCount + unanswerCount + correctCount) === qCount) && (wrongCount + unanswerCount) >= correctCount) {
                $("#questionblock").empty();
                $("#questionblock").html("<h3>Sorry... you need more correct answers to unlock <br> <br> all the details to Teresa's birthday party <br> <br>Please try again by clicking the Restart button.</h3>");
                $("#timeleft").hide();
                $("#reset").show();
            } else {
                runTimer();
                displayQuestion();
            }
        }, 2500);
    }

    function restart() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for (var i = 0; i < holder.length; i++) {
            console.log(holder)
            options.push(holder[i]);
        }
        index = 0;
        wrongCount = 0;
        unanswerCount = 0;
        correctCount = 0;
        runTimer();
        displayQuestion();
    }

    $("#reset").on("click", function () {
        restart()
    })
})
