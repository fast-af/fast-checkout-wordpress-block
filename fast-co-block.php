<?php
/**
 * Plugin Name: Fast.co Block
 * Description: A block for inserting Fast.co checkout experience.
 * Version: 0.1.0
 * Author: XWP
 * Author URI: https://xwp.co
 * Text Domain: fast-co-block
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
