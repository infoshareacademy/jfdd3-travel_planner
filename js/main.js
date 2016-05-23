$(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});

function test() {
    $('img','.about-us-3').each(function(index) {
        $(this).hide();
       // $(this).delay(3000* index).fadeIn(3000).fadeOut();
    });
}
test();
var y;
function showCursorPos(e) {

    var b;
    if (!e) {e = event;}
    b = document.body;
    y = e.clientY + b.scrollTop;
    console.log(y);
    return y;
}

$(document).on('click', function() {
    document.onmousedown = showCursorPos;
    if (y > 1200 && y < 1900) {
        console.log(y);
       $('img', '.about-us-3').each(function() {
           $(this).fadeIn(1000);
       })
    }
});
/*$( ".about-us-1" ).appear(function() {
    alert( event.currentTarget === this );
});*/

$(function() {

    $('.about-us-2').appear().on('appear', function () {
        console.log($(this).addClass(''));
    });
});

