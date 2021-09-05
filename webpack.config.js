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
		editor: './js/src/editor.js',
		'front-end': './js/src/front-end.js',
		'custom-elements': './js/src/custom-elements.js',
	},
	output: {
		path: path.resolve(__dirname, 'js/dist'),
		filename: '[name].js',
	},
};
