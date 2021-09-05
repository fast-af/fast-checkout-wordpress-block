// Functions.
import edit from './edit';
import save from './save';

// Images.
import blockIcon from '../../assets/fastIcon';

// Constants.
export const name = 'fast-co/single-product';
export const title = __('Fast.co: Single Product', 'fast-co-block');
export const classNameBase = 'fast-co-single-product';

// Utils.
import { __ } from '@wordpress/i18n';

export default {
	apiVersion: 2,
	title,
	icon: blockIcon,
	attributes: {
		borderColor: {
			type: 'string',
			default: '#9d8af5',
		},
		borderSize: {
			type: 'integer',
			default: 1,
		},
		borderRadius: {
			type: 'integer',
			default: 2,
		},
		paddingSize: {
			type: 'integer',
			default: 16,
		},
		columnGap: {
			type: 'integer',
			default: 16,
		},
		rowGap: {
			type: 'integer',
			default: 8,
		},
		style: {
			type: 'object',
			default: {
				color: {
					background: '#FFFFFF',
					text: '#000000',
				},
			},
		},
	},
	keywords: [
		__('fast', 'fast-co-block'),
		__('single', 'fast-co-block'),
		__('product', 'fast-co-block'),
	],
	category: 'embed',
	description: __(
		'A single product listing using Fast.co checkout.',
		'fast-co-block'
	),
	supports: {
		alignWide: true,
		color: {
			gradients: true,
		},
	},
	edit,
	save,
};
