var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var gulp_watch_pug = require('gulp-watch-pug');
var connect = require('gulp-connect');

var config = {
    publicDir: 'public'
}

gulp.task('connect', function() {
    connect.server({
        root: 'public',
        livereload: true
    });
});

gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass({ 
            errLogToConsole: true
        }))
        .pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('views', function buildHTML() {
    gulp.src('views/*.pug')
        .pipe(watch('views/*.pug'))
        .pipe(gulp_watch_pug('views/*.pug', { delay: 100 }))
        .pipe(pug())
        .pipe(gulp.dest('public'));
});

gulp.task('livereload', function() {
    gulp.src('public/**/*')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('views/**/*.pug', ['views']);
    gulp.watch(config.publicDir + '/**/*', ['livereload']);
});

gulp.task('default', ['connect', 'watch', 'sass']);
