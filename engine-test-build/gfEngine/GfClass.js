(function(){
  var initializing = false,
    fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
 
  this.GfClass = function(){};
 
  GfClass.extend = function(prop) {
    var _super = this.prototype;
   
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
           
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
           
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
           
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    // The dummy class constructor
    function GfClass() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    // Populate our constructed prototype object
    GfClass.prototype = prototype;
   
    // Enforce the constructor to be what we expect
    GfClass.prototype.constructor = Class;
 
    // And make this class extendable
    GfClass.extend = arguments.callee;

    GfClass.prototype.merge = function(merge) {
      for( var key in merge ) {
        var ext = merge[key];
        if(
          typeof(ext) != 'object' ||
          ext instanceof HTMLElement ||
          ext instanceof ig.Class
        ) {
          this[key] = ext;
        }
        else {
          if( !this[key] || typeof(this[key]) != 'object' ) {
            this[key] = (ext instanceof Array) ? [] : {};
          }
          ig.merge( this[key], ext );
        }
      }
      return this;
    };

    return Class;
  };
})();