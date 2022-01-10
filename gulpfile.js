const gulp = require('gulp');

const hbs = require('gulp-handlebars');
const hbsRender = require('gulp-compile-handlebars')

const rename = require('gulp-rename');


const templateData = {
        project_title : '{{ project.title }}',
        project_description : '{{ project.description }}',
        project_video_id: '{{ project.video_id }}',
        img_image_url: '{{ img.image.url }}',
        dev_user_last_name: '{{ dev.user.last_name }}',
        dev_user_first_name: '{{ dev.user.first_name }}',
        skill_name: '{{ skill.name }}',
        dev_user_username: '{{ dev.user.username }}',
        project_preview_pic_url: '{{ project.preview_pic.url }}',
        project_id: '{{ project.id }}',
        user_user_username: '{{ user.user.username }}',
        user_avatar_url: '{{user.avatar.url}}',
        user_user_first_name: '{{ user.user.first_name}}',
        user_user_last_name: '{{ user.user.last_name }}',
        user_tg_link: '{{ user.tg_link }}',
        user_vk_link: '{{ user.vk_link }}',
        user_whatsapp: '{{ user.whatsapp}}'
    },
    options = {
        batch : ['./templates/modules/'],
        helpers : {
            capitals : function(str){
                return str.toUpperCase();
            }
        }
    }

gulp.task('hbs-project', ()=> {
    return gulp.src('./templates/precompiling-templates/projects/project.hbs')
        .pipe(hbsRender(templateData ,options))
        .pipe(rename('project.html'))
        .pipe(gulp.dest('./templates/projects/'))
});
gulp.task('hbs-project-list', ()=> {
    return gulp.src('./templates/precompiling-templates/projects/project-list.hbs')
        .pipe(hbsRender(templateData ,options))
        .pipe(rename('project-list.html'))
        .pipe(gulp.dest('./templates/projects/'))
});
gulp.task('hbs-about-team', ()=> {
    return gulp.src('./templates/precompiling-templates/users/about-team.hbs')
        .pipe(hbsRender(templateData ,options))
        .pipe(rename('about-team.html'))
        .pipe(gulp.dest('./templates/users/'))
});

gulp.task('hbs', gulp.parallel('hbs-project', 'hbs-project-list', 'hbs-about-team'))