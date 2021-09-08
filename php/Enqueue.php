<?php
/**
 * JS / Style enqueue class.
 *
 * @package FastCoBlock
 */

namespace XWP\FastCoBlock;

/**
 * Plugin Block.
 */
class Enqueue {

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
	 * Registers the block on server.
	 */
	public function enqueue_init() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	/**
	 * Include fast.co script.
	 */
	public function enqueue_scripts() {
		if ( is_singular() || is_single() ) {
			$post_id = get_queried_object_id();

			if ( has_block( Plugin::GUTENBERG_NAMESPACE . '/checkout-button', $post_id ) ) {
				// Load in header or insert via GTM.
				wp_enqueue_script(
					'fast-co-script',
					'https://js.fast.co/fast.js',
					array(),
					$this->plugin->Meta( 'Version' ),
					false
				);
			}

			wp_enqueue_script(
				'fast-co-custom-elements',
				$this->plugin->asset_url( 'js/dist/custom-elements.js' ),
				array(),
				$this->plugin->Meta( 'Version' ),
				false
			);
		}
	}
}
