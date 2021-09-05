// Hooks etc.
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

// Constants.
import { classNameBase } from './index';

export default ({ attributes }) => {
	const blockProps = useBlockProps.save({
		className: classNameBase,
		style: {
			padding: attributes.paddingSize || 0,
			border: `${attributes.borderSize}px ${attributes.borderColor} solid`,
			borderRadius: `${attributes.borderRadius}px`,
			'--fast-column-gap': `${attributes.columnGap}px`,
			'--fast-row-gap': `${attributes.rowGap}px`,
		},
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
};
