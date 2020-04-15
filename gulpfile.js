var gulp   = require('gulp');
var mocha  = require('gulp-mocha');

function testTask() {
  return gulp
    .src('test/test.js')
    .pipe(mocha());
}

gulp.task('test', testTask);

gulp.task('default', testTask);
