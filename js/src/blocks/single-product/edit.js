// Utils.
import { __ } from '@wordpress/i18n';

// Hooks etc.
import {
	ColorPalette,
	InspectorControls,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps, // eslint-disable-line @wordpress/no-unsafe-wp-apis
} from '@wordpress/block-editor';

// Components.
import {
	ColorIndicator,
	PanelBody,
	PanelRow,
	RangeControl,
} from '@wordpress/components';

import { classNameBase } from './index';

export default ({ attributes, setAttributes }) => {
	const blockProps = useBlockProps({
		className: classNameBase,
		style: {
			padding: `${attributes.paddingSize}px`,
			border: `${attributes.borderSize}px ${attributes.borderColor} solid`,
			borderRadius: `${attributes.borderRadius}px`,
			'--fast-column-gap': `${attributes.columnGap}px`,
			'--fast-row-gap': `${attributes.rowGap}px`,
		},
	});

	// Inner blocks template.
	const TEMPLATE = [
		['core/image', { className: `${classNameBase}__image` }],
		[
			'core/heading',
			{
				content: '<strong>Product Category</strong>',
				className: `${classNameBase}__category`,
				level: 3,
				style: {
					color: {
						text: '#dd5eb9',
					},
					typography: {
						fontSize: 18,
					},
				},
			},
		],
		[
			'core/heading',
			{
				content: '<strong>Product Title</strong>',
				className: `${classNameBase}__title`,
				level: 2,
				style: {
					typography: {
						fontSize: 24,
					},
				},
			},
		],
		[
			'core/paragraph',
			{
				content: '<strong>$50.00</strong>',
				className: `${classNameBase}__price`,
				style: {
					typography: {
						fontSize: 20,
					},
				},
			},
		],
		['fast-co/checkout-button', {}],
		[
			'core/paragraph',
			{
				content: 'Product description',
				className: `${classNameBase}__description`,
				style: {
					typography: {
						fontSize: 16,
					},
				},
			},
		],
	];

	const innerBlockProps = useInnerBlocksProps(blockProps, {
		template: TEMPLATE,
		templateLock: 'insert',
	});

	return (
		<>
			<InspectorControls>
				<PanelBody
					initialOpen={false}
					title={
						<>
							{__('Border', 'fast-co-block')}
							<ColorIndicator
								colorValue={attributes.borderColor}
							/>
						</>
					}
				>
					<PanelRow>
						<ColorPalette
							value={attributes.borderColor}
							onChange={(borderColor) =>
								setAttributes({ borderColor })
							}
						/>
					</PanelRow>
					<PanelRow>
						<RangeControl
							label={__('Border Size (px)', 'fast-co-block')}
							value={attributes.borderSize}
							onChange={(borderSize) =>
								setAttributes({ borderSize })
							}
							min={0}
							max={40}
						/>
					</PanelRow>
					<PanelRow>
						<RangeControl
							label={__('Border Radius (px)', 'fast-co-block')}
							value={attributes.borderRadius}
							onChange={(borderRadius) =>
								setAttributes({ borderRadius })
							}
							min={0}
							max={32}
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody
					initialOpen={false}
					title={__('Padding', 'fast-co-block')}
				>
					<PanelRow>
						<RangeControl
							label={__('Block Padding (px)', 'fast-co-block')}
							value={attributes.paddingSize}
							onChange={(paddingSize) =>
								setAttributes({ paddingSize })
							}
							min={0}
							max={64}
							step={8}
							marks={[
								{
									value: 16,
									label: __('Default', 'fast-co-block'),
								},
							]}
						/>
					</PanelRow>
					<PanelRow>
						<RangeControl
							label={__(
								'Gap Between Columns (px)',
								'fast-co-block'
							)}
							value={attributes.columnGap}
							onChange={(columnGap) =>
								setAttributes({ columnGap })
							}
							min={0}
							max={64}
							step={8}
							marks={[
								{
									value: 16,
									label: __('Default', 'fast-co-block'),
								},
							]}
						/>
					</PanelRow>
					<PanelRow>
						<RangeControl
							label={__('Gap Between Rows (px)', 'fast-co-block')}
							value={attributes.rowGap}
							onChange={(rowGap) => setAttributes({ rowGap })}
							min={0}
							max={64}
							step={8}
							marks={[
								{
									value: 8,
									label: __('Default', 'fast-co-block'),
								},
							]}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div {...innerBlockProps}></div>
		</>
	);
};
