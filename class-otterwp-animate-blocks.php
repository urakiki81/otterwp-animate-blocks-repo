<?php
/**
 * Main class
 *
 * @package Otterwp-animate-blocks
 */

namespace Otterwp_Animate_Blocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Otterwp_Animate_Blocks
 */
class Otterwp_Animate_Blocks {

	/**
	 * Otterwp_Animate_Blocks instance.
	 *
	 * @var Otterwp_Animate_Blocks
	 */
	protected static $instance = null;

	/**
	 * The plugin version number.
	 *
	 * @var string
	 */
	public $version = '1.0.1';

	/**
	 * The plugin token.
	 *
	 * @var string
	 */
	public $token = 'otter-animate-blocks';

	/**
	 * The plugin assets directory.
	 *
	 * @var string
	 */
	public $assets_dir;

	/**
	 * The plugin assets URL.
	 *
	 * @var string
	 */
	public $assets_url;

	/**
	 * Otterwp_Animate_Blocks constructor.
	 */
	public function __construct() {
		$this->define_constants();
		$this->init_plugin_environment();
		$this->init_hooks();
	}

	/**
	 * Define plugin constants.
	 */
	protected function define_constants() {
		if ( ! defined( 'OTTERWP_ANIMATE_BLOCKS_ABSPATH' ) ) {
			define( 'OTTERWP_ANIMATE_BLOCKS_ABSPATH', trailingslashit( dirname( OTTERWP_ANIMATE_BLOCKS_PLUGIN_FILE ) ) );
		}
	}

	/**
	 * Initializes plugin environment variables
	 */
	protected function init_plugin_environment() {
		// Load plugin environment variables
		$this->assets_dir = OTTERWP_ANIMATE_BLOCKS_ABSPATH . 'dist';
		$this->assets_url = esc_url( trailingslashit( plugins_url( '/dist/', OTTERWP_ANIMATE_BLOCKS_PLUGIN_FILE ) ) );
	}

	/**
	 * Initializes hooks.
	 */
	protected function init_hooks() {
		// Editor assets
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_assets' ) );

		// Frontend assets
		add_action( 'wp_enqueue_scripts', array( $this, 'wp_enqueue_scripts' ) );

		// Load textdomain
		add_action( 'plugins_loaded', array( $this, 'load_plugin_textdomain' ) );

		// check version number on each request
		add_action( 'init', array( $this, 'check_version' ) );
	}

	/**
	 * Load editor block assets.
	 */
	public function enqueue_block_editor_assets() {
		// Scripts

		wp_enqueue_script(
			$this->token . '-editor-script', // Handle.
			esc_url( $this->assets_url ) . '/editor.js', // block.build.js: We register the block here. Built with Webpack.
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
			$this->version,
			true // Enqueue the script in the footer.
		);
		wp_enqueue_script(
			$this->token . '-script', // Handle.
			esc_url( $this->assets_url ) . '/script.js', // block.build.js: We register the block here. Built with Webpack.
			array('jquery', 'wp-compose', 'wp-editor' ), // Dependencies, defined above.
			$this->version,
			true // Enqueue the script in the footer.
		);
		wp_enqueue_style(
			$this->token . '-editor-styles', // Handle.
			esc_url( $this->assets_url ) . '/editor.css',
			array(),
			$this->version,
		);
	}

	/**
	 * Load frontend assets.
	 */
	public function wp_enqueue_scripts() {
		$load_front = apply_filters( 'Otterwp_animate_blocks_load', true );
		if ( $load_front ) {
			// Styles
			wp_enqueue_style(
				$this->token . '-styles', // Handle.
				esc_url( $this->assets_url ) . '/style.css',
				array(),
				$this->version,
			);

			// Scripts
			wp_enqueue_script(
				$this->token . '-main-js', // Handle.
				esc_url( $this->assets_url ) . '/main.js',
				array('jquery'), // Dependencies, defined above.
				$this->version,
				true // Enqueue the script in the footer.
			);
		}
	}

	/**
	 * Load plugin textdomain
	 */
	public function load_plugin_textdomain() {
		$domain = 'otter-animate-blocks'; // textdomain can't be stored in class variable since it must be a single string literal
		load_plugin_textdomain( $domain, false, dirname( plugin_basename( OTTERWP_ANIMATE_BLOCKS_PLUGIN_FILE ) ) . '/languages/' );
	}

	/**
	 * Main Otterwp_Animate_Blocks Instance
	 * Ensures only one instance of Otterwp_Animate_Blocks is loaded or can be loaded.
	 *
	 * @return Otterwp_Animate_Blocks Plugin instance
	 */
	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Cloning is forbidden.
	 */
	public function __clone() {
		_doing_it_wrong( __FUNCTION__, esc_html__( 'huh?', 'otter-animate-blocks' ), esc_attr( $this->version ) );
	}

	/**
	 * Unserializing instances of this class is forbidden.
	 */
	public function __wakeup() {
		_doing_it_wrong( __FUNCTION__, esc_html__( 'huh?', 'otter-animate-blocks' ), esc_attr( $this->version ) );
	}

	/**
	 * Checks plugin version.
	 *
	 * This check is done on all requests and runs if the versions do not match.
	 */
	public function check_version() {
		if ( ! defined( 'IFRAME_REQUEST' ) && get_option( $this->token . '_version' ) !== $this->version ) {
			$this->log_version_number();
			do_action( $this->token . '_updated' );
		}
	}

	/**
	 * Log the plugin version number in database.
	 */
	protected function log_version_number() {
		delete_option( $this->token . '_version' );
		update_option( $this->token . '_version', $this->version );
	}

}
