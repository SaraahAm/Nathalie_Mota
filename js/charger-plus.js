document.addEventListener('DOMContentLoaded', function() {
    
    // Initialisation de la page
    let page = 1;
    const chargerPlusBouton = document.getElementById('charger-plus');
    const zoneLesPhotos = document.querySelector('.zone-les-photos');
    const blocLesPhotos = document.querySelector('.bloc-les-photos');

    const selectionTriASC = document.getElementById('ASC');
    const selectionTriDESC = document.getElementById('DESC');

    let ordreTriage = 'ASC';

    chargerPlusBouton.addEventListener('click', async function() {
        if (selectionTriASC.classList.contains('selectionne')) ordreTriage = 'ASC';
        if (selectionTriDESC.classList.contains('selectionne')) ordreTriage = 'DESC';

        // Incrémentation du numéro de page
        page++;

        // Création d'un objet pour envoyer la requête
        const data = new URLSearchParams();
        data.append('action', 'charger_plus');
        data.append('page', page);
        data.append('order', ordreTriage);
        // Ajout du nonce de sécurité
        data.append('nonce', myAjax.nonce);

        try {
            // Envoi de la requête
            const reponse = await fetch(myAjax.ajaxurl, {
                method: 'POST',
                body: data,
            });

            if (reponse.ok) {
                // Réception de la réponse de la requête
                const responseData = await reponse.text();
                zoneLesPhotos.insertAdjacentHTML('beforeend', responseData);

                // Ajout d'un compte pour masquer le bouton (si moins de 8 éléments chargés)
                const parser = new DOMParser();
                const doc = parser.parseFromString(responseData, 'text/html');
                const figureCompte = doc.querySelectorAll('figure').length;
                // L'overlay de chaque photo se charge au clic sur le bouton
                overlay();
                lightbox();

                // Si moins de 8 éléments, le bouton disparait
                if (figureCompte < 8) {
                    chargerPlusBouton.style.display = 'none';
                }

            } else {
                chargerPlusBouton.style.display = 'none';
                // Création d'un message d'erreur
                const erreurMessage = document.createElement('div');
                erreurMessage.textContent = 'Une erreur s\'est produite lors du chargement du contenu. Veuillez réessayer ultérieurement.';
                erreurMessage.classList.add('message-erreur');
                blocLesPhotos.appendChild(erreurMessage);
            }
        } catch (error) {
            // Capture des erreurs afin de les rendre visibles dans la console
            console.error('Une erreur s\'est produite :', error);
        }
    });
});