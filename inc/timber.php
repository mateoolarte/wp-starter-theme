<?php

if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function () {
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
  } );

	return;
}

/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = 'templates';

/**
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
// Timber::$autoescape = true;

class WPsite extends Timber\Site {
	public function __construct() {
    parent::__construct();

    add_filter('timber/context', array($this, 'add_to_context'));
    add_filter('timber/twig', array($this, 'add_to_twig' ));

    add_action('after_setup_theme', 'theme_setup');
    add_action('tgmpa_register', 'register_required_plugins');
    add_action('customize_register', 'customize_sections');
    add_action('wp_enqueue_scripts', 'theme_assets');

    // add_action('init', array($this, 'register_post_types'));
    // add_action('init', array($this, 'register_taxonomies'));
	}

	function add_to_context( $context ) {
		$context['menu'] = new TimberMenu();
		$context['site'] = $this;

		return $context;
	}

	function add_to_twig( $twig ) {
		/* this is where you can add your own fuctions to twig */
		// $twig->addExtension( new Twig_Extension_StringLoader() );
    // $twig->addFilter( 'myfoo', new Twig_SimpleFilter( 'myfoo', array( $this, 'myfoo' ) ) );

		return $twig;
	}
}

new WPsite();
