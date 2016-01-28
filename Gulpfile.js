var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat');

gulp.task('js', function () {
  gulp.src(['app_client/app.js', 'app_client/**/*.js', '!app_client/core/*.js', '!app_client/lib/*.js'])
    .pipe(sourcemaps.init())
      .pipe(concat('wemessage.min.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app_client/core'))
});
