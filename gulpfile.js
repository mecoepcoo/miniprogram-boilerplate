const gulp = require('gulp');
const plumber = require('gulp-plumber'); // 发生错误时阻止gulp退出并输出日志
const less = require('gulp-less'); // 处理less
const rename = require('gulp-rename'); // 输出时重命名文件
const cssnano = require('gulp-cssnano'); // 压缩代码
const autoprefixer = require('autoprefixer'); // 自动添加css前缀
const postcss = require('gulp-postcss'); // 处理css，配合autoprefixer使用
const preprocess = require('gulp-preprocess'); // 注入环境变量
const del = require('del');
const eslint = require('gulp-eslint');
const changed = require('gulp-changed');
const debug = require('gulp-debug');

// 编译样式
gulp.task('build:style', () => {
  return gulp.src([
    'src/miniprogram/static/style/**/*.less', 
    'src/miniprogram/pages/**/*.less', 
    'src/miniprogram/components/**/*.less',
    'src/miniprogram/spreadpack/**/*.less',
    'src/miniprogram/app.less'
  ], {base: 'src/miniprogram'})
    .pipe(plumber())
    .pipe(changed('dist', { extension: '.wxss' }))
    .pipe(debug({title: '编译'}))
    .pipe(less())
    .pipe(postcss([autoprefixer(['iOS >= 8', 'Android >= 4.1'])]))
    .pipe(
      cssnano({
        zindex: false,
        autoprefixer: false,
        discardComments: { removeAll: true }
      })
    )
    .pipe(
      rename(path => {
        path.extname = '.wxss';
      })
    )
    .pipe(gulp.dest('dist')); // 写入到dist文件夹中
});

// 编译示例
gulp.task('build:main', gulp.series('build:style', () => {
  return gulp.src([
    'src/miniprogram/**/*',
    '!src/miniprogram/assets/**/*',
    '!src/miniprogram/common/apidoc.js', // 排除接口文档生成器
    '!src/miniprogram/**/*.less', // 排除less后缀文件
    '!src/project.config.json', // 配置文件不写入到dist文件夹，开发时需手动拷贝到dist文件夹中 !!!
  ], {base: 'src/miniprogram', allowEmpty: true})
    .pipe(plumber())
    .pipe(changed('dist'))
    .pipe(debug({ title: '编译' }))
    .pipe(preprocess()) // 这个插件会影响静态资源
    .pipe(gulp.dest('dist'));
}));

/* 处理静态资源 */
gulp.task('build:assets', () => {
  return gulp.src([
    "src/miniprogram/assets/**/*"
  ], { base: 'src/miniprogram', allowEmpty: true })
    .pipe(plumber())
    .pipe(changed('dist'))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', cb => {
  return del([
    'dist/**/*',
    '!dist/project.config.json'
  ], cb);
});

gulp.task('lint', () => {
  return gulp.src([
    'src/miniprogram/**/*.js',
    '!src/miniprogram/utils/**'
  ]).pipe(eslint({
    configFile: './.eslintrc.js'
  })).pipe(eslint.format());
});

gulp.task('build', gulp.parallel('build:main', 'build:assets'));

// 监听文件(若文件修改则执行相关的任务)
function watch() {
  let watcher = gulp.watch('src/**', { ignoreInitial: false }, gulp.parallel('build:main', 'build:assets', 'lint'), cb => cb());
  watcher.on('all', (event, path, stats) => {
    console.log('File ' + path + ' was ' + event + ', running tasks...');
  });
  return watcher;
}

gulp.task('default', gulp.series(watch));
