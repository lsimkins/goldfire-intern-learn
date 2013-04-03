/**
 * Player class.
 * @param {int} x Location x.
 * @param {int} y Location y.
 */
Player = function(x, y) {
  /**
   * Initialize the player.
   * @param  {int} x Location x.
   * @param  {int} y Location y.
   */
  this.init = function(x, y) {
    var self = this;

    // Store the initial location of the player.
    this.x = x;
    this.y = y;

    // Initialize velocities at 0.
    this._vx = 0;
    this._vy = 0;

    // Players can accelerate at 0.04 pixels per tick.
    this._ax = 0.04;
    this._ay = 0.04;

    // Add a key down listener to the window for player movement.
    window.addEventListener('keydown', function(event) {
      // Adjust the player velocity by the acceleration
      if (event.which === 37) {
        self._vx -= self._ax;
      } else if (event.which === 38) {
        self._vy -= self._ay;
      } else if (event.which === 39) {
        self._vx += self._ax;
      } else if (event.which === 40) {
        self._vy += self._ay;
      }
    });
  };

  this.update = function(ctx) {
    this.x += this._vx;
    this.y += this._vy;
  };

  this.render = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
  };

  this.init(x, y);
};