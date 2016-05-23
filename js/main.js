//function for scrolling page to desired div element

// $(function() {
//     $('a[href*="#"]:not([href="#"])').click(function() {
//         if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
//             var target = $(this.hash);
//             target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
//             if (target.length) {
//                 $('html, body').animate({
//                     scrollTop: target.offset().top
//                 }, 1000,'swing',function() {
//                     window.location.hash = target;
//                     $(document).on("scroll", onScroll);
//                 });
//                 return false;
//             }
//         }
//     });
// });



// set on function with event triggering onScroll function
$(document).ready(function() {
    // $(window).scroll(function() {
    //   var window_top = $(window).scrollTop();
    // })
    $(document).on("scroll", onScroll);

    /* detect which link is clicked, remove class active from all a tags and add active class
     to clicked a tag
     */
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault(); //why this????
        $(document).off("scroll");

        //find all a tags with nav-link class and remove from them class active
        $(this).hasClass('nav-link') ? $('a').each(function() {
            $(this).removeClass('active');
        }) : '' ;



        //for this item if nav-link is present add new class active
        $(this).hasClass('nav-link') ? $(this).addClass('active') : '' ;
        console.log('link clicked');
        var target = this.hash;
        menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 1000, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});

// TODO opis wymagany
function onScroll(){
    var scrollPos = $(document).scrollTop();
    $('a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}










