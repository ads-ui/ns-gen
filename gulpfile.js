const gulp = require('gulp');
const mocha = require('gulp-mocha');
var source = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');

gulp.task('default', () => {
  return gulp.src('test.js', {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('generate-js', () => {
  var generateJsFile = require('./index').generateJsFile;
  var stream = source('ns.js');
  stream.write(generateJsFile());
  stream.end();
  return stream.pipe(vinylBuffer()).pipe(gulp.dest('dist/'));
});

gulp.task('generate-sass', () => {
  var generateSassFile = require('./index').generateSassFile;
  var stream = source('ns.scss');
  stream.write(generateSassFile('css-ns'));
  stream.end();
  return stream.pipe(vinylBuffer()).pipe(gulp.dest('dist/'));
});
