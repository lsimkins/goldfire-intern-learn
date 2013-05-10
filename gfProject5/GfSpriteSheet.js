/**
 * Spritesheet class. Allows you to create a spritesheet and break it into animations.
 * @param {String} url             Image url.
 * @param {number} horizontalCells Number of horizontal cells in the spritesheet.
 * @param {number} verticalCells   Number of vertical cells in the spritesheet.
 */
GfSpriteSheet = function(url, horizontalCells, verticalCells) {

  /**
   * Initializes the spritesheet.
   */
  this.init = function(url, horizontalCells, verticalCells) {
    var self = this;

    self._horizontalCells = horizontalCells;
    self._verticalCells   = verticalCells;

    // Create the javascript image object and set the spritesheet as its source.
    // 'Image' is a native javascript class.
    self._image = new Image();
    self._image.src = url;

    // Boolean variable to store whether our image is loaded or not.
    self._loaded = false;

    // Initialize the object that will store our list of animations.
    self._animations = {};
    self._animation         = null; // Id of the current animation being played.
    self._animationIndex    = null; // Index of the current animation cell in the animation array.
    self._animationInterval = null; // The interval "timer" that moves the animation forward.
    self._drawCell          = null; // The actual cell in the spritesheet we should currently draw.

    // Initialize the variables that will hold the cell width and height after we calculat them.
    self._cellWidth  = null;
    self._cellHeight = null;

    // We can't really do much until the image actually loads. So set an event listener that waits
    // for the image to load, calculates cellWidth and cellHeight, and sets the loaded flag.
    self._image.addEventListener('load', function() {
      self._cellWidth = self._image.width / horizontalCells;
      self._cellHeight = self._image.height / verticalCells;
      self._loaded = true;
    });
  };

  /**
   * Adds an animation.
   * @param {String} id          The id to give the animation.
   * @param {Number} frameLength The animation "speed." In an alternative setup, we'd pass the
   *                             fps the animation plays at. Our simple engine doesn't support this yet.
   *                             Instead, this is how many milliseconds each frame is shown before progressing.
   * @param {Array} cells Array of spritesheet cells that make up this animation.
   */
  this.addAnimation = function(id, speed, cells) {
    if (typeof id !== 'string' || typeof speed !== 'number' || typeof cells !== 'object') {
      console.log("Cannot add animation, missing or invalid param.");
      return;
    }

    this._animations[id] = [speed, cells];

    return this;
  };

  /**
   * Plays the animation of the corresponding id.
   * @param  {String} animationId Id of the animation we're defining.
   * @return {GfSpriteSheet}
   */
  this.playAnimation = function(animationId) {
    var self = this;

    if (!self._animations[animationId]) {
      console.log("Cannot play animation with id " + animationId + ", it doesn't exist!");
      return;
    }

    if (self._animation === self._animations[animationId]) {
      // We're already playing the defined animation, so no need to continue;
      return;
    }

    // Stop any current animation (also clears the current interval 'timer').
    self.stopAnimation();

    // Set the new animation.
    self._animation = self._animations[animationId];

    // Initialize the draw cell to the first cell in the animation.
    self._drawCell = self._animation[1][0];

    // Set the interval that increments the animation cell.
    self._animationInterval = setInterval(function() {
      self._animationIndex++;

      if (self._animation[1][self._animationIndex] === undefined) {
        // We've passed the last cell, reset it to the first.
        self._animationIndex = 0;
      }

      self._drawCell = self._animation[1][self._animationIndex];
    }, self._animation[0]);

    return this;
  },

  /**
   * Stops the current animation.
   * @return {GfSpriteSheet}
   */
  this.stopAnimation = function() {
    if (this._animationInterval) {
      clearInterval(this._animationInterval);
    }

    this._animation = null;

    return this;
  },

  /**
   * Renders the sprite at the specified canvas coordinates.
   * @param  {CanvasRenderingContext2d} ctx
   * @param  {number} x   Render location x.
   * @param  {number} y   Render location y.
   * @return {undefined}
   */
  this.render = function(ctx, x, y) {
    if (!this._loaded || typeof this._drawCell !== 'number') {
      // Texture isn't loaded, or we don't have an animation, so we can't render yet.
      return;
    }

    var cellColumn = (this._drawCell % this._horizontalCells);
    var cellRow =  Math.floor(this._drawCell / this._horizontalCells);

    ctx.drawImage(
      this._image,
      cellColumn * this._cellWidth,
      cellRow * this._cellWidth,
      this._cellWidth,
      this._cellHeight,
      x,
      y,
      this._cellWidth,
      this._cellHeight
    );
  };

  this.init(url, horizontalCells, verticalCells);
};