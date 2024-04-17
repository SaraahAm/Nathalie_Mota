<?php

// Chargement du style CSS et des scripts

function theme_enqueue_styles()
{
    wp_enqueue_style('theme', get_template_directory_uri() . '/css/theme.css');
    wp_enqueue_style('style', get_template_directory_uri() . '/style.css');
    wp_enqueue_style('modale', get_template_directory_uri() . '/css/modale.css');
    wp_enqueue_style('front-page', get_template_directory_uri() . '/css/front-page.css');
    wp_enqueue_style('photographies', get_template_directory_uri() . '/css/photographies.css');
    wp_enqueue_style('responsive', get_template_directory_uri() . '/css/responsive.css');
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css', array(), null);
    wp_enqueue_script('jquery');
    wp_enqueue_script('lightbox', get_template_directory_uri() . '/js/lightbox.js');
    wp_enqueue_script('scripts', get_template_directory_uri() . '/js/scripts.js');
    wp_enqueue_script('burger-menu', get_template_directory_uri() . '/js/burger-menu.js');
    
    

    if(is_home()){
        wp_enqueue_script('charger-plus', get_template_directory_uri() . '/js/charger-plus.js');
        wp_localize_script('charger-plus', 'myAjax', array('ajaxurl' => admin_url('admin-ajax.php'), 'nonce'   => wp_create_nonce('ajax-nonce')));
        wp_enqueue_script('script-filtres', get_template_directory_uri() . '/js/homeFilters.js');
    }
    
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

// Fonction AJAX pour le charger plus
function charger_plus() {

    // Vérification du nonce avant exécution de la requête
    check_ajax_referer('ajax-nonce', 'nonce');

    $page = $_POST['page'];
    $ordreTriage = $_POST['order'];
    $args = array(
        'post_type' => 'photographies',
        'posts_per_page' => 8,
        'orderby' => 'date',
        'order' => $ordreTriage,
        'paged' => $page,
    );

    $photo_query = new WP_Query($args);

    if ($photo_query->have_posts()) {
        while ($photo_query->have_posts()) {
            $photo_query->the_post();
            get_template_part('template_part/photo-bloc');
        }
        wp_reset_postdata();
    }

    wp_die();
}

add_action('wp_ajax_charger_plus', 'charger_plus');
add_action('wp_ajax_nopriv_charger_plus', 'charger_plus');


// Fonction AJAX pour récupérer les photos filtrées
function filtrer_photos() {

    // Vérification du nonce avant exécution de la requête
    check_ajax_referer('ajax-nonce', 'nonce');

    $tax_query = array('relation' => 'AND');
    $order = $_POST['order'] ?? 'ASC';

    // Si une catégorie est présente et n'est pas égale à all
    if (isset($_POST['category']) && $_POST['category'] !== 'all') {
        $category = $_POST['category'];
        $tax_query[] = array(
            'taxonomy' => 'categorie',
            'field' => 'slug',
            'terms' => $category,
        );
    }

    // Si un format est présent et n'est pas égal à all
    if (isset($_POST['format']) && $_POST['format'] !== 'all') {
        $format = $_POST['format'];
        $tax_query[] = array(
            'taxonomy' => 'formats',
            'field' => 'slug',
            'terms' => $format,
        );
    }

    $args = array(
        'post_type' => 'photographies',
        'posts_per_page' => 8,
        'orderby' => 'date',
        'order' => $order,
        'paged' => 1,
        'tax_query' => $tax_query,
    );

    $photo_query = new WP_Query($args);

    // Stockage du résultat en tampon temporairement
    ob_start();

    // Définition de la structure d'affichage des nouveaux éléments
    if ($photo_query->have_posts()) {
        while ($photo_query->have_posts()) {
            $photo_query->the_post();
            get_template_part('template_part/photo-bloc');
        }
        wp_reset_postdata();
    } else {
        echo 'Aucune photo trouvée.';
    }

    // Récupération des informations en tampon dans une variable
    $output = ob_get_clean();

    // Affichage de la variable
    echo $output;

    wp_die();
}

add_action('wp_ajax_filtrer_photos', 'filtrer_photos');
add_action('wp_ajax_nopriv_filtrer_photos', 'filtrer_photos');