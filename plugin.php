<?php
/** 
* Plugin Name: Otterwp Animate Blocks Test
* Plugin URI: https://www.otterwp.io
* Description: Animate any gutenberg block.
* Author: Cyrus Shahbazi
* Author URI https://www.otterwp.io
* Version: 1.0.1
* License: GPL2+
* License URI: https://www.gnu.org/licenses/gpl-2.0.txt
* @package Otterwp-animate-blocks
*/
if (!defined('ABSPATH')) {
    exit;
}
if ( ! function_exists( 'ab_fs' ) ) {
    // Create a helper function for easy SDK access.
    function ab_fs() {
        global $ab_fs;

        if ( ! isset( $ab_fs ) ) {
            // Include Freemius SDK.
            require_once dirname(__FILE__) . '/freemius/start.php';

            $ab_fs = fs_dynamic_init( array(
                'id'                  => '8894',
                'slug'                => 'Otterwp-animate-blocks',
                'premium_slug'        => 'Otterwp-animate-blocks',
                'type'                => 'plugin',
                'public_key'          => 'pk_bc21129fcee47292a6024d91983d7',
                'is_premium'          => true,
                'is_premium_only'     => true,
                'has_addons'          => false,
                'has_paid_plans'      => true,
                'is_org_compliant'    => false,
                'menu'                => array(
                    'first-path'     => 'plugins.php',
                    'support'        => false,
                ),           
            ) );
        }

        return $ab_fs;
    }

    // Init Freemius.
    ab_fs();
    // Signal that SDK was initiated.
    do_action( 'ab_fs_loaded' );
}

if ( ab_fs()->is__premium_only() ) {
 
    if ( ab_fs()->can_use_premium_code() ) {

        if ( ! defined( 'OTTERWP_ANIMATE_BLOCKS_PLUGIN_FILE' ) ) {
            define( 'OTTERWP_ANIMATE_BLOCKS_PLUGIN_FILE', __FILE__ );
        }
        if ( ! class_exists( \Otterwp_Animate_Blocks\Otterwp_Animate_Blocks::class ) ) {
            require_once plugin_dir_path( OTTERWP_ANIMATE_BLOCKS_PLUGIN_FILE ) . 'class-otterwp-animate-blocks.php';
        }


        \Otterwp_Animate_Blocks\Otterwp_Animate_Blocks::instance();
    }
}