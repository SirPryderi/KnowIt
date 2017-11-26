// internal navigation system
$('a:not(.collapsed)').click(function (e) {
    var location = $(this).attr('href');

    if (location.indexOf('#') === 0 && location.length > 1) {
        openSection(location);

        e.preventDefault();
    }
});

function openSection(name) {
    $('.container').attr('hidden', true);

    $('.nav-item').removeClass('active');

    $('.nav-item[data-page="' + name.substr(1) + '"]').addClass('active');

    $(name).attr('hidden', false);
}

var challenge = undefined;

$('.start-challenge').click(function () {
    challenge = new ChallengeController();
});


$('a:contains("share")').click(function (e) {
   alert('Share function not present in the prototype.');
   e.preventDefault();
});

$('a:contains("favorite")').click(function (e) {
    alert('Like function not present in the prototype.');
    e.preventDefault();
});

$('a:contains("comment")').click(function (e) {
    alert('Comment function not present in the prototype.');
    e.preventDefault();
});