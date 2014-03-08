// Add argot to Express server
var browserify = require('browserify-middleware');

function endsWith(str, suffix) {
  var strLength = str.length;
  var suffixLength = suffix.length;
  return str.indexOf(suffix, strLength - suffixLength) !== -1;
}

function augmentServer(server) {
  server.get('/dictionaries/:filename', function (req, res) {
    // There has to be a more portable way than this
    var fileName = req.params.filename;
    if (fileName && endsWith(fileName, '.dictionary')) {
      res.sendfile('node_modules/argot-browser/node_modules/argot/lib/' + req.params.filename);
    } else {
      res.send(404);
    }

  });
  server.get('/argot/argot.js', browserify('./argot.js', {standalone: 'argot'}));
}

module.exports = augmentServer;
