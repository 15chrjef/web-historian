var path = require('path');
var archive = require('../helpers/archive-helpers');
var requestHelpers = require('./http-helpers');
var http = require('http');
var url = require('url');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var url = archive.paths.siteAssets + './index.html';
  fs.readFile(url, function(err, file) {
    if (err) {
      console.error(err);
    } else {
      res.writeHead(200, requestHelpers.headers);
      res.write(file);
      res.end();
    }
  });
};
