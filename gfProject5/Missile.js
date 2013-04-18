/**
 * Missile class.
 * @param {int} x Location x.
 * @param {int} y Location y.
 */
Missile = function(x, y, vx, vy) {

  this.init = function(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this._vx = vx;
    this._vy = vy;

    this.width = 4;
    this.height = 4;

    this.isBullet = true;
  },

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
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
  };

  this.init(x, y, vx, vy);
};