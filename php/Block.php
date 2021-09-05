<?php
/**
 * Block class.
 *
 * @package FastCoBlock
 */

namespace XWP\FastCoBlock;

/**
 * Plugin Block.
 */
class Block {

	/**
	 * Registers the block on server.
	 */
	public function register_block() {

		// Check if the register function exists.
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}

		register_block_type(
			Plugin::GUTENBERG_NAMESPACE . '/checkout-button',
			array(
				'attributes'      => array(
					'appId'     => array(
						'type'    => 'string',
						'default' => '',
					),
					'productId' => array(
						'type'    => 'string',
						'default' => '',
					),
					'uniqueId'  => array(
						'type'    => 'string',
						'default' => '',
					),
				),
				'render_callback' => array( $this, 'block_output' ),
				'editor_script'   => 'fast-co-block-js',
				'editor_style'    => 'fast-co-block-css',
			)
		);
	}

	/**
	 * Output the block on the front-end.
	 *
	 * @param array $attributes Block attributes.
	 */
	public function block_output( array $attributes ) {

		ob_start();

		$unique_id  = 'fast_' . sanitize_text_field( $attributes['uniqueId'] );
		$app_id     = sanitize_text_field( $attributes['appId'] );
		$product_id = sanitize_text_field( $attributes['productId'] );
		?>
		<div class="fast-checkout-button">
			<form>
				<fast-checkout-button id="<?php echo esc_attr( $unique_id ); ?>"></fast-checkout-button>
			</form>
			<script>
				document.querySelector("#<?php echo esc_js( $unique_id ); ?>").addEventListener( 'click', function( e ) {
					Fast.checkout({
						appId: "<?php echo esc_js( $app_id ); ?>",
						buttonId: e.target.id,
						products: [
							{
								id: "<?php echo esc_js( $product_id ); ?>",
								quantity: 1,
							},
						],
					});
				} );
			</script>
		</div>

		<?php

		return ob_get_clean();
	}
}
