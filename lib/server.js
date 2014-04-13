/**
 * Module dependencies.
 */

var debug = require('debug')('primus-router');

/**
 * Expose server.
 */

exports = module.exports = server;

/**
 * Server side socket route handling.
 */

function server(primus) {
  var routes = this.routes;
  primus.on('connection', function(spark) {
    debug('connect route received');
    routes.forEach(function(route) {
      if (route.method === 'connect' && route.fn) route.fn(null, spark);
    });

    spark.on('data', function(data) {
      debug('%s %s route received', data.method, data.path);
      var m = data.method;
      var p = data.path;
      routes.forEach(function(route) {
        if (route.method === m && route.path === p) route.fn(data, spark);
      });
    });
  });
}
