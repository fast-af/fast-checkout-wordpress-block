import { registerBlockType } from '@wordpress/blocks';

// Import blocks.
import {
	name as checkoutButtonName,
	default as checkoutButton,
} from './blocks/checkout-button';

// Import CSS.
import './editor.scss';

registerBlockType(checkoutButtonName, checkoutButton);
