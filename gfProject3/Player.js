Player = function(x, y) {
  this.init = function(x, y) {
    var self = this;

    this.x = x;
    this.y = y;

    // Initialize velocities at 0.
    this._vx = 0;
    this._vy = 0;

    this._ax = 0.04;
    this._ay = 0.04;

    window.addEventListener('keydown', function(event) {
      if (event.which === 37) {
        self._vx -= 0.04;
      } else if (event.which === 38) {
        self._vy -= 0.04;
      } else if (event.which === 39) {
        self._vx += 0.04;
      } else if (event.which === 40) {
        self._vy += 0.04;
      }
    });
  };

  this.update = function(ctx) {
    this.x += this._vx;
    this.y += this._vy;
  };

  this.render = function(ctx) {
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