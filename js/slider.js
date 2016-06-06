$(document).ready(function () {

    var images = ['url(images/sail-boat1080.jpg)', 'url(images/bazylika1080.jpg)', 'url(images/brama-wyzynna1080.jpg)', 'url(images/dluga-ulica1080.jpg)', 'url(images/zuraw-gdanski-hi-res.jpg)'];

    //  variable to store index
    var i = 0;
    var carouselIndicators = $('.image-indicator');


    $('#right')
        .click(function () {
            // update index based on array length
            i = i % images.length;
            // update background from array using the index value
            $('.fill').css({'background-image': images[i++], 'background-size': 'cover', 'transition': '1s'});
            console.log("right: " + i);
        });


    $('#left')
        .click(function () {
            // update index based on array length
            i = i % images.length;
            // update background from array using the index value
            $('.fill').css({'background-image': images[i++], 'background-size': 'cover', 'transition': '1s'});
            console.log("left: " + i);
        });

    // $('main-slider-container').trigger(setInterval(function () {
    //     $('#left').click();
    //     console.log(i);
    // }, 3000));


    // carouselIndicators.each(function (index) {
    //         $(this).click(function () {
    //             $('.image-indicator').removeClass('indicator-background');
    //             $(this).addClass('indicator-background');
    //         });
    // });
});








