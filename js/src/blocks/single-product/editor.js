// Utils.
import { registerBlockType } from '@wordpress/blocks';

// Import meta.
import meta from './index';

// CSS
import './scss/editor.scss';

registerBlockType('fast-co/single-product', meta);
