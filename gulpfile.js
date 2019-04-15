const gulp = require("gulp")
const webserver = require("gulp-webserver");
const cssmin = require("gulp-clean-css");
const sass = require("gulp-sass")
const jsmin = require("gulp-uglify");
const imgmin = require("gulp-imagemin");

const { readFileSync } = require("fs");
const data = require("./data/data.json");
gulp.task("devCss", () => {
        return gulp.src("./src/scss/**/*.scss")
            .pipe(sass())
            .pipe(gulp.dest("./src/css"))
            .pipe(gulp.dest("./dist/css"))
    })
    // gulp.task("devJs", () => {
    //     return gulp.src("./src/js/**/index.js")
    //         .pipe(jsmin())
    //         .pipe(gulp.dest("./dist/js"))
    // })
gulp.task("devimg", () => {
    return gulp.src("./src/img/*")
        .pipe(imgmin())
        .pipe(gulp.dest("./dist/img"))
})

gulp.task("server", () => {
    return gulp.src("./src")
        .pipe(webserver({
            port: 3000,
            livereload: true,
            open: true,
            proxies: [
                { source: "/api/getData", target: "http://localhost:8888/api/getData" }
            ]

        }))
})
gulp.task("dev", () => {
    return gulp.src(".")
        .pipe(webserver({
            port: 8888,
            middleware: (req, res, next) => {
                let { pathname, query } = require("url", true);
                switch (pathname) {
                    case "/api/getData":
                        res.end()
                        res.end(JSON.stringify(data))
                        break;
                    default:
                        "not found"
                }

            }
        }))
})
gulp.task("watching", () => {
    return gulp.watch(["./src/scss/**/*.scss", "./src/js/**/*.js", "./src/img/*"], gulp.series("devCss", "devJs", "devimg"))
})
gulp.task("default", gulp.series("devCss", "devimg", "devJs", "server", "dev", "watching"))