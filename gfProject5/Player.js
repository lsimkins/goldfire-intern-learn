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

    // Store the initialized location of the player.
    this.x = x;
    this.y = y;

    // Initialize velocities at 0. The player is not moving at game start.
    this._vx = 0;
    this._vy = 0;

    // Players can accelerate at 0.04 pixels per tick.
    this._ax = 0.04;
    this._ay = 0.04;

    // Initialize the player's spritesheet.
    this._spriteSheet = null;

    // Add a key down listener to the window for player movement.
    window.addEventListener('keydown', function(event) {
      if (event.which === 32) {
        self.fireMissile();
      }

      // Adjust the player velocity by the acceleration based on which key, if any, is pressed.
      if (event.which === 37) {
        // Left key is down, apply acceleration to the left.
        self._vx -= self._ax;
      } else if (event.which === 38) {
        // Up key is down, apply acceleration upwards.
        self._vy -= self._ay;
      } else if (event.which === 39) {
        // Right key is down, apply acceleration to the right.
        self._vx += self._ax;
      } else if (event.which === 40) {
        // Down key is pressed, apply acceleration downwards.
        self._vy += self._ay;
      }
    });
  };

  this.fireMissile = function() {
    var missile = new Missile(this.x, this.y, this._vx * 5, this._vy * 5);

    gf.addGameEntity(missile);
  };

  /**
   * Update method. This method is called by the engine during the engine's update loop.
   * @param  {CanvasRenderingContext2d} ctx
   */
  this.update = function(ctx) {
    // Adjust player (x,y) position by the current velocity.
    this.x += this._vx;
    this.y += this._vy;
  };

  /**
   * Render method. This is called by the engine after the game has been updated.
   * This renders the result of the update on the screen.
   * @param  {CanvasRenderingContext2d} ctx
   */
  this.render = function(ctx) {
    // For now, the player is just a circle drawn on the canvas.
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
    ctx.closePath();
  };

  this.init(x, y);
};