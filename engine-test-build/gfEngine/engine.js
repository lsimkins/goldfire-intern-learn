/**
 * GfEngine v0.0.1
 * Copyright (c) 2012, GoldFire Studios, Inc.
 * http://goldfirestudios.com
 */
var GfEngine = GfClass.extend({
  fpsRate: 30,

  _renderRegister : [],

  init : function(canvas) {
    gf = this;

    this.canvas = canvas;
    this.ctx    = canvas.getContext('2d');

    window.requestAnimFrame = function(callback){
      setTimeout(function () {
        callback();
      }, 1000 / this.fpsRate);
    };
  },

  start : function(fps) {
    this.fpsRate = fps || 30;

    window.requestAnimFrame(gf.tick);

    return this;
  },

  tick : function() {
    var self = gf;

    gf.update();
    gf.render();
    window.requestAnimFrame(gf.tick);
  },

  update : function() {
    GamePlayer.update(this.ctx);
  },

  registerRender: function(render) {
    this._renderRegister.push(render);
  },

  render : function() {
    gf.ctx.clearRect(0,0,500,500);
  }
});