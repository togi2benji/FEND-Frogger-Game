// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    //the x and y coordinates are defined at allEnemies
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 500) {
      this.x = -100;
      this.speed = 100 + Math.floor(Math.random() * 100);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var allEnemies = [new Enemy(-200, 65,200), new Enemy(-150, 145,200), new Enemy(-100, 230,200)];
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};
var Score = function() {
    this.loss = 0;
    this.score = 0;
};
var lives  = function(){
      if(score.loss == 1){
          document.getElementById("heart1").style.display='none';
      } else if (score.loss == 2) {
          document.getElementById("heart2").style.display='none';
      } else if (score.loss == 3) {
          document.getElementById("heart3").style.display='none';
          alert("GAME OVER! Your score: "+score.score);

      }
};
Player.prototype.update = function(dt){

  for (const enemy of allEnemies) {
    const dx = this.x - enemy.x - 15;
    const dy = this.y - enemy.y - 20;
    const distance = Math.sqrt((dx * dx) + (dy * dy));
    if (distance < 56) {
      this.x = 200;
      this.y = 400;
      score.loss++;
      lives();
    }
  }
  // Did player win
  if (this.y < 10) {
    score.score++;
    document.getElementById('status').innerHTML = "Score: "+score.score;
    this.x = 200;
    this.y = 400;
  }

  if (this.y>=400){
    this.y = 400;
  }

  if (this.x>=410){
    this.x = 410;
  }

  if (this.x<=-10)
    this.x = -10;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(dt) {
    switch (dt) {
    case "up":
        this.y -= 30;
        break;
    case "down":
        this.y += 30;
        break;
    case "left":
      this.x -= 30;
      break;
    case "right":
      this.x += 30;
      break;
  }
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var player = new Player();
var score = new Score();

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
