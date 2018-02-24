/**
 * Created by DXZ-Weijiu.Wang on 2017/7/24.
 */

var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var minify = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var rev = require('gulp-rev');
var notify = require('gulp-notify');
var del = require('del');
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');
// 调用 .create() 意味着你得到一个唯一的实例并允许您创建多个服务器或代理。
var browserSync = require('browser-sync').create();
// 这里reload不加括号，只引用不调用
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var revCollector = require('gulp-rev-collector');//替换版本号
var revclean = require('gulp-clean');//清空文件夹
var gulpSequence = require('gulp-sequence');
//这个可以让express启动
gulp.task("node", function() {
  nodemon({
    script: './bin/www',
    ext: 'js html css',
    env: {
      'NODE_ENV': 'development'
    }
  })
});

/*
* 打包
* */
gulp.task('testHtmlmin', function () {
  var options = {
    removeComments: true,//清除HTML注释
    collapseWhitespace: true,//压缩HTML
    collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true//删除<style>和<link>的type="text/css"
  };
  return gulp.src(['views/*/*.html','views/*.html'])
    .pipe(htmlmin(options))
    .pipe(gulp.dest('bucketDist'));
});

function getDataForFile(){
  var actJson = require('./views/widget/expertunscramble/expertunscramble.json');
  return actJson;

}

gulp.task('nuk', function () {
  return gulp.src(['views/widget2/*/*.html'])
    //.pipe(data(getDataForFile))
    .pipe(nunjucksRender({
      path: ['views/widget2/'] // String or Array
    }))
    .pipe(gulp.dest('views/dist2'));
});

gulp.task('minifycss', function() {
  return gulp.src(['views/widget2/*/*.css', 'views/widget/*/*.css']) //压缩的文件
    .pipe(minify())
    .pipe(concat('nodemain2.min.css'))
    //.pipe(rev())
    .pipe(gulp.dest('public/assets/css')) //输出文件夹
    .pipe(notify({message: 'css压缩执行成功'}));
});
gulp.task('minifyjs',function(){
  return gulp.src('views/widget2/*/*.js')
    .pipe(uglify())
    .pipe(concat('nodemain.min.js'))
    //.pipe(rev())
    .pipe(gulp.dest('public/assets/js'))
    .pipe(notify({message: 'css压缩执行成功'}));
});
gulp.task('clean', function(cb) {
  del(['public/assets/css/nodemain.min.css', 'public/assets/js/nodemain.min.js'], cb)
});
gulp.task('images', function() {
  return gulp.src(['public/statics/jjl/img/*.*', 'public/statics/jjl/images/*.*'])
    .pipe(imagemin({
      progressive: false
    }))
    .pipe(gulp.dest('public/bucketDist/img'));
});

gulp.task('server', ["node"], function() {
  var files = [
    'views/**/*.html',
    'views/**/*.ejs',
    'views/**/*.jade',
    'public/**/*.*'
  ];

  //gulp.run(["node"]);
  browserSync.init(files, {
    proxy: 'http://localhost:4000',
    browser: 'chrome',
    notify: false,
    port: 4001
  });

  gulp.watch(files).on("change", reload);
});

//css generate verison in dist/rev/css/*.json
gulp.task('revCss',function(){
  return gulp.src('public/**/*.css')
    .pipe(rev())
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist/rev/css'));
})

//js generate verison in dist/rev/js/*.json
gulp.task('revJs',function(){
  return gulp.src('public/**/*.js')
    .pipe(rev())
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist/rev/js'));
})

//check fileinfo: rev-manifest.json in dist/rev,final replace js/css in html;
gulp.task('revProduct',function(){
  return gulp.src(['dist/rev/**/*.json','views/**/*.html'])
    .pipe(revCollector())
    .pipe(gulp.dest('dist/views'));
})

gulp.task('revClean', function(cb) {
  return del([ 'dist/rev/*','dist/views/*'], cb)
});

//打包发布
gulp.task('default', ['clean', 'minifycss', 'minifyjs']);

// build version info in html
gulp.task('build', gulpSequence('revClean', ['revCss', 'revJs'],'revProduct'));

