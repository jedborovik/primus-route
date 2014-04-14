/**
 * Module dependencies.
 */

var client = require('./lib/client');
var server = require('./lib/server');
var methods = require('./lib/methods');
var debug = require('debug')('primus-router');

/**
 * Router prototype.
 */

var router = Router.prototype;

/**
 * Expose 'Router'.
 */

exports = module.exports = Router;

/**
 * Initialize a new 'Router'.
 *
 * @api public
 */

function Router() {
  if (!(this instanceof Router)) return new Router;
  this.routes = [];
  this.server = server.bind(this);
  this.library = client.library;
}

/**
 * Connection route.
 */

router.connect = function(fn) {
  debug('connect route added');
  this.routes.push({
    method: 'connect',
    fn: fn
  });
}

/**
 * Add server side routing functions.
 */

methods.forEach(function(method) {
  router[method] = create(method);
});

function create(method) {
  if (method) method = method.toUpperCase();
  return function(path, fn) {
    debug('%s %s route added', method, path);
    this.routes.push({
      method: method,
      path: path,
      fn: fn
    });
  }
}
