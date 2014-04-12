var methods = require('./methods');

exports.library = [
  ';(function(Primus) {',
  'if (typeof Primus === "undefined") return;',
  'var methods = ' + JSON.stringify(methods) + ';',
  client.toString(),
  'client();',
  '})(Primus);'
].join('\n');

// no-op function to make primus happy
exports.client = function() {};
  
function client() {
  if (typeof methods === 'undefined') return;

  methods.forEach(function(method) {
    Primus.prototype[method] = function(path, body) {
      var message = Object.create(null);
      message.method = method.toUpperCase();
      message.path = path;
      message.body = body;
      message.id = this.id;
      this.write(message);
    }
  });
}
