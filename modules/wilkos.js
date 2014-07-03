var fs = require('fs');

function get_wilkos(filename) {
  function get_random_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var data = fs.readFileSync(filename, 'utf8');
  var lines = data.split("\n");

  var index = get_random_int(0, lines.length - 1);

  return lines[index];
}

module.exports = function(irc) {
  var pubcmd = irc.use(require('./pubcmd'));

  pubcmd.wilkos = function(m) {
    this.respond(get_wilkos(irc.config.plugins.wilkos.path));
  }
}
