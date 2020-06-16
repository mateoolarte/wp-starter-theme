 <?php

function customize_register_section( $wp_customize ) {
	// customize_forms( $wp_customize );
}

function customize_forms( $wp_customize ) {
	$forms         = get_posts( [
		'post_type'      => 'wpcf7_contact_form',
		'posts_per_page' => - 1,
		'orderby'        => 'post_name',
		'order'          => 'ASC'
	] );
	$forms_choices = [ '' => 'Selecciona' ];
	foreach ( $forms as $form ) {
		$forms_choices[ $form->ID ] = $form->post_title;
	}

	$wp_customize->add_section( 'forms_sec', [ 'title' => "Formularios" ] );
	$wp_customize->add_setting( 'contact_form' );
	$wp_customize->add_control( 'contact_form', [
		'label'    => 'Contacto',
		'section'  => 'forms_sec',
		'settings' => 'contact_form',
		'type'     => 'select',
		'choices'  => $forms_choices
	] );
}
