var argot = require('argot');
var StreamMaker = require('argot/lib/StreamMaker.js');
var http = require('http');
var streamifier = require('streamifier');
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

StreamMaker.prototype.makeStream = function(fileName) {
  var pathSegments = fileName.split('/');
  var file = pathSegments[pathSegments.length - 1];
  console.log('loading file ' + file);
  var rs = new ErrorablePassThroughStream();
  var req = http.request({method: 'GET', path: '/dictionaries/' + file}, function(res) {
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

module.exports.read = argot.read;
module.exports.readMessage = argot.readMessage;
module.exports.loadDictionary = argot.loadDictionary;
module.exports.toStream = function(input) {
  var buffer = new Buffer(input);
  return streamifier.createReadStream(buffer);
};
