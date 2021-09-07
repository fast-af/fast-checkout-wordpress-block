// Utils.
import { __ } from '@wordpress/i18n';

// Images.
import blockIcon from '../../assets/fastIcon';

// Constants.
export const name = 'fast-co/checkout-button';
export const title = __('Fast.co: Checkout Button', 'fast-co-block');

// Functions.
import edit from './edit';
import save from './save';

export default {
	apiVersion: 2,
	title,
	icon: blockIcon,
	keywords: [
		__('fast', 'fast-co-block'),
		__('checkout', 'fast-co-block'),
		__('button', 'fast-co-block'),
	],
	category: 'embed',
	description: __('Fast.co checkout button.', 'fast-co-block'),
	attributes: {
		appId: {
			type: 'string',
		},
		productId: {
			type: 'string',
		},
		variantId: {
			type: 'string',
		},
		productOptions: {
			type: 'string',
		},
		uniqueId: {
			type: 'string',
		},
		defaultQuantity: {
			type: 'integer',
			default: 1,
		},
		quantityUiEnabled: {
			type: 'boolean',
			default: false,
		},
		fastButtonDisabled: {
			type: 'boolean',
			default: false,
		},
		darkMode: {
			type: 'boolean',
			default: false,
		},
		affiliateIds: {
			type: 'string',
		},
		couponId: {
			type: 'string',
		},
	},
	edit,
	save,
};
