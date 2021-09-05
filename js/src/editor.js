import { registerBlockType } from '@wordpress/blocks';

// Import blocks.
import {
	name as checkoutButtonName,
	default as checkoutButton,
} from './blocks/checkout-button/index';

import {
	name as singleProductName,
	default as singleProduct,
} from './blocks/single-product/index';

// Import CSS.
import './editor.scss';

registerBlockType(checkoutButtonName, checkoutButton);
registerBlockType(singleProductName, singleProduct);
