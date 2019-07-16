// const {inherits} = require('./utils.js')
const Asteroid = require('./asteroid.js')
const Ship = require('./ship.js')
const CONSTANTS = {
  DIM_X: 1500,
  DIM_Y: 900,
  NUM_ASTEROIDS: 15
}
function Game() {
  this.asteroids = [];
  this.ship = new Ship({pos: this.randomPosition(), game: this});
  this.bullets = [];
  this.addAsteroids();
}

Game.prototype.allObjects = function () {
  return [this.ship].concat(this.asteroids).concat(this.bullets);
}

Game.prototype.randomPosition = function () {
  const randX = Math.random() * CONSTANTS.DIM_X;
  const randY = Math.random() * CONSTANTS.DIM_Y;
  return [randX, randY];
}

Game.prototype.addAsteroids = function () {
  for (let i = 0; i < CONSTANTS.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid({ pos: this.randomPosition(), game: this }))
  }
}

Game.prototype.moveObjects = function () {
  this.allObjects().forEach(objects => {
    objects.move();
  })
}

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0,0,CONSTANTS.DIM_X, CONSTANTS.DIM_Y);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);
  this.allObjects().forEach(objects => {
    objects.draw(ctx);
  });
}

Game.prototype.wrap = function (pos) {
  if (pos[1] > CONSTANTS.DIM_Y) {
    pos[1] = 0;
  } else if (pos[1] < 0) {
    pos[1] = CONSTANTS.DIM_Y;
  }
  if (pos[0] > CONSTANTS.DIM_X) {
    pos[0] = 0;
  } else if (pos[0] < 0) {
    pos[0] = CONSTANTS.DIM_X;
  }
}
Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
}

Game.prototype.checkCollisions = function () {

  for (let i = 0; i < this.asteroids.length; i++) {
    const asteroid = this.asteroids[i];
    if (asteroid.isCollidedWith(this.ship)) this.ship.relocate(this.randomPosition())
  }

  this.bullets.forEach(bullet => {
    if (bullet.vel[0] === 0 && bullet.vel[1] === 0) this.removeBullet(bullet);
    this.asteroids.forEach(asty => {
      if (bullet.isCollidedWith(asty)) {
        this.remove(asty);
      }
    });
  });

}

Game.prototype.remove = function(asteroid) {
  const indexToRemove = this.asteroids.indexOf(asteroid)
  this.asteroids = this.asteroids.slice(0, indexToRemove).concat(this.asteroids.slice(indexToRemove + 1));
}
Game.prototype.removeBullet = function(bullet) {
  const indexToRemove = this.bullets.indexOf(bullet)
  this.bullets = this.bullets.slice(0, indexToRemove).concat(this.bullets.slice(indexToRemove + 1));
}

Game.prototype.isOutOfBounds = function (pos) {
  return (pos[0] > CONSTANTS.DIM_X || pos[0] < 0 || pos[1] > CONSTANTS.DIM_Y || pos[1] < 0)
}


module.exports = Game;