/**
 * Copyright (c) 2012, GoldFire Studios, Inc.
 * http://goldfirestudios.com
 */

/**
 * Base Component.
 * @type {Base}
 */
var Base = GfBaseComponent.extend({
  componentId: 'base',

  init: function(entity, settings) {
    this._entity = entity;

    this.merge(settings);
  }
});