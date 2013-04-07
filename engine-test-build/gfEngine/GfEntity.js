/**
 * CasinoRPG (http://casinorpg.com)
 * Copyright (c) 2012, GoldFire Studios, Inc.
 * http://goldfirestudios.com
 */

/**
 * Documentation
 * @type {GfEntity}
 */
var GfEntity = GfClass.extend({

  components : [],

  init: function() {

  },

  addComponent: function(component, settings) {
    this.components.push(new component(this, settings));
  }
});