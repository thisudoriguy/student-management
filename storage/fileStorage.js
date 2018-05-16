const multer = require('multer');
const fs = require('fs');

function getDestination(req, res, callback) {
    callback(null, '/dev/null')
}

function filesStoreHere(opts) {
    this.getDestination = (getDestination)
}

filesStoreHere.prototype._handleFile = function _handleFile(req, file, callback) {
    this.getDestination(req, file, function(err, path){
        if(err){
            return callback(err)
        }

        var outStream = fs.createWriteStream('path')

        file.stream.pipe(outStream)
        outStream.on('error', callback)
        outStream.on('finish', function() {
            callback(null, {
                path: path,
                size: outStream.bytesWritten
            })
        })
    })
}

filesStoreHere.prototype._removeFile = function _handleFile(req, file, callback) {
    fs.unlink(file.path, callback)
}

module.exports = function (opts) {
    return new filesStoreHere
}