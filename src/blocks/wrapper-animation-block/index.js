
import "./style.editor.scss";
import { registerBlockType} from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { InnerBlocks } from "@wordpress/block-editor";
import Edit from "./edit";
import classnames from "classnames";


const attributes = {
    animate: {
        type: 'string',
        default: '',
    },
    typeAnimate: {
        type: 'string',
        default: 'has-type-fadeIn',
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
        default: 'ease',
    },
    once: {
        type: 'boolean',
        default: false,
    }
};

registerBlockType("otter-animate-blocks/animationblock", {
    title: __("Animation Wrapper Block", "otter-animate-blocks"),
    description: __("Wrap any block with block and it will add the abilty to add an animation", "otter-animate-blocks"),
    category: "layout",
    icon: "editor-video",
    keywords: [__("Animation", "otter-animate-blocks"), __("image", "otter-animate-blocks")],



    attributes,

    edit: Edit,
    save: ({ attributes }) => {
	const {
		delay,
		easing,
		duration,
		typeAnimate,
	} = attributes;


    const classes = classnames( {
        [`has-animation`]: typeAnimate,
        [`${typeAnimate}`]: typeAnimate,
        [`has-duration__${duration}`]: duration,
        [`has-delay__${delay}`]: delay,
        [`has__${easing}`]: easing,
    });

        return (
			<div
				className={classes}
			>
				<InnerBlocks.Content />
			</div>
        );
    }
});