'use strict';

var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var URL = '<%= server_address %>';

var paths = {
  scripts: 'js/**/*.coffee',
  images: 'images/**/*',
  styles: 'sass/style.<%= sass ? 's' : '' %>css',
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

<% if sass { %>
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

gulp.task('reload-scripts', ['scripts'], browserSync.reload);

gulp.task('watch', function() {
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.scripts, ['reload-scripts']);
  gulp.watch(paths.php).on('change', browserSync.reload);
});

gulp.task('serve', function() {
  browserSync.init({
    proxy: URL,
    ghostMode: true,
  });
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['serve', 'scripts', 'styles', 'watch']);
