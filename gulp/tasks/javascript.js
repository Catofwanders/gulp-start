var gulp        = require('gulp');
var path        = require('path');
var util        = require('gulp-util');
var plumber     = require('gulp-plumber');
var concat      = require('gulp-concat');
var uglifyJs    = require('gulp-uglify');
var config      = require('../config');

gulp.task('javascript:vendor', function() {
  return gulp.src([
      path.resolve('node_modules', 'jquery/dist/jquery.min.js'),
      path.resolve('node_modules', 'svg4everybody/dist/svg4everybody.min.js'),
      path.resolve('node_modules', 'viewport-units-buggyfill/viewport-units-buggyfill.js'),
      path.resolve('node_modules', 'swiper/dist/js/swiper.min.js'),
      path.resolve('node_modules', 'magnific-popup/dist/jquery.magnific-popup.min.js'),
      path.resolve('node_modules', 'scrollMonitor/scrollMonitor.js'),
      path.resolve('node_modules', 'jquery-validation/dist/jquery.validate.min.js'),
      path.resolve('node_modules', 'jquery-mask-plugin/dist/jquery.mask.min.js'),
      path.resolve('node_modules', 'jquery-selectric/src/jquery.selectric.js'),
      path.resolve('node_modules', 'jquery-lazy/jquery.lazy.min.js'),
      // path.resolve('node_modules', 'animejs/anime.min.js'),
      config.src.js + '/vendor/**/*.js'
     ])
    .pipe(plumber({ errorHandler: config.errorHandler }))
    .pipe(concat('vendor.js'))
    .pipe(config.production ? uglifyJs() : util.noop())
    .pipe(gulp.dest(config.dest.js));
});

gulp.task('javascript:app', function() {
  return gulp.src([
      config.src.js + '/*.js'
     ])
    .pipe(plumber({ errorHandler: config.errorHandler }))
    .pipe(concat('app.js'))
    .pipe(config.production ? uglifyJs() : util.noop())
    .pipe(gulp.dest(config.dest.js));
});

gulp.task('javascript', [
  'javascript:vendor',
  'javascript:app'
]);

gulp.task('javascript:watch', function() {
  gulp.watch(config.src.js + '/vendor/**/*.js', ['javascript:vendor']);
  gulp.watch(config.src.js + '/*.js', ['javascript:app']);
});
