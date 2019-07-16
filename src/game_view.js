// const {inherits} = require('./utils.js')
const Game = require('./game');
const Key = require('./keymaster')

function GameView(ctx) {
  this.game = new Game();
  this.ctx = ctx;
  this.bindKeyHandlers();
}

GameView.prototype.start = function () {
  setInterval(() => {
    this.game.step();
    this.game.draw(this.ctx);
  }, 20);
}

GameView.prototype.bindKeyHandlers = function () {
  Key('up', () => {
    this.game.ship.power([0,-1]);
  });
  Key('down', () => {
    this.game.ship.power([0,1]);
  });
  Key('left', () => {
    this.game.ship.power([-1,0]);
  });
  Key('right', () => {
    this.game.ship.power([1,0]);
  });
  Key('space', () => {
    this.game.ship.fireBullet();
  });
  
}


module.exports = GameView;