var methods = require('methods');
var client = require('./lib/client');
var server = require('./lib/server');

exports.client = client;

// Add server side routes
methods.forEach(function(method) {
  exports[method] = server.create(method);
});

exports.del = exports.delete;
exports.all = server.create();
