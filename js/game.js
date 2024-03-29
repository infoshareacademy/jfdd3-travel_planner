/**
 * Created by Radek on 2016-05-27.
 */
'use strict';
var $game = $('#webgame');
var $menu = $('#menugame');
var positionStart = 0;
var score = 0;
var counter = 30;
var positionEnd, wayPoints, lastPosition, newPosition, last;
var route = [];
var routeFixed = [];

function createBoard() {
    var $table = $('<table>');
    var k = 0;
    for (var i=1; i<29; i++) {
        var $tr = $('<tr>');
        $table.append($tr);
        for (var j=1; j<41; j++) {
            var $td = $('<td>');
            $td.addClass('cell').data('cellindex',k);
            $tr.append($td);
            k++;
        }
    }
    $game.empty().append($table);
    for (var l=0; l<4; l++) {
        $game.append($('<div>'));
    }
    $('div', $game).eq(0).addClass('playButton').append($('<button>'));
    $('div', $game).eq(1).addClass('info');
    $('div', $game).eq(2).addClass('legend').text('Sterowanie: myszka / wybór torów klawisze: 1-6, kasowanie: 0. Połącz START (zielony romb) z METĄ.');
    $('div', $game).eq(3).addClass('legend2').text(' Punkty otrzymasz za każdy podłączony przystanek do linii. Liczba torów jest OGRANICZONA.');
    if (positionStart === 0) {
        $('button').text('Rozpocznij grę!');
    } else {$('button').text('Rozpocznij przejazd !');}
}

function createPlaces() {
    var possibleStarts = [243,443,564];
    wayPoints = [330,373,417,452,489,572,689,694,776,616];
    var waypointsColors = ['red','blue','brown','green','yellow'];
    var possibleEnds = [541,623];
    positionStart = possibleStarts[Math.round(Math.random() * 2)];
    positionEnd = possibleEnds[Math.round(Math.random())];
    delete wayPoints[Math.round(Math.random() * 8)];
    delete wayPoints[Math.round(Math.random() * 8)];
    $('td', $game).eq(positionStart).addClass('start');
    $('td', $game).eq(positionEnd).addClass('end');
    wayPoints.forEach(function(a) {
        $('td', $game).eq(a).addClass('waypoint');
        var waypointColor = waypointsColors[Math.round(Math.random() * 4)];
        $('td', $game).eq(a).addClass(waypointColor);
    });
}

function createMenu() {
    var $table = $('<table>');
    var k = 0;
    for (var i = 1; i < 11; i++) {
        var $tr = $('<tr>');
        $table.append($tr);
        for (var j = 1; j < 11; j++) {
            var $td = $('<td>');
            $td.addClass('cell').data('menuCellindex', k);
            $tr.append($td);
            k++;
        }
    }
    $menu.empty().append($table);
    $('td', $menu).eq(11).addClass('rail_v');
    $('td', $menu).eq(31).addClass('rail_h');
    $('td', $menu).eq(15).addClass('rail_t1');
    $('td', $menu).eq(13).addClass('rail_t2');
    $('td', $menu).eq(35).addClass('rail_t3');
    $('td', $menu).eq(33).addClass('rail_t4');
    $('td', $menu).eq(27).addClass('buldoze');
    $('td', $menu).eq(51).addClass('brown');
    $('td', $menu).eq(52).text('2');
    $('td', $menu).eq(54).addClass('red');
    $('td', $menu).eq(55).text('5');
    $('td', $menu).eq(71).addClass('yellow');
    $('td', $menu).eq(72).text('10');
    $('td', $menu).eq(74).addClass('green');
    $('td', $menu).eq(75).text('12');
    $('td', $menu).eq(77).addClass('blue');
    $('td', $menu).eq(78).text('15');
    $menu.append($('<div>'));
    $('div', $menu).addClass('menu-counter').text('Pozostało torów do użycia: '+counter);
}
function onEscKey() {
    $(document).keydown(function(e) {
        if (e.keyCode == 27) {
            $('.build').css({
                'display': 'none'}
            );
            $(document).off('mousemove');
            $game.off();
        }                                   
        if (e.keyCode == 50) {
            $('.rail_v', $menu).trigger('click');
        }
        if (e.keyCode == 51) {
            $('.rail_t2', $menu).trigger('click');
        }
        if (e.keyCode == 53) {
            $('.rail_t1', $menu).trigger('click');
        }
        if (e.keyCode == 49) {
            $('.rail_h', $menu).trigger('click');
        }
        if (e.keyCode == 52) {
            $('.rail_t4', $menu).trigger('click');
        }
        if (e.keyCode == 54) {
            $('.rail_t3', $menu).trigger('click');
        }
        if (e.keyCode == 48) {
            $('.buldoze', $menu).trigger('click');
        }
    });
}


