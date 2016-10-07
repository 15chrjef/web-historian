var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var $ = require('jquery');
var http = require('http');
var url = require('url');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  //perform all activity into 
  fs.readFile(exports.paths.list, 'utf8', function (err, sites) {
    if (err) { throw err; }
    var nSites = sites.split('\n');
    callback(nSites);
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(array) {
    if (callback) {
      callback(array.indexOf(url) !== -1);
    }
  }); 
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + '\n', function(err) {
    if (err) {
      throw err;
    }
    callback();
  });

};

exports.isUrlArchived = function(url) {
  var results = true;
  fs.readdir(exports.paths.archivedSites, function(err, files) {
    if (err) {
      throw err;
    }
    if (files.indexOf(url) === -1) {
      results = false;
    }
  });
  return results;
};

exports.downloadUrls = function(urls) {
  var nUrls = url.parse(urls);
  // if ( !exports.isUrlArchived(urls.path) ) {
  http.get({
    host: nUrls.path,
    path: '/',
    'content-type': 'text/html'
  }, function (response) {
    var body = '';
    response.on('data', function(d) {
      body += d;
    }).on('end', function() {
      console.log('body: ', body);
      fs.writeFile(exports.paths.archivedSites + '/' + urls, body, function () {
        if (err) { throw err; }


      });
    });
  });
  // }
};

exports.downloadUrls('www.google.com/');
exports.addUrlToList('www.google.com/')