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
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_assets' ) );

		$block   = new Block();
		$enqueue = new Enqueue( $this->plugin );
		$enqueue->enqueue_init();

		add_action( 'init', array( $block, 'register_block' ) );
	}

	/**
	 * Output an admin notice if the AMP plugin is not installed.
	 */
	public function amp_plugin_required() {
		?>
		<div class="notice error">
			<p>
				<strong>
					<?php
					printf(
						/* Translators: %s is a link to the AMP Plugin */
						esc_html__( 'The Block Scaffolding block requires the %s.', 'fast-co-block' ),
						'<a href="https://wordpress.org/plugins/amp/">' . esc_html__( 'AMP Plugin', 'fast-co-block' ) . '</a>'
					);
					?>
				</strong>
			</p>
		</div>
		<?php
	}

	/**
	 * Load our block assets.
	 *
	 * @return void
	 */
	public function enqueue_editor_assets() {
		wp_register_script(
			'fast-co-block-js',
			$this->plugin->asset_url( '/js/dist/editor.js' ),
			array(
				'wp-i18n',
				'wp-blocks',
				'wp-element',
			),
			$this->plugin->Meta( 'Version' ),
			true
		);

		wp_register_style(
			'fast-co-block-css',
			$this->plugin->asset_url( '/js/dist/editor.css' ),
			array(),
			$this->plugin->Meta( 'Version' ),
			'all'
		);

		wp_set_script_translations( 'fast-co-block-js', 'fast-co-block' );
	}
}
