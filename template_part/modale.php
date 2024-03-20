<div id="modale">
    <button class="modale-button">X</button>
    <div class="modale-content">
        <img class="contact" src="<?php echo get_stylesheet_directory_uri() . '/assets/images/contact-header.png' ?>" alt="contact"/>
        <div class="contact-form">
        <?php
            // On insère le formulaire de demandes de renseignements
	        echo do_shortcode('[contact-form-7 id="5f02ed3" title="Formulaire de contact 1"]');
        ?>
        </div>
    </div>
</div>