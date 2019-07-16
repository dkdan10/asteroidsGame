const MovingObject = require('./moving_object.js')
const {inherits} = require('./utils.js')

const CONSTANTS = {
  RADIUS: 5,
  COLOR: "orange"
}

function Bullet(options) {
  options.col = options.col || CONSTANTS.COLOR;
  options.rad = options.rad || CONSTANTS.RADIUS;
  // options.pos = options.pos
  // options.vel = options.vel
  MovingObject.call(this, options);
}

inherits(Bullet, MovingObject)

Bullet.prototype.isCollidedWith = function(otherObject) {
  const dist = Math.sqrt((this.pos[0] - otherObject.pos[0]) ** 2 + (this.pos[1] - otherObject.pos[1]) ** 2);
  return ( (dist < (this.rad + otherObject.rad)) )
}

Bullet.prototype.isWrappable = false

module.exports = Bullet;