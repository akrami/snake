const {series, src, dest} = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
const minify = require('gulp-minify');

var bundlejs = () => {
  return browserify({
    entries: 'app-client.js',
    cache: {},
    packageCache: {},
    fullPaths: true,
    debug: false
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(dest('./public/js'));
}
exports.bundlejs = bundlejs;

var minifyjs = () => {
  return src('./public/js/bundle.js')
  .pipe(minify())
  .pipe(dest('./public/js'));
}
exports.minifyjs = minifyjs;

exports.javascript = series(bundlejs, minifyjs);