import gulp from "gulp";
import browserSync from "browser-sync";
import dartSass from "sass";
import ts from "gulp-typescript";
import gulpSass from "gulp-sass";
import { deleteAsync } from "del";

const reset = () => {
  return deleteAsync("dist");
};

const copy = () => {
  return gulp.src("src/files/**/*.*").pipe(gulp.dest("dist/files/"));
};

const scripts = () => {
  return gulp
    .src("src/ts/**/*.ts")
    .pipe(
      ts({
        noImplicitAny: true,
        target: "esnext",
        module: "esnext",
        esModuleInterop: true,
        moduleResolution: "node",
        outDir: "dist/js/",
      })
    )
    .pipe(gulp.dest("dist/js/"))
    .pipe(browserSync.stream());
};
const html = () => {
  return gulp
    .src("src/*.html")
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
};

const styles = () => {
  const sass = gulpSass(dartSass);
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
  gulp.watch("src/**/*.html", html);
  gulp.watch("src/scss/**/*.scss", styles);
  gulp.watch("src/ts/**/*.ts", scripts);
}

const mainTasks = gulp.parallel(copy, html, styles, scripts);
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
gulp.task("default", dev);
