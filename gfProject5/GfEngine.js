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

    this.fpsRate = 30;
    this.canvas = canvas;

    // This is simply an array of game entities that the engine keeps track of.
    // Instead of calling a global instance of each entity, the engine will loop
    // through this array and update all entities in it.
    this.gameEntities = [];

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
    this.fpsRate = fps || 30;

    // Request an animation frame to start the engine, and send it the engine tick method
    // to call on tick.
    window.requestAnimFrame(gf.tick);

    return this;
  };

  /**
   * This is the engine's tick method. This is what we call every animation frame.
   * It in turn calls update() and render() on our game objects.
   */
  this.tick = function() {
    gf.update();
    gf.render();

    window.requestAnimFrame(gf.tick);
  };

  /**
   * This adds a game entity to the engine's internal register so that that entity's
   * update and render methods will be called on tick.
   * @param {Object} entity Game entity to add to register.
   */
  this.addGameEntity = function(entity) {
    this.gameEntities.push(entity);
  },

  /**
   * This removes a game entity from the engine's internal register so that entity's
   * update and render will no longer be called.
   * @param {Object} entity Game entity to remove to register.
   */
  this.removeGameEntity = function(entity) {
    this.gameEntities.splice(this.gameEntities.indexOf(entity), 1);
  },

  /**
   * Update the game logic.
   * This has been updated so it no longer calls a global player entity,
   * rather it loops through its entity register and updates all game entities.
   */
  this.update = function() {
    for (var i=0; i<this.gameEntities.length; i++) {
      this.gameEntities[i].update();
    }
  };

  /**
   * Render the result of the update.
   */
  this.render = function() {
    // Clear the canvas. Time to draw a new frame.
    gf.ctx.clearRect(0,0,500,500);

    // Loop through the entity register and render all entities.
    for (var i=0; i<this.gameEntities.length; i++) {
      this.gameEntities[i].render(gf.ctx);
    }
  };

  // Initialize the engine.
  this.init(canvas);
};