# primus-router

 RESTful routing for [primus](https://github.com/primus/primus) websockets
 
 ```
 var router = require('primus-router')();
 primus.use('router', router);

 router.connect(visitController.create);
 router.post('/user', userController.create);
 ```


## Installation
```js
$ npm install primus-router
```
