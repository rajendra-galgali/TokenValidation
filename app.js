'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var cors = require('cors');
var tokenService = require('./api/services/token-service');

app.use(cors());

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

app.use(require('express').static('public'));
require('./api/db/dbConnections')(app);
require('./config/config')(app);

let jwt_token = tokenService.generateToken({name: "mahesh"});
console.log(jwt_token);

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);
	app.use(swaggerExpress.runner.swaggerTools.swaggerUi());
  var port = process.env.PORT || 10010;
  app.listen(port, () => console.log("server running on port -",port));

});
