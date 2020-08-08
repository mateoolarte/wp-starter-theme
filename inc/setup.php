<?php

function theme_setup() {
  add_theme_support('title-tag');
  add_theme_support('post-formats',
    array(
      'aside',
      'gallery',
      'quote',
      'image',
      'video'
    )
  );
  add_theme_support( 'post-thumbnails' );
  add_theme_support( 'automatic-feed-links' );

  // add_theme_support('woocommerce');
  load_theme_textdomain('starter-theme', get_template_directory().'languages');

  register_nav_menus(
		array(
			'main-menu' => __('Main menu')
		)
  );
}

function theme_assets() {
  wp_enqueue_style('main', get_template_directory_uri().'/assets/css/main.css');
  wp_enqueue_script('main', get_template_directory_uri().'/assets/js/main.js');

  if (is_singular() && comments_open() && get_option( 'thread_comments')) {
    wp_enqueue_script( 'comment-reply' );
  }
}
