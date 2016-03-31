var p = require('./package.json'),
    gulp = require('gulp'),
    del = require('del'),
    peg = require('gulp-peg'),
    babel = require('gulp-babel'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    template = require('gulp-template'),
    eslint = require('gulp-eslint'),
    mocha = require('gulp-mocha');

gulp.task('clean', function(cb) {
    return del(['./lib']);
});

gulp.task('parser', ['clean'], function() {
    return gulp.src('es6/parser/*.pegjs')
        .pipe(peg())
        .pipe(gulp.dest('lib/parser'));
});

gulp.task('lint', function() {
    return gulp.src('es6/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('build', ['parser', 'lint'], function() {
    return gulp.src('es6/**/*.js')
        .pipe(babel({presets: ['es2015']}))
        .pipe(gulp.dest('lib'));
});

gulp.task('default', ['build']);
