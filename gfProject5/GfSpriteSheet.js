GfSpriteSheet = function(url, horizontalCells, verticalCells) {

  this.init = function(url, horizontalCells, verticalCells) {
    var self = this;

    self._image = new Image();
    self._image.src = url;

    self._loaded     = false;
    self._animations = {};

    self._currentAnimation = null;
    self._currentCellIndex = null;
    self._animationInterval = null;
    self._drawCell = null;

    self._horizontalCells = horizontalCells;
    self._verticalCells = verticalCells;

    self._width      = null;
    self._height     = null;
    self._cellWidth  = null;
    self._cellHeight = null;

    self._image.onload = function() {
      self._loaded = true;
      self._width  = self._image.width;
      self._height = self._image.height;
      self._cellWidth = self._width / horizontalCells;
      self._cellHeight = self._height / verticalCells;
    };
  };

  this.playAnimation = function(animationId) {
    var self = this;

    if (!self._animations[animationId]) {
      console.log("Cannot play animation with id " + animationId + ", it doesn't exist!");
      return;
    }

    if (self._currentAnimation === self._animations[animationId]) {
      // We're already playing the defined animation, so no need to continue;
      return;
    }

    self.stopAnimation();

    self._currentAnimation = self._animations[animationId];

    self._drawCell = self._currentAnimation[1][0];
    self._animationInterval = setInterval(function() {
      self._currentCellIndex++;

      if (self._currentAnimation[1][self._currentCellIndex] === undefined) {
        // We've passed the last cell, reset it to the first.
        self._currentCellIndex = 0;
      }

      self._drawCell = self._currentAnimation[1][self._currentCellIndex];
    }, self._currentAnimation[0]);

    return this;
  },

  this.stopAnimation = function() {
    if (this._animationInterval) {
      clearInterval(this._animationInterval);
    }

    this._currentAnimation = null;
  },

  this.addAnimation = function(id, speed, cells) {
    if (typeof id !== 'string' || typeof speed !== 'number' || typeof cells !== 'object') {
      console.log("Cannot add animation, missing or invalid param.");
      return;
    }

    this._animations[id] = [speed, cells];

    return this;
  };

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