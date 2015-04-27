var gulp = require('gulp');
var nib = require('nib');
var stylus = require('gulp-stylus');
var del = require('del');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var paths = {
  js: './src/js/**/*.jsx',
  css: './src/stylus/style.styl'
};

gulp.task('clean', function () {
  del.sync(['dist/**']);
});

gulp.task('css', function(){
  gulp.src('./src/stylus/style.styl')
    .pipe(stylus({use: nib(), import: ['nib']}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('html', function(){
  gulp.src('./src/html/index.html')
  .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
  browserify({
    entries: './src/js/index.jsx',
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist/js'));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  gulp.watch('./dist/js/bundle.js').on('change', reload);
});

gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.css, ['css']);
});

gulp.task('default', ['clean', 'watch', 'html', 'css', 'js', 'browser-sync']);
