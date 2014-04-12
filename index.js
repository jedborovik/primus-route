var methods = require('methods');

methods.forEach(function(method) {
  exports[method] = create(method);
});

exports.del = exports.delete;
exports.all = create();

function create(method) {
  if (method) method = method.toUpperCase();

  return function(path, fn) {
    var route = Object.create(null);

    // intercept incoming server messages
    route.server = function(primus) {
      primus.transform('incoming', function(packet) {
        var m = packet.data.method && packet.data.method.toUppercase();
        var p = packet.data.path;

        if (m === method && p === path) fn(packet);
      });
    }

    return route;
  }
}
