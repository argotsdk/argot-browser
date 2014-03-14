var argot = require('argot');
var http = require('http');
var util = require('util');
var stream = require('stream');

Buffer._useTypedArrays = false;

function ErrorablePassThroughStream() {
  stream.PassThrough.call(this);
}
util.inherits(ErrorablePassThroughStream, stream.PassThrough);
ErrorablePassThroughStream.prototype.error = function(message) {
  this.emit('error', message);
};

function Argot() {
}

Argot.prototype.read = argot.read;
Argot.prototype.readMessage = argot.readMessage;
Argot.prototype.loadDictionary = argot.loadDictionary;

function makeArgot(path) {
  var StreamMaker = require('argot/lib/StreamMaker.js');
  // Override StreamMaker to pull from url instead of local path
  StreamMaker.prototype.makeStream = function(fileName) {
    var pathSegments = fileName.split('/');
    var file = pathSegments[pathSegments.length - 1];
    console.log('loading file ' + file);
    var rs = new ErrorablePassThroughStream();
    var req = http.request({method: 'GET', path: path + '/' + file}, function(res) {
      if(res.statusCode === 200) {
        res.pipe(rs);
      } else {
        rs.error('Could not load file: ' + file);
      }
    });
    // This lets the response handle binary data
    req.xhr.responseType = 'arraybuffer';
    req.end();
    return rs;
  };

  return new Argot();
}


module.exports = makeArgot;
