var gulp = require('gulp'), // Подключаем Gulp
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'); // Подключаем Browser Sync


gulp.task('concat-html', [
    'concat-start',
    'concat-catalog-draft',
    'concat-catalog',
    'concat-item-draft',
    'concat-item',
    'concat-shopping-bag-draft',
    'concat-shopping-bag'
]);
gulp.task('concat-catalog-draft', function() {
    //Catalog Draft
    return gulp.src([
            './templates/common-head.html',
            './templates/catalog-template.html',
            './templates/common-bottom.html'
        ])
        .pipe(concat('_draft-catalog.html'))
        .pipe(gulp.dest("./"));
});

gulp.task('concat-catalog', function() {
    //Catalog Main Page
    return gulp.src([
            './templates/catalog-head.html',
            './templates/header-template.html',
            './templates/filter-template.html',
            './templates/catalog-template.html',
            './templates/banners-template.html',
            './templates/footer-template.html',
            './templates/common-bottom.html'
        ])
        .pipe(concat('catalog.html'))
        .pipe(gulp.dest("./"));

});
gulp.task('concat-start', function() {
    //Start Main Page
    return gulp.src([
            './templates/start-head.html',
            './templates/header-template.html',
            './templates/carousel-template.html',
            './templates/start-template.html',
            './templates/footer-template.html',
            './templates/common-bottom.html'
        ])
        .pipe(concat('start.html'))
        .pipe(gulp.dest("./"));

});


gulp.task('concat-item', function() {
    //Item Main Page
    return gulp.src([
            './templates/item-head.html',
            './templates/header-template.html',
            './templates/item-template.html',
            './templates/banners-template.html',
            './templates/footer-template.html',
            './templates/common-bottom.html'
        ])
        .pipe(concat('item.html'))
        .pipe(gulp.dest("./"));

});
gulp.task('concat-item-draft', function() {
    //Item Draft
    return gulp.src([
            './templates/common-head.html',
            './templates/item-template.html',
            './templates/common-bottom.html'
        ])
        .pipe(concat('_draft-item.html'))
        .pipe(gulp.dest("./"));
});




gulp.task('concat-shopping-bag', function() {
    //Shopping-bag Main Page
    return gulp.src([
            './templates/shopping-bag-head.html',
            './templates/header-template.html',
            './templates/shopping-bag-template.html',
            './templates/footer-template.html',
            './templates/common-bottom.html'
        ])
        .pipe(concat('shopping-bag.html'))
        .pipe(gulp.dest("./"));

});
gulp.task('concat-shopping-bag-draft', function() {
    //Shopping-bag Draft
    return gulp.src([
            './templates/common-head.html',
            './templates/shopping-bag-template.html',
            './templates/common-bottom.html'
        ])
        .pipe(concat('_draft-shopping-bag.html'))
        .pipe(gulp.dest("./"));
});





gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('watch', ['concat-html', 'browser-sync'], function() {
    var reloadRequired = true;
    gulp.watch('./templates/*.html', ['concat-html']);
    gulp.watch('./*.html',
        function() {
            if (!reloadRequired) return;
            reloadRequired = false;
            browserSync.reload(); // Наблюдение за HTML файлами в корне проекта
            setTimeout(function() {
                reloadRequired = true;
            }, 1000);
        });
    gulp.watch('./css/*.css', browserSync.reload); // Наблюдение за CSS файлами
    gulp.watch('./js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
});

gulp.task('default', ['watch']);