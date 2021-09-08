<?php
/**
 * Plugin Name: Fast.co Blocks
 * Description: Collection of Fast.co blocks to be used within the WordPress post editor.
 * Version: 1.0.0
 * Author: XWP
 * Author URI: https://xwp.co
 * Text Domain: fast-co-block
 * Requires at least: 5.8
 *
 * @package FastCoBlock
 */

namespace XWP\FastCoBlock;

// Support for site-level autoloading.
if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	require_once __DIR__ . '/vendor/autoload.php';
}

$router = new Router( new Plugin( __FILE__ ) );

add_action( 'plugins_loaded', [ $router, 'init' ] );
