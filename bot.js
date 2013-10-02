var Stream = require('stream'),
    Util = require('util'),
    Erk = require('erk'),
    Fs = require('fs'),
    Net = require('net'),
    Path = require('path'),
    _ = require('underscore'),
    Colors = require('colors'),

    Queue = require('./lib/queue').Queue,
    PluginHandler = require('./lib/pluginHandler.js').PluginHandler

var Bot = module.exports = function Bot (config) {

  Stream.Duplex.call(this, {objectMode: true});

  this.parser = new Erk.Parser();
  this.composer = new Erk.Composer();
  this.queue = new Queue(this);
  this.plugin = new PluginHandler(this);

  this._read = function _read(size) {}

  this._write = function _write(message, enc, done) {
    this.emit(message.command, message);
    this.queue.handleQueue(message);
    done();
  }

  this.loadConfig(config);

  if (this.config.plugins !== undefined && this.config.plugins.length > 0)
  {
    this.config.plugins.forEach(function(plugin) {
      console.log(plugin);
    });
  }

  this.setUpServer(this.config.adapter || new Net.Socket);
  this.doConnect(this.config.connect || function() {this.server.connect(this.config.port, this.config.server)});

};
Bot.prototype = Object.create(Stream.Duplex.prototype, {constructor: {value: Bot}});

Bot.prototype.setUpServer = function setUpServer(server) {
  this.server = server;

  this.server.on('connect', function () {
    this.pipe(this.composer).pipe(this.server).pipe(this.parser).pipe(this);
    this.emit('connect');
  }.bind(this));
}

Bot.prototype.doConnect = function doConnect(doConnect) {
  this.connection = doConnect;
}

Bot.prototype.connect = function connect() {
  this.connection();
}

Bot.prototype.end = function connect () {
  console.log('Time to sleep...');
}

Bot.prototype.loadConfig = function loadConfig(config) {

  var configFile = Path.resolve(__dirname, 'config.json');
  if ( ! Fs.existsSync(configFile)) {
    console.error('Please copy the config.json file from the npm package to this directory and edit it as you like.');
    return false;
  }
  this.config = require(configFile);

  // Lets get us some settings.
  if (config !== undefined)
  {
    _.extend(this.config, config);
  }
}