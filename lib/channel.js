var Users = require('./user').Users;

exports.Channel = function Channel () {

  var channels = [];

  this.addChannel = function addChannel (channel) {
    if (channels[channel] === undefined)
    {
      channels[channel] = {name: channel, users: new Users};
    }
    return channels[channel];
  }

  this.getChannel = function getChannel (channel)
  {
    console.log(channels);
    if (channels[channel] === undefined)
    {
      return false;
    }
    console.log(channels[channel]);
    console.log(channels[channel].users);
    return channels[channel];
  }

  this.removeChannel = function removeChannel (channel) {
    if (channels[channel] !== undefined)
    {
      delete channels[channel];
      return true;
    }
    else
    {
      return false;
    }
  }

  this.getChannels = function getChannels ()
  {
    return channels;
  }
}