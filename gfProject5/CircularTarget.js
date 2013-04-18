/**
 * Circular target class.
 * @param {int} x Location x.
 * @param {int} y Location y.
 */
CircularTarget = function(x, y) {

  /**
   * Initializes this target.
   * @param  {int} x Location x.
   * @param  {int} y Location y.
   */
  this.init = function(x, y) {
    this.x = x;
    this.y = y;

    this.radius = 15;
  },

  /**
   * Update method. This method is called by the engine during the engine's update loop.
   * @param  {CanvasRenderingContext2d} ctx
   */
  this.update = function(ctx) {
    for (var i=0; i<gf.gameEntities.length; i++) {
      // Don't check collisions against ourself.
      if (gf.gameEntities[i] === this) {
        continue;
      }

      if (gf.gameEntities[i].isBullet && this.collidesWith(gf.gameEntities[i])) {
        this.destroy();
      }
    }
  };

  /**
   * For circular targets, we're doing the simplest form of collision testing,
   * checking to see if the bullet's x,y, is within the radius of our center.
   * @param  {Object} entity Entity to check collision with.
   */
  this.collidesWith = function(entity) {
    var distance = Math.sqrt(
      Math.pow(this.x - entity.x, 2) + Math.pow(this.y - entity.y, 2)
    );

    if (distance < this.radius) {
      this.destroy();
    }
  },

  /**
   * Destroys this game entity by removing it from the engine's entity register.
   */
  this.destroy = function() {
    gf.removeGameEntity(this);
  },

  /**
   * Render method. This is called by the engine after the game has been updated.
   * This renders the result of the update on the screen.
   * @param  {CanvasRenderingContext2d} ctx
   */
  this.render = function(ctx) {
    // Our target is just a series of concentric circles.
    ctx.beginPath();
    ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(this.x, this.y, 12, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(this.x, this.y, 9, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(this.x, this.y, 6, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();


  };

  this.init(x, y);
};