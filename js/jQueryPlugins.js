$.fn.runBarAnimation = function () {
    var bars = this.find('.progress-bar');

    $.each(bars, function () {
        var bar = $(this);

        bar.attr('width', bar.width());

        bar.cssNoTransition('width', -20);
    });

    bars.animateBar(0);

    return this;
};

$.fn.animateBar = function (i) {
    var bars = this;
    var bar = this.eq(i);

    if (bar === null)
        return;

    bar.delay(200).animate({width: bar.attr('width') + "%"}, 500, function () {
        bars.animateBar(++i);
    });

    return bars;
};

$.fn.redraw = function () {
    if ($(this).first()[0] === undefined)
        return this;

    $(this).first()[0].offsetHeight || $('body')[0].offsetHeight; // forces a draw in the main window if the element is off screen

    return this;
};

$.fn.cssNoTransition = function () {
    $(this)
        .css('transition', 'none')
        .css.apply(this, arguments)
        .redraw()
        .css('transition', '');
    return this;
};