const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('default', () => {
  return gulp.src('test.js', {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('generate-ns', () => {
  var source = require('vinyl-source-stream');
  var vinylBuffer = require('vinyl-buffer');
  var generateNSFile = require('./index').generateNSFile;
  var stream = source('ns.js');
  stream.write(generateNSFile());
  stream.end();
  return stream.pipe(vinylBuffer()).pipe(gulp.dest('dist/'));
});
