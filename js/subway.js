/**
 * Created by Chris on 25/05/2016.
 */
'use strict';
$(document).ready(function () {
    var startingStation = [[8, 12]];
    var selectedButton = "";
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
    console.log("grid generated");
    console.log($grid);

    //mount grid to the container
    var $container = $('.game');
    $container.append($grid);

    //gen control panel underneath of a game map/board
    function generateControlPanel() {
        var $form = $('<form action="#" id="controlsForm">');
        $form.append('<input type="button" id="start" value="Start">');
        $form.append('<input type="button" id="horizontal" value="Horizontal">');
        $form.append('<input type="button" id="vertical" value="Vertical">');
        $form.append('<input type="button" id="rightTop" value="Turn R T">');
        $form.append('<input type="button" id="rightBottom" value="Turn R B">');
        $form.append('<input type="button" id="leftTop" value="Turn L T">');
        $form.append('<input type="button" id="leftBottom" value="Turn L B">');
        $form.append('<span id="availMovesCounter"></span>');

        var $controlsContainer = $('.controls');
        return $controlsContainer.append($form);
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
            random = Math.round(random * 10);

            //add new starting point to startingStations using generated random nuber from above
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
    function generateAvailMoves () {
        $availMoves = Math.round(Math.random()* 10) * Math.round(Math.random() * 10);
        if ($availMoves < 10 || $availMoves > 30) {
            generateAvailMoves ();
        } else {
            $('#availMovesCounter').append($availMoves);
            console.log($availMoves);
        }
        return $availMoves;
    }



    function addListeners() {
        $('#horizontal').click(function () {
            selectedButton = "hTracks";
        });

        $('#vertical').click(function () {
            selectedButton = "vTracks";
        });

        $('#rightTop').click(function() {
            selectedButton = "rightTopTurn"
        });


        $('#leftTop').click(function() {
            selectedButton = "leftTopTurn";
        });

        $('#leftBottom').click(function() {
            selectedButton = "leftBottomTurn"
        });

        $('#rightBottom').click(function() {
            selectedButton = "rightBottomTurn"
        });


    }

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

      $('.game').click(function () {
        var $availMovesLeft = --$availMoves;
        $('#availMovesCounter').html($availMovesLeft);

    });


    generateControlPanel();
    generateGrid();
    generateStartingPoints()
    addListeners();
    generateAvailMoves();
});

