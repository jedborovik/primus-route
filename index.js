
exports = module.exports = routes;

function routes(action, route, fn) {
  return { server: createRoute(action, route, fn) };
}

function createRoute(action, routes, fn) {
  return function(primus) {
    primus.transform('incoming', function(packet) { 
      if (packet.data.action === action && packet.data.route === route) {
        fn(packet);
      }
    });
  }
}
