const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const minify = require('gulp-minify');
//compile scss into css

function style() {
    return gulp.src([
        'node_modules/bootstrap/scss/bootstrap.scss',
        'src/css/datepickerCSS/bootstrap-datepicker.css',
        'node_modules/croppie/croppie.css',
        'node_modules/bootstrap-select/dist/css/bootstrap-select.min.css',
        'src/scss/*.scss'
    ])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(minify())
        .pipe(gulp.dest('src/dest/css'));
}

function script() {    
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/bootstrap-select/dist/js/bootstrap-select.min.js',
        'node_modules/croppie/croppie.js',
        'node_modules/exif-js/exif.js',
        'src/js/*.js'
    ])
    .pipe(concat('bundle.js'))
    .pipe(minify())
    .pipe(gulp.dest('src/dest/js'))
    .pipe(browserSync.stream());
}

function build() {
    style();
    script();
}

function watch() {
    build();
    gulp.watch('src/scss/*.scss', style);
    gulp.watch('src/js/*.js', script);
    gulp.watch('./*.html').on('change',browserSync.reload);
    browserSync.init({ 
        server: {
           baseDir: "./src",
           index: "/index.html"
        }
    });
}

exports.style = style;
exports.script = script;
exports.watch = watch;