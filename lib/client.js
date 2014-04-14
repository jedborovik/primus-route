/**
 * Module dependencies.
 */

var methods = require('./methods');

/**
 * Expose library to be included in client-side js.
 */

exports.library = [
  ';(function(Primus) {',
  'if (typeof Primus === "undefined") return;',
  'var methods = ' + JSON.stringify(methods) + ';',
  client.toString(),
  'client();',
  '})(this.Primus);'
].join('\n');

/**
 * Invoked on client-side to add primus router library.
 */

function client() {

  /**
   * Add routing methods to client-side primus.
   */

  (function route() {
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
  })();

  /**
   * Add set functionality to client-side primus.
   */

  (function set() {
    Primus.prototype.set = function(key, value) {
      var changing = this[key] !== value;
      this[key] = value;
      if (changing) this.emit('change:' + key);
    }
  })();


  /**
   * Middleware to add message parser to client-side primus.
   * Optionally added on the client-side via primus.addParser().
   */

  (function parser() {
    Primus.prototype.addParser = function() {
      this.on('data', function(data) {
        if (typeof data.call !== 'object') return;
        if (typeof this[data.call.method] !== 'function') return;
        this[data.call.method].apply(this, data.call.args);
      });
    }
  })();

}
