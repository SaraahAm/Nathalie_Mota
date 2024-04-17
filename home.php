<!-- On affiche le header -->
<?php
get_header();
?>

    <div class="hero">
        <h1>Photographe Event</h1>
            <div class="hero-content"> 
                <?php
                // Affichage aléatoire d'une photo
                $args = array(
                    'post_type' => 'photographies',
                    'posts_per_page' => 1,
                    'orderby' => 'rand',
                );

                $photo_aleatoire_hero = new WP_Query($args);

                if ($photo_aleatoire_hero->have_posts()) {
                    while ($photo_aleatoire_hero->have_posts()) {
                        $photo_aleatoire_hero->the_post();
                        the_content();
                    }
                    wp_reset_postdata();
                }
                ?>
            </div>
        </div>  

    <div class="bloc-les-photos">
        <div class="filtres">
            <div class="bloc-filtre">
                <!-- Création du menu déroulant Catégories -->
                <div class="menu-deroulant" id="categorie-titre">
                    <div class="menu-titre visible">Catégories</div>
                    <div class="menu-titre cache">Catégories</div>
                    <i class="fa-solid fa-chevron-down menu-fleche" style="color: #000000;"></i>
                </div>
                <div class="menu-options" id="categorie-options">
                    <?php

                    echo '<div class="vide" id="categorie-vide"></div>';

                    $possibilites = get_terms('categorie');

                    if (!empty($possibilites) && !is_wp_error($possibilites)) {
                        foreach ($possibilites as $possibilite) {
                            echo '<div class="menu-option" id="' . esc_attr($possibilite->slug) . '">' . esc_html($possibilite->name) . '</div>';
                        }
                    }
                    ?>
                </div>
            </div>
            <div class="bloc-filtre">
                <!-- Création du menu déroulant Formats -->
                <div class="menu-deroulant" id="format-titre">
                    <div class="menu-titre visible">Formats</div>
                    <div class="menu-titre cache">Formats</div>
                    <i class="fa-solid fa-chevron-down menu-fleche" style="color: #000000;"></i>
                </div>
                <div class="menu-options" id="format-options">
                    <?php

                    echo '<div class="vide" id="format-vide"></div>';

                    $termes = get_terms('formats');

                    if (!empty($termes) && !is_wp_error($termes)) {
                        foreach ($termes as $terme) {
                            echo '<div class="menu-option" id="' . esc_attr($terme->slug) . '">' . esc_html($terme->name) . '</div>';
                        }
                    }
                    ?>
                </div>
            </div>
            <div class="bloc-filtre" id="filtre-tri">
                <!-- Création du menu déroulant Trier par -->
                <div class="menu-deroulant" id="tri-titre">
                    <div class="menu-titre visible">Trier par</div>
                    <div class="menu-titre cache">Trier par</div>
                    <i class="fa-solid fa-chevron-down menu-fleche" style="color: #000000;"></i>
                </div>
                <div class="menu-options" id="tri-options">
                    <div class="vide" id="tri-vide"></div>
                    <div class="menu-option" id="ASC">Des plus anciennes aux plus récentes</div>
                    <div class="menu-option" id="DESC">Des plus récentes aux plus anciennes</div>
                </div>
            </div>
    </div>
    <div class="affichage-des-photos">
            <div class="zone-les-photos">
                <!-- Création d'une loop pour afficher toutes les photos -->
                <?php
                $args = array(
                    'post_type' => 'photographies',
                    'posts_per_page' => 8,
                    'orderby' => 'date',
                    'order' => 'ASC',
                    'paged' => 1,
                );

                $photo_query = new WP_Query($args);

                if ($photo_query->have_posts()) {
                    while ($photo_query->have_posts()) {
                        $photo_query->the_post();
                        get_template_part('template_part/photo-bloc');
                    }
                    wp_reset_postdata();
                } else {
                    echo 'Aucune photo trouvée.';
                }
                ?>
            </div>
        </div>
        <div class="bouton-accueil">
            <button id="charger-plus" class="voir-plus">Charger plus</button>
        </div>
    </div>


<!-- On affiche le footer -->
<?php
get_footer();
?>

