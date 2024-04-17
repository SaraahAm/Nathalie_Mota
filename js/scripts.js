document.addEventListener("DOMContentLoaded", function () { 
	const boutonContact = document.querySelector(".menu-item-15");
	const modale = document.querySelector(".modale-place");
	const boutonFermeture = document.querySelector(".modale-button");
	const conteneurModale = document.getElementById("modale");
    
	boutonContact.addEventListener("click", function() {
	    // Gestion de la fermeture de la modale - En cliquant à nouveau sur Contact
	    if (modale.style.display === "block") {
			//console.log('cc')
	        modale.style.display = "none";
	    }
	    else {
	        modale.style.display = "block";
			//console.log('hi')
	    }
	});

    // Fermeture de la modale lorsqu'on clic sur la croix
	boutonFermeture.addEventListener("click", function() {
	    modale.style.display = "none";
	});

    	// Fermeture de la modale lorsqu'on clic hors de la modale - facultatif
	window.addEventListener('click', (event) => {
	    if (event.target === conteneurModale) {
	        modale.style.display = "none";
	    }
	});
});

// Lorsqu'on click sur le bouton "Contact" sur la page d'une photo, on ouvre la modale et on remplit automatique de la référence en fonction de la photo
document.addEventListener("DOMContentLoaded", function () {

    // Si on se trouve sur la page single-photographies.php seulement
    let urlActuelle = window.location.href;

    if (urlActuelle.match('/photographies/')) {
        const boutonContactPhoto = document.querySelector(".contact-button");
        const modaleBis = document.querySelector(".modale-place");
        const refARemplir = document.querySelector(".ref input");
        const refADupliquer = document.getElementById("reference");

        boutonContactPhoto.addEventListener("click", function () {
            modaleBis.style.display = "block";
			refARemplir.value = refADupliquer.textContent;
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});

// Flèches de navigation sur single-photographies.php
document.addEventListener("DOMContentLoaded", function () {

	// Si on se trouve sur la page single-photographies.php seulement
		let urlActuelle = window.location.href;
		if (urlActuelle.match('/photographies/')) {
		const flechePrecedente = document.querySelector('.left-arrow');
		const flecheSuivante = document.querySelector('.right-arrow');
		const zoneVignetteGauche = document.querySelector('.conteneur-vignette-precedent');
		const zoneVignetteDroite = document.querySelector('.conteneur-vignette-suivant');
		zoneVignetteGauche.style.display = "none";
		zoneVignetteDroite.style.display = "none";
	
		flechePrecedente.addEventListener('mouseenter', function() {
			zoneVignetteGauche.style.display = "flex";
		});
	
		flechePrecedente.addEventListener('mouseleave', function() {
			zoneVignetteGauche.style.display = "none";
		});
	
		flecheSuivante.addEventListener('mouseenter', function() {
			zoneVignetteDroite.style.display = "flex";
		});
	
		flecheSuivante.addEventListener('mouseleave', function() {
			zoneVignetteDroite.style.display = "none";
		});
	}
	
	overlay();
	});
	
	/////////////////////////////////////////////////////////////////////////
	
	// Overlay des photos de photo-bloc.php
	
	function overlay() {
		// Apparition de l'overlay au survol
		const autresPhotos = document.querySelectorAll('.autres-photos');
	
		autresPhotos.forEach(element => {
			const overlay = element.querySelector('.survol-photo');
			const oeil = element.querySelector('.oeil');
			const divLienPhoto = element.querySelector('.lien-photo');
			const lienPhoto = divLienPhoto.innerHTML;
	
			// Début du survol
			
			element.addEventListener('mouseenter', function() {
				overlay.style.display = 'block';
			});
			// Fin du survol
			element.addEventListener('mouseleave', function() {
				overlay.style.display = 'none';
			});
	
			//////////////////////////
	
			// Clic sur l'oeil pour redirection de page
			oeil.addEventListener('click', function() {
				// Redirection vers la page de la photo
				window.location.href = lienPhoto;
			});
		});
	
		lightbox();
	}