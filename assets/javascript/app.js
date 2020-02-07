function hideIntro() {
    $(".card-body").empty()
}

$(document).ready(function () {
    var options = [
        {
            question: "Author of \"Holes\" and \"Sideway Stories from Wayside School\" among other chapter books popular among young readers. Winner of the National Book Award and Newbery Medal.",
            choice: ["Gary Paulsen", "Stanley Sachar", "Louis Sachar", "Anna Sewell"],
            answer: 2,
        },
        {
            question: "This classic novel written by Anna Sewell was first published in 1877. It is considered the predecessor of a genre later known as pony books.",
            choice: ["War Horse", "Black Beauty", "National Velvet", "The Black Stallion"],
            answer: 1,
        },
        {
            question: "This picture book by prolific author and illustrator Eric Carle celebrated its 50th anniversary in 2019. It is a favorite of kindergarten teachers and students because it involves curriculum related themes such as growth, numbers, and days of the week.",
            choice: ["The Very Hungry Caterpillar", "Brown Bear, Brown Bear, What Do You See?", "Today is Monday", "Mister Seahorse"],
            answer: 0,
        },
        {
            question: "Written and illustrated by Shel Silverstein, this children\'s picture book had sold over 8.5 million copies by 2011 and has been translated into numerous languages. Its interpretation has been dividing readers since 1964 when it was published by Harper & Row.",
            choice: ["Where the Sidewalk Ends", "Runny Rabbit", "Where the Wild Things Are", "The Giving Tree"],
            answer: 3,
        },
        {
            question: "Born in 1899, this American author was a long-time contributor to The New Yorker, in addition to writing classic children\'s books such as \"Charlotte\'s Web\" and \"Stuart Little.\"",
            choice: ["E. B. White", "Truman Capote", "J. D. Salinger", "Roald Dahl"],
            answer: 0,
        },
        {
            question: "Literary award given annually by the Association for Library Service to Children (ALSC), a division of the American Library Association (ALA) to the author of \"the most distinguished contribution to American literature for children.\" Among its recipients are Louis Sachar, Marguerite Henry, and Kate DiCamillo.",
            choice: ["Hans Christian Andersen Award", "Newbery Medal", "Caldecott Medal", "Carnegie Medal"],
            answer: 1,
        },
        {
            question: "This author and illustrator was the first to introduce the technique of collage on children\'s picture books. He was a recipient of the Lewis Carroll Shelf Award. Among his books are \"Inch by Inch,\" \"A Color of His Own,\" and \"Alexander and the Wind-up Mouse.\"",
            choice: ["Eric Carle", "Shel Silberstein", "Leo Lionni", "Mo Willems"],
            answer: 2,
        },
        {
            question: "This British author not only has sold over 250 million copies worldwide, he also was a poet, screenwriter, and fighter pilot. He authored beloved children\'s literature works such as \"Matilda,\" \"Charlie and the Chocolate Factory,\" and \"The Witches.\"",
            choice: ["C. S. Lewis", "John Newbery", "Charles Dickens", "Roald Dahl"],
            answer: 3,
        },
        {
            question: "This novel by Kate DiCamillo was awarded the 2004 Newbery Medal. Divided into four \"books\" and finalized in a coda, the main plot tells the adventures of a little mouse who can read and sets out on a quest of honor and love.",
            choice: ["The Tale of Despereaux", "Stuart Little", "Alexander and the Wind-up Mouse", "An American Tail"],
            answer: 0,
        },
        {
            question: "Author of bedtime classic picture books like \"Goodnight Moon,\" \"The Runaway Bunny,\" and \"Big Red Barn;\" also wrote under the pseudonym Golden MacDonald.",
            choice: ["Felicia Bond", "Margaret Wise Brown", "Clement Hurd", "David Shannon"],
            answer: 1,
        },
        {
            question: "This American children\'s author and illustrator is better known by the pen name under which he wrote more than 60 titles. Among his books are \"Horton Hears a Who,\" \"Green Eggs and Ham,\" \"The Cat in the Hat,\" and \"How the Grinch Stole Christmas\!\"",
            choice: ["Gene Zion", "P. D. Eastman", "Theodor Seuss Geisel", "Michael Bond"],
            answer: 2,
        },
        {
            question: "This popular series of children\'s books was founded in 1942. Many of its titles have become best sellers, such as \The Little Red Hen,\" \"The Poky Little Puppy,\" and \"The Monster at the End of This Book.\"",
            choice: ["Scholastic Book Club", "Red Randall Series", "Golden Goose Books", "Little Golden Books"],
            answer: 3,
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
    var index;
    var newArray = [];
    var holder = [];


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
    // Random questions 
    // Display the question and answer choices
    function displayQuestion() {
        // Random index in array 
        index = Math.floor(Math.random() * options.length);
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
        options.splice(index, 1);

        var nextQ = setTimeout(function () {
            $("#answerblock").empty();
            timer = 25;

            // Final score
            if ((wrongCount + correctCount + unanswerCount) === qCount) {
                $("#questionblock").empty();
                $("#questionblock").html("<h3>Great job! Your results are: </h3>");
                $("#answerblock").append("<h4>Correct answers: " + correctCount + "</h4>");
                $("#answerblock").append("<h4>Wrong answers: " + wrongCount + "</h4>");
                $("#answerblock").append("<h4>No answer: " + unanswerCount + "</h4>");
                $("#reset").show();
                correctCount = 0;
                wrongCount = 0;
                unanswerCount = 0;
            } else {
                runTimer();
                displayQuestion();
            }
        }, 2500);
    }

    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for (var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    })
})