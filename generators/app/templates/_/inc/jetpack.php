<?php
/**
 * Jetpack Compatibility File.
 *
 * @link https://jetpack.me/
 *
 * @package <%= theme_name %>
 */

/**
 * Add theme support for Infinite Scroll.
 * See: https://jetpack.me/support/infinite-scroll/
 */
function <%= theme_slug %>_jetpack_setup() {
	add_theme_support( 'infinite-scroll', array(
		'container' => 'main',
		'render'    => '<%= theme_slug %>_infinite_scroll_render',
		'footer'    => 'page',
	) );
} // end function <%= theme_slug %>_jetpack_setup
add_action( 'after_setup_theme', '<%= theme_slug %>_jetpack_setup' );

/**
 * Custom render function for Infinite Scroll.
 */
function <%= theme_slug %>_infinite_scroll_render() {
	while ( have_posts() ) {
		the_post();
		get_template_part( 'template-parts/content', get_post_format() );
	}
} // end function <%= theme_slug %>_infinite_scroll_render
