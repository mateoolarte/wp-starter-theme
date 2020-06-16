const { src, dest, watch, series, parallel } = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const del = require('del');
const gulpLoadPlugins = require('gulp-load-plugins');
const wpPot = require('gulp-wp-pot');
const server = require('browser-sync');
const pjson = require('./package.json');

const $ = gulpLoadPlugins();
const sourceDir = 'src';
const finalDir = 'assets';

const onError = err => console.log(err);

const configI18n = {
  text_domain: pjson.name, // Replace with your domain
  twig_files: 'templates/**/*.twig', // Twig Files
  php_files: [
    '**/*.php',
    '!inc/dependencies/class-tgm-plugin-activation.php',
    '!inc/dependencies/cmb2/**/*',
    '!vendor/**/*.php'
  ], // PHP Files & excludes
  cacheFolder: 'cache', // Cache Folder
  destFolder: 'languages', // Folder where .pot file will be saved
  keepCache: true // Delete cache files after script finishes
};
const gettextRegex = {
  // _e( "text", "domain" )
  // __( "text", "domain" )
  // translate( "text", "domain" )
  // esc_attr__( "text", "domain" )
  // esc_attr_e( "text", "domain" )
  // esc_html__( "text", "domain" )
  // esc_html_e( "text", "domain" )
  simple: /(__|_e|translate|esc_attr__|esc_attr_e|esc_html__|esc_html_e)\(\s*?['"].+?['"]\s*?,\s*?['"].+?['"]\s*?\)/g,

  // _n( "single", "plural", number, "domain" )
  plural: /_n\(\s*?['"].*?['"]\s*?,\s*?['"].*?['"]\s*?,\s*?.+?\s*?,\s*?['"].+?['"]\s*?\)/g,

  // _x( "text", "context", "domain" )
  // _ex( "text", "context", "domain" )
  // esc_attr_x( "text", "context", "domain" )
  // esc_html_x( "text", "context", "domain" )
  // _nx( "single", "plural", "number", "context", "domain" )
  disambiguation: /(_x|_ex|_nx|esc_attr_x|esc_html_x)\(\s*?['"].+?['"]\s*?,\s*?['"].+?['"]\s*?,\s*?['"].+?['"]\s*?\)/g,

  // _n_noop( "singular", "plural", "domain" )
  // _nx_noop( "singular", "plural", "context", "domain" )
  noop: /(_n_noop|_nx_noop)\((\s*?['"].+?['"]\s*?),(\s*?['"]\w+?['"]\s*?,){0,1}\s*?['"].+?['"]\s*?\)/g
};

async function clean() {
  return await del.sync([finalDir, `${pjson.name}.zip`]);
}

function sass() {
  const autoprefixer = require('autoprefixer');
  return src(`${sourceDir}/sass/main.scss`)
    .pipe($.plumber({ errorHandler: onError }))
    .pipe($.sourcemaps.init())
    .pipe($.sass({ includePaths: ['node_modules'] }))
    .pipe($.postcss([autoprefixer()]))
    .pipe($.sourcemaps.write('.'))
    .pipe(dest(`${finalDir}/css`))
    .pipe(server.stream());
}

function js() {
  return src(`${sourceDir}/js/index.js`)
    .pipe($.plumber({ errorHandler: onError }))
    .pipe(webpackStream(require('./webpack.config.js', webpack)))
    .pipe(dest(`${finalDir}/js/`))
    .pipe(server.stream());
}

function images() {
  return src(`${sourceDir}/images/**/*`)
    .pipe(
      $.cache(
        $.imagemin({
          interlaced: true,
          progressive: true,
          optimizationLevel: 4,
          svgoPlugins: [{ removeViewBox: true }, { cleanupIDs: false }]
        })
      )
    )
    .pipe(dest(`${finalDir}/images`));
}

function fonts() {
  return src(`${sourceDir}/fonts/**/*`).pipe(dest(`${finalDir}/fonts`));
}

function watchTask() {
  server({
    notify: false,
    port: 5000,
    proxy: pjson.proxy,
    injectChanges: true,
    files: [
      '**/*.twig',
      '**/*.php',
      `${sourceDir}/images/**/*`,
      `${sourceDir}/fonts/**/*`
    ]
  });

  watch(`${sourceDir}/sass/**/*.scss`, sass);
  watch(`${sourceDir}/js/**/*.js`, js);
}

async function build() {
  const cssnano = require('cssnano');

  await del.sync(['**/*.map']);

  return src(`${finalDir}/**/*`)
    .pipe($.if('*.js', $.uglify()))
    .pipe(
      $.if(
        '*.css',
        $.purgecss({
          content: ['**/*.twig', '**/*.php']
        })
      )
    )
    .pipe(
      $.if(
        '*.css',
        $.postcss([
          cssnano({
            discardComments: {
              removeAll: true
            },
            discardDuplicates: true,
            discardEmpty: true,
            minifyFontValues: true,
            minifySelectors: true
          })
        ])
      )
    )
    .pipe(dest(`${finalDir}/`));
}

function compileI18nFiles() {
  del.bind(null, [configI18n.cacheFolder], { force: true });

  return (
    src(configI18n.twig_files)
      // Search for Gettext function calls and wrap them around PHP tags.
      .pipe($.replace(gettextRegex.simple, match => `<?php ${match}; ?>`))
      .pipe($.replace(gettextRegex.plural, match => `<?php ${match}; ?>`))
      .pipe(
        $.replace(gettextRegex.disambiguation, match => `<?php ${match}; ?>`)
      )
      .pipe($.replace(gettextRegex.noop, match => `<?php ${match}; ?>`))
      // Rename file with .php extension
      .pipe(
        $.rename({
          extname: '.php'
        })
      )
      // Output the result to the cache folder as a .php file.
      .pipe(dest(configI18n.cacheFolder))
  );
}

function generatePot() {
  return src(configI18n.php_files)
    .pipe(
      wpPot({
        domain: configI18n.text_domain
      })
    )
    .pipe(dest(`${configI18n.destFolder}/${configI18n.text_domain}.pot`))
    .pipe(
      $.if(
        !configI18n.keepCache,
        del.bind(null, [configI18n.cacheFolder], { force: true })
      )
    );
}

function zip() {
  return src([
    '**/*',

    // include specific files and folders
    'screenshot.png',

    // exclude files and folders
    '!assets',
    '!assets/**/*',
    '!node_modules',
    '!node_modules/**/*',
    '!inc/custom_types/acf_imports',
    '!inc/custom_types/acf_imports/**/*',
    '!cache',
    '!cache/**/*',
    '!**/*.map',
    '!**/*.md',
    '!**/*.txt',
    '!gulpfile.js',
    '!webpack.config.js',
    '!package.json',
    '!yarn.lock',
    '!composer.json',
    '!composer.lock'
  ])
    .pipe($.zip(`${pjson.name}.zip`))
    .pipe(dest('.'));
}

exports.watch = series(clean, parallel(sass, js, images, fonts), watchTask);
exports.build = series(
  clean,
  parallel(sass, js, images, fonts),
  series(compileI18nFiles, generatePot),
  build
);
exports.zip = series(
  clean,
  parallel(sass, js, images, fonts),
  series(compileI18nFiles, generatePot),
  build,
  zip
);
