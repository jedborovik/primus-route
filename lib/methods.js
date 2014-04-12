// Use this small list of methods rather than full
// http.METHODS because some methods like 'merge'
// are defined in http.METHODS and exist on Primus.prototype

exports = module.exports = [
  'delete',
  'get',
  'post',
  'put'
]
