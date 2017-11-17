// MODEL

// FAKE DATA SET // REAL APP RETRIEVES THIS FROM DATABASE
var questions = [
    new Question("This question is appearing because I wasn't able to retrieve questions from the API server. Are you okay with that?", ['Yes'], 0),
    new Question("Backup question! Is this app awesome?", ['Yes', 'No'], 0),
    new Question("What is the equation of the linear momentum?", ['L = ½<i>m</i> &Cross; <i>v</i><sup>2</sup>', 'L = <i>m</i> &Cross; <i>v</i>'], 1)
];

Array.prototype.shuffle = function () {
    // Makes sure that True/False answers are in the right order
    if (this.length === 2 && this.indexOf('True') !== false && this.indexOf('False') !== false) {
        this.length = 0;

        this.push('True');
        this.push('False');

        return this;
    }


    var i = this.length, j, temp;
    if (i === 0) return this;
    while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
    return this;
};

$.getJSON('https://opentdb.com/api.php?amount=30&category=18')
    .done(function (data) {
        questions = [];

        data.results.forEach(function (t) {
            var options = t.incorrect_answers;

            options.push(t.correct_answer);

            options.shuffle();

            const solution = options.indexOf(t.correct_answer);

            questions.push(new Question(t.question, options, solution));
        })
    })
    .fail();

function Question(text, options, answer) {
    this.text = text;
    this.options = options;
    this.answer = answer;
}

Question.next = function (i) {
    if (typeof questions[i] !== 'undefined')
        return questions[i];
    else
        return null;
};

Question.prototype.isRight = function (i) {
    // REAL APP WILL NOT KNOW CONTAIN THE SOLUTION CLIENT SIDE - VALIDATION WILL BE DONE REMOTELY
    return i === this.answer;
};

function Challenge() {
    this.maxLives = 3;
    this.lives = this.maxLives;
    this.stage = -1;
    this.rightAnswers = 0;
    this.currentQuestion = undefined;
    this.nextQuestion();
}

Challenge.prototype.nextQuestion = function () {
    if (this.lives <= 0)
        throw new Error('No more lives!');

    this.currentQuestion = Question.next(this.stage);

    this.stage++;
};

Challenge.prototype.answer = function (i) {
    if (this.currentQuestion.isRight(i)) {
        this.rightAnswers++;
        return true;
    }

    this.lives--;

    return this.currentQuestion.answer;
};