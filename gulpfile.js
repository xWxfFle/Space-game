import gulp from "gulp";
import browserSync from "browser-sync";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import { deleteAsync } from "del";

const reset = () => {
  return deleteAsync("dist");
};

const copy = () => {
  return gulp.src("src/files/**/*.*").pipe(gulp.dest("dist/files/"));
};

const html = () => {
  return gulp
    .src("src/*.html")
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
};

const sass = gulpSass(dartSass);

const styles = () => {
  return gulp
    .src("src/scss/style.scss", { sourcemaps: true })
    .pipe(
      sass({
        outputStyle: "compressed",
      })
    )
    .pipe(gulp.dest("dist/css/"))
    .pipe(browserSync.stream());
};

const server = (done) => {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
    port: 3000,
  });
};

function watcher() {
  gulp.watch("src/files/**/*.*", copy);
  gulp.watch("src/**/*/*.html", html);
  gulp.watch("src/scss/**/*.scss", styles);
}

const mainTasks = gulp.parallel(copy, html, styles);
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
gulp.task("default", dev);
