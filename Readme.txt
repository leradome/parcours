Readme.txt

todo :
-------

4 dialogues : afficher sur 2 STT ?
on peut réunir certains 2 stt en un seul
dès les 4 dialogues, le reste s'enchaine trop rapidement
mettre les 3 points d'attente pour grand moment de silence
langue etrangere (vert) pas du tout lisible, prendre une autre couleur pour un bon contraste
-----------

- vérifier le STT avec la balise <p></p> car j'ai l'impression que la mise en forme diffère
- revoir WebVTT
---------

- comment faire en sorte de réutiliser le code HTML identique pour les 3 ?
	- forcer l'affichage plein écran 
	- forcer le mode paysage si lunettes / le mode portrait si smartphone
	- traitement extraction script
	- peut etre autre traitement

- scriptSTTOfficiel :
	- pourquoi on n'a plus de code couleur dans le texte ?
	

choix lunettes/smartphones :
----------------------------

- prévoir une page pour choisir si c'est pour le smartphone ou pour les lunettes connectées. 
la différence réside dans la taille de l'écran, sa résolution et donc le choix de la taille de caractères.

	- lunettes connectées :
		- STT/defil texte : 
			- zone d'affichage en bas et taille
			- taille de caracteres par défaut à 24

		- avatar LSF :
			- rendre positionnable la video

	- smartphone :
		- STT : pas interessant
		- defilement texte : 
			- ok affichage en plein écran 
			- et choix taille caractères
		- Avatar LSF :
			- affichage en plein écran

Paramètres : 
--------------
	- au clic configuration :
		- cas STT: 
			- ouvre la meme page que "lancer la visite" mais avec l'option test pour choisir les réglages qui restent visibles, et le script texte simplifié en continu et non pas en attente
		- cas Avatar: 
			- expliquer la posibilité de mettre en plein écran 
			- et choix de la taille vidéo