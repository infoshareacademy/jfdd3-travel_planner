/**
 * Created by Lukasz on 2016-06-07.
 */
$(document).ready(function () {
    
    function initialize() {
        var mapProp = {
            center:new google.maps.LatLng(54.3466531,18.6483953),
            zoom:14,
            mapTypeId:google.maps.MapTypeId.ROADMAP
        };
        var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);

    }
    google.maps.event.addDomListener(window, 'load', initialize);
   
    var $places = [
        {
            name: 'Fontanna Neptuna',
            coordinates: {lat: 54.3485481, lng: 18.6510408}
        },
        {
            name: 'Żuraw Gadński',
            coordinates: {lat: 54.3505653, lng: 18.6553181}
        },
        {
            name: 'Twierdza Wisłoujście',
            coordinates: {lat: 54.3958477, lng: 18.6769724}
        },
        {
            name: 'Westerplatte',
            coordinates: {lat: 54.4067082, lng: 18.6658734}
        }
    ];
    console.log($places);

    var $coordinates = $.map( $places, function(n){

        return n.coordinates;
    });
    console.log($coordinates);

    var $randomPlaces = $coordinates.forEach(function(element, index) {
        return element[index].Math.round(Math.random) * 2;
    });
    console.log($randomPlaces);
    
});

