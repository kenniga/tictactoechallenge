var TICTACTOE = {
    startPlayer: Math.random() >= 0.5,
    winPattern: [
        [
            1, 2, 3
        ],
        [
            4, 5, 6
        ],
        [
            7, 8, 9
        ],
        [
            1, 4, 7
        ],
        [
            2, 5, 8
        ],
        [
            3, 6, 9
        ],
        [
            1, 5, 9
        ],
        [7, 5, 3]
    ],
    boxChildren: [
        0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    playerOneStatsBoard: [],
    playerTwoStatsBoard: [],
    onClickBoxes: function(markTypeOne, markTypeTwo) {
        var obj = this;
        document.getElementById('tictacplayfield').addEventListener('click', function(e) {

            var element = e.target;
            var dataStore = e.target.getAttribute('data-boxes');
            obj.boxChildren[dataStore - 1] = 1;
            if (e.target.innerHTML.length === 0 && e.target.tagName === 'LI') {

                if (obj.startPlayer) {
                    element.innerHTML += markTypeOne;
                    obj.playerOneStatsBoard.push(dataStore);
                    obj.playerOneStatsBoard.sort(function(a, b) {
                        return a - b
                    });
                    obj.winPattern.map(obj.winnerCheckOne);
                    obj.startPlayer = !obj.startPlayer;
                } else {
                    element.innerHTML += markTypeTwo;
                    obj.playerTwoStatsBoard.push(dataStore);
                    obj.playerTwoStatsBoard.sort(function(a, b) {
                        return a - b
                    });
                    obj.winPattern.map(obj.winnerCheckTwo);
                    obj.startPlayer = !obj.startPlayer;

                }

                var drawCheck = obj.boxChildren.every(obj.gameDrawCheck);
                if ( drawCheck ) {
                    obj.finishGame('draw');
                }
            }
        });
    },
    gameStart: function(markTypeOne, markTypeTwo) {
        var currentPlayer = this.startPlayer;
        this.initGame();
        if (this.startPlayer) {

            this.onClickBoxes(markTypeOne, markTypeTwo);

        } else {

            this.onClickBoxes(markTypeOne, markTypeTwo);

        }
    },
    winnerCheckOne: function(winPatternItem) {
        if (TICTACTOE.playerOneStatsBoard.length !== 0) {
            var conditionOne;
            var conditionTwo;
            var conditionThree;
            for (var i = 0; i < TICTACTOE.playerOneStatsBoard.length; i++) {
                conditionOne = TICTACTOE.playerOneStatsBoard.map(Number).indexOf(winPatternItem[0]) >= 0;
                conditionTwo = TICTACTOE.playerOneStatsBoard.map(Number).indexOf(winPatternItem[1]) >= 0;
                conditionThree = TICTACTOE.playerOneStatsBoard.map(Number).indexOf(winPatternItem[2]) >= 0;

            }
            if (conditionOne && conditionTwo && conditionThree) {
                TICTACTOE.finishGame('win');
            }
            return false;

        }

    },
    winnerCheckTwo: function(winPatternItem) {
        if (TICTACTOE.playerTwoStatsBoard.length !== 0) {
            var conditionOne;
            var conditionTwo;
            var conditionThree;
            for (var i = 0; i < TICTACTOE.playerTwoStatsBoard.length; i++) {
                conditionOne = TICTACTOE.playerTwoStatsBoard.map(Number).indexOf(winPatternItem[0]) >= 0;
                conditionTwo = TICTACTOE.playerTwoStatsBoard.map(Number).indexOf(winPatternItem[1]) >= 0;
                conditionThree = TICTACTOE.playerTwoStatsBoard.map(Number).indexOf(winPatternItem[2]) >= 0;

            }
            if (conditionOne && conditionTwo && conditionThree) {
                TICTACTOE.finishGame('win');
            }
            return false;
        }
    },
    gameDrawCheck: function( currentValue ) {
        return currentValue > 0;
    },
    finishGame: function( finishStatus ) {
        var fadeTarget     = document.getElementById("finishgame");
        var finishMessage  = document.getElementById("finishmessage");
        var fadeEffect = setInterval(function () {
            if (!fadeTarget.style.opacity) {
                fadeTarget.style.opacity = 1;
                fadeTarget.style.display = 'flex';
            }
            if (fadeTarget.style.opacity > 0) {
                fadeTarget.style.opacity += 0.1;
            } else {
                clearInterval(fadeEffect);
            }
        }, 200);
        if( finishStatus === 'draw' ) {
            finishMessage.innerHTML = "It's Draw!";
        } else {
            finishMessage.innerHTML = "You win!";
        }
        document.getElementById('playAgain').addEventListener('click', this.playAgain);
    },
    initGame: function() {
        document.getElementById('startgame').addEventListener('click', this.fadeOutEffect);
    },
    playAgain: function(){
        location.reload();
    },
    fadeOutEffect: function() {
        var fadeTarget = document.getElementById("gamecontrol");
        var fadeEffect = setInterval(function () {
            if (!fadeTarget.style.opacity) {
                fadeTarget.style.opacity = 1;
                fadeTarget.style.display = 'none';
            }
            if (fadeTarget.style.opacity > 0) {
                fadeTarget.style.opacity -= 0.1;
            } else {
                clearInterval(fadeEffect);
            }
        }, 200);
}

}
TICTACTOE.gameStart('X', 'O');
