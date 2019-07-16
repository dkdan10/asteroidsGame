// const {inherits} = require('./utils.js')
function MovingObject(option) {
  this.pos = option.pos;
  this.vel = option.vel;
  this.rad = option.rad;
  this.col = option.col;
  this.game = option.game;
}
 MovingObject.prototype.draw = function(ctx) {
   ctx.fillStyle = this.col;
   ctx.beginPath();

   ctx.arc(
     this.pos[0],
     this.pos[1],
     this.rad,
     0,
     2 * Math.PI,
     false
   );

   ctx.fill();
 }

 MovingObject.prototype.move = function() {
   this.pos[0] += this.vel[0];
   this.pos[1] += this.vel[1];
   if (this.game.isOutOfBounds(this.pos)) {
     if (this.isWrappable) {
       this.game.wrap(this.pos);
     } else {
       this.game.removeBullet(this)
     }
   } 
 }

 MovingObject.prototype.isCollidedWith = function (otherObject) {
  //  const dist = Math.sqrt((this.pos[0] - otherObject.pos[0])**2 + (this.pos[1] - otherObject.pos[1])**2);
  //  return dist < (this.rad + otherObject.rad)
 }

MovingObject.prototype.isWrappable = true

module.exports = MovingObject;