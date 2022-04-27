let moves = document.getElementById("moves");
let timer = document.getElementById("timer");
let life = document.getElementById("life");
let scores = document.getElementById("scores");
let body = document.getElementsByTagName('body')[0];
let moveValue = 85;

let updateMoves = () => {
    let value = moves.textContent;
    moves.textContent = parseInt(value) + 1;
};
let updateScores = () => {
    let value = scores.textContent;
    scores.textContent = parseInt(value) + 1;
};
let gameWin = () => {
    let winner = document.createElement('p');
    winner.textContent = `Congratulations! You haver win!`;
    body.appendChild(winner);
}
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

let Player = function (sprite) {
    this.sprite = sprite;
    this.life = 3;
    this.x = 200;
    this.y = 420;
    this.score = 0;
};

Player.prototype = {
    constructor: Player,
    render: function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        updateLifes(this.life)
    },
    update: function () {},
    handleInput: function (allowedKeys) {
        if (allGems.length == 0) {
            gameWin();
            return;
        }
        if (this.life <= 0) return;
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
                if (this.y >= 40) {
                    updateMoves();
                    this.y -= moveValue;
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

let allGems = [
    new Gem("images/Gem Green.png"),
    new Gem("images/Gem Orange.png"),
    new Gem("images/Gem Blue.png"),
]
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