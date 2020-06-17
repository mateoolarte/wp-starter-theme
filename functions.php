<?php

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
