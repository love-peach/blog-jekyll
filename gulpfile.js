/**
 * Created by zhangjinpei on 16-2-3.
 */

(function () {

    var gulp = require('gulp');// 引入gulp
    //引入组件
    var less = require('gulp-less'),               // less
        minifyCSS = require('gulp-minify-css'),    // css压缩
        autoprefix = require('gulp-autoprefixer'), // 自动补齐前缀
        jshint = require('gulp-jshint'),           // js检测
        uglify = require('gulp-uglify'),           // js压缩
        concat = require('gulp-concat'),           // 合并文件
        rename = require('gulp-rename'),           // 重命名
        imagemin = require('gulp-imagemin'),       // 图片压缩
        pngquant = require('imagemin-pngquant'),   //深度压缩png图片的imagemin插件
        changed = require('gulp-changed'),         // 过滤改动的文件
        clean = require('gulp-clean'),             // 清空文件夹
        notify = require('gulp-notify'),           // 提示信息
        exec = require('child_process').exec,
        runSequence = require('run-sequence'),     //按顺序执行任务
        browserSync = require('browser-sync').create(), //自动刷新
        reload = browserSync.reload;                    //重载

//定义资源目录与输出目录的根目录
    var srcRoot = '_assets';
    var distRoot = 'assets';

//定义路径对象
    var paths = {
        src: {
            style: srcRoot + '/style/*.less',
            script: srcRoot + '/script/*.js',
            image: srcRoot + '/image/**/*',
            fonts: srcRoot + '/fonts/*',
            clean: 'assets/*'
        },
        dist: {
            style: distRoot + '/style/',
            script: distRoot + '/script/',
            image: distRoot + '/image/',
            fonts: distRoot + '/fonts/'
        },
        watch: {
            jekyll: '*.+(html|markdown|md|json|txt|xml)',
            style: srcRoot + '/style/*.less',
            script: srcRoot + '/script/*.js',
            image: srcRoot + '/image/*',
            fonts: srcRoot + '/fonts/*'
        }
    };

//配置信息
    var config = {
        browsersync: {
            server: "_site",
//            proxy: "127.0.0.1"

            port: 9999

        },
        styles: {
            autoprefixer: {
                browsers: [
                    'last 2 versions',
                    'safari 5',
                    'ie 8',
                    'ie 9',
                    'opera 12.1',
                    'ios 6',
                    'android 4'
                ],
                cascade: true
            },
            minifyCSS: {
                advanced: false,
                aggressiveMerging: false
            }
        },
        images: {
            imagemin: {
                optimizationLevel: 5,                     //类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: false,                        //类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true,                         //类型：Boolean 默认：false 隔行扫描gif进行渲染
                multipass: true,                          //类型：Boolean 默认：false 多次优化svg直到完全优化
                svgoPlugins: [
                    {removeViewBox: false}
                ],    //不要移除svg的viewbox属性
                use: [pngquant({quality: '65-80'})]
            }
        }
    };

    //默认任务
    gulp.task('default', ['clean'], function () {
        gulp.run('watch');
    });

    //清除任务
    gulp.task('clean', function () {
        return gulp.src(paths.src.clean, {read: false})
            .pipe(clean({force: true}));
    });

    //监听任务
    gulp.task('watch', ['jekyll-first'], function () {
        browserSync.init(config.browsersync);
        gulp.watch(paths.watch.jekyll, ['jekyll-rebuild']);
        gulp.watch(paths.watch.style, ['style']);
        gulp.watch(paths.watch.script, ['script']);
        gulp.watch(paths.watch.image, ['image']);
        gulp.watch(paths.watch.fonts, ['fonts']);
        gulp.watch("*.html").on('change', reload);
    });


    //第一次编译jekyll任务，需要等静态文件构建好，然后放在的_site文件夹下。
    gulp.task('jekyll-first', ['build'], function (cb) {
        // 编译 Jekyll
        exec('jekyll build', function (err) {
            if (err) return cb(err); // 返回 error
            cb(); // 完成 task
        });
    });

    //
    gulp.task('jekyll', function (cb) {
        // 编译 Jekyll
        exec('jekyll build', function (err) {
            if (err) return cb(err); // 返回 error
            cb(); // 完成 task
        });
    });
    //构建任务
    gulp.task('build', function () {
        gulp.run('style', 'script', 'fonts', 'image');
    });

    gulp.task('jekyll-rebuild', ['jekyll'], function () {
        browserSync.reload();
    });

    //less转css,自动补齐前缀并压缩
    gulp.task('style', function () {
        return gulp.src(srcRoot + '/style/main.less')
            .pipe(less())
            .pipe(autoprefix(config.styles.autoprefixer))
            .pipe(gulp.dest(paths.dist.style))
            .pipe(browserSync.stream({match: "**/*.css"}))       //此处需要注意
            .pipe(rename({ suffix: '.min' }))
            .pipe(minifyCSS(config.styles.minifyCSS))
            .pipe(gulp.dest(paths.dist.style))
            .pipe(browserSync.stream({match: "**/*.css"}))      //为什么要重复，根据页面具体引入的是哪个文件来定
            .pipe(notify({ message: '<%= file.relative %>' + ' finished less to css' }));
    });

    // 检查、合并、压缩js文件
    gulp.task('script', function () {
        return gulp.src(paths.src.script)
            .pipe(changed(paths.dist.script))
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(notify({ message: 'jscheck is ok' }))
            /*.pipe(concat('all.js'))*/
            .pipe(gulp.dest(paths.dist.script))
            .pipe(rename({ suffix: '.min' }))
            .pipe(uglify())
            .pipe(gulp.dest(paths.dist.script))
//            .pipe(reload({stream: true}))
            .pipe(notify({ message: '<%= file.relative %>' + ' finished js task' }));
    });

    //拷贝字体
    gulp.task('fonts', function () {
        return gulp.src(paths.src.fonts)
            .pipe(changed(paths.dist.fonts))
            .pipe(gulp.dest(paths.dist.fonts))
//            .pipe(reload({stream: true}))
            .pipe(notify({ message: 'fonts task ok' }));
    });

    //拷贝图片，开发环境不需要每次都压缩图片。之所以需要拷贝一次，是因为会执行clean任务。
    gulp.task('image', function () {
        return gulp.src(paths.src.image)
            .pipe(changed(paths.dist.image))
            .pipe(gulp.dest(paths.dist.image))
//            .pipe(reload({stream: true}))
            .pipe(notify({ message: '<%= file.relative %>' + ' copied finished' }));
    });

    //压缩图片。只在build任务中才压缩图片
    gulp.task('imgMin', function () {
        return gulp.src(paths.src.image)
            .pipe(changed(paths.dist.image))
            .pipe(imagemin(config.images.imagemin))
            .pipe(gulp.dest(paths.dist.image))
            .pipe(notify({ message: '<%= file.relative %>' + ' compressed finished' }));
    });
})();

