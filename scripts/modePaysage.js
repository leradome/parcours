  function goToLandscape() {
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').then(function() {
          console.log('Orientation verrouillée en mode paysage');
           // document.getElementById('msg').textContent='Orientation verrouillée en mode paysage';
        }).catch(function(error) {
          console.error('Erreur lors du verrouillage de l\'orientation:', error);
                     // document.getElementById('msg').textContent='Erreur lors du verrouillage de l\'orientation: '+ error;

        });
      } else {
        console.error('L\'API Screen Orientation n\'est pas supportée par ce navigateur.');
                    //document.getElementById('msg').textContent='L\'API Screen Orientation n\'est pas supportée par ce navigateur.';

      }
    }