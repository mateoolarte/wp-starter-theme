 <?php

function customize_sections($wp_customize) {
	customize_forms($wp_customize);
}

function customize_forms($wp_customize) {
  $forms             = get_posts([
		'post_type'      => 'wpcf7_contact_form',
		'posts_per_page' => -1,
		'orderby'        => 'post_name',
		'order'          => 'ASC'
	]);
  $forms_choices = [ '' => __('Select') ];

	foreach ($forms as $form) {
		$forms_choices[$form->ID] = $form->post_title;
	}

	$wp_customize->add_section('forms_sec', [ 'title' => __('Forms') ]);
	$wp_customize->add_setting('contact_form', [
    'default' => '',
    'type'    => 'option',
  ]);
	$wp_customize->add_control('contact_form', [
    'choices'  => $forms_choices,
    'description' => __('Here you can choose what contact form you want'),
		'label'    => __('Contact'),
		'section'  => 'forms_sec',
		'type'     => 'select',
	]);
}
