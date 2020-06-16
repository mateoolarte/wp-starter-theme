<?php
// Freemius setup
if ( ! function_exists( 'fmius' ) ) {
  // Create a helper function for easy SDK access.
  function fmius() {
    global $fmius;

    if ( ! isset( $fmius ) ) {
      // Include Freemius SDK.
      require_once dirname(__FILE__) . '/freemius/start.php';

      $fmius = fs_dynamic_init( array(
          'id'                  => '4977', // Update this value
          'slug'                => 'starter-theme', // Update this value
          'type'                => 'theme',
          'public_key'          => 'pk_8aa54560402963bde67b4b8374e6d', // Update this value
          'is_premium'          => false,
          'has_addons'          => false,
          'has_paid_plans'      => false,
          'menu'                => array(
              'account'        => false,
              'support'        => false,
          ),
      ) );
  }

  return $fmius;
}

// Init Freemius.
fmius();
// Signal that SDK was initiated.
do_action( 'fmius_loaded' );
}

// Initialize Timber
$composer_autoload = __DIR__ . '/vendor/autoload.php';
if (file_exists($composer_autoload)) {
	require_once( $composer_autoload );
	$timber = new Timber\Timber();
}

require_once 'inc/timber.php';

// Initial Wordpress setup
require_once 'inc/setup.php';

// TGM Dependencies
require_once 'inc/dependencies/index.php';

// Example Wordpress customizer
require_once 'inc/customizer.php';
