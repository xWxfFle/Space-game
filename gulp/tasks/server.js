import browserSync from "browser-sync";
export const server = (done) => {
  browserSync.init({
    server: {
      baseDir: `${app.path.build.html}`,
    },
    port: 3000,
  });
};
