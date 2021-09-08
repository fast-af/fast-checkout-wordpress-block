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
		[
			'core/image',
			{
				className: `${classNameBase}__image`,
				url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAGQBAMAAADmW0BIAAAAG1BMVEVo0aT///+z6NGg4saN3Lp61q/s+fPZ8+jG7dyOnDt7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAENElEQVR4nO3Xz1vaSBzH8VlIgGMDGjjyw3WvKLXukSjuXmkFt8fNqukejW05m8fVp39255tJIFRCo48rHt6vx0fCMJl8ZjKZJEoBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAXMdnEQUvdbrd3sq5GWKCV8q/PFCdVccQ/a2rkxZpmtqtbzxhJVP5Wyj4KL/Jr5MVqZrb/l1j6JDjj3BobjKX2bnJrbDJW8rHKJmPVtnNrbDJWaVtZenrZQ/lidXtmqtn7eiNMi5VZR/a7b1fHssb2/oHstJPsnDSjWxma6/a0u/O4WHq0vLY6dKT5kuP6LWnQjly/OdaxSvFgWI24zPGdurK7XVeveMNsLK8fBU5bRa7zVX/76OuFR5qxQ3fm9mdS5AT++aNiVd/oWGduT3ob3im7IyvGWX2s/txajnXWGiqrp+wgcIIgaC/FOrxQHxvVhirJQP5xO1ZWdKWLdZIPLR3LCg6UFbYfRFgT6/2V8nbc4fwQdqD7Gcr3yF+KFaYD9PAkejO9T7CnK0RppZoul5aU5+oeXSYlxWPpo3m7X+PNvbg/3o0q1+OWnWwsU5YTS/51JLvXTsrtuipLgSrpWJ2+bH16RKy/WrqtwMxzc+VVt+VPWl6KVXmzJtaV/JP23t+kP7RkekgrOlYQl0T5C3c21uV0OvpNz1TlNUwHW/GH7uQvV2nMRazFAVfEaqeJkj3jStW43zqTbQZaTnKBWHKndu9U0k998Hr6kURYimXOcE6sfhqrYmJNjgfzWM3kbJpaP491PhiM4nH1TIryfNC89opYi0Z/FqscOk7QTBZq3Vy5MRVeWxWwuOsk9Utb6VGTfi3F6gyLxrLDz2OpZEZfX4Alx9hsrLOLpFIk7UY3qtQYxYpN+R9jPddJNGuXrrTn9gb3+joqP+a++SDWqilvWpTASaUCseL1yW7q/n2YBdfjecNPjJUcTg9Q8pOfxio14rtBsVhmnSk3F4OUrDxPjRWOk/LafDmNbzuq0lDJEls4VkVP+fm5CwvNqrxYZqHQC5RpueqkHY3k5rPocrA2lnKlfFdn929PTJ41T8AFYtVkDljSakeX2DO5GckNutaQMYvaaf1s51dN+b7MhE/mCce9TRt+ciwVfZ5Oovhu3zyY7l5GcrD69DQYSayauzM9/ibV9r5MT9NkqxaI1smR35eJb4+Of/flMSA6H9tH10+NJcuzeXF8JxsSy9JFd2aGHaavlbI8rollyy7z54X4EUwadv8rFGsV+zh9zZ6czIuG6a+Tt0mhNRiqNTK7qPTBoeBi+nIy6/BrUuzB4cVlbqaviO1uOsEPavHZe5f/erwZNed6sH/ffGVXoH6Vvnecf4ebTgEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQMZ3AvO5+yZ9IX0AAAAASUVORK5CYII=',
				alt: __('Sample product image', 'fast-co-block'),
			},
		],
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
