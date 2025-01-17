
// Vérifie si l'API Fullscreen est disponible dans le navigateur
function isFullscreenSupported() {
    return document.fullscreenEnabled || 
           document.webkitFullscreenEnabled || 
           document.mozFullScreenEnabled || 
           document.msFullscreenEnabled;
}
function FS(action) {
    var bodyElement = document.body;
    if (isFullscreen()) {
    console.log("Le document est en mode plein écran.");
    exitFullscreen();
} else {
    console.log("Le document n'est pas en mode plein écran.");
        requestFullscreen(bodyElement);
}

}
// Vérifier si le document est en mode plein écran
function isFullscreen() {
    let etat =  document.fullscreenElement || 
           document.webkitFullscreenElement || 
           document.mozFullScreenElement || 
           document.msFullscreenElement;
    var bt = document.getElementById('idPE');
        bt.textContent = "quitter plein ecran";

    if (etat == true) {
        bt.textContent = "quitter plein ecran"
    } else {
        bt.textContent= "plein ecran"
    }
    return etat;
}
// Fonction pour quitter le mode plein écran
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

// Exemple d'utilisation : 
// Appeler cette fonction lorsque vous souhaitez quitter le mode plein écran

// Active le mode plein écran pour un élément donné
function requestFullscreen(element) {
    console.log("requestFullscreen");
    // var msg = document.getElementById('msg');
    var bt = document.getElementById('idPE');

    // msg.textContent = "fonction requestFullscreen : isFullscreenSupported ? " + isFullscreenSupported();

    if (element.requestFullscreen) {
            console.log("requestFullscreen");
// msg.text = "requestFullscreen";
        element.requestFullscreen();
       if(bt) { bt.textContent = "quitter plein ecran";}


    } else if (element.webkitRequestFullscreen) {
            console.log("webkitRequestFullscreen");

        element.webkitRequestFullscreen();
        if(bt) { bt.textContent = "quitter plein ecran";}

    } else if (element.mozRequestFullScreen) {
            console.log("mozRequestFullScreen");

        element.mozRequestFullScreen();
        if(bt) { bt.textContent = "quitter plein ecran";}

    } else if (element.msRequestFullscreen) {
            console.log("msRequestFullscreen");

        element.msRequestFullscreen();
        if(bt) {bt.textContent = "quitter plein ecran";}

    }
}

// Désactive le mode plein écran
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}