import assign from 'lodash.assign';
import "./style.scss";
import "./style.editor.scss";
import classnames from "classnames";
import { __ } from "@wordpress/i18n";
// import classNames from 'classnames';
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, SelectControl, RangeControl, ToggleControl} = wp.components;
const { addFilter } = wp.hooks;


// Enable Animate control on the following blocks
const enableAnimateControlOnBlocks = [
	'core/image',
	'core/paragraph',
	'core/heading',
	`core/button`,
	'core/video',
	'core/code',
	'core/cover',
	'core/latest-posts',
	'core/file',
	'core/widget-area',
	'ccore/calendar',
	'core/media-text',
];
const easingOptions = [
	{
		label: __( 'Ease', 'otter-animate-blocks' ),
		value: 'ease',
	},
	{
		label: __( 'Ease in', 'otter-animate-blocks' ),
		value: 'ease-in',
	},
	{
		label: __( 'Ease out', 'otter-animate-blocks' ),
		value: 'ease-out',
	},
	{
		label: __( 'Ease in out', 'otter-animate-blocks' ),
		value: 'ease-in-out',
	},
	{
		label: __( 'Linear', 'otter-animate-blocks' ),
		value: 'linear',
	},
];

const hoverOptions = [
	{
		label: __( 'None' ),
		value: '',
	},
	{
		label: __( 'Hover Reset' ),
		value: 'has-hover',
	},
	{
		label: __( 'Hover Reset test' ),
		value: 'reset-animation',
	},
];
const typeAnimateControlOptions = [
	{
		label: __( 'Fade', 'otter-animate-blocks' ),
		value: 'has-type-fadeIn',
	},
	{
		label: __( 'Fade up', 'otter-animate-blocks' ),
		value: 'has-type-fadeInUp',
	},
	{
		label: __( 'Fade down', 'otter-animate-blocks' ),
		value: 'has-type-fadeInDown',
	},
	{
		label: __( 'Fade left', 'otter-animate-blocks' ),
		value: 'has-type-fadeInLeft',
	},
	{
		label: __( 'Fade right', 'otter-animate-blocks' ),
		value: 'has-type-fadeInRight',
	},
	{
		label: __( 'Fade Big right', 'otter-animate-blocks' ),
		value: 'has-type-fadeInRightBig',
	},
	{
		label: __( 'Fade Big left', 'otter-animate-blocks' ),
		value: 'has-type-fadeInleftBig',
	},
	{
		label: __( 'Flip', 'otter-animate-blocks' ),
		value: 'has-type-flip',
	},
	{
		label: __( 'Vertical Flip', 'otter-animate-blocks' ),
		value: 'has-type-verticalFlip',
	},
	{
		label: __( 'Flip up', 'otter-animate-blocks' ),
		value: 'has-type-flipUp',
	},
	{
		label: __( 'Flip down', 'otter-animate-blocks' ),
		value: 'has-type-flipDown',
	},
	{
		label: __( 'Flip left', 'otter-animate-blocks' ),
		value: 'has-type-flipInY',
	},
	{
		label: __( 'Flip right', 'otter-animate-blocks' ),
		value: 'has-type-flipInX',
	},
	{
		label: __( 'Slide up', 'otter-animate-blocks' ),
		value: 'has-type-slideInUp',
	},
	{
		label: __( 'Slide down', 'otter-animate-blocks' ),
		value: 'has-type-slideInDown',
	},
	{
		label: __( 'Slide left', 'otter-animate-blocks' ),
		value: 'has-type-slideInleft',
	},
	{
		label: __( 'Slide right', 'otter-animate-blocks' ),
		value: 'has-type-slideInRight',
	},
	{
		label: __( 'Zoom in', 'otter-animate-blocks' ),
		value: 'has-type-zoomIn',
	},
	{
		label: __( 'Reverse Zoom In', 'otter-animate-blocks' ),
		value: 'has-type-zoomReverseIn',
	},
	{
		label: __( 'bounce In', 'otter-animate-blocks' ),
		value: 'has-type-bounceIn',
	},
	{
		label: __( 'Bounce In Right', 'otter-animate-blocks' ),
		value: 'has-type-bounceInRight',
	},
	{
		label: __( 'Bounce In Left', 'otter-animate-blocks' ),
		value: 'has-type-bounceInLeft',
	},
	{
		label: __( 'Bounce In Up', 'otter-animate-blocks' ),
		value: 'has-type-bounceInUp',
	},
	{
		label: __( 'Bounce In Down', 'otter-animate-blocks' ),
		value: 'has-type-bounceInDown',
	},
	{
		label: __( 'Light Speed', 'otter-animate-blocks' ),
		value: 'has-type-lightSpeedIn',
	},
	{
		label: __('Rubber Band', 'otter-animate-blocks'),
		value: 'has-type-rubberBand',
	},
	{
		label: __('Back In Left', 'otter-animate-blocks'),
		value: 'has-type-backInLeft',
	},
	{
		label: __('Back In Right', 'otter-animate-blocks'),
		value: 'has-type-backInRight',
	},
	{
		label: __('Back In Up', 'otter-animate-blocks'),
		value: 'has-type-backInUp',
	},
	{
		label: __('Back In down', 'otter-animate-blocks'),
		value: 'has-type-backInDown',
	},
	{
		label: __('Rubber Band', 'otter-animate-blocks'),
		value: 'has-type-rubberBand',
	},
	{
		label: __('Light Speed', 'otter-animate-blocks'),
		value: 'has-type-lightSpeedIn',
	},
	{
		label: __('Roll In', 'otter-animate-blocks'),
		value: 'has-type-rollIn',
	},
	{
		label: __('Hinge Out', 'otter-animate-blocks'),
		value: 'has-type-hinge',
	},
	{
		label: __('Hinge Out Vanish', 'otter-animate-blocks'),
		value: 'has-type-hinge-vanish',
	},
	{
		label: __('Wobble', 'otter-animate-blocks'),
		value: 'has-type-wobble',
	},
	{
		label: __('Focus', 'otter-animate-blocks'),
		value: 'has-type-focus',
	},
	{
		label: __('Skew Left', 'otter-animate-blocks'),
		value: 'has-type-skew-left',
	},
];

