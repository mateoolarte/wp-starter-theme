# WP Starter Theme

Starter Theme is a WordPress theme with a basic scaffolding to make custom themes.
Inside you found many tools for make easier your development process.

# Motivation

We create this starter to have a boilerplate for all themes that have been creating and keep consistency between projects. We decide to create a base with config files and divide by branches as **[timber](https://timber.github.io/docs/)** and **wordpress-theme** each of these branch host-specific development tools and source code to develop WP themes. For the rest of the themes exist a specific branch inherits either one **timber** or **wordpress-theme**.

## Features

* [yarn](https://yarnpkg.com/lang/en/) Package manager
* [WordPress](https://wordpress.org/) Basic scaffolding
* [TGMP](http://tgmpluginactivation.com/) WordPress plugin dependencies management
* [webpack](https://webpack.js.org/) module bundler
* [gulpjs](http://gulpjs.com/) Tasks integration
* [autoprefixer](https://github.com/postcss/autoprefix) Add vendor prefixes to CSS code.
* [browser-sync](https://www.browsersync.io/) Local auto reload server.
* [sass](https://sass-lang.com/guide) Preprocessor for CSS.
* [stylelint](https://stylelint.io/) CSS Linter
* [ESlint](https://eslint.org/) JS Linter
* [prettier](https://prettier.io/) Code formatter

## File structure

```text
starter-theme/
├── inc/                    PHP & WP configuration files
│   ├── dependencies/       Third-party libs like plugins
│   ├── customizer.php      Customizer API config
│   ├── setup.php           WP core features enable/disable
├── languages/              Files about translations
├── src/                    Source code
│   ├── fonts/              Iconography, custom typography
│   ├── images/             JPG, PNG, SVG, GIF, etc..
│   ├── js/                 Scripts files compile by Webpack
│   └── sass/               CSS files transpile by Sass
├── .browserslistrc         Browser support
├── .editorconfig           Mantain code style consistent
├── .eslintignore           Ignore especific files for ESLint
├── .eslintrc               Rules for ESLint
├── .gitignore              Ignore especific files and folder for git
├── .prettierrc             Config related to prettier code style
├── .stylelintrc            Rules for Stylelint
├── functions.php           Setup features and configuration of WP core
├── gulpfile.js             Configuration file where hosts automate tasks
├── package.json            Info about project and host dependencies
├── README.md               Repository docs
├── readme.txt              Repository docs on plain text for wordpress.com
├── screenshot.png          Cover image for themes
├── style.css               Main css file and info about theme
├── webpack.config.js       Config to compile .js files
└── yarn.lock               Cache file to keep consistent on dependencies
```

## How to use?

### Initial setup

Create a WordPress installation or use an existing installation of [wordpress.org](https://wordpress.org/download/). We recommend to use [Local by Flywheel](https://localbyflywheel.com/)

Clone this repo on your themes folder **`wp-content/themes/`**

```sh
git clone git@gitlab.com:themesei/starter-theme.git
```

**Recommended config:** You can pass a second argument with a custom folder name like this:

```sh
git clone git@gitlab.com:themesei/starter-theme.git CUSTOM-NAME
```

Change the **`proxy`** value on `package.json` with your local URL or if you use [Local by Flywheel](https://localbyflywheel.com/) this provided a local URL.

Change the name value with the theme name on `package.json`

Update meta info on `styles.css` file.

Run the following command to install dependencies:

```sh
yarn
```

### Development tasks

These are the available tasks you can run around the project:

Wake up a local server with automatically changes:
```sh
gulp watch
```

Get ready to deploy theme:
```sh
gulp build
```

Create a .zip file ready to upload:
```sh
gulp zip
```

### Production Guidelines

**Working in progress**

## Contributing

All help is welcome, if you consider you did something to improve the starter theme or common
reutilizable components, you are free to make a new branch and pull request to give us your ideas.
