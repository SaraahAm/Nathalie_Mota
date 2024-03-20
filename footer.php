
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
            <!-- Affichage de la page contact-->
            <div>
                <?php 
                    get_template_part( 'template-parts/contact' ); 
                ?>
            </div>
        </footer>

    </body>
</html>