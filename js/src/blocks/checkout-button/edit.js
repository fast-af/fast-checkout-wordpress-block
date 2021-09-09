// Hooks.
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

// Fast Icon.
import fastIcon from '../../assets/fastIcon';

// Category icon registration.
(function () {
	wp.blocks.updateCategory('fast-co', { icon: fastIcon });
})();

// Utils.
import { __ } from '@wordpress/i18n';

// Components.
import {
	TextControl,
	ToggleControl,
	PanelBody,
	TextareaControl,
} from '@wordpress/components';

export default ({ attributes, setAttributes, clientId, isSelected }) => {
	const blockProps = useBlockProps({
		className: 'fast-checkout-button',
	});
	const {
		appId,
		productId,
		defaultQuantity,
		quantityUiEnabled,
		fastButtonDisabled,
		darkMode,
		affiliateIds,
		couponId,
		variantId,
		productOptions,
	} = attributes;

	useEffect(() => {
		// Get unique ID for the block. Props @generateblocks.
		const id = clientId.substr(2, 9).replace('-', '');
		if (!attributes.uniqueId) {
			setAttributes({
				uniqueId: id,
			});
		}
	}, []);

	const checkoutText = __('Fast Checkout', 'fast-co-block');

	const inspectorControls = (
		<InspectorControls>
			<PanelBody
				title={__('Required Product Settings', 'fast-co-block')}
				initialOpen={true}
			>
				<TextControl
					label={__('App ID', 'fast-co-block')}
					value={appId}
					onChange={(value) => {
						setAttributes({
							appId: value,
						});
					}}
				/>
				<TextControl
					label={__('Product ID', 'fast-co-block')}
					value={productId}
					onChange={(value) => {
						setAttributes({
							productId: value,
						});
					}}
				/>
			</PanelBody>
			<PanelBody
				title={__('Optional Product Settings', 'fast-co-block')}
				initialOpen={false}
			>
				<TextControl
					label={__('Variant ID', 'fast-co-block')}
					value={variantId}
					onChange={(value) => {
						setAttributes({
							variantId: value,
						});
					}}
				/>
				<TextareaControl
					label={__('Product Options', 'fast-co-block')}
					placeholder={`color: blue\nsize: small`}
					help={__(
						'One option_name: option_value entry per line.',
						'fast-co-block'
					)}
					value={productOptions}
					onChange={(value) => {
						setAttributes({
							productOptions: value,
						});
					}}
				/>
			</PanelBody>
			<PanelBody
				title={__('Quantity Selector', 'fast-co-block')}
				initialOpen={false}
			>
				<TextControl
					label={__('Default Quantity', 'fast-co-block')}
					value={defaultQuantity}
					onChange={(value) => {
						setAttributes({
							defaultQuantity: value,
						});
					}}
					help={__(
						'How many products will be purchased when the button is clicked.',
						'fast-co-block'
					)}
				/>
				<ToggleControl
					label={__('Show Quantity UI', 'fast-co-block')}
					checked={quantityUiEnabled}
					onChange={(value) => {
						setAttributes({
							quantityUiEnabled: value,
						});
					}}
				/>
			</PanelBody>
			<PanelBody
				title={__('Button Style', 'fast-co-block')}
				initialOpen={false}
			>
				<ToggleControl
					label={__('Show Button as Disabled', 'fast-co-block')}
					checked={fastButtonDisabled}
					onChange={(value) => {
						setAttributes({
							fastButtonDisabled: value,
						});
					}}
				/>
				<ToggleControl
					label={__('Enable Dark Mode', 'fast-co-block')}
					checked={darkMode}
					onChange={(value) => {
						setAttributes({
							darkMode: value,
						});
					}}
				/>
			</PanelBody>
			<PanelBody
				title={__('Affiliate & Coupons', 'fast-co-block')}
				initialOpen={false}
			>
				<TextareaControl
					label={__('Affiliate IDs', 'fast-co-block')}
					help={__('One ID per line', 'fast-co-block')}
					placeholder={`some-affiliate\nanother-affiliate-id`}
					value={affiliateIds}
					onChange={(value) => {
						setAttributes({
							affiliateIds: value,
						});
					}}
				/>
				<TextControl
					label={__('Coupon ID', 'fast-co-block')}
					help={__(
						'Applies the specified coupon ID when purchase is made',
						'fast-co-block'
					)}
					value={couponId}
					onChange={(value) => {
						setAttributes({
							couponId: value,
						});
					}}
				/>
			</PanelBody>
		</InspectorControls>
	);

	const classNames = ['fast-checkout-button__container'];

	if (darkMode) {
		classNames.push('fast-checkout-button__container--dark');
	}
	if (fastButtonDisabled) {
		classNames.push('fast-checkout-button__container--disabled');
	}

	return (
		<div {...blockProps}>
			<div className={classNames.join(' ')}>
				{quantityUiEnabled ? (
					<div className="fast-quantity">{defaultQuantity}</div>
				) : null}
				<button className="fast-co-button-preview">
					<svg
						width="13"
						height="15"
						viewBox="0 0 13 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M11.0874 6.13573H11.4697C11.8919 6.1514 12.2899 6.31569 12.5765 6.59261C12.8632 6.86953 13.015 7.23648 12.9988 7.61307V13.5226C13.015 13.8992 12.8632 14.2662 12.5766 14.5431C12.2899 14.82 11.8919 14.9843 11.4697 15H1.53031C1.1081 14.9843 0.710076 14.82 0.423451 14.5431C0.136826 14.2662 -0.0150242 13.8992 0.00117489 13.5226V7.61307C-0.0150138 7.23649 0.136841 6.86953 0.423465 6.59262C0.710089 6.3157 1.10811 6.15141 1.53031 6.13573H1.91259V3.74755C1.91259 2.37338 2.23608 1.57277 2.95581 0.930751C3.67553 0.288737 4.57264 0 6.11282 0H6.8871C8.42728 0 9.3245 0.288703 10.0442 0.930751C10.7639 1.5728 11.0874 2.37338 11.0874 3.74755V6.13573ZM9.55827 3.74813C9.55827 2.87367 9.35233 2.36421 8.8944 1.95564C8.43646 1.54706 7.86552 1.36336 6.88534 1.36336H6.11481C5.13467 1.36336 4.56369 1.54706 4.10579 1.95564C3.6479 2.36421 3.44173 2.87367 3.44173 3.74813V6.13573H9.55827V3.74813Z"
							fill="white"
						/>
					</svg>
					{checkoutText}
				</button>
			</div>
			{isSelected ? inspectorControls : null}
		</div>
	);
};
