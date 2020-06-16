<?php
/**
 * Search results page
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

$context = Timber::get_context();

$context['title'] = 'Search results for ' . get_search_query();
$context['posts'] = Timber::get_posts();

Timber::render('pages/search.twig', $context);