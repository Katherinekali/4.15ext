const gulp = require("gulp")
const webserver = require("gulp-webserver");
const cssmin = require("gulp-clean-css");
const sass = require("gulp-sass")
const jsmin = require("gulp-uglify");
const imgmin = require("gulp-imagemin")
gulp.task("devCss", () => {
    return gulp.src("./src/scss/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./src/css"))
        .pipe(gulp.dest("./dist/css"))
})
gulp.task("devJs", () => {
    return gulp.src("./src/js/**/*.js")
        .pipe(jsmin())
        .pipe(gulp.dest("./dist/js"))
})
gulp.task("server", () => {
    return gulp.src("./src")
        .pipe(webserver({
            port: 3000,
            livereload: true,
            open: true,
            proxies: [
                { source: "/api/getData", target: "http://localhost:8080/api/getData" }
            ]

        }))
})
gulp.task("dev", () => {
    return gulp.src(".")
        .pipe(webserver({
            port: 8080,
            middleware: (req, res, next) => {

            }
        }))
})
gulp.task("watching", () => {
    return gulp.watch(["./src/scss/**/*.scss", "./src/js/**/*.js"], gulp.series("devCss", "devJs"))
})
gulp.task("default", gulp.series("devCss", "devJs", "watching"))