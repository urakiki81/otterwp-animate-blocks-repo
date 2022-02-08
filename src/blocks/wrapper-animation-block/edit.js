import { Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { PanelBody, SelectControl, RangeControl } from "@wordpress/components";
import classnames from "classnames";
const { InspectorControls, InnerBlocks } = wp.blockEditor;
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
// Available Animate control options

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



class Edit extends Component {

    render() {
        const {
            className,
            attributes,
            setAttributes
        } = this.props;
        const {  typeAnimate, delay, duration, easing } = attributes;
        const classes = classnames(className, {
            [`has-animation`]: typeAnimate,
            [`${typeAnimate}`]: typeAnimate,
            [`has-duration__${duration}`]: duration,
            [`has-delay__${delay}`]: delay,
            [`has__${easing}`]: easing,
        });
        return (
            <>
            <InspectorControls>
                <PanelBody
                    title={ __( 'Animate Control', 'otter-animate-blocks' ) }
                    initialOpen={ true }
                >
                    <SelectControl
                        label={ __( 'typeAnimate', 'otter-animate-blocks' ) }
                        value={ typeAnimate }
                        options={ typeAnimateControlOptions }
                        onChange={ ( value ) => setAttributes( { typeAnimate: value } ) }
                    />
                    <SelectControl
                        label={ __( 'Easing', 'otter-animate-blocks' ) }
                        help={ __( 'easing function for animations', 'otter-animate-blocks' ) }
                        value={ easing }
                        options={ easingOptions }
                        onChange={ ( value ) => setAttributes( { easing: value } ) }
                    />
                    <RangeControl
                        label={__( 'Delay (ms)', 'otter-animate-blocks' )}
                        value={ delay }
                        onChange={ ( value ) => setAttributes( { delay: value } ) }
                        min={ 100 }
                        max={ 1500 }
                        step={100}
                    />
                    <RangeControl
                        label={ __( 'Duration (ms)', 'otter-animate-blocks' ) }
                        value={ duration }
                        onChange={ ( value ) => setAttributes( { duration: value } ) }
                        min={ 100 }
                        max={ 1500 }
                        step={100}
                    />

                </PanelBody>
            </InspectorControls>
            <div className={ classes }>
					<InnerBlocks />
			</div>
        </>
        );
    }
}

export default (Edit);