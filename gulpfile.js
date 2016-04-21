var gulp = require('gulp');
var sass = require('gulp-sass');
var connect= require('gulp-connect');
var nodemon= require('gulp-nodemon');

gulp.task('start', function () {
  nodemon({
    script : 'server.js',
    ext: 'js jade html scss',
    env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('connect', function(){
  connect.server({
    root: '*.*',
    livereload: true
  });
});

gulp.task('sass', function() {
   gulp.src('scss/*.scss')
       .pipe(sass().on('error', sass.logError))
       .pipe(gulp.dest('./public/css/'));
});

gulp.task('livereload', function (){
  gulp.src('./public/**/*')
  .pipe(connect.reload());
});

gulp.task('watch', function() {
   gulp.watch('sass/**/*.scss',['sass']);
   gulp.watch('./public/**/*', ['livereload']);

});

gulp.task('default', ['connect','sass','watch', 'start']);
