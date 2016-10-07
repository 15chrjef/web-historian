var path = require('path');
var archive = require('../helpers/archive-helpers');
var requestHelpers = require('./http-helpers');
var http = require('http');
var url = require('url');
var fs = require('fs');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //where we store our lookup value for the archives
  var input;
  if (req.method === 'GET') {
    if (req.url === '/') {
      var url = archive.paths.siteAssets + '/index.html';
    } else {
      var url = archive.paths.archivedSites + req.url;
    }
    fs.readFile(url, 'utf8', function(err, chunk) {
      if (err) {
        // console.error(err);
        res.writeHead(404, requestHelpers.headers);
        res.end();
      } else {
        res.writeHead(200, requestHelpers.headers);
        res.write(chunk);
        res.end();
        return;
      }
    });
  }
  if ( req.method === 'POST' ) {
    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
    }).on('end', function () {
      body = body.slice(4) + '\n';

      fs.appendFile(archive.paths.list, body, function(err) {
        if (err) {
          console.log(err);
        }
        console.log('appended! ', body.split(), 'to', archive.paths.list);
        fs.readFile(archive.paths.list, 'utf8', function(err, content) {
          if (err) { console.log(err); }
          console.log('reading', content);
        });
      });
    });
    res.writeHead(302, requestHelpers.headers);
    res.end();
  }
};


//bens 
// var path = require('path');
// var archive = require('../helpers/archive-helpers');
// var requestHelpers = require('./http-helpers');
// var http = require('http');
// var url = require('url');
// var fs = require('fs');
// // require more modules/folders here!

// exports.handleRequest = function (req, res) {
//   var parsedUrl = url.parse(req.url);
//   var method = req.method;
//   var header = req.headers;
//   var endpoint = parsedUrl.pathname || '/loading.html';
//   console.log(endpoint);
//   var indexHtmlDir = archive.paths.siteAssets + endpoint; 
//   fs.readFile(indexHtmlDir, function(err, file) {
//     if (err) {
//       console.error(err);
//     } else {
//       res.writeHead(200, requestHelpers.headers);
//       res.write(file);
//       res.end();
//     }
//   });
// };
