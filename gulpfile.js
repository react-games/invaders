var gulp = require('gulp');
var nib = require('nib');
var stylus = require('gulp-stylus');
var del = require('del');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var livereload = require('gulp-livereload');

gulp.task('clean', function () {
  del(['dist/**']);
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

gulp.task('watch', function(){
  livereload.listen();
  gulp.watch('./src/html/*.html', ['html']);
  gulp.watch('./src/stylus/*.styl', ['css']);
  gulp.watch('./src/js/*.jsx', ['js']);
});

gulp.task('default', ['clean', 'html', 'css', 'js']);
