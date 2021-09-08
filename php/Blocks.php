<?php
/**
 * Block class.
 *
 * @package FastCoBlock
 */

namespace XWP\FastCoBlock;

/**
 * Class responsible for blocks definition.
 */
class Blocks {
	const CSS_CLASSNAME        = 'fast-checkout-button';
	const QUANTITY_PLACEHOLDER = '%QUANTITY_LOGIC%';

	/**
	 * The instantiated plugin class.
	 *
	 * @var Plugin
	 */
	public $plugin;

	/**
	 * Constructor.
	 *
	 * @param Plugin $plugin The plugin class.
	 */
	public function __construct( Plugin $plugin ) {
		$this->plugin = $plugin;
	}

	/**
	 * Registers the block on server.
	 */
	public function register_blocks() {

		// Check if the register function exists.
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}

		add_filter(
			'block_categories_all',
			function( $block_categories ) {
				$block_categories[] = [
					'slug'  => 'fast-co',
					'title' => __( 'Fast.co', 'fast-co-block' ),
					'icon'  => null,
				];
				return $block_categories;
			},
			10,
			1
		);

		register_block_type(
			$this->plugin->dir() . '/js/src/blocks/checkout-button',
			array(
				'render_callback' => array( $this, 'block_output' ),
			)
		);

		register_block_type(
			$this->plugin->dir() . '/js/src/blocks/single-product',
			array()
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
		if ( empty( $attributes['appId'] ) || empty( $attributes['productId'] ) ) {
			return sprintf(
				'<div class="%s">%s</div>',
				esc_attr( self::CSS_CLASSNAME ),
				esc_html(
					__( 'The checkout button is not configured.' ),
					'fast-co-block'
				)
			);
		}

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