function createInfo() {
    var $info = $('div.info');
    for (var i=0; i<3; i++) {
        $info.append($('<div>'));
    }
    $('div', $info).eq(0).addClass('info-box1').text('Sprawdzanie trasy... ');
    $('div', $info).eq(1).addClass('info-box2').text('Przejazd metra...').css({
       'display': 'none'
    });
    $('div', $info).eq(2).addClass('info-box3').text('Twój wynik: '+score).css({
        'display': 'none'
    });
}

function buildRail(railPosition) {
    $game.off();
    $(document).mousemove(function() {
        var x=event.x+window.pageXOffset-10;
        var y=event.y+window.pageYOffset-10;
        $('.build').css({
            'display': 'block',
            'backgroundImage': 'url(images/rail_'+railPosition+'.png)',
            'top': y+'px',
            'left': x+'px'}
        );
    });
    if (railPosition !== 'bz') {
        if (counter > 0) {
        $game.on('click', 'td:not(.start,.end,.waypoint,.rail_h, .rail_v, .rail_t1, .rail_t2, .rail_t3, .rail_t4)', function () {
            $(this).addClass('rail_' + railPosition);
            route.push($(this).data('cellindex'));
            counter = counter - 1;
            $('div', $menu).addClass('menu-counter').text('Pozostało torów do użycia: ' + counter);
            if (counter === 0) {$game.off();}
            playSound('audio/track.wav');
        });
        }
    } else {
        $game.on('click', 'td:not(.start,.waypoint,.end)', function () {
            $(this).removeClass().addClass('cell');
            var indexRemovedCell = route.indexOf($(this).data('cellindex'));
            delete route[indexRemovedCell];
            counter = counter + 1;
            $('div', $menu).addClass('menu-counter').text('Pozostało torów do użycia: '+counter);
            playSound('audio/explosion.wav')
        });
    }

}

function onClicks() {
    $menu.on('click','.rail_v', function() {
        buildRail('v');
    });
    $menu.on('click','.rail_h', function() {
        buildRail('h');
    });
    $menu.on('click','.rail_t1', function() {
        buildRail('t1');
    });
    $menu.on('click','.rail_t2', function() {
        buildRail('t2');
    });
    $menu.on('click','.rail_t3', function() {
        buildRail('t3');
    });
    $menu.on('click','.rail_t4', function() {
        buildRail('t4');
    });
    $menu.on('click','.buldoze', function() {
        buildRail('bz');
    });
    $('.playButton').off();
    $('.playButton').on('click','button', function() {
        $(document).off('mousemove');
        $game.off();
        $menu.off();
        $('.build').css({'display': 'none'});
        $(this).css({'display': 'none'});
        $('.info').css({'display': 'block'});
        $('.info-box1').css({'backgroundImage': 'url(images/loading.gif)'});
        createInfo();
        wayPoints.forEach(function(a) {route.push(a);});
        route.push(positionEnd);
        fixRoute();
    })
}
function findNextVerticaly(lastPlace) {
    if (route.some(function(a) {return (lastPlace-40 === a);})) {  // find new track on top side
        if ($('td', $game).eq(lastPlace - 40).hasClass('rail_v')) {
            newPosition = lastPlace - 40;
            $game.data('newDirection', 'v');
            return true;
        } else if (($('td', $game).eq(lastPlace - 40).hasClass('rail_t1')) || ($('td', $game).eq(lastPlace - 40).hasClass('rail_t2'))) {
            newPosition = lastPlace - 40;
            $game.data('newDirection', 'h');
            return true;
        }  else if (($('td', $game).eq(lastPlace-40).hasClass('waypoint')) || ($('td', $game).eq(lastPlace-40).hasClass('end'))) {
            newPosition = lastPlace-40;
            $game.data('newDirection','');
            return true;
        }
    }
    if (route.some(function(a) {return (lastPlace+40 === a);})) {  // find new track on bottom side
        if ($('td', $game).eq(lastPlace+40).hasClass('rail_v')) {
            newPosition = lastPlace+40;
            $game.data('newDirection','v');
            return true;
        } else if (($('td', $game).eq(lastPlace+40).hasClass('rail_t3')) || ($('td', $game).eq(lastPlace+40).hasClass('rail_t4'))) {
            newPosition = lastPlace+40;
            $game.data('newDirection','h');
            return true;
        }  else if (($('td', $game).eq(lastPlace+40).hasClass('waypoint')) || ($('td', $game).eq(lastPlace+40).hasClass('end'))) {
            newPosition = lastPlace+40;
            $game.data('newDirection','');
            return true;
        }
    }
    return false;
}

