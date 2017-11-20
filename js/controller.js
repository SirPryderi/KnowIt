// CONTROLLER

function ChallengeController() {
    this.challenge = new Challenge();
    this.questionElement = $('#question');
    this.answersElement = $('#answers');
    this.nextButton = $('#next');
    this.answered = false;

    this.nextQuestion();

    const controller = this;

    this.nextButton.unbind().click(function () {
        if (controller.answered) { // Move to next question
            controller.answered = false;
            controller.nextButton.html('Answer');
            controller.nextButton.removeClass('btn-success btn-danger').addClass('disabled btn-primary');

            try { // Handles out of lives exception
                controller.nextQuestion();
            } catch (e) {
                controller.showReport();
                return;
            }

        } else { // Give an answer
            if (!isNaN(controller.getAnswer())) // if an answer selected
                controller.answer(controller.getAnswer());
            else
                return;
        }

        if (controller.challenge.currentQuestion === null) {
            controller.showVictory();
        }
    });
}

ChallengeController.prototype.showReportShared = function () {
    $('#challenge-report').runBarAnimation();

    $('#report-answered-questions-count').text(this.challenge.rightAnswers);

    openSection('#challenge-report');
};

ChallengeController.prototype.showVictory = function () {
    $('.game-over-element').hide();
    $('.victory-element').show();

    this.showReportShared();

    playSound('victory');
};

ChallengeController.prototype.showReport = function () {
    $('.victory-element').hide();
    $('.game-over-element').show();

    this.showReportShared();

    playSound('gameover');
};

ChallengeController.prototype.getAnswer = function () {
    return parseInt(this.answersElement.find('input[name=radio]:checked').val());
};

ChallengeController.prototype.makeLivesView = function () {
    const livesHolder = $('#lives');

    livesHolder.html('');

    const lives = this.challenge.lives;
    const totalLives = this.challenge.maxLives;
    const brokenLives = totalLives - lives;

    for (var i = 0; i < brokenLives; ++i) {
        livesHolder.append($("<i class=\"material-icons\">favorite_border</i>"));
    }

    for (i = 0; i < lives; i++) {
        livesHolder.append($("<i class=\"material-icons\">favorite</i>"));
    }
};

ChallengeController.prototype.nextQuestion = function () {
    this.challenge.nextQuestion();

    if (this.challenge.currentQuestion === null)
        return;

    this.makeLivesView();
    this.makeQuestionView();
    this.makeAnswersView();
};

ChallengeController.prototype.makeQuestionView = function () {
    this.questionElement.html(this.challenge.currentQuestion.text);
};


ChallengeController.prototype.makeAnswerView = function (answer, index) {
    return $('<div class="col-md-6">' +
        '<label class="custom-control custom-radio">' +
        '<input name="radio" type="radio" class="custom-control-input" value = "' + index + '" >' +
        '<span class="custom-control-indicator"></span>' +
        '<span class="custom-control-description">' + answer + '</span>' +
        '</label>' +
        '</div>')
        ;
};

ChallengeController.prototype.makeAnswersView = function () {
    const controller = this;

    controller.answersElement.html('');

    controller.challenge.currentQuestion.options.forEach(function (a, i) {
        controller.answersElement.append(controller.makeAnswerView(a, i))
    });

    controller.answersElement.children('.col-md-6').click(function () {
        controller.nextButton.removeClass('disabled');
    });
};

ChallengeController.prototype.answer = function (index) {
    var answer = this.challenge.answer(index) === true;

    if (answer) {
        this.nextButton.removeClass('btn-primary').addClass('btn-success');
        this.answersElement.find('input').eq(index).addClass('is-valid');
        playSound('success');
    } else {
        this.nextButton.removeClass('btn-primary').addClass('btn-danger');
        this.makeLivesView();
        playSound('fail');
        this.answersElement.find('input').eq(index).addClass('is-invalid');
        this.answersElement.find('input').eq(this.challenge.currentQuestion.answer).addClass('is-valid');
    }

    //this.answersElement.find('input').prop('disabled', true);

    // TODO proper highlighting of the correct answer

    this.nextButton.html('Next');
    this.answered = true;
};

function playSound(name) {
    const audio = document.getElementById('audio-' + name);
    audio.play();
}

$(function () {
    $('.material-icons:contains("favorite_border")').hover(function () {
        $(this).html('favorite');
    }, function () {
        $(this).html('favorite_border');
    });

    $('#topics').find('.list-group-item:not(.disabled)').click(function (e) {
        $(this).toggleClass('active');
        e.preventDefault();
    });
});
