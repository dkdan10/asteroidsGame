const MovingObject = require('./moving_object.js')
const {inherits, randomVec, scale} = require('./utils.js')
const Ship = require('./ship.js')

const CONSTANT = {
  COLOR: "red",
  RADIUS: 13
}
function Asteroid (options) {
  options.col = options.col || CONSTANT.COLOR;
  options.rad = options.rad || CONSTANT.RADIUS;
  options.vel = randomVec(15);
  MovingObject.call(this, options);
}

inherits(Asteroid, MovingObject);

Asteroid.prototype.isCollidedWith = function (otherObject) {
  const dist = Math.sqrt((this.pos[0] - otherObject.pos[0]) ** 2 + (this.pos[1] - otherObject.pos[1]) ** 2);
  return ( (otherObject instanceof Ship) && (dist < (this.rad + otherObject.rad)) )
}

module.exports = Asteroid;