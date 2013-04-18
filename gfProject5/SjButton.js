SjButton = function(x, y, width, height) {
  /**
   * Initializes this object.
   */
  this.init = function() {
    var self = this;

    this.x      = x;
    this.y      = y;
    this.width  = width;
    this.height = height;

    this.state  = 'default';

    this.defaultFill = "#888888";
    this.hoverFill   = "#bbbbbb";
    this.pressedFill = "#000000";

    this._action = null;

    // Listener 1: Mouse move
    gameCanvas.addEventListener('mousemove', function(event) {
      if (self.state !== 'pressed') {
        var mouseOver = self.pointIntersects(event.offsetX, event.offsetY);

        if (mouseOver && self.state !== 'hover') {
          self.state = 'hover';
          self.render();

        } else if (!mouseOver && self.state !== 'default') {
          self.state = 'default';
          self.render();
        }
      }
    });

    // Listener 2: Mouse Down
    gameCanvas.addEventListener('mousedown', function(event) {
      if (self.pointIntersects(event.offsetX, event.offsetY)) {
        self.state = 'pressed';
        self.render();
      }
    });

    // Listener 3: Mouse Up
    gameCanvas.addEventListener('mouseup', function(event) {
      var mouseOver = self.pointIntersects(event.offsetX, event.offsetY);

      if (mouseOver && self.state === 'pressed') {
        self.state = 'hover';

        if (self._action) {
          self._action();
        }

      } else {
        self.state = 'default';
      }

      self.render();
    });
  };

  /**
   * Renders the button on the screen.
   * @return {SjButton}
   */
  this.render = function() {
    ctx.fillStyle = this[this.state + "Fill"];
    ctx.strokeStyle = "#ffffff";

    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  };

  /**
   * Tests whether an (x,y) point intersects with this button.
   * @param  {Number}  x X coordinate.
   * @param  {Number}  y Y coordinate.
   * @return {Boolean} Whether or not the point intersects with this button.
   */
  this.pointIntersects = function(x, y) {
    // Simply calculates if the given coordinates lie within the x and y coordinates
    // That the button has been drawn.
    var inRangeX = (x >= this.x && x <= this.x + this.width);
    var inRangeY = (y >= this.y && y <= this.y + this.height);

    if (inRangeX && inRangeY) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * Sets the action function that is called when this button is clicked.
   * @param {Function} action
   */
  this.setAction = function(action) {
    this._action = action;
  };

  this.init();
};