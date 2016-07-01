//function for scrolling page to desired div element





// set on function with event triggering onScroll function
$(document).ready(function() {
    var CurrentScroll = 0;
    $(window).scroll(function(event){

        var NextScroll = $(this).scrollTop();

        if (NextScroll > CurrentScroll && CurrentScroll === 0){
            $("#btn1").trigger('click');

        }
        else if (NextScroll < CurrentScroll && NextScroll === 0){
            $("#btn2").trigger('click');
        }
        CurrentScroll = NextScroll;
    });


    $(function() {
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000,'swing',function() {
                        window.location.hash = target;
                        $(document).on("scroll", onScroll);
                    });
                    return false;
                }
            }
        });
    });




    $(window).scroll(function() {
        var window_top = $(window).scrollTop();
    });
    $('.container-map').css({'height': (screen.height-160)+'px'});
    $('.fog-on-map').css({'height': (screen.height-160)+'px'});
    $('.main-slider-container').css({'height': (screen.height-160)+'px'});
    console.log(screen.width);
    $(document).on("scroll", onScroll);

    /* detect which link is clicked, remove class active from all a tags and add active class
     to clicked a tag
     */
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault(); //prevent page reload on click event
        $(document).off("scroll");

        //find all a tags with nav-link class and remove from them class active
        $(this).hasClass('nav-link') ? $('a').each(function() {
            $(this).removeClass('navigation-active');
        }) : '' ;

        //for this item if nav-link is present add new class active
        $(this).hasClass('nav-link') ? $(this).addClass('navigation-active') : '' ;
        console.log('link clicked');
        var target = this.hash;
        if (target === '#premiere' || target === '#about-us') {$('.about-us-image').animate({opacity: 1},3000);}
        menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 1000, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });


    // TODO opis wymagany
    function onScroll(){
        var scrollPos = $(window).scrollTop();

        $('a:not([href*="http"],[href="#"])').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && (refElement.position().top + refElement.height()) > scrollPos) {
                $('a').removeClass("navigation-active");
                currLink.addClass("navigation-active");
                if (currLink.attr("href") === '#premiere') {$('.about-us-image').animate({opacity: 1},3000);}
            }
            else{
                currLink.removeClass("navigation-active");
            }
        });
    }

    $(document).keydown(function(e){
        if (e.keyCode == 38) {
            $("#btn2").trigger('click') ;
        }else if (e.keyCode == 40) {
            $("#btn1").trigger('click');
        }
    });


    $("#btn1").click(function(){

        $("#div1").animate({top: '-100%', left: '25%', opacity: '0', width: '50%'},{ duration: 1000, queue: false });


    });

    $("#btn2").click(function(){

        $("#div1").animate({top: '0px', left: '0', opacity: '1', width: '100%'},{ duration: 1000, queue: false });


    });
});