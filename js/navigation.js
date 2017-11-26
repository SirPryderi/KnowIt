// internal navigation system
$('a:not(.collapsed)').click(function (e) {
    var location = $(this).attr('href');

    if (location.indexOf('#') === 0 && location.length > 1) {
        openSection(location);

        $('.nav-item[data-page="'+location.substr(1)+'"]').addClass('active').siblings().removeClass('active');

        e.preventDefault();
    }
});

function openSection(name) {
    $('.container').attr('hidden', true);

    $(name).attr('hidden', false);
}

var challenge = undefined;

$('.start-challenge').click(function () {
    challenge = new ChallengeController();
});