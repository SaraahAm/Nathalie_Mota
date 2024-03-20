<?php

// Chargement du style CSS et des scripts

function theme_enqueue_styles()
{
    wp_enqueue_style('theme', get_template_directory_uri() . '/css/theme.css');
    wp_enqueue_style('style', get_template_directory_uri() . '/style.css');
    wp_enqueue_style('modale', get_template_directory_uri() . '/css/modale.css');
    wp_enqueue_style('photographies', get_template_directory_uri() . '/css/photographies.css');
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css', array(), null);
    wp_enqueue_script('jquery');
    wp_enqueue_script('scripts', get_template_directory_uri() . '/js/scripts.js');
}

add_action('wp_enqueue_scripts', 'theme_enqueue_styles');

// Ajout de la gestion des menus dans le tableau de bord de wordpress

function register_custom_menus() {
    register_nav_menus(array(
        'menu_principal' => __('Menu principal', 'Photographe'),
        'menu_secondaire' => __('Menu secondaire', 'Photographe'),
    ));
}
 
add_action('init', 'register_custom_menus');


// Ajout d'un logo personnalisable au panel d'administration de wordpress
add_theme_support('custom-logo', array(
    'height'      => 100,
    'width'       => 400,
    'flex-height' => true,
    'flex-width'  => true,
));