function findNextHorizontaly(lastPlace) {
    if (route.some(function(a) {return (lastPlace+1 === a);})) {  // find new track on right side
        if ($('td', $game).eq(lastPlace+1).hasClass('rail_h')) {
            newPosition = lastPlace+1;
            $game.data('newDirection','h');
            return true;
        } else if (($('td', $game).eq(lastPlace+1).hasClass('rail_t1')) || ($('td', $game).eq(lastPlace+1).hasClass('rail_t3'))) {
            newPosition = lastPlace+1;
            $game.data('newDirection','v');
            return true;
        } else if (($('td', $game).eq(lastPlace+1).hasClass('waypoint')) || ($('td', $game).eq(lastPlace+1).hasClass('end'))) {
            newPosition = lastPlace+1;
            $game.data('newDirection','');
            return true;
        }
    }
    if (route.some(function(a) {return (lastPlace-1 === a);})) {  // find new track on left side
        if ($('td', $game).eq(lastPlace-1).hasClass('rail_h')) {
            newPosition = lastPlace-1;
            $game.data('newDirection','h');
            return true;
        } else if (($('td', $game).eq(lastPlace-1).hasClass('rail_t2')) || ($('td', $game).eq(lastPlace-1).hasClass('rail_t4'))) {
            newPosition = lastPlace-1;
            $game.data('newDirection','v');
            return true;
        } else if (($('td', $game).eq(lastPlace-1).hasClass('waypoint')) || ($('td', $game).eq(lastPlace-1).hasClass('end'))) {
            newPosition = lastPlace-1;
            $game.data('newDirection','');
            return true;
        }
    }
    return false;
}

function findNextTrack(lastPlace) {
    if ($('td', $game).eq(lastPlace).hasClass('end')) {
        routeFixed.unshift(lastPlace);
        return false;
    } else if ($game.data('newDirection') === 'v') {
        return findNextVerticaly(lastPlace);
    } else if ($game.data('newDirection') === 'h') {
        return findNextHorizontaly(lastPlace);
    } else {
        if (findNextHorizontaly(lastPlace) === true) {return true;}
        if (findNextVerticaly(lastPlace) === true) {return true;}
        return false;
    }
}

function winner() {
    $('.playButton').off();
    $('td', $game).eq(positionStart).addClass('metro');
    routeFixed.pop();
    playSound('audio/horn.wav');
    moveMetro();
}

function moveMetro() {
    setTimeout(function() {
        last = last || positionStart;
        $('td', $game).eq(last).removeClass('metro');
        last = routeFixed.pop();
        $('td', $game).eq(last).addClass('metro');
        if ($('td', $game).eq(last).hasClass('waypoint')) {
            if ($('td', $game).eq(last).hasClass('brown')) {score+=2; playSound('audio/bell.wav');}
            if ($('td', $game).eq(last).hasClass('red')) {score+=5; playSound('audio/bell.wav');}
            if ($('td', $game).eq(last).hasClass('yellow')) {score+=10; playSound('audio/bell.wav');}
            if ($('td', $game).eq(last).hasClass('green')) {score+=12; playSound('audio/bell.wav');}
            if ($('td', $game).eq(last).hasClass('blue')) {score+=15; playSound('audio/bell.wav');}
        }
        $('.info-box3').text('Twój wynik: '+score);
        if (last == positionEnd) {
            playSound('audio/applause.wav');
            $('.info-box2').text('Przejazd OK !').css({'backgroundImage': 'url(images/check.png)'});
            $('button').text('Zagraj ponownie !').css({'display': 'block'});
            $('.playButton').on('click', 'button', function () {
                route = [];
                routeFixed= [];
                score = 0;
                counter = 30;
                last = false;
                lastPosition = false;
                createBoard();
                createMenu();
                createPlaces();
                onEscKey();
                onClicks();
            });
        } else {
            moveMetro();
        }
    },300);

}

function fixRoute() {
    lastPosition = lastPosition || positionStart;
    if (findNextTrack(lastPosition) === true) {
        routeFixed.unshift(lastPosition);
        lastPosition = newPosition;
        var indexOfItem = route.indexOf(newPosition);
        delete route[indexOfItem];
        fixRoute();
    } else {
        if ($('td', $game).eq(lastPosition).hasClass('end')) {
            // console.log(routeFixed);
            setTimeout(function() {
                $('.info-box1').text('Trasa OK !').css({'backgroundImage': 'url(images/check.png)'});
                $('.info-box2').css({'display':'flex'});
                $('.info-box3').css({'display':'flex'});
                winner();
            },1000);
        } else {
            console.log(routeFixed);
            setTimeout(function() {
                playSound('audio/error.wav');
                $('.info-box1').text('Błąd').css({'backgroundImage': 'url(images/no.png)'});
                $('button').text('Popraw trasę i spróbuj ponownie').css({'display':'block'});
                onClicks();
            },1000);
        }
    }
}

/* Audio */

function playSound(path) {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', path);
    audioElement.play();
}


/* game starts here */
$('#submit').on('click', function(event) {
    event.preventDefault();
    $('#premiere').animate({height: 1200}, 1000);
    $('#gamecontainer').css({'display': 'flex'});
    createBoard();
    $('.playButton').on('click', 'button', function () {
        $(this).text('Rozpocznij przejazd !');
        $menu.css({'visibility': 'visible'});
        createMenu();
        createPlaces();
        onEscKey();
        onClicks();
    });
});