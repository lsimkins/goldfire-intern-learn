/**
 * Very basic engine class.
 * @param {HTMLCanvasElement} canvas The canvas this game is rendered to.
 */
GfEngine = function(canvas) {
  /**
   * Initializes the engine.
   * @param  {HTMLCanvasElement} canvas The game canvas to render to. 
   * @return {undefined}
   */
  this.init = function(canvas) {
    // First, we create a global reference to this engine.
    gf = this;

    // Initialize frames per second at 30.
    this.fpsRate = 30;

    // Store reference to the game canvas that was passed in.
    this.canvas = canvas;

    // Store reference to the game canvas context.
    this.ctx = canvas.getContext('2d');

    // Here we create the method that is the backbone of the game engine.
    // requestAnimFrame is the standard name for the function that is called
    // every time the engine ticks. What it does is set a timer that requests
    // the next animation frame on finish. The callback parameter is a function that
    // is passed in by us. You can see what we pass in below.
    window.requestAnimFrame = function(callback){
      // Set the next timer. The timer time is in milliseconds. So 1000 = 1 second.
      // To get the time for the next frame, we divide 1000 by our fpsRate.
      // Look up the javascript documentation on setTimeout() for more info on the timer itself.
      setTimeout(function () {
        callback();
      }, 1000 / this.fpsRate);
    };
  };

  /**
   * Starts the engine.
   * This accepts a frame per second(fps) parameter.
   * If no fps rate is 
   * @param  {int} fps Frames per second to run the game at.
   * @return {GfEngine}
   */
  this.start = function(fps) {
    /**
     * The line of code below is shorthand for this example "if" statment.
     * It allows us to set default values for function parameters.
     * if (fps) {
     *   this.fpsRate = fps;
     * } else {
     *   this.fpsRate = 30;
     * }
     */
    this.fpsRate = fps || 30;

    // Request an animation frame to start the engine, and send it the engine tick method
    // to call on tick.
    window.requestAnimFrame(gf.tick);

    // This allows us to chain methods. Ask me for more information.
    return this;
  };

  /**
   * This is the engine's tick method. This is what we call every animation frame.
   * It in turn calls update() and render() on our game objects.
   */
  this.tick = function() {
    // This function is being called by the window on requestAnimFrame, so "this"
    // will return this window. We need to operate within scope of the engine, so
    // we use the engine's global namespace, gf, and assign it to self.
    var self = gf;

    // First update the game. This allows all the game logic to process before we actually
    // draw the result.
    gf.update();

    // Now that the game has updated, we draw the result.
    gf.render();

    // Finished, now call the next frame.
    // In a full engine, the next frame would be requested on a different basis. But that is
    // out of scope for this example. We'll discuss that later.
    window.requestAnimFrame(gf.tick);
  };

  /**
   * Update the game logic.
   * Right now, this just calls update on the player.
   * For now we've assigned the player object to a global namespace and call it directly.
   * This will happen slightly differently in the future.
   */
  this.update = function() {
    GamePlayer.update(this.ctx);
  };

  /**
   * Render the result of the update.
   */
  this.render = function() {
    // Clear the canvas. Time to draw a new frame.
    gf.ctx.clearRect(0,0,500,500);

    // Render the updated player to the canvas.
    GamePlayer.render(this.ctx);
  };

  // Initialize the engine.
  this.init(canvas);
};