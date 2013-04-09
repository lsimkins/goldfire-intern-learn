/**
 * Copyright (c) 2012, GoldFire Studios, Inc.
 * http://goldfirestudios.com
 */

/**
 * Render Component.
 * @type {Render}
 */
var Render = BaseComponent.extend({
  componentId: 'render',
  active: false,

  init: function(entity, settings) {
    this._super(entity, settings);

    if (!entity.transform) {
      console.log("No enitity transform defined!");
      gf.registerRender(this, entity.transform);
    }
  }
});