let moves = document.getElementById("moves");
let timer = document.getElementById("timer");
let life = document.getElementById("life");
let scores = document.getElementById("scores");
let body = document.getElementsByTagName('body')[0];
let moveValue = 85;

// Increase the moves and set it to the element
let updateMoves = () => {
    let value = moves.textContent;
    moves.textContent = parseInt(value) + 1;
};

// Increase the score and set it to the element
let updateScores = () => {
    let value = scores.textContent;
    scores.textContent = parseInt(value) + 1;
};

// create and display the win message
let gameWin = () => {
    let winner = document.createElement('p');
    winner.setAttribute('id', 'winner');
    winner.textContent = `Congratulations! You haver win! Press ENTER to play again`;
    body.appendChild(winner);
}

//Create and display the looser message 
let gameLoose = () => {
    let looser = document.createElement('p');
    looser.setAttribute('id', 'looser');
    looser.textContent = `You haver loosed! Press ENTER to play again`;
    body.appendChild(looser);
}

//Remove the win or loose message
let removeGameWinOrLoose = function () {
    moves.textContent = 0;
    scores.textContent = 0;
    let looser = document.getElementById('looser');
    let winner = document.getElementById('winner');

    if (looser) {
        body.removeChild(looser);
    } else {
        body.removeChild(winner);
    }
}

//Set the life
let updateLifes = lifes => {
    life.textContent = lifes;
};

// Enemies our player must avoid
var Enemy = function (sprite, x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 100 + 120;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype = {
    update: function (dt) {
        if (this.x <= ctx.canvas.width) {
            this.x += this.speed * dt;
        } else {
            this.x = -120;
        }
    },
    render: function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// Creating the Player object
let Player = function (sprite) {
    this.sprite = sprite;
    this.start()
};

// Player methods
Player.prototype = {
    constructor: Player,
    render: function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        updateLifes(this.life)
    },
    start: function () {
        this.life = 3;
        this.x = 200;
        this.y = 420;
        this.score = 0;
        this.win = false;
        this.stop = false;
    },
    update: function () {},
    handleInput: function (allowedKeys) {
        if (this.stop) {
            if (allowedKeys == "enter") {
                console.log('Enter Cliked');
                createGems();
                this.start();
                removeGameWinOrLoose();
            }
        }
        switch (allowedKeys) {
            case "left":
                if (this.x >= 100) {
                    updateMoves();
                    this.x -= 100;
                }
                break;

            case "right":
                if (this.x < 400) {
                    updateMoves();
                    this.x += 100;
                }
                break;

            case "up":
                if (this.y >= 165) {
                    updateMoves();
                    console.log(this.y)
                    this.y -= moveValue;
                } else {
                    this.y -= moveValue;
                    this.collision();
                }
                break;
            case "down":
                if (this.y <= 380) {
                    updateMoves();
                    this.y += moveValue;
                }
                break;
        }
    },
    collision: function () {
        this.x = 200;
        this.y = 420;
        if (this.life > 0) {
            this.life -= 1;
            updateLifes(this.life)
        } else {
            return;
        }
    },
    score: function () {
        this.score += 100;
    }
};

// Definig the Gem class using classes
class Gem {
    constructor(sprite) {
        this.yPositions = [80, 160, 240] // Line 2,3,4
        let xPosition = parseInt(Math.random() * 5 * 85); //Five columns
        let xRandomic = 20;
        let yRandomic = parseInt(Math.random() * this.yPositions.length);
        
        this.sprite = sprite;
        this.x = xRandomic + xPosition;
        this.y = this.yPositions[yRandomic];
        console.log(this.x, sprite)
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    update() {
        
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

let allEnemies = [
    new Enemy("images/enemy-bug.png", 0, 60),
    new Enemy("images/enemy-bug.png", 0, 140),
    new Enemy("images/enemy-bug.png", 0, 220),
];
let allGems = [];

// function to initiate gems
let createGems = function () {
    allGems = [
        new Gem("images/Gem Green.png"),
        new Gem("images/Gem Orange.png"),
        new Gem("images/Gem Blue.png"),
    ]
}

// Place the player object in a variable called player
let player = new Player("images/char-boy.png");

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function (e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        13: "enter",
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Reused from Matching Game Project - Provided by the reviewer
let gameTimer = el_display => {
    const game_start_time = new Date().getTime();

    return setInterval(function () {
        let current_time = new Date().getTime();
        current_time_played = current_time - game_start_time;
        let hrs = Math.floor((current_time_played % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let mins = Math.floor((current_time_played % (1000 * 60 * 60 * 24)) / (1000 * 60));
        let secs = Math.floor((current_time_played % (1000 * 60)) / 1000);

        if (secs < 10) {
            secs = '0' + secs;
        }

        el_display.textContent = hrs + ":" + mins + ":" + secs;

        current_time_played = hrs + ":" + mins + ':' + secs;

    }, 500);

}

// Calling createGems
createGems()