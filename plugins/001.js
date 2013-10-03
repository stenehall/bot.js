/*
 * @CorePlugin
 * @Description: Listens on 001 after that it should be safe to join
 *
 * @Status: Very unstable
 */

var Ping = function Ping(bot) {
  this.pluginName = "ping";

  this.listeners = {'001': this._001};

}

Ping.prototype._001 = function _001(message) {
  this.config.server.channels.forEach(function (channel) {
    var message = {'command': 'JOIN', 'parameters': [ channel ]};
    this.push(message);
  }, this);
}

exports.Plugin = Ping;