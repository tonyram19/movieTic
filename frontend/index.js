var app = require('./server');

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Events app listening at http://%s:%s', host, port);
});
