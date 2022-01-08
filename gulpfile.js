const gulp = require('gulp');
const handlebars = require('gulp-handlebars');
const nunjucks = require('gulp-nunjucks');
const njkRender = require('gulp-nunjucks-render');


gulp.task('njk-project-list', ()=> {
    return gulp.src('./templates/precompiling-templates/projects/*.njk')
        .pipe(njkRender())
        .pipe(gulp.dest('./templates/compiling-templates/projects/'));
});
