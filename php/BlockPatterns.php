<?php
/**
 * Block Patterns class.
 *
 * @package FastCoBlock
 */

namespace XWP\FastCoBlock;

/**
 * Plugin Block.
 */
class BlockPatterns {
	/**
	 * Initialize hooks.
	 */
	public static function init() {
		add_action( 'init', [ __CLASS__, 'register_block_patterns' ] );
	}

	/**
	 * Register the Fast.co block patterns.
	 */
	public static function register_block_patterns() {
		register_block_pattern_category(
			Plugin::GUTENBERG_NAMESPACE,
			[ 'label' => __( 'Fast.co', 'fast-co-block' ) ]
		);

		register_block_pattern(
			Plugin::GUTENBERG_NAMESPACE . '/single-product',
			[
				'title'       => __( 'Fast Checkout: Single Product', 'fast-co-block' ),
				'description' => __( 'Renders a collection of blocks representing a single item for sale along with the Fast Checkout button.', 'fast-co-block' ),
				'content'     => '<!-- wp:group {"className":"fast-product"} --><div class="wp-block-group fast-product"><!-- wp:image {"className":"fast-product__image"} --><figure class="wp-block-image fast-product__image"><img alt=""/></figure><!-- /wp:image --><!-- wp:heading {"className":"fast-product__title"} --><h2 class="fast-product__title">Product Title</h2><!-- /wp:heading --><!-- wp:heading {"className":"fast-product__subtitle","level":3} --><h3 class="fast-product__subtitle">Product Subtitle</h3><!-- /wp:heading --><!-- wp:paragraph {"className":"fast-product__description"} --><p class="fast-product__description">Product description text.</p><!-- /wp:paragraph --><!-- wp:paragraph {"className":"fast-product__price"} --><p class="fast-product__price">$50.00</p><!-- /wp:paragraph --><!-- wp:fast-co/checkout-button {"appId":"","productId":"","uniqueId":""} /--></div><!-- /wp:group -->',
				'categories'  => [ Plugin::GUTENBERG_NAMESPACE ],
				'keywords'    => [ 'product', 'fast' ],
			]
		);
	}
}
