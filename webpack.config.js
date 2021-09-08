/**
 * External dependencies
 */
const path = require('path');

/**
 * WordPress dependencies
 */
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
	...defaultConfig,
	entry: {
		'single-product-editor': './js/src/blocks/single-product/editor.js',
		'single-product-front-end':
			'./js/src/blocks/single-product/front-end.js',
		'checkout-button-editor': './js/src/blocks/checkout-button/editor.js',
		'checkout-button-front-end':
			'./js/src/blocks/checkout-button/front-end.js',
		'custom-elements': './js/src/custom-elements.js',
	},
	output: {
		path: path.resolve(__dirname, 'js/dist'),
		filename: '[name].js',
	},
};
