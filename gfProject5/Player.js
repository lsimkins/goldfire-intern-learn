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

    // Initialize the player's spritesheet and animations.
    this._spriteSheet = new GfSpriteSheet('./assets/character_sprites2.png', 12, 8);
    this._spriteSheet.addAnimation('idle', 100, [3]);
    this._spriteSheet.addAnimation('walkDown', 100, [0,1,2]);
    this._spriteSheet.addAnimation('walkLeft', 100, [12,13,14]);
    this._spriteSheet.addAnimation('walkRight', 100, [24,25,26]);
    this._spriteSheet.addAnimation('walkUp', 100, [36,37,38]);

    this._spriteSheet.playAnimation('idle');

    // Add a key down listener to the window for player movement.
    window.addEventListener('keydown', function(event) {
      if (event.which === 32) {
        self.fireMissile();
      }

      // Adjust the player velocity by the acceleration based on which key, if any, is pressed.
      if (event.which === 37) {
        // Left key is down, apply acceleration to the left.
        self._vx -= self._ax;
        self._spriteSheet.playAnimation('walkLeft');
      } else if (event.which === 38) {
        // Up key is down, apply acceleration upwards.
        self._vy -= self._ay;
        self._spriteSheet.playAnimation('walkUp');
      } else if (event.which === 39) {
        // Right key is down, apply acceleration to the right.
        self._vx += self._ax;
        self._spriteSheet.playAnimation('walkRight');
      } else if (event.which === 40) {
        // Down key is pressed, apply acceleration downwards.
        self._vy += self._ay;
        self._spriteSheet.playAnimation('walkDown');
      }
    });

    window.addEventListener('keyup', function(event) {
      self._spriteSheet.stopAnimation();
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
    this._spriteSheet.render(ctx, this.x, this.y);
  };

  this.init(x, y);
};