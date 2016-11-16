var gulp 		= require('gulp'),
	sass 		= require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat		= require('gulp-concat'),
	uglify		= require('gulp-uglifyjs'),
	cssnano		= require('gulp-cssnano'),
	rename		= require('gulp-rename'),
	del			= require('del'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){
	return gulp.src('app/sass/*',['sass|scss'])
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', 'ie 8'], {cascade: true}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
}); 

gulp.task('scripts',function(){
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/js/common.js',
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
});

gulp.task('css-libs',['sass'], function(){
	return gulp.src([
		'app/css/main.css',
	])
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'));
})

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('clean',function(){
	return del.sync('dist');
});

gulp.task('img', function(){
	return gulp.src('app/img/**/*',['jpg|png'])
	.pipe(gulp.dest('dist/img'))
});

gulp.task('watch',['browser-sync','css-libs','scripts'], function(){
	gulp.watch('app/sass/*.sass',['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build',['clean','img','sass','scripts'], function(){
	var builCss = gulp.src([
		'app/css/main.css',
		'app/css/main.min.css',
	])
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));
});