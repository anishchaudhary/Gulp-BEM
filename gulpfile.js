/***Variables***/
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
var minifyjs = require('gulp-js-minify');
//var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');


/* image minifier */
gulp.task('imageMin', () =>
	gulp.src('www/src/images/*')
	.pipe(imagemin())
	.pipe(gulp.dest('www/dist/images'))
);

/* sass compiler */
gulp.task('sass', function () {  
    gulp.src('www/src/scss/style.scss')
        .pipe(sass({includePaths: ['scss']}))
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('www/dist/css'));
});

/* js minifier */
gulp.task('minify-js', function(){
  gulp.src('www/src/js/*.js')
    .pipe(minifyjs())
    .pipe(gulp.dest('www/dist/js'));
});

/*to sync changes with browser*/
gulp.task('browser-sync', function() {  
    browserSync.init(["www/dist/css/*.css", "www/dist/js/*.js"], {
        server: {
            baseDir: "www/"
        }
    });
});

/*to watch and update changes in .scss and .js file*/
gulp.task('default', ['sass', 'browser-sync'], function () {  
    gulp.watch("www/src/scss/*.scss", ['sass']);
});














