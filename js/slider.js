$(document).ready(function () {
   // console.log('ready!');


    var images = ['url(images/sail-boat1080.jpg)', 'url(images/bazylika1080.jpg)', 'url(images/brama-wyzynna1080.jpg)', 'url(images/dluga-ulica1080.jpg)', 'url(images/zuraw-gdanski-hi-res.jpg)'];
   // var imagesToLeft = ['url(images/zuraw-gdanski-hi-res.jpg)', 'url(images/twierdza_wisloujscie.jpg)', 'url(images/sad_ostateczny.jpg)', 'url(images/sail-boat.jpg)'];

    //  variable to store index
    var i = 0;
    var j = 0;
    var carouselIndicators = $('.image-indicator');


    $('#right')
        .click(function() {
            // update index based on array length
            i = i % images.length;
            // update background from array using the index value
            $('.fill').css({'background-image': images[i++], 'background-size': 'cover', 'transition': '1s'});
            carouselIndicators.each(function () {
                console.log(this);
                $('.image-indicator').removeClass('indicator-background');
                $(this).addClass('indicator-background');
            });

    });


    // carouselIndicators.each(function (index) {
    //         $(this).click(function () {
    //             $('.image-indicator').removeClass('indicator-background');
    //             $(this).addClass('indicator-background');
    //         });
    // });

    $('#right').trigger(setInterval(function () {
           $('#right').click();
    },5000));



    $('#left').click(function() {
        j = j % imagesToLeft.length;
        $('.fill').css({'background-image': imagesToLeft[j++], 'background-size':'cover'});
    });




});








