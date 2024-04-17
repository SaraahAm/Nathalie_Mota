<!doctype html>
<html <?php language_attributes(); ?>>

    <!-- Elements repris du theme hello elementor -->
    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Photographe</title>
        <?php wp_head(); ?>
    </head>

    <body>
        <header>
            <!-- Ajout d'un custom logo modifiable via le tableau de bord -->
            <div class="logo">
                <div>
                    <?php the_custom_logo() ?>
                </div>  
                <div>
                    <img class="burger-open" src="<?php echo get_stylesheet_directory_uri() . '/assets/images/burger-open.png' ?>" alt="Icone burger" />
                </div>      
            </div>
            <!-- Appel du menu principal modifiable dans le tableau de bord -->
            <nav>
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'menu_principal',
                    'container' => false,
                    'menu_class' => 'menu',
                ));
                ?>
            </nav>
                <div class="modale-place">
                    <?php include(get_stylesheet_directory() . '/template_part/modale.php'); ?>
                </div>
        </header>

        <main>