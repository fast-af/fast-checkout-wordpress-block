import { Fragment, useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Spinner, TextControl } from '@wordpress/components';
import Logo from './components/Logo';

// Import CSS
import './editor.scss';

const FastCoBlock = ( props ) => {
	const { setAttributes, attributes } = props;
	const { appId, productId } = attributes;

	const [ validating ] = useState( false );

	useEffect( () => {
		// Get unique ID for the block. Props @generateblocks.
		const id = props.clientId.substr( 2, 9 ).replace( '-', '' );
		if ( ! attributes.uniqueId ) {
			setAttributes( {
				uniqueId: id,
			} );
		}
	}, [] );

	/*const inspectorControls = (
		<InspectorControls>
			<PanelBody
				title={ __("Options", "fast-co-block") }
				initialOpen={ true }
			>
				<ToggleControl
					label={ __("Display AMP Template Mode", "fast-co-block") }
					checked={ showTemplateMode }
					onChange={ (value) => setTemplateMode(value) }
				/>
			</PanelBody>
		</InspectorControls>
	);*/

	return (
		<>
			{ ! validating && (
				<div className="fast-co-block-container">
					<div className="fast-co-block-logo-svg">
						<Logo />
					</div>
					<TextControl
						label={ __( 'App ID', 'fast-co-block' ) }
						value={ appId }
						onChange={ ( value ) => {
							setAttributes( {
								appId: value,
							} );
						} }
						help={ __(
							'Please enter the App ID for the product.',
							'fast-co-block'
						) }
					/>
					<TextControl
						label={ __( 'Product ID', 'fast-co-block' ) }
						value={ productId }
						onChange={ ( value ) => {
							setAttributes( {
								productId: value,
							} );
						} }
						help={ __(
							'Please enter the Product ID for the product.',
							'fast-co-block'
						) }
					/>
				</div>
			) }
			{ validating && (
				<Fragment>
					<div className="fast-co-loading-placeholder">
						<div className="fast-co-loading">
							<Logo size="45" />
							<br />
							<div className="fast-co-spinner">
								<Spinner />
							</div>
						</div>
					</div>
				</Fragment>
			) }
		</>
	);
};

export default FastCoBlock;
