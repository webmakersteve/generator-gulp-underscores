'use strict';

var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();<% if (SASS) { %>
var sass = require('gulp-sass');<% } %>
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect-php');
var open = require('gulp-open');
var urlUtil = require('url');

var URL = '<%= server_address %>';
var parsedUrl = urlUtil.parse(URL);
var hostname = parsedUrl.hostname;
var host = parsedUrl.host;
var port = parsedUrl.port || 80;

var paths = {
  scripts: 'js/**/*.coffee',
  images: 'images/**/*',
  styles: 'sass/style.<%= SASS ? 's' : '' %>css',
  php: './**/*.php'
};

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(coffee())
      .pipe(uglify())
      .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('js'));

});

<% if (SASS) { %>
gulp.task('styles', function () {
  gulp.src(paths.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});
<% } else { %>
gulp.task('styles', function () {
  gulp.src(paths.styles)
    .pipe(autoprefixer())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});
<% } %>

gulp.task('serve', function() {

  connect.server({
    port: parseInt(port) + 1,
    hostname: hostname,
    base: '../../../', // default for a wordpress install
    open: false
  }, function() {
    browserSync({
      host: hostname,
      proxy: host,
      port: port,
      ghostMode: true,
    });
  });
});

gulp.task('reload-scripts', ['scripts'], browserSync.reload);

gulp.task('watch', function() {
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.scripts, ['reload-scripts']);
  gulp.watch(paths.php).on('change', browserSync.reload);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['serve', 'scripts', 'styles', 'serve', 'watch']);
