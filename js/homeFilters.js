document.addEventListener("DOMContentLoaded", function() {

    // Gestion de l'ouverture et de la fermeture des menus déroulants
    function menuDeroulant(menuId, optionsId) {
        const menu = document.getElementById(menuId);
        const options = document.getElementById(optionsId);
        const fleche = menu.querySelector(".menu-fleche");
        const blocCache = menu.querySelector(".cache");
        const blocVisible = menu.querySelector(".visible");

        fleche.addEventListener("click", function() {
            // Si le menu est déjà ouvert au clic
            if (options.style.display === "block") {
                options.style.display = "none";
                menu.style.borderRadius = "8px";
                menu.classList.remove("menu-ouvert");
                fleche.classList.remove("rotation");
                options.classList.remove("apparition");
                blocCache.style.display = "none";
                blocVisible.style.display = "block";
            } else {
                // Si le menu est fermé au clic
                options.style.display = "block";
                menu.style.borderRadius = "8px 8px 0 0";
                menu.classList.add("menu-ouvert");
                fleche.classList.add("rotation");
                options.classList.add("apparition");
                blocCache.style.display = "block";
                blocVisible.style.display = "none";
            }
        });
    }

    // Appels de la fonction pour chaque menu déroulant
    menuDeroulant("categorie-titre", "categorie-options");
    menuDeroulant("format-titre", "format-options");
    menuDeroulant("tri-titre", "tri-options");

    //////////////////////////////////////////////////////////////////

    // Gestion de l'option sélectionnée

    function choixOption(titreId, optionsId, titreAModifier) {
        const options = document.getElementById(optionsId);
        const choixPossibles = options.querySelectorAll(".menu-option");

        // Ajout d'une class pour le dernier élément afin de gérer le border radius
        choixPossibles[choixPossibles.length - 1].classList.add("dernier");

        choixPossibles.forEach(function(option, index) {
            option.addEventListener("click", function() {
                // Récupération du titre de l'élément pour le passer en titre de menu déroulant
                titreAModifier.textContent = option.textContent;

                // Suppression des class ajoutées aux précédents clics
                choixPossibles.forEach(function(choix) {
                    choix.classList.remove("selectionne");
                    choix.classList.remove("dernier-selectionne");
                });

                // Ajout de la class pour l'élément sélectionné
                option.classList.add("selectionne");

                // Si c'est le dernier élément de la liste, la class est différente afin d'intégrer un border radius
                if (index === choixPossibles.length - 1) {
                    option.classList.add("dernier-selectionne");
                }
            });
        });
    }

    // Définition de l'emplacement du titre à mettre à jour
    const categorieZone = document.querySelector("#categorie-titre .menu-titre");
    const formatZone = document.querySelector("#format-titre .menu-titre");
    const triZone = document.querySelector("#tri-titre .menu-titre");

    // Appels de la fonction pour chaque menu déroulant
    choixOption("categorie-titre", "categorie-options", categorieZone);
    choixOption("format-titre", "format-options", formatZone);
    choixOption("tri-titre", "tri-options", triZone);


////////////////////////////////////////////////////////////////////

    // Gestion du système de filtrage des photos

    const elementsCategorie = document.querySelectorAll("#categorie-options .menu-option");
    const elementsFormat = document.querySelectorAll("#format-options .menu-option");
    const elementsTri = document.querySelectorAll("#tri-options .menu-option");
    const zoneLesPhotos = document.querySelector(".zone-les-photos");
    const boutonChargerPlus = document.getElementById("charger-plus");

    // Définition des valeurs par défaut
    let categorieChangee = 'all';
    let formatChange = 'all';
    let triChange = 'ASC';

    // Création d'une fonction pour la gestion du bouton charger plus en cas de filtrage avant son utilisation
    function surveillerChargerPlus() {
        var nombrePhotos = zoneLesPhotos.querySelectorAll('.autres-photos').length;
        if (nombrePhotos < 8) {
            boutonChargerPlus.style.display = "none";
        }
        if (nombrePhotos >= 8) {
            boutonChargerPlus.style.display = "block";
        }
    }

    // Détection de l'élément sélectionné dans "Catégories" et filtrage en fonction de l'ID de l'élément
    elementsCategorie.forEach(function(element) {
        element.addEventListener("click", function() {
            categorieChangee = element.id;
            miseAJourPhotos(categorieChangee, formatChange, triChange);
        });
    });

    // Détection de l'élément sélectionné dans "Formats" et filtrage en fonction de l'ID de l'élément
    elementsFormat.forEach(function(element) {
        element.addEventListener("click", function() {
            formatChange = element.id;
            miseAJourPhotos(categorieChangee, formatChange, triChange);
        });
    });

    // Détection de l'élément sélectionné dans "Trier par" et filtrage en fonction de l'ID de l'élément
    elementsTri.forEach(function(element) {
        element.addEventListener("click", function() {
            triChange = element.id;
            miseAJourPhotos(categorieChangee, formatChange, triChange);
        });
    });

    // Fonction de mise à jour des photos
    function miseAJourPhotos(category, format, order) {
        // Envoyer une requête AJAX pour récupérer les photos filtrées
        jQuery.ajax({
            url: myAjax.ajaxurl,
            type: 'POST',
            data: {
                action: 'filtrer_photos',
                category: category,
                format: format,
                order: order,
                // Ajout du nonce de sécurité
                nonce: myAjax.nonce
            },
            success: function(response) {
                zoneLesPhotos.innerHTML = response;
                // Si le nouveau contenu dispose de moins de 8 photos, alors le bouton charger plus disparaît
                surveillerChargerPlus();
                // L'overlay de chaque photo se charge à chaque requête
                overlay();
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    ////////////////////////////////////////////////////////////////////

    // Gestion du reset du filtre au clic sur la case vide

    const categorieVide = document.getElementById("categorie-vide");
    const formatVide = document.getElementById("format-vide");
    const triVide = document.getElementById("tri-vide");

    // Filtre Catégorie
    categorieVide.addEventListener("click", function() {
        categorieChangee = 'all';
        elementsCategorie.forEach(element => {element.classList.remove("selectionne")});
        elementsCategorie.forEach(element => {element.classList.remove("dernier-selectionne")});
        miseAJourPhotos(categorieChangee, formatChange, triChange);
        categorieZone.textContent = "Catégories";
    });

    // Filtre Format
    formatVide.addEventListener("click", function() {
        formatChange = 'all';
        elementsFormat.forEach(element => {element.classList.remove("selectionne")});
        elementsFormat.forEach(element => {element.classList.remove("dernier-selectionne")});
        miseAJourPhotos(categorieChangee, formatChange, triChange);
        formatZone.textContent = "Formats";
    });

    // Filtre Trier par
    triVide.addEventListener("click", function() {
        triChange = 'ASC';
        elementsTri.forEach(element => {element.classList.remove("selectionne")});
        elementsTri.forEach(element => {element.classList.remove("dernier-selectionne")});
        miseAJourPhotos(categorieChangee, formatChange, triChange);
        triZone.textContent = "Trier par";
    });
});