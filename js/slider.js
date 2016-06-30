$(document).ready(function () {

    var images = ['url(images/sail-boat1080.jpg)', 'url(images/starowkanoc.jpg)', 'url(images/gdansknoc.jpg)', 'url(images/dluganoca.jpg)', 'url(images/zuraw-gdanski-hi-res.jpg)'];
    console.log(images);
    //  variable to store index
    var i = 0;
    var carouselIndicators = $('.image-indicator');


    $('#right')
        .click(function () {
            // update index based on array length
            i = i % images.length;
            // update background from array using the index value
            $('.fill').css({'background-image': images[i++], 'transition': '1s'});
            console.log("right: " + i);
        });


    $('#left')
        .click(function () {

            // update background from array using the index value
            if(i === 0) {
                i = images.length;
            } else {
                $('.fill').css({'background-image': images[i--], 'transition': '1s'});
            }
            console.log("left: " + i);
        });

    $('main-slider-container').trigger(setInterval(function () {
        $('#right').click();
        console.log(i);
    }, 3000));


    // carouselIndicators.each(function (index) {
    //         $(this).click(function () {
    //             $('.image-indicator').removeClass('indicator-background');
    //             $(this).addClass('indicator-background');
    //         });
    // });

    carouselIndicators.on("click", function(){
        switch(true) {
            case $(this).hasClass('indicator1'):
                $('.fill').css({'background-image': images[0], 'transition': '1s'});
                i = 0;
                break;
            case $(this).hasClass('indicator2'):
                $('.fill').css({'background-image': images[1], 'transition': '1s'});
                i = 1;
                break;
            case $(this).hasClass('indicator3'):
                $('.fill').css({'background-image': images[2], 'transition': '1s'});
                i = 2;
                break;
            case $(this).hasClass('indicator4'):
                $('.fill').css({'background-image': images[3], 'transition': '1s'});
                i = 3;
                break;
            case $(this).hasClass('indicator5'):
                $('.fill').css({'background-image': images[4], 'transition': '1s'});
                i = 4;
                break;
        }
    });
});










