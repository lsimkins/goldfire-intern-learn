/**
 * Copyright (c) 2012, GoldFire Studios, Inc.
 * http://goldfirestudios.com
 */

/**
 * Transform Component.
 * @type {Transform}
 */
var Transform = BaseComponent.extend({
  componentId: 'transform',

  // Default settings.
  position: {x: 0, y: 0, z: 0},
  rotation: {x: 0, y: 0},
  scale:    {x: 0, y: 0},

  children: [],

  init: function(entity, settings) {
    this._super(entity, settings);
  },

  translate: function(x, y, z) {

  },

  addChild: function(entity, ns) {
    ns = ns || null;

    this.children.push(entity);
  }
});