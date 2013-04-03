GfEngine = function(canvas) {
  this.init = function(canvas) {
    gf = this;

    // Initialize frames per second at 30.
    this.fpsRate = 30;

    // Store reference to the game canvas.
    this.canvas = canvas;
    this.ctx    = canvas.getContext('2d');

    window.requestAnimFrame = function(callback){
      setTimeout(function () { 
        callback(new Date().getTime());
      }, 1000 / this.fpsRate);
    };
  };

  this.start = function(fps) {
    this.fpsRate = fps;
    window.requestAnimFrame(gf.tick);

    return this;
  };

  this.tick = function() {
    var self = gf;

    gf.ctx.clearRect(0,0,500,500);
    gf.update();
    gf.render();

    window.requestAnimFrame(gf.tick);
  };

  this.update = function() {
    GamePlayer.update(this.ctx);
  };

  this.render = function() {
    GamePlayer.render(this.ctx);
  };

  this.init(canvas);
};