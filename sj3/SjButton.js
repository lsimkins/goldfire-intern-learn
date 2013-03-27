// Basic Button
SjButton = function(x, y, width, height) {
  /**
   * Initializes this object.
   */
  this.init = function() {
    var self = this;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.state = 'default';

    this.defaultFill = "#888888";
    this.hoverFill   = "#bbbbbb";
    this.clickFill   = "#ffffff";

    gameCanvas.addEventListener('mousemove', function(event) {
      if (self.pointIntersects(event.offsetX, event.offsetY)) {
        if (self.state !== 'hover') {
          self.state = 'hover';
          self.render(gameCanvas.getContext('2d'));
        }
      } else {
        if (self.state !== 'default') {
          self.state = 'default';
          self.render(gameCanvas.getContext('2d'));
        }
      }
    });

    gameCanvas.addEventListener('mouseup', function(event) {
      if (self.pointIntersects(event.offsetX, event.offsetY)) {
        console.log('I was clicked');
      }
    });
  };

  /**
   * Renders the button on the screen.
   * @return {SjButton}
   */
  this.render = function(ctx) {
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