var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var pkg = require('./package.json');
var gutil = require('gulp-util');
var plugins = require('gulp-load-plugins')({
    rename: {
        'gulp-live-server': 'serve'
    }
});

// Default task
gulp.task('default', ['vendor']);

// Dev task
gulp.task('dev', ['browserSync'], function() {
  gulp.watch('./css/*.css', browserSync.reload);
  gulp.watch('./*.html', browserSync.reload);
  gulp.watch('less/**/*.less', ['css-mine']).on('change', browserSync.reload);
});

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function() {

  // Bootstrap JS
  gulp.src([
      './node_modules/bootstrap/dist/js/**/*',
      '!./node_modules/bootstrap/dist/js/bootstrap.bundle*',
    ])
    .pipe(gulp.dest('./js/vendor/bootstrap'))

  // Angular
  gulp.src(['./node_modules/angular/angular.min.js']).pipe(gulp.dest('./js/vendor/angular'))  
  gulp.src(['./node_modules/angular-route/angular-route.min.js']).pipe(gulp.dest('./js/vendor/angular-route'))  

  // Bootstrap CSS
  gulp.src([
      './node_modules/bootstrap/dist/css/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('./css/vendor/bootstrap'))

  // Normalize CSS
  gulp.src(['./node_modules/normalize.css/normalize.css']).pipe(gulp.dest('./css/vendor/normalize'))

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./js/vendor/jquery'))

})

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    browser: "chrome",
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('css-mine', function () {
    return gulp.src('less/*.less')
        .pipe(plugins.less())
        .on('error', function (err) {
            gutil.log(err);
            this.emit('end');
        })
        .pipe(plugins.autoprefixer({
            browsers: [
                    '> 1%',
                    'last 2 versions',
                    'firefox >= 4',
                    'safari 7',
                    'safari 8',
                    'IE 8',
                    'IE 9',
                    'IE 10',
                    'IE 11'
                ],
            cascade: false
        }))
        .pipe(gulp.dest('css')).on('error', gutil.log);
});