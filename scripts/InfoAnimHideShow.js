// script.js

let timer;
let isTimerActive = false;

const fadeOutTime = 2000; // time for fade out in ms
const inactiveTime = 5000; // time before starting fade out in ms

const infoDiv = document.getElementById('infoSTTH');
const timingDiv = document.getElementById('timingSTTH');

function resetTimer() {
    //console.log("eventListener détecté. Infos apparait pour " + inactiveTime + " ms")
    if (isTimerActive) {
        clearTimeout(timer);
    } else {
        isTimerActive = true;
        actionShowDivs(isTimerActive);
    }

    timer = setTimeout(() => {
        isTimerActive = false;
        actionShowDivs(isTimerActive);
    }, inactiveTime);
}

function resetOnLoad() {
    //console.log("infos will be hidden in " + inactiveTime + " ms")
    
}

document.addEventListener('DOMContentLoaded', () => {
    //console.log("addEventListener mousemove and keydown")
    resetTimer();
    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('keydown', resetTimer);
});

function actionShowDivs(show){console.log("actionShowDivs " + show)
    infoDiv.hidden = !show;
    timingDiv.hidden = !show;
    // if(infoDiv.style.display == "none") {
    //     infoDiv.style.display = "inline-block";
    //     timingDiv.style.display = "inline-block";
    // } else {
    //     infoDiv.style.display = "none";
    //     timingDiv.style.display = "none";
    // }
    afficheBTNS(show)
}
function afficheBTNS(show) {
    afficheBTNSPolice(show)
    //afficheBTNSOthers(show)
}
function afficheBTNSPolice(show) {//console.log("afficheBTNS " + show)
    document.getElementById("button-container").hidden = !show;
    if(document.getElementById("police").style.display == "none") {
        document.getElementById("police").style.display = "inline-block";
        document.getElementById("police1").style.display = "inline-block";
        document.getElementById("police2").style.display = "inline-block";
    } else {
        document.getElementById("police").style.display = "none";
        document.getElementById("police1").style.display = "none";
        document.getElementById("police2").style.display = "none";
    }
}
// function afficheBTNSOthers(show) {//console.log("afficheBTNS " + show)
//     document.getElementById("button-container").hidden = !show;
//     if(document.getElementById("largeur").style.display == "none") {
//         document.getElementById("largeur").style.display = "inline-block";
//         document.getElementById("largeur1").style.display = "inline-block";
//         document.getElementById("largeur2").style.display = "inline-block";
//         document.getElementById("hauteur").style.display = "inline-block";
//         document.getElementById("hauteur1").style.display = "inline-block";
//         document.getElementById("hauteur2").style.display = "inline-block";
//         document.getElementById("police").style.display = "inline-block";
//         //if(document.getElementById("idbtns")) {document.getElementById("idbtns").textContent = "cacher boutons";}
//         if(document.getElementById("vitesse")) {document.getElementById("vitesse").style.display = "inline-block";}
//         if(document.getElementById("vitesse1")) {document.getElementById("vitesse1").style.display = "inline-block";}
//         if(document.getElementById("vitesse2")) {document.getElementById("vitesse2").style.display = "inline-block";}
//     } else {
//         document.getElementById("largeur").style.display = "none";
//         document.getElementById("largeur1").style.display = "none";
//         document.getElementById("largeur2").style.display = "none";
//         document.getElementById("hauteur").style.display = "none";
//         document.getElementById("hauteur1").style.display = "none";
//         document.getElementById("hauteur2").style.display = "none";
//         //if(document.getElementById("idbtns")) {document.getElementById("idbtns").textContent = "afficher boutons";}
//         if(document.getElementById("vitesse")) {document.getElementById("vitesse").style.display = "none";}
//         if(document.getElementById("vitesse1")) {document.getElementById("vitesse1").style.display = "none";}
//         if(document.getElementById("vitesse2")) {document.getElementById("vitesse2").style.display = "none";}
//     }
// }