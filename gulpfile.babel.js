import gulp from "gulp"
import sass from "gulp-sass"
import plumber from "gulp-plumber"
import concat from "gulp-concat"
import babel from "gulp-babel"
import uglify from "gulp-uglify"
import nodemon from "gulp-nodemon"
import browserSync from "browser-sync"

const [reload, http, glob] = [
	browserSync.reload,
	require("./configs/http.json").development,
	{
		js: "./assets/scripts/**/*.js",
		sass: "./assets/stylesheets/**/*.scss",
		pug: "./views/**/*.pug",
		files2copy: "./assets/{!(scripts|stylesheets), **}/**/*.*"
	}
]

gulp.task("copy-files", () => {
	gulp.src(glob.files2copy)
		.pipe(gulp.dest("./public/assets"))
})

gulp.task("es6", () => {
	gulp.src(glob.js)
		.pipe(plumber())
		.pipe(babel({ presets: ["es2015"] }))
		.pipe(concat("app.js"))
		.pipe(gulp.dest("./public"))
		.pipe(reload({ stream: true }))
})

gulp.task("sass", () => {
	gulp.src(glob.sass)
		.pipe(plumber())
		.pipe(sass({ outputStyle: "expanded" }))
		.pipe(concat("app.css"))
		.pipe(gulp.dest("./public"))
		.pipe(reload({ stream: true }))
})

gulp.task("default", ["es6", "sass", "copy-files"], () => {
	gulp.watch(glob.js, ["es6"])
	gulp.watch(glob.sass, ["sass"])
	gulp.watch(glob.pug).on("change", browserSync.reload)
	nodemon({
		script: "index.js",
		ignore: [ "public/", "assets/" ]
	})
	browserSync.init({
		proxy: `${http.host}:${http.port}`,
		open: false
	})
})

gulp.task("build", ["copy-files"], () => {

	gulp.src(glob.js)
		.pipe(babel({ presets: ["es2015"] }))
		.pipe(uglify())
		.pipe(concat("app.js"))
		.pipe(gulp.dest("./public"))

	gulp.src(glob.sass)
		.pipe(sass({ outputStyle: "compressed" }))
		.pipe(concat("app.css"))
		.pipe(gulp.dest("./public"))

})