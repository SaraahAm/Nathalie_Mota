
</main>

        <footer>
            <!-- Affichage du menu du footer -->
            <div>
                <?php
                    wp_nav_menu(array(
                        'theme_location' => 'menu_secondaire',
                        'container' => false,
                        'menu_class' => 'menu',
                    ));
                ?>
            </div>
            <!-- Lightbox -->
            <div class="lightbox">
                <div class="lightbox-fermeture">
                    <i class="fa-solid fa-xmark" style="color: #ffffff;"></i>
                </div>
                <div class="lightbox-affichage">
                    <img src="">
                </div>
                <div class="lightbox-fleches">
                    <div class="precedente">
                        <i class="fa-solid fa-arrow-left-long" style="color: #ffffff;"></i>
                        <div class="lightbox-precedente">Précédente</div>
                    </div>
                    <div class="suivante">
                        <div class="lightbox-suivante">Suivante</div>
                        <i class="fa-solid fa-arrow-right-long" style="color: #ffffff;"></i>
                    </div>
                </div>
                <div class="informations-photo">
                    <div class="reference-photo"></div>
                    <div class="categorie-photo"></div>
                </div>
            </div>
        </footer>

    </body>
</html>