GfSpriteSheet = function(url, horizontalCells, verticalCells) {

  this.init = function(url, horizontalCells, verticalCells, speed) {
    var self = this;

    self._image = new Image();
    self._image.src = url;

    self._loaded     = false;
    self._animations = {};

    self._currentAnimation = null;
    self._currentCellIndex = null;
    self._animationInterval = null;

    self._horizontalCells = horizontalCells;
    self._verticalCells = verticalCells;

    self._width      = null;
    self._height     = null;
    self._cellWidth  = null;
    self._cellHeight = null;

    imageObj.onload = function() {
      self._loaded = true;
      self._width  = imageObj.width;
      self._height = imageObj.height;
      self._cellWidth = self._width / horizontalCells;
      self._cellHeight = self._height / verticalCells;
    };
  };

  this.playAnimation = function(animationId) {
    if (!this._animations[animationId]) {
      console.log("Cannot play animation with id " + animationId + ", it doesn't exist!");
      return;
    }

    this._currentAnimation = this._animations[animationId];

    if (self._animationInterval) {
      clearInterval(self._animationInterval);
    }

    self._animationInterval = setInterval(function() {
      this._currentCellIndex++;

      if (this._currentAnimation[1][this._currentCellIndex] === undefined) {
        // We've passed the last cell, reset it to the first.
        this._currentCellIndex = 0;
      }
    }, this._currentAnimation[0]);

    return this;
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
    if (!this._loaded) {
      // Texture isn't loaded, so we can't render yet.
      return;
    }

    var cellColumn = (this._currentCellIndex % this._horizontalCells) * this._cellWidth;
    var cellRow =  Math.floor(this._currentCellIndex / this._horizontalCells);

    ctx.drawImage(
      this._image,
      cellColumn * this._cellWidth,
      cellRow * this._cellWidth,
      this._cellWidth,
      this._cellHeight
    );
  };

  this.init();
};