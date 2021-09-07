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
	const CSS_CLASSNAME = 'fast-checkout-button';

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
					'appId'              => array(
						'type'    => 'string',
						'default' => '',
					),
					'productId'          => array(
						'type'    => 'string',
						'default' => '',
					),
					'uniqueId'           => array(
						'type'    => 'string',
						'default' => '',
					),
					'fastButtonDisabled' => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'darkMode'           => array(
						'type'    => 'boolean',
						'default' => 'false,',
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
		$default_attributes = array(
			'appId'             => '',
			'productId'         => '',
			'uniqueId'          => '',
			'quantityUiEnabled' => false,
			'defaultQuantity'   => 1,
		);
		$attributes         = array_merge( $default_attributes, $attributes );

		$app_id           = $attributes['appId'];
		$product_id       = $attributes['productId'];
		$unique_id        = sprintf( 'fast_%s', $attributes['uniqueId'] );
		$show_quantity_ui = boolval( $attributes['quantityUiEnabled'] );
		$default_quantity = intval( $attributes['defaultQuantity'] );

		if ( $default_quantity <= 0 ) {
			$default_quantity = 1;
		}

		ob_start();
		?>
		<div class="<?php echo esc_attr( self::CSS_CLASSNAME ); ?>">
			<div class="<?php echo esc_attr( self::CSS_CLASSNAME ); ?>__container">
				<?php if ( $show_quantity_ui ) : ?>
					<fast-quantity
						id="<?php echo esc_attr( $unique_id ); ?>-quantity"
						quantity="<?php echo intval( $default_quantity ); ?>"
					></fast-quantity>
				<?php endif; ?>
				<fast-checkout-button id="<?php echo esc_attr( $unique_id ); ?>"></fast-checkout-button>
			</div>
			<script>
				(function() {
					const buttonId = <?php echo wp_json_encode( $unique_id ); ?>;
					const quantityId = `${buttonId}-quantity`;

					document
						.getElementById(buttonId)
						.addEventListener( 'click', () => {
							const quantityEl = document.getElementById(quantityId);
							const quantity = quantityEl
								? parseInt(quantityEl.getAttribute('quantity'), 10)
								: <?php echo wp_json_encode( $default_quantity ); ?>

							Fast.checkout({
								appId: <?php echo wp_json_encode( $app_id ); ?>,
								buttonId,
								products: [
									{
										id: <?php echo wp_json_encode( $product_id ); ?>,
										quantity: quantity > 0 ? quantity : 1,
									},
								],
							});
						} );
				})()
			</script>
		</div>
		<?php

		$markup = ob_get_clean();
		return $markup;
	}
}
