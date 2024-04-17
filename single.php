<?php


get_header();

while (have_posts()) :
    the_post(); ?>


        <div class="content">
            <?php the_content(); ?>
        </div>


<?php
endwhile; // End of the loop.

get_footer();
?>