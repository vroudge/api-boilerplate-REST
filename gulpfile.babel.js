import gulp from 'gulp';
import gmocha from 'gulp-mocha';
const gutil = require('gulp-util');
import nodemon from 'gulp-nodemon';
import gulpSequence from 'gulp-sequence';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import path from 'path';

gulp.task('dev', gulpSequence('start'));

///////////////////////////

gulp.task('test', function() {
	return gulp.src(['src/**/*.spec.js'], {read:false})
		.pipe(gmocha(
			{
				require: ['./src/init/test'],
				reporter: 'spec',
				timeout:'5000'
			}
		));
});

gulp.task('start', function() {
	nodemon({
		script: 'dist/index.js',
        ext: 'js'
	});
});

gulp.task('transpilingToECMA5', function() { //Not Used, Use Webstorm filewatch instead
    return gulp.src([
            '.src/**/*.js',
                '!./dist{,/**}',
                '!./node_modules{,/**}',
                '!./**/*.spec.js'
        ], {dot: true})
        .pipe(sourcemaps.init())
        .pipe(babel())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: function(file) {
                return path.relative(file.path, __dirname);
            }
        }))
        .pipe(gulp.dest('dist'));
});

