var fs = require('fs');

module.exports = function(irc) {
  var cmdchar = '!'

  irc.on('privmsg', function(m) {
    if (m.text.length && m.text[0] == cmdchar) {
      var responder = {};

      var nochar = m.text.substr(1);
      var which = nochar.split(' ');
      var sendto = m.target[0] == '#' ? m.target : m.user.nick;
      responder.respond = irc.send.bind(irc, 'privmsg', sendto);

      var args = which.slice(1);
      args.unshift(m);

      if (which[0] && typeof(cmds[which[0]]) === 'function') {
        cmds[which[0]].apply(responder, args);
      } else {
        responder.respond('no such command: ' + which[0]);
      }
    }
  });

  var cmds = {};

  cmds.test = function(m) {
    this.respond('fuck you, ' + m.user.nick + '!');
  };

  return cmds;
};
