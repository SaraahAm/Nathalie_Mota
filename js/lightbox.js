function lightbox() {
    const recuperationPhotos = document.querySelectorAll('.autres-photos');
    const lightbox = document.querySelector('.lightbox');
    const zonePhotoLightBox = lightbox.querySelector('.lightbox-affichage img');
    const zoneReference = lightbox.querySelector('.reference-photo');
    const zoneCategorie = lightbox.querySelector('.categorie-photo');
    const photos = Array.from(recuperationPhotos);
    
    // Initialisation (sans élément actif)
    let indexPhoto = -1;

    ////////////////////////////////////////////////////////////////////

    // Création d'un tableau pour stocker les informations de toutes les photos à chaque chargement
    setTimeout(function(){
    const tableauPhotos = photos.map(element => {
        const laPhoto = element.querySelector('img');
        const hauteurLaPhoto = laPhoto.naturalHeight;
        const largeurLaPhoto = laPhoto.naturalWidth;
        const reference = element.querySelector('.reference-photo');
        const categorie = element.querySelector('.categorie-photo');
        return {
            src: laPhoto.src,
            width: largeurLaPhoto,
            height: hauteurLaPhoto,
            reference: reference.textContent,
            categorie: categorie.textContent,
        };
    });

    ////////////////////////////////////////////////////////////////////

    // Gestion de l'ouverture de la lightbox

    recuperationPhotos.forEach((element, index) => {
        const fullScreen = element.querySelector('.full-screen');
        
        fullScreen.addEventListener('click', function() {
            // Apparition de la lightbox et configuration de l'index sélectionné
            lightbox.style.display = "flex";
            indexPhoto = index;

            // Chargement des informations de la photo associée à l'index sélectionné
            const infoPhotoActuelle = tableauPhotos[indexPhoto];
            zonePhotoLightBox.src = infoPhotoActuelle.src;
            zonePhotoLightBox.style.width = infoPhotoActuelle.width + 'px';
            zonePhotoLightBox.style.height = infoPhotoActuelle.height + 'px';
            zoneReference.textContent = infoPhotoActuelle.reference;
            zoneCategorie.textContent = infoPhotoActuelle.categorie;
        });
    });

    ////////////////////////////////////////////////////////////////////

    // Gestion de la div "Suivante" (texte + flèche)
    const suivante = lightbox.querySelector('.suivante');

    suivante.addEventListener('click', function() {
        if (indexPhoto >= 0) {
            if (indexPhoto < photos.length - 1) {
                indexPhoto++;
            } else if (indexPhoto === photos.length - 1) {
                // Création d'une loop - Retour 1er élément
                indexPhoto = 0;
            }

            // En fonction des conditions précédentes, chargement des informations de la photo
            const infoPhotoActuelle = tableauPhotos[indexPhoto];
                zonePhotoLightBox.src = infoPhotoActuelle.src;
                zonePhotoLightBox.style.width = infoPhotoActuelle.width + 'px';
                zonePhotoLightBox.style.height = infoPhotoActuelle.height + 'px';
                zoneReference.textContent = infoPhotoActuelle.reference;
                zoneCategorie.textContent = infoPhotoActuelle.categorie;
        }
    });

    ////////////////////////////////////////////////////////////////////

    // Gestion de la div "Précédente" (texte + flèche)
    const precedent = lightbox.querySelector('.precedente');
    
    precedent.addEventListener('click', function() {
        if (indexPhoto >= 0) {
            if (indexPhoto > 0) {
                indexPhoto--;
            } else if (indexPhoto === 0) {
                // Création d'une loop - Retour dernier élément
                indexPhoto = photos.length - 1;
            }

            // En fonction des conditions précédentes, chargement des informations de la photo
            const infoPhotoActuelle = tableauPhotos[indexPhoto];
                zonePhotoLightBox.src = infoPhotoActuelle.src;
                zonePhotoLightBox.style.width = infoPhotoActuelle.width + 'px';
                zonePhotoLightBox.style.height = infoPhotoActuelle.height + 'px';
                zoneReference.textContent = infoPhotoActuelle.reference;
                zoneCategorie.textContent = infoPhotoActuelle.categorie;
        }
    });
    
    ////////////////////////////////////////////////////////////////////

    // Fermeture de la lightbox
    const fermetureLightbox = document.querySelector('.lightbox-fermeture');

        fermetureLightbox.addEventListener('click', function() {
            lightbox.style.display = "none";
            // Reset de l'index à la fermeture
            indexPhoto = -1;
        });
    }, 300);
}