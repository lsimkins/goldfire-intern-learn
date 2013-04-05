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

    /**
     * Player movement and position in this example requires 3 sets of properites.
     *  1. The (x,y) position. This simply stores the (x,y) location of the player.
     *  2. Current player velocity. Stored at vx and vy. This is the number of pixels the player
     *    is currently moving in the x and the y direction every tick.
     *  3. The player's acceleration. This is rate at which the player velocity can increase/decrease
     *    in each direction. This amount is added to the velocity when a key is down.
     */

    // Store the initialized location of the player.
    this.x = x;
    this.y = y;

    /**
     * Introduction to private variables.
     * The next four variables have an underscore(_) preceding them. This is common practice for
     * variables intended to be private. This means this variable is *not* meant to be accessed outside of
     * this class. In strict, lower-level languages, you can explictly declare variables as "private" and
     * enforce this rule. In javascript, however, you can't enforce this. The best you can do is mark it
     * as a warning that directly manipulating these variables can cause unintended results.
     *
     * To allow outside manipulation of these variables, usually "getter" and "setter" methods are created
     * for safe accessing. But, that is another discussion so ask me about them later.
     */

    // Initialize velocities at 0. The player is not moving at game start.
    this._vx = 0;
    this._vy = 0;

    // Players can accelerate at 0.04 pixels per tick.
    this._ax = 0.04;
    this._ay = 0.04;

    // Add a key down listener to the window for player movement.
    window.addEventListener('keydown', function(event) {
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
  };

  this.init(x, y);
};