var gulp = require("gulp");

var load = require("gulp-load-plugins")();
// var browser = require("browser-sync").create();

gulp.task("js",function(done){
    gulp.src("./src/js/*.js")
    // .pipe(load.babel({
	// 	'presets':['@babel/env']//es6转es5方法
    // }))
    // .pipe(load.concat("all-min-js.js"))
    .pipe(load.uglify())
    .pipe(gulp.dest("./dit/js"))
    done()
})
gulp.task("html",function(done){
    gulp.src("./src/*.html")
    .pipe(load.minifyHtml())
    .pipe(gulp.dest('./dit'))
    done()
})

gulp.task('sass',function(done){
	gulp.src('./src/css/*.scss')
	.pipe(load.sass())
	.pipe(gulp.dest('./dit/css'))
	done()
})

gulp.task("img",function(done){
    gulp.src("./src/img/**")
    .pipe(gulp.dest("./dit/img"))
    done()
})

gulp.task("font",function(done){
    gulp.src("./src/font/**")
    .pipe(gulp.dest("./dit/font"))
    done()
})

gulp.task("php",function(done){
    gulp.src("./src/*.php")
    .pipe(gulp.dest("./dit"))
    done()
})

// gulp.task("save",gulp.series(gulp.parallel("html","js",'sass',"font","img","php"),function(done){
//     // browser.reload()
//     done()
// }))

// gulp.task("server",gulp.series(gulp.parallel("html","js",'sass',"font","img","php"),function(done){
//     // browser.init({
//     //     server:"./dit",
//     //     port:8080
//     // })
//     gulp.watch("./src/",gulp.series("save"))
//     done()
// }))

gulp.task("now",gulp.series("html","js",'sass',"font","img","php",function(done){
    gulp.watch("./src/",gulp.series("html","js",'sass',"font","img","php"))
    done();
}))

