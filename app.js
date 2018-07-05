'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var cors = require('cors');

app.use(cors());

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

app.use(require('express').static('public'));
require('./api/db/dbConnections')(app);
require('./config/config')(app);

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);
	app.use(swaggerExpress.runner.swaggerTools.swaggerUi());
  var port = process.env.PORT || 10010;
  app.listen(port, () => console.log("server running on port -",port));

});
