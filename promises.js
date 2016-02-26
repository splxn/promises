//Webstorm doesn't run program without this string
require('es6-promise').polyfill();

var Q = require('q');
var _ = require('lodash');
var Converter = require('csvtojson').Converter;
var csvConverter = new Converter({constructResult: false});

//arrays for files and promises
var inputFiles = ['ru.csv', 'de.csv', 'en.csv'];
var promises = [];

//converting csv to json
function transform(inputFile, outputFile) {
  var readStream = require('fs').createReadStream(inputFile);
  var writeStream = require('fs').createWriteStream(outputFile);
  readStream.pipe(csvConverter).pipe(writeStream);
}

//creating array of promises
_.forEach(inputFiles, function(file) {
  promises.push(new Promise(function(resolve, reject) {
    var outputFile = file.replace('csv', 'json');
    transform(file, outputFile);
    resolve(outputFile);
    if (err) {
      reject (err);
      return;
    }
  }));
});

//applying promises to each file
Q.all(promises)
  .then(console.log('files converted'))
  .catch(function (err) {
    console.error(err.toString());
  })



