var path = require('path');
var archive = require('../helpers/archive-helpers');
var requestHelpers = require('./http-helpers');
var http = require('http');
var url = require('url');
var fs = require('fs');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log('requrl***********',req.url)
  var url = archive.paths.siteAssets + '/index.html';
  //where we store our lookup value for the archives
  var input;
  console.log(url);

  if (req.method === 'GET') {
    fs.readFile(url, 'utf-8', function(err, chunk) {
      if (err) {
        console.error(err);
      } else {
        console.log(chunk)
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.write(chunk);
        res.end();
        return;
      }
    });
  }
  
};
