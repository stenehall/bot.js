var _ = require('underscore');

// Simple plugin constructor
var Plugin = exports.Plugin = function Plugin(bot) {
  this.bot = bot;
};

// shared functions
// Plugin.prototype.foobar = function foobar(event, listener) {
//   console.log('Plugin - Prototype - '+this.bot);
// };

// Plugin.prototype.hello = function foobar(event, listener) {
//   console.log('Plugin - Hello - '+this.bot);
// };


/*
 * Adds listeners for the plugin.
 */
Plugin.prototype.On = function On (callback) {

  // Make sure we have tables/collection/whatever set up for the plugin
  // if (this.dbConfig !== undefined)
  // {
  //   for(var tableName in this.dbConfig.tables) {
  //     this.bot.db.createTable(tableName, this.dbConfig.tables[tableName]);
  //   }
  // }
  var key;
  for (key in this.listeners)
  {
    this.bot.addListener(key, this.listeners[key]);
  }

  if (callback !== undefined)
  {
    callback();
  }
}

/*
 * Removes all listeners added by On
 */
Plugin.prototype.Off = function Off (callback) {
  var key;
  for (key in this.listeners)
  {
    this.bot.removeListener(key, this.listeners[key]);
    delete this.bot._events[key];
  }
  if(callback !== undefined)
  {
    callback();
  }
}


// factory function
Plugin.create = function create(builder) {
  var p = function(bot) {
    Plugin.call(this, bot);
    builder.call(this);
  };

   p.prototype = Object.create(Plugin.prototype, {constructor: {value: builder.name }});
 _.extend(p.prototype, builder.prototype);


  p.name = builder.name;

  return p;
};