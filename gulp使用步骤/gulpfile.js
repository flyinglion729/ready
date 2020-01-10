var gulp = require('gulp');

var load = require('gulp-load-plugins')();

var browser = require('browser-sync').create()
// var uglify = require('gulp-uglify')
// var minifyCss= require('gulp-minify-css')
// var minifyHtml = require('gulp-minify-html')
// var babel = require('gulp-babel')
// var rename = require('gulp-rename')
// var imagemin = require('gulp-imagemin')


var concat = require('gulp-concat');
//如果运行gulp没有指定任务名,默认执行default任务
//gulp:src,dest,watch,task

gulp.task('init',function(done){
	// gulp.src('./src/index.html')
	// .pipe(gulp.dest('./dist/'))

	// gulp.src(['./src/js/one.js','./src/js/two.js','./src/js/index.js'])
	// gulp.src('./src/**')
	// .pipe(gulp.dest('./dist/'))
	// done();
});


// gulp.task('js',function(done){
// 	gulp.src('./src/js/*.js')
// 	.pipe(uglify())
// 	.pipe(gulp.dest('./dist/js/'))
// 	done()
// })

gulp.task('js',function(done){
	gulp.src('./src/js/*.js')
	.pipe(load.babel({
		'presets':['@babel/env']//es6转es5方法
	}))
	.pipe(load.concat('all.min.js')) //合并
	.pipe(load.uglify()) //去除js的空格 ,进行压缩
	.pipe(gulp.dest('./dist/js/')) //粘贴导出到哪个路径下
	done()
})
gulp.task('css',function(done){
	gulp.src('./src/css/*.css')
	.pipe(load.minifyCss()) //对css文件进行压缩
	.pipe(load.rename('index.min.css')) //对文件进行重新命名
	.pipe(gulp.dest('./dist/css/'))
	done()
})
gulp.task('sass',function(done){ //转scss文件为css 还没测试过能不能和压缩css一起用
	gulp.src('./src/css/*.scss')
	.pipe(load.sass())
	.pipe(gulp.dest('./dit/css'))
	done()
})
gulp.task('html',function(done){
	gulp.src('./src/*.html')
	.pipe(load.minifyHtml())	//对HTML文件进行压缩
	.pipe(gulp.dest('./dist/'))
	done()
})
gulp.task('image',function(done){
	gulp.src('./src/img/**')
	.pipe(load.imagemin()) //对图片进行压缩
	.pipe(gulp.dest('./dist/img/'))
	done()
})

gulp.task('save',gulp.series(gulp.parallel('html','js','css'),function(done){
	browser.reload()
	done()
}))

gulp.task('server',gulp.series(gulp.parallel('html','js','css'),function(done){
	browser.init({   //构建一个服务器
		server:'./dist',//服务器当前位置
		port:9090 //服务器端口号
	})
	gulp.watch('./src/',gulp.series('save'))
	done()
}))