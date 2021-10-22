<?php
// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// BEGIN ENQUEUE PARENT ACTION
// AUTO GENERATED - Do not modify or remove comment markers above or below:

if ( ! function_exists( 'chld_thm_cfg_locale_css' ) ):
	function chld_thm_cfg_locale_css( $uri ) {
		if ( empty( $uri ) && is_rtl() && file_exists( get_template_directory() . '/rtl.css' ) ) {
			$uri = get_template_directory_uri() . '/rtl.css';
		}

		return $uri;
	}
endif;
add_filter( 'locale_stylesheet_uri', 'chld_thm_cfg_locale_css' );

if ( ! function_exists( 'chld_thm_cfg_parent_css' ) ):
	function chld_thm_cfg_parent_css() {
		wp_enqueue_style( 'chld_thm_cfg_parent', trailingslashit( get_template_directory_uri() ) . 'style.css', array() );
	}
endif;
add_action( 'wp_enqueue_scripts', 'chld_thm_cfg_parent_css', 10 );

if ( ! function_exists( 'child_theme_configurator_css' ) ):
	function child_theme_configurator_css() {
		wp_enqueue_style( 'chld_thm_cfg_separate', trailingslashit( get_stylesheet_directory_uri() ) . 'ctc-style.css', array( /*'chld_thm_cfg_parent'*/ ) );

		wp_enqueue_script( 'main-js', trailingslashit( get_stylesheet_directory_uri() ) . 'main.js', array( 'jquery' ), '1.0.0', true );
	}
endif;
add_action( 'wp_enqueue_scripts', 'child_theme_configurator_css', 10 );

// END ENQUEUE PARENT ACTION


add_filter( 'woocommerce_quantity_input_args', 'rns_custom_quantity_input_args', 10, 2 );
function rns_custom_quantity_input_args( $args, $product ) {
	if ( ! is_cart() ) {
		$args['input_value'] = '1.000';
	}
	$args['min_value'] = 0.001;
	$args['step']      = 0.001;

	return $args;
}

add_filter( 'woocommerce_loop_add_to_cart_args', 'rns_custom_loop_add_to_cart_quantity_arg', 10, 2 );
function rns_custom_loop_add_to_cart_quantity_arg( $args, $product ) {
	$args['quantity'] = 0.5;

	return $args;
}

add_filter( 'woocommerce_available_variation', 'rns_filter_wc_available_variation_price_html', 10, 3 );
function rns_filter_wc_available_variation_price_html( $data, $product, $variation ) {
	$data['min_qty'] = 0.001;

	return $data;
}

remove_filter( 'woocommerce_stock_amount', 'intval' );
add_filter( 'woocommerce_stock_amount', 'floatval' );
