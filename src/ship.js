const MovingObject = require('./moving_object.js')
const {inherits, scale} = require('./utils.js')
const Bullet = require('./bullet.js')

const CONSTANTS = {
  RADIUS: 18,
  COLOR: "blue"
}

function Ship(options) {
  options.col = options.col || CONSTANTS.COLOR;
  options.rad = options.rad || CONSTANTS.RADIUS;
  options.pos = options.pos || [750, 450]
  options.vel = options.vel || [0,0]
  MovingObject.call(this, options);
}

inherits(Ship, MovingObject)

Ship.prototype.relocate = function (newPos) {
  this.pos = newPos;
  this.vel = [0,0];
}

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
}

Ship.prototype.fireBullet = function () {
  // if ((this.vel[0] > 0) || (this.vel[1] > 0)) {
    let bullet = new Bullet({pos: this.pos.slice(), vel: scale(this.vel.slice(), 8), game: this.game})
    this.game.bullets.push(bullet);
  // }
}


module.exports = Ship;