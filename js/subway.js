/**
 * Created by Chris on 25/05/2016.
 */
'use strict';
$(document).ready(function () {
    var startingStation = [[8, 12]];
    var selectedButton = "";
    var tracksLeft = 0;
    var $availMoves;

    //function generateGrid return new $table
    function generateGrid(axisX, axisY) {
        var $table, $tr, $td;
        $table = $('<table>');

        for (var i = 0; i < axisX; i += 1) {
            $tr = $('<tr>');
            for (var j = 0; j < axisY; j += 1) {
                $td = $('<td>');
                $td.addClass('grid')
                $tr.append($td);
            }
            $table.append($tr);
        }

        $('td', $table).each(function (index) {
            $(this).addClass('cell').data('cellIndex', index + 1);
        });

        return $table;
    }

    //generate grid 20x20
    var $grid = generateGrid(20, 36);
    // console.log("grid generated");
    // console.log($grid);

    //mount grid to the container
    var $container = $('.game');
    $container.append($grid);

    //gen control panel underneath of a game map/board
    function generateControlPanel() {
        var $form = $('<form action="#" id="controlsForm">');
        $form.append('<input type="button" id="start" value="Start">');
        $form.append('<input type="image" src="images/rail_h.png" width="20" height="20" id="horizontal">');
        $form.append('<input type="image" src="images/rail_v.png" width="20" height="20"  id="vertical">');
        $form.append('<input type="image" src="images/rail_t1.png" width="20" height="20"  id="rightTop">');
        $form.append('<input type="image" src="images/rail_t3.png" width="20" height="20"  id="rightBottom">');
        $form.append('<input type="image" src="images/rail_t2.png" width="20" height="20"  id="leftTop">');
        $form.append('<input type="image" src="images/rail_t4.png" width="20" height="20"  id="leftBottom">');
        $form.append('<label>');


        var $controlsContainer = $('.controls');
        $controlsContainer.append($form);
    }


    //click event - for debugging 
    // $('td').click(function() {
    //     var myCol = $(this).index();
    //     var $tr = $(this).closest('tr');
    //     var myRow = $tr.index();
    //     $(this).toggleClass('hTracks', '');
    //     console.log('Col: ' + (parseFloat(myCol) + 1) +  " Row: " + (parseFloat(myRow) + 1));
    // });

    function generateStartingPoints() {
        // hold cooridnates of possible starting points
        var startingPoints = [[3, 2], [4, 7], [5, 12], [8, 5],
            [9, 9], [12, 8], [19, 7],
            [15, 15], [19, 11], [30, 11]];

        //generate 5 random numbers
        for (var i = 0; i < 5; i++) {
            var random = Math.random();
            random = Math.round(random * 9);

            //add new starting point to startingStations using generated random number from above
            startingStation.push(startingPoints[random]);

            //  for debugging
            // console.log(random);
            // console.log("Stajca z tablicy: " + startingPoints[random]);
            // console.log("X axis: " + startingPoints[random][0] + "\n"
            //             + "Y axis: " + startingPoints[random][1]
            // );

            //add station class to generated starting points
            var $td = $('td');
            $td.each(function () {
                if ($(this).index() === startingStation[i][0]
                    && $(this).closest('tr').index() === startingStation[i][1]) {
                    $(this).addClass('station');
                }
            });
        }
    }

    function generateAvailMoves() {
        $availMoves = Math.round(Math.random() * 10) * Math.round(Math.random() * 10);
        if ($availMoves < 10 || $availMoves > 30) {
            generateAvailMoves();
        } else {
            $('#availMovesCounter').append($availMoves);
            // console.log($availMoves);
        }
        return $availMoves;
    }


    function addListeners() {
        $('#horizontal').click(function () {
            selectedButton = "hTracks";
        });
    }

    // describe this !?
    $('td').click(function () {
        var myCol = $(this).index();
        var $tr = $(this).closest('tr');
        var myRow = $tr.index();
        if (!($(this).hasClass('station'))) {
            $(this).toggleClass(selectedButton, '');
        } else {
            ($(this).hasClass('station'))
            ++$availMoves;
        }
    });
    // lukasza kod - zmienic? zostawic? 
    $('.game').click(function () {
        var $availMovesLeft = --$availMoves;
        $('#availMovesCounter').html($availMovesLeft);

    });
    //krzyska kod - moze byc usuniety prawdopodobnie
    function generateNumberOfTracks(min, max) {
        tracksLeft = Math.round(Math.random() * (max - min) + min);
        // console.log(tracksLeft);
    }


    generateControlPanel();
    generateGrid();
    generateStartingPoints()
    addListeners("#horizontal", "hTracks");
    addListeners("#vertical", "vTracks");
    addListeners("#rightTop", "rightTopTurn");
    addListeners("#leftTop", "leftTopTurn");
    addListeners("#leftBottom", "leftBottomTurn");
    addListeners("#rightBottom", "rightBottomTurn");
    generateNumberOfTracks(10, 30);
    generateAvailMoves();


    function twoCount(n) {
        // Your code here
        var count = 0;
        var number = n;
        while (number > 1) {
            if (number % 2 === 0) {
                number = number / 2;
                count++;
            } else {
                break;
            }
        }
        return count;
    }

    twoCount(24);
    twoCount(17280);
    twoCount(256);
    twoCount(2222222222222);
    twoCount(84934656);


    console.log('Welcome to Rock/Paper/Scissors');
    var userChoice = prompt('Rock/Paper/Scissors');
    console.log("User's choice is: " + userChoice);
    var computerChoice = Math.random();
    if (computerChoice > 0.66) {
        computerChoice = 'rock';
    } else if (computerChoice > 0.33) {
        computerChoice = 'paper';
    } else {
        computerChoice = 'scissors';
    }
    console.log("Computer's choice is: " + computerChoice);
    if (computerChoice === userChoice) {
        console.log('Tie');
    } else if (computerChoice === 'rock' && userChoice === 'scissors') {
        console.log('Computer win!');
    } else if (computerChoice === 'scissors' && userChoice === 'paper') {
        console.log('Computer win!');
    } else if (computerChoice === 'paper' && userChoice === 'rock') {
        console.log('Computer win!');
    } else {
        console.log('User win');
    }


});

