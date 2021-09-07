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

	const QUANTITY_PLACEHOLDER = '%QUANTITY_LOGIC%';

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
					'variantId'          => array(
						'type'    => 'string',
						'default' => '',
					),
					'productOptions'     => array(
						'type'    => 'string',
						'default' => '',
					),
					'uniqueId'           => array(
						'type'    => 'string',
						'default' => '',
					),
					'defaultQuantity'    => array(
						'type'    => 'integer',
						'default' => 1,
					),
					'quantityUiEnabled'  => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'fastButtonDisabled' => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'darkMode'           => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'affiliateIds'       => array(
						'type'    => 'string',
						'default' => '',
					),
					'couponId'           => array(
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
	 * Generates Fast.js configuration object from
	 * block attributes.
	 *
	 * @param array $attributes Block attributes.
	 *
	 * @return array Fast.js checkout configuration object.
	 */
	protected static function get_configuration( $attributes ) {
		$default_attributes = array(
			'appId'             => '',
			'productId'         => '',
			'uniqueId'          => '',
			'quantityUiEnabled' => false,
			'defaultQuantity'   => 1,
		);

		$attributes = array_merge( $default_attributes, $attributes );

		$app_id        = $attributes['appId'];
		$product_id    = $attributes['productId'];
		$variant_id    = $attributes['variantId'];
		$unique_id     = sprintf( 'fast_%s', $attributes['uniqueId'] );
		$affiliate_ids = $attributes['affiliateIds'];
		$coupon_id     = $attributes['couponId'];

		$fast_configuration_object = [
			'appId'    => $app_id,
			'buttonId' => $unique_id,
			'products' => [
				[
					'id'       => $product_id,
					'quantity' => self::QUANTITY_PLACEHOLDER,
				],
			],
		];

		$fast_configuration_object = self::add_product_options(
			$fast_configuration_object,
			$attributes
		);

		if ( $variant_id ) {
			$fast_configuration_object['products'][0]['variantId'] = $variant_id;
		}

		if ( $affiliate_ids ) {
			$affiliate_ids  = preg_split( '~[\r\n]+~', $affiliate_ids );
			$affiliate_data = array_map(
				function ( $id ) {
					return [ 'id' => $id ];
				},
				$affiliate_ids
			);

			$fast_configuration_object['affiliateInfo'] = [
				'affiliates' => $affiliate_data,
			];
		}

		if ( $coupon_id ) {
			$fast_configuration_object['couponCode'] = $coupon_id;
		}

		return $fast_configuration_object;
	}

	/**
	 * Adds product options to the Checkout Button configuration
	 * from block attributes.
	 *
	 * @param array $configuration Configuration object.
	 * @param array $attributes    Block attributes.
	 *
	 * @return array Altered configuration object.
	 */
	protected static function add_product_options( $configuration, $attributes ) {
		$product_options = $attributes['productOptions'];

		if ( $product_options ) {
			$product_options = preg_split( '~[\r\n]+~', $product_options );
			$mapped_options  = [];

			foreach ( $product_options as $option_pair ) {
				$split_key_value = preg_split( '~\s*:\s*~', $option_pair );

				if ( 2 === count( $split_key_value ) && is_string( $split_key_value[0] ) ) {
					$mapped_options[] = [
						'id'    => $split_key_value[0],
						'value' => $split_key_value[1],
					];
				}
			}

			if ( $mapped_options ) {
				$configuration['products'][0]['options'] = $mapped_options;
			}
		}

		return $configuration;
	}

	/**
	 * Output the block on the front-end.
	 *
	 * @param array $attributes Block attributes.
	 */
	public function block_output( array $attributes ) {
		$fast_configuration_object = self::get_configuration( $attributes );

		/**
		 * Default values used in the button JS code.
		 */
		$disabled         = boolval( $attributes['fastButtonDisabled'] );
		$dark_mode        = boolval( $attributes['darkMode'] );
		$show_quantity_ui = boolval( $attributes['quantityUiEnabled'] );
		$unique_id        = sprintf( 'fast_%s', $attributes['uniqueId'] );
		$default_quantity = intval( $attributes['defaultQuantity'] );

		if ( $default_quantity <= 0 ) {
			$default_quantity = 1;
		}

		/**
		 * Class names appended to the button container.
		 */
		$container_css_classes = [
			self::CSS_CLASSNAME . '__container',
		];
		if ( $dark_mode ) {
			$container_css_classes[] = sprintf( '%s--dark', $container_css_classes[0] );
		}
		if ( $disabled ) {
			$container_css_classes[] = sprintf( '%s--disabled', $container_css_classes[0] );
		}

		ob_start();
		?>
		<div class="<?php echo esc_attr( self::CSS_CLASSNAME ); ?>">
			<div class="<?php echo join( ' ', $container_css_classes ); ?>">
				<?php if ( $show_quantity_ui ) : ?>
					<fast-quantity
						id="<?php echo esc_attr( $unique_id ); ?>-quantity"
						quantity="<?php echo intval( $default_quantity ); ?>"
					></fast-quantity>
				<?php endif; ?>
				<fast-checkout-button
					id="<?php echo esc_attr( $unique_id ); ?>"
					<?php echo $dark_mode ? ' dark' : ''; ?>
					<?php echo $disabled ? ' disabled' : ''; ?>
				></fast-checkout-button>
			</div>
			<script>
				(function() {
					const buttonId = <?php echo wp_json_encode( $unique_id ); ?>;
					const quantityId = `${buttonId}-quantity`;
					<?php
						/**
						 * Extract individual affiliate IDs and output them in a format
						 * that is expected by the checkout code.
						 */

					?>

					document
						.getElementById(buttonId)
						.addEventListener( 'click', (e) => {
							const isDisabled = e.target.hasAttribute('disabled')

							if ( isDisabled ) {
								e.preventDefault();
								return;
							}

							const quantityEl = document.getElementById(quantityId);
							const quantity = quantityEl
								? parseInt(quantityEl.getAttribute('quantity'), 10)
								: <?php echo wp_json_encode( $default_quantity ); ?>

							Fast.checkout(
							<?php
								$interpolated_config = preg_replace(
									sprintf( '~["\']%s["\']~', preg_quote( self::QUANTITY_PLACEHOLDER ) ),
									'quantity > 0 ? quantity : 1',
									wp_json_encode( $fast_configuration_object, JSON_PRETTY_PRINT )
								);

								echo $interpolated_config;
							?>
							);
						} );
				})()
			</script>
		</div>
		<?php

		$markup = ob_get_clean();
		return $markup;
	}
}
