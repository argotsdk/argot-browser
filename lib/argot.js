var argot = require('argot');
var http = require('http');
var util = require('util');
var stream = require('stream');
var streamifier = require('streamifier');

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

function toStream(data) {
  var Stream = require('stream');
  if (data instanceof Stream && data.read) {
    return data;
  }
  if (data._object instanceof Array) {
      data = data._object;
  }
  if (data instanceof Array) {
    data = new Buffer(data);
  }
  if (data instanceof Uint8Array) {
     data = new Buffer(data);
  }
  if (data instanceof Buffer) {
    return streamifier.createReadStream(data);
  }
  else {
    return data; // and pray
  }
}

Argot.prototype.read = function(lib,data,type) {
  return argot.read(lib,toStream(data),type);
};

Argot.prototype.readMessage = function(data) {
  return argot.readMessage(toStream(data));
};
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
