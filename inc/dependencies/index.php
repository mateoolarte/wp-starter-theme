<?php
/*
 * Theme dependencies control
 * View documentation on: https://github.com/TGMPA/TGM-Plugin-Activation
*/

require_once 'class-tgm-plugin-activation.php';

function register_required_plugins() {
	$plugins = [
		[
			'name'     => 'Contact Form 7',
			'slug'     => 'contact-form-7',
			'required' => false,
		]
	];

	$config = [
		'id'           => 'starter-theme',
		'default_path' => '',
		'menu'         => 'tgmpa-install-plugins',
		'has_notices'  => true,
		'dismissable'  => false,
		'is_automatic' => true,
	];

	tgmpa( $plugins, $config );
}