/**
 * Add Animate control attribute to block.
 *
 * @param {object} settings Current block settings.
 * @param {string} name Name of block.
 *
 * @returns {object} Modified block settings.
 */
const addAnimateControlAttribute = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableAnimateControlOnBlocks.includes( name ) ) {
		return settings;
	}

	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		animate: {
			type: 'boolean',
			default: false,
			
		},
        typeAnimate: {
			type: 'string',
			default: typeAnimateControlOptions[ 0 ].value,
		},
		delay: {
			type: 'number',
			default:  100,
		},
		duration: {
			type: 'number',
			default:  100,
		},
		easing:{
			type: 'string',
			default: easingOptions[ 0 ].value,
		},
	} );

	return settings;
};

addFilter( 'blocks.registerBlockType', 'extend-block-example/attribute/Animate', addAnimateControlAttribute );

/**
 * Create HOC to add Animate control to inspector controls of block.
 */
const withAnimateControl = createHigherOrderComponent( ( BlockEdit, ) => {
	
	return ( props ) => {

		const {
			name,
			isSelected,
		} = props;
		const { animate, typeAnimate, delay, duration, easing, hover} = props.attributes;

		
		return (
			<Fragment>
				<BlockEdit { ...props } />
				{ isSelected && enableAnimateControlOnBlocks.includes( name ) &&
				<InspectorControls>
					<PanelBody
						title={ __( 'Animate Control' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Animate' ) }
							checked={ animate }
							onChange={ ( selectedAnimateOption ) => {
								props.setAttributes( {
									animate: selectedAnimateOption,
								} );
							} }
						/>
						{animate &&
                        <SelectControl
							label={ __( 'typeAnimate' ) }
							value={ typeAnimate }
							options={ typeAnimateControlOptions }
							onChange={ ( typeSelectedAnimateOption ) => {
								props.setAttributes( {
									typeAnimate: typeSelectedAnimateOption,
								} );
							} }
						/>
						}
						{animate &&
						<SelectControl
							label={ __( 'Easing', 'otter-animate-blocks' ) }
							help={ __( 'easing function for animations', 'otter-animate-blocks' ) }
							value={ easing }
							options={ easingOptions }
							onChange={ ( typeSelectedEasingOptions ) => {
								props.setAttributes( {
									easing: typeSelectedEasingOptions,
								} );
							} }
						/>
						}
						{animate &&
						<RangeControl
							label="Delay (ms)"
							value={ delay }
							onChange={ ( rangDelayOption ) => {
								props.setAttributes( {
									delay: rangDelayOption,
								} );
							} }
							min={ 100 }
							max={ 1500 }
							step={100}
						/>
						}
						{animate &&
						<RangeControl
							label={ __( 'Duration (ms)' ) }
							value={ duration }
							onChange={ ( rangDurationOption ) => {
								props.setAttributes( {
									duration: rangDurationOption,
								} );
							} }
							min={ 100 }
							max={ 1500 }
							step={100}
						/>
						}
						{animate &&
						<SelectControl
							label={ __( 'hover', 'otter-animate-blocks' ) }
							help={ __( 'easing function for animations', 'otter-animate-blocks' ) }
							value={ hover }
							options={ hoverOptions }
							onChange={ ( typeSelectedHoverOptions ) => {
								props.setAttributes( {
									easing: typeSelectedHoverOptions,
								} );
							} }
						/>
						}

					</PanelBody>
				</InspectorControls>
			}
			</Fragment>
		);
	};
}, 'withAnimateControl' );

addFilter( 'editor.BlockEdit', 'extend-block-example/with-Animate-control', withAnimateControl );


/**
 * Add custom element class in save element.
 *
 * @param {Object} extraProps     Block element.
 * @param {Object} blockType      Blocks object.
 * @param {Object} attributes     Blocks attributes.
 *
 * @return {Object} extraProps Modified block element.
 */
 function applyExtraClass( extraProps, blockType, attributes ) {

	const { animate, typeAnimate, delay, duration, easing, hover } = attributes;
	const classes =  classnames( {
		[`has-animation`]: animate,
		[`${typeAnimate}`]: typeAnimate,
		[`has-duration__${duration}`]: duration,
		[`has-delay__${delay}`]: delay,
		[`has__${easing}`]: easing,
		[`${hover}`]: hover,
	});
	//check if attribute exists for old Gutenberg version compatibility
	//add class only when visibleOnMobile = false
	//add allowedBlocks restriction
	if ( animate === true && enableAnimateControlOnBlocks.includes( blockType.name ))  {
		extraProps.className = classnames( extraProps.className, classes );
	}

	return extraProps;
}
addFilter(
	'blocks.getSaveContent.extraProps',
	'editorskit/applyExtraClass',
	applyExtraClass
);