var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  return asset;
};



// As you progress, keep thinking about what helper functions you can put here!


//bens front page
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
