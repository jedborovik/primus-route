var client = require('./lib/client');
var server = require('./lib/server');
var methods = require('./lib/methods');

exports.client = client;

// Add server side routes
methods.forEach(function(method) {
  exports[method] = server.create(method);
});

exports.del = exports.delete;
exports.all = server.create();
