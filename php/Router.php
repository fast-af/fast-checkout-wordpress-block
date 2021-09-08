<?php
/**
 * Router class.
 *
 * @package FastCoBlock
 */

namespace XWP\FastCoBlock;

/**
 * Plugin Router.
 */
class Router {

	/**
	 * Plugin interface.
	 *
	 * @var Plugin
	 */
	protected $plugin;

	/**
	 * Setup the plugin instance.
	 *
	 * @param Plugin $plugin Instance of the plugin abstraction.
	 */
	public function __construct( $plugin ) {
		$this->plugin = $plugin;
	}

	/**
	 * Hook into WP.
	 *
	 * @return void
	 */
	public function init() {
		$block   = new Blocks( $this->plugin );
		$enqueue = new Enqueue( $this->plugin );
		$enqueue->enqueue_init();

		add_action( 'init', array( $block, 'register_blocks' ) );
	}
}
