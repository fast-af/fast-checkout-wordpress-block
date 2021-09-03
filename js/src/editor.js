import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import blockIcon from './components/blockIcon';

// Import JS
import blockOutput from './block';

export const name = 'fast-co/checkout-button';

registerBlockType(name, {
	title: __('Fast.co Block', 'fast-co-block'),
	icon: blockIcon,
	keywords: [
		__('fast', 'fast-co-block'),
		__('checkout', 'fast-co-block'),
		__('button', 'fast-co-block'),
	],
	category: 'embed',
	description: __('Fast.co ecommerce block.', 'fast-co-block'),
	edit: blockOutput,

	save() {
		return null;
	},
});
