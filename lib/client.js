var methods = require('methods');

exports.library = [
  ';(function(Primus) {',
  'if (typeof Primus === "undefined") return;',
  'var methods = ' + JSON.stringify(methods) + ';',
  client.toString(),
  'client();',
  '})(Primus);'
].join('\n');

exports.client = function() {
  methods.forEach(function(method) {
    Primus.prototype[method] = function(path, body) {
      var message = Object.create();
      message.method = method.toUpperCase();
      message.path = path;
      message.body = body;
      message.id = this.id;
      this.write(message);
    }
  });
}
