/**
 * Copyright (c) 2012, GoldFire Studios, Inc.
 * http://goldfirestudios.com
 */

/**
 * Base Component.
 * @type {Base}
 */
var BaseComponent = GfClass.extend({
  componentId: 'base',

  init: function(entity, settings) {
    this._entity = entity;
    this._entity[this.componentId] = this;

    this.merge(settings);
  }
});