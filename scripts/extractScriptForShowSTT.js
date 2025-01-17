const DEBUG = false;
// ==================================================================================
// dépouillement script en liste de surtitres
function parseSrt(srtData) {
    const subtitleBlocks = srtData.trim().split('\n\n');
    var subtitles = subtitleBlocks.map(block => {
        const lines = block.split('\n');
        if (lines.length >= 3) {
            const index = parseInt(lines[0]);
            const times = lines[1].split(' --> ');
            const startTime = convertTime(times[0]);
            const endTime = convertTime(times[1]);
            const startTimeH = times[0];
            const endTimeH = times[1];
            const text = lines.slice(2).join('\n');
             if(DEBUG) {console.log(index)}
            // console.log(startTime + " - " + endTime)
             if(DEBUG) {console.log(text)}
            // console.log("--------")
            return { index, startTime, endTime, text, startTimeH,  endTimeH};
        } else {
            return null; // Ignore invalid subtitle blocks
        }
    }).filter(subtitle => subtitle !== null);
   // checkIfSTTisValid(subtitles)
    return subtitles;
}

// return time in secondes
function convertTime(timeStr) {
    const parts = timeStr.split(':');
    const secondsParts = parts[2].split(',');
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    const seconds = parseInt(secondsParts[0]);
    const milliseconds = parseInt(secondsParts[1]);
    return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
}

// return time in string
function convertTimeToTimeH(timeSec) {
    var value = timeSec / 60;
    const hours =  Math.floor(timeSec / 3600);
    const minutes = Math.floor((timeSec % 3600) / 60);
    const seconds = Math.floor(timeSec % 60);
    return minutes + ":" + seconds + "";
}
// ==================================================================================
// vérificateur de la validité du STT
function checkIfSTTisValid(subtitles) {
    console.log("TEST de validité du fichier SRT en cours ...")
    var compteur = 0;
    var posTest = 0;
    if (posTest < subtitles.length) {
        var currentTime = 0; 
        var p = 0
        function showSubtitle() {

            if (posTest < subtitles.length) {
                    
                const subtitle = subtitles[posTest];
                                            
                if (currentTime >= subtitle.startTime && currentTime < subtitle.startTime + 0.5) {
                    compteur++;
                }
               
                if (currentTime >= subtitle.endTime) { 
                    posTest++; 
                } 

                currentTime = currentTime + 0.5; 

            } else { if(p==0) {
                p++
                var msg = "";
                if (subtitles.length == compteur) {msg="BON";} else {msg="MAUVAIS"}
                console.log("TEST de validité du fichier SRT fini. Resultat : " + msg)
                console.log("nombre de STT attendu : " + subtitles.length )
                console.log("nombre de STT trouvé  : " + compteur )
            }
            }
        }
        if (posTest < subtitles.length) { setInterval(showSubtitle, 10);}
        
    }
}

// Affichage des surtitres
function displaySubtitlesSTT(subtitles, isDEMO, debPos, endPos) {
     posSTT = 0;             // position dans la liste des STTs
     currentTime = 0;        // temps actuel 

     let isPartialShowSTT = false;  // pour la lecture d'une des 3 salles
     debPos--;                      // Décalage de 1, car debPos commence à 1 (pas à 0)
     endPos--;                      // Décalage de 1, car endPos commence à 1 (pas à 0)
    
    // Vérification de la plage de sous-titres à afficher
    if (((debPos >= 0) && (endPos >= 0)) && (debPos < subtitles.length) && (endPos < subtitles.length)) {
        isPartialShowSTT = true;
        posSTT = debPos; // décalage de posSTT
        currentTime = subtitles[posSTT].startTime; // Si on est au début d'une plage partielle, on définit currentTime sur le startTime du sous-titre
    }

    // Si STTDiv existe dans ce HTML, on l'utilise
    if (!STTDiv) {
        console.error('STTDiv n\'a pas été trouvé !');
        return;
    }

    // Désactivation de l'animation CSS
    STTDiv.style.animation = 'none';

    // Fonction pour afficher les sous-titres
    function showSubtitle() {
        
        // Condition d'affichage : si le STT doit être affiché
        if ((!isPartialShowSTT && (posSTT < subtitles.length)) 
             || (isPartialShowSTT && (posSTT < endPos))) {
            const subtitle = subtitles[posSTT];

            // Affichage des informations et des boutons si nécessaire
            showInfo(subtitle, subtitles.length)
            showInfosBts();

            //console.log(posSTT + " - " + currentTime + " - " + subtitle.startTime + subtitle.endTime)

            // Affichage du texte du sous-titre si le temps actuel est dans la plage de sous-titres
            if (currentTime >= subtitle.startTime && currentTime < subtitle.startTime + 0.5) {
                console.log("=========== displaySubtitles : " + posSTT + " =============") 

                STTDiv.innerHTML = subtitle.text;
                checkAndAjustIfNeed();
            }

            // Vérification si le sous-titre est terminé et mise à jour
            if (currentTime >= subtitle.endTime) { 
                STTDiv.innerHTML = " ";
                posSTT++; 
            } 

            currentTime = currentTime + 0.5; // Incrémentation du temps de 0.5 seconde

            // Si on arrive à la fin de la liste et qu'on est en mode démo, on redémarre
            if (posSTT >= subtitles.length) { 
                if (isDEMO == true) {
                    posSTT = 0;
                    currentTime = 0;
                    console.log("RELANCE DEMO")
                } else {
                    showEnd();
                }
            } 
        }
    }

    setInterval(showSubtitle, 500); // Vérifie toutes les 500ms pour afficher les sous-titres suivants
} 
const SCRIPT_SRT = `
1
00:00:00,000 --> 00:00:37,000
<p class="noise">
(Bruits de pas,
sonnerie de téléphone, 
bruits ambiants, 
machine à écrire...)
</p>

2
00:00:38,000 --> 00:00:44,000
<p class="comment">
(Voix OFF Femme) 
</p>
Bienvenue dans le Bureau d’études 
du Râdome.

3
00:00:45,000 --> 00:00:51,000
Pour toute question, 
adressez-vous à l’ingénieur présent.

4
00:00:52,000 --> 00:01:02,000
<p class="noise">(Bruits de fond, machine à écrire)</p>

5
00:01:03,000 --> 00:01:06,500
Bonjour. 

6
00:01:13,000 --> 00:01:19,000
Bienvenue dans le bureau d’étude 
où une partie de ce projet 
hors norme a été conçue.

7
00:01:19,500 --> 00:01:22,500
Je vous avoue que le moment 
n’est pas le mieux choisi...

8
00:01:22,600 --> 00:01:26,000
D’ici quelques minutes, 
nous allons tenter d’établir,

9
00:01:26,100 --> 00:01:29,500
pour la première fois 
dans l’histoire,

10
00:01:29,600 --> 00:01:34,000
une liaison télévisuelle 
par satellite 
entre deux continents.

11
00:01:34,100 --> 00:01:37,500
Nous devons recevoir le signal 
depuis les États-Unis

12
00:01:37,700 --> 00:01:42,500
via le satellite Telstar 
qui a été mis en orbite hier...

13
00:01:42,600 --> 00:01:47,000
Cette grande boule blanche, 
est un Radôme :

14
00:01:47,500 --> 00:01:52,000
<p>« RA » pour RADAR.</p>
<p>« Dôme » pour dôme.</p>

15
00:01:52,500 --> 00:01:57,500
Il recouvre l’immense antenne que 
vous verrez tout à l’heure,

16
00:01:57,600 --> 00:02:01,000
pour la protéger des intempéries.

17
00:02:01,500 --> 00:02:07,000
L’antenne, qu’on surnomme 
« le cornet » ou « l'oreille », 
à cause de son apparence,

18
00:02:07,500 --> 00:02:12,000
est censée recevoir les signaux 
envoyés par les Américains.

19
00:02:12,500 --> 00:02:18,500
Je dis « censée » 
parce qu’on a fini la construction 
il y a à peine trois jours…

20
00:02:19,000 --> 00:02:24,000
Et on n’a pas encore pu vérifier 
si tout marche bien…

21
00:02:24,500 --> 00:02:27,500
<p class="noise">(Sonnerie de téléphone) </p>

22
00:02:28,000 --> 00:02:31,000
Excusez-moi, je dois répondre.
N’hésitez pas à être curieux,

23
00:02:31,500 --> 00:02:34,500
à vous balader, à regarder 
les documents qui trainent, 
à utiliser les téléphones…

24
00:02:35,000 --> 00:02:37,500
Vous trouverez plein de choses 
super intéressantes.

25
00:02:38,000 --> 00:02:39,500
Je reviens tout de suite.

26
00:02:40,000 --> 00:02:43,500
<p class="comment">(L'homme tourne le dos. 
Bruits de machine à écrire.)</p>

27
00:03:09,200 --> 00:03:14,330
<p class="noise">(Sonnerie de téléphone, 
machines à écrire.)</p>

28
00:03:22,000 --> 00:03:25,500
<p class="noise">(Bruits de pas.)</p>

29
00:03:33,000 --> 00:03:38,500
<p class="noise">(Conversations, sonneries 
de téléphone au loin, ou plus proche,
machines à écrire.)</p>

30
00:03:54,000 --> 00:03:57,000
On vient de recevoir un télex :

31
00:03:57,500 --> 00:04:02,000
le satellite TELSTAR 
a dérivé de son orbite et 
nous avons perdu son signal.

32
00:04:02,500 --> 00:04:07,000
Les Américains sont 
en train de nous envoyer 
ses nouvelles coordonnées

33
00:04:07,500 --> 00:04:10,000
pour qu’on puisse le retrouver.

34
00:04:10,500 --> 00:04:14,000
Je ne vous cache pas 
qu’on est un peu sous pression.

35
00:04:14,500 --> 00:04:16,500
Si leurs calculs sont faux,

36
00:04:17,000 --> 00:04:21,000
le 11 juillet 1962 
ne sera pas la date 
de la première transmission

37
00:04:21,500 --> 00:04:23,500
par satellite entre deux continents,

38
00:04:24,000 --> 00:04:28,500
mais celle du plus gros bide
de l’histoire 
des télécommunications.

39
00:04:29,000 --> 00:04:32,500
En plus de ça, 
on n’est pas les seuls sur le coup !

40
00:04:33,000 --> 00:04:37,000
Une autre antenne se trouve 
en Angleterre – à Goonhilly Downs –

41
00:04:37,500 --> 00:04:40,000
et ils essaient aussi 
de capter le signal...

42
00:04:40,500 --> 00:04:42,500
C’est un peu la course entre nous,

43
00:04:43,000 --> 00:04:47,500
mais il faut dire qu’on utilise 
pas du tout les mêmes technologies.

44
00:04:48,000 --> 00:04:52,500
Les Anglais utilisent 
une antenne parabolique qu’ils ont 
développé dans leur coin :

45
00:04:53,000 --> 00:04:55,000
très audacieux, mais risqué.

46
00:04:55,500 --> 00:05:00,000
Nous, on utilise 
une technologie américaine 
qui a déjà fait ses preuves :
l’antenne à cornet.

47
00:05:00,500 --> 00:05:05,000
Notre installation est 
la copie conforme 
de la station d’Andover 
dans l’État du MAINE.

48
00:05:05,500 --> 00:05:07,000
<p class="noise">(Sonnerie de téléphone)</p>

49
00:05:07,500 --> 00:05:09,000
Excusez-moi, je reviens.

50
00:05:09,500 --> 00:05:14,500
<p class="comment">(Il décroche et tourne le dos
Toujours mêmes bruits de fond)</p>

51
00:06:16,000 --> 00:06:18,000
<p class="comment">(Il raccroche)</p>

52
00:06:18,500 --> 00:06:21,000
La grande difficulté, dans ce projet,

53
00:06:21,500 --> 00:06:27,500
c’est que notre satellite 
tourne constamment et 
à très grande vitesse 
autour de la terre…

54
00:06:28,000 --> 00:06:30,000
Environ 24 000 Km/h

55
00:06:30,500 --> 00:06:36,000
et ses antennes doivent être 
parfaitement  alignées 
pour capter les signaux

56
00:06:36,500 --> 00:06:38,000
qu’on lui envoie...

57
00:06:38,500 --> 00:06:42,000
Vous pouvez imaginer 
la difficulté de l’opération…

58
00:06:42,500 --> 00:06:47,500
D’autant que la durée 
durant laquelle les antennes 
américaines et européennes

59
00:06:48,000 --> 00:06:52,500
voient simultanément le satellite 
est très courte, à peine 20 mn.

60
00:06:53,000 --> 00:06:55,500
Eh bien…, 
si ça ne vous ennuie pas,

61
00:06:56,000 --> 00:07:01,000
je vous invite à passer 
dans la salle de contrôle, 
juste à côté.

62
00:07:01,500 --> 00:07:05,000
Nous devons nous réunir 
avec mes collègues

63
00:07:05,500 --> 00:07:11,000
pour vérifier les calculs 
de la nouvelle trajectoire 
de Telstar.

64
00:07:11,500 --> 00:07:14,500
Merci beaucoup et à bientôt.

65
00:07:15,000 --> 00:07:19,500
<p class="comment">(Il se retourne 
après avoir incité 
à changer de pièce)</p>

66
00:07:34,500 --> 00:07:39,500
<p class="comment">(Voix OFF Femme)</p>
Bienvenue 
dans le centre de contrôle.

67
00:07:40,000 --> 00:07:44,000
C’est ici que nos techniciens 
vont contrôler la réception

68
00:07:44,500 --> 00:07:48,500
des données du satellite Telstar.

69
00:07:49,000 --> 00:07:54,000
Le lancement de la rotation 
de l’antenne est imminent.

70
00:07:54,500 --> 00:07:59,500
La première réception aura lieu 
dans quelques minutes

71
00:08:00,000 --> 00:08:05,000
<p class="comment">(Des voix résonnent en anglais 
dans des haut-parleurs)</p>

72
00:08:05,500 --> 00:08:07,000
<p class="comment">(1er dialogue)</p>

73
00:08:07,500 --> 00:08:09,500
- Vous avez les nouvelles 
coordonnées du satellite ?

74
00:08:10,000 --> 00:08:12,000
- Pas encore, on attend que 
les Américains les transmettent

75
00:08:12,500 --> 00:08:14,500
- Et les Anglais, ils en sont où ?

76
00:08:15,000 --> 00:08:17,000
- On sait pas du tout...

77
00:08:17,500 --> 00:08:19,500
- J’espère qu’ils ne vont pas
 nous passer devant…

78
00:08:22,000 --> 00:08:24,000
<p class="comment">(2ème dialogue)</p>

79
00:08:24,500 --> 00:08:26,500
<p class="stranger">-Can you get someone 
to the amplifier please?</p>

80
00:08:27,000 --> 00:08:29,000
-Non, personne n’est 
disponible pour l’instant.

81
00:08:29,500 --> 00:08:31,500
<p class="stranger">-There are 190 of us 
and we still lack people?</p>

82
00:08:32,000 --> 00:08:34,000
-Non, monsieur, on est 
au maximum des effectifs.

83
00:08:34,500 --> 00:08:36,500
Je vous envoie quelqu’un 
dès qu’un poste se libère.

84
00:08:38,000 --> 00:08:39,500
<p class="comment">(3ème dialogue)</p>

85
00:08:40,000 --> 00:08:41,500
-Le Radôme tient le coup ?

86
00:08:42,000 --> 00:08:43,500
-Pour l’instant oui : la température
 intérieure est bonne.

87
00:08:44,000 --> 00:08:46,000
<p>-Ok, pression extérieure ?</p>
<p>-4 millibars</p>

88
00:08:46,500 --> 00:08:48,000
-Parfait. Appelez-moi 
à la moindre modulation,

89
00:08:48,500 --> 00:08:50,000
s’il y a un jour où 
il ne faut pas qu’il nous tombe

90
00:08:50,500 --> 00:08:53,000
sur la tête, 
c’est bien aujourd’hui !

91
00:08:54,000 --> 00:08:55,500
<p class="comment">(4ème dialogue)</p>

92
00:08:56,000 --> 00:08:58,500
-Est-ce qu’on peut envoyer 
quelqu’un au maser s’il vous plait ?

93
00:08:59,000 --> 00:09:01,000
-Non, monsieur, notre équipe 
est déjà au complet.

94
00:09:01,500 --> 00:09:03,500
-On est 190 à travailler ici et 
y’a personne pour y aller ?

95
00:09:04,000 --> 00:09:06,000
-Je vais faire mon maximum 
pour trouver quelqu’un.

96
00:09:07,500 --> 00:09:09,000
<p class="comment">(Voix OFF Homme)</p>
-On a reçu

97
00:09:09,500 --> 00:09:12,000
les nouvelles coordonnées 
du satellite envoyé 
par les Américains.

98
00:09:12,500 --> 00:09:14,000
-Lancement de rotation 
de l’antenne !

99
00:09:14,500 --> 00:09:17,500
<p class="noise">(Bruit mécanique de rotation)</p>

100
00:09:18,000 --> 00:09:20,000
-Rotation de l’antenne lancée !

101
00:09:28,500 --> 00:09:30,000
<p class="noise">(Arrêt bruit de rotation. 
Sonnerie d’alerte se déclenche)</p>

102
00:09:30,500 --> 00:09:32,000
-L’antenne est immobilisée...

103
00:09:32,500 --> 00:09:34,000
C’est quoi le problème là, 
ça vient d’où ?

104
00:09:34,500 --> 00:09:36,500
-Les rouages sont 
complètement bloqués

105
00:09:37,000 --> 00:09:38,500
-Ça peut venir du moteur

106
00:09:39,000 --> 00:09:41,000
ou de quelque chose 
de bloqué dans les rouages.

107
00:09:42,000 --> 00:09:43,500
-On un problème 
avec un tube électronique.

108
00:09:44,000 --> 00:09:45,500
-Oui, oui nos équipes 
sont dessus.

109
00:09:47,000 --> 00:09:48,500
-Le moteur principal a lâché !!!

110
00:09:49,000 --> 00:09:51,500
Je répète, 
le moteur principal a lâché.

111
00:09:52,000 --> 00:09:54,500
-Il faut passer 
sur le moteur secondaire !!!

112
00:09:55,000 --> 00:09:57,500
Il faut que quelqu’un actionne 
la procédure de lancement.

113
00:09:58,000 --> 00:10:00,500
-Il faut appuyer 
sur le bouton clignotant 
à côté de l’écran de contrôle.

114
00:10:01,000 --> 00:10:02,500
<p class="noise">(Arrêt de la sonnerie d’alerte)</p>

115
00:10:03,000 --> 00:10:04,500
<p class="noise">(On entend à nouveau 
les bruits de rotation)</p>

116
00:10:05,000 --> 00:10:06,500
-C’est bon, 
On a déclenché

117
00:10:07,000 --> 00:10:09,000
le moteur secondaire 
depuis la salle des machines.

118
00:10:09,500 --> 00:10:11,000
-Moteur secondaire lancé !

119
00:10:12,000 --> 00:10:16,000
-Est-ce qu’on a encore le temps 
de capter le signal du satellite ?

120
00:10:16,500 --> 00:10:18,000
-Je ne sais pas du tout...

121
00:10:20,000 --> 00:10:22,000
<p class="noise">(Arrêt bruit de rotation) </p>

122
00:10:22,500 --> 00:10:24,500
-Mesdames, Messieurs,

123
00:10:25,000 --> 00:10:28,000
merci de vous rendre 
au centre de réception vidéo !

124
00:10:33,000 --> 00:10:39,500
<p class="noise">(La porte s’ouvre. Musique 
d’ambiance douce, envoutante.) </p>

125
00:10:40,000 --> 00:10:45,000
<p class="noise">(Son ondulation nous porte et nous 
fait voyager vers l’espace l’infini.) </p>

126
00:11:08,000 --> 00:11:10,000
<p class="comment">(Voix d'homme) </p>
Mesdames, Messieurs,

127
00:11:11,000 --> 00:11:13,500
le Ministère 
des Postes et Télécommunications 
est heureux de vous accueillir

128
00:11:14,000 --> 00:11:17,000
à la station télécommunication 
spatiale de Pleumeur-Bodou.

129
00:11:17,500 --> 00:11:20,000
<p class="noise">(Douce musique 
d’ambiance envoutante. )</p>

130
00:13:02,000 --> 00:13:03,500
<p class="comment">(Voix OFF Femme)</p>

131
00:13:04,000 --> 00:13:10,000
Veuillez-vous diriger
vers le centre de visionnage.

132
00:14:07,000 --> 00:14:11,500
<p class="noise">(Voix au loin 
d’une transmission qui résonne)</p>

133
00:14:43,000 --> 00:14:45,500
<p class="noise">(La musique d’ambiance s’arrête)</p>

134
00:14:46,000 --> 00:14:47,000
<p class="comment">(Voix OFF Homme)</p>

135
00:14:47,500 --> 00:14:49,000
-Est-ce qu’on reçoit le signal ?

136
00:14:49,500 --> 00:14:51,000
-rien pour l’instant.

137
00:14:51,500 --> 00:14:54,000
-Et les Anglais, 
ils ont réussi à l’intercepter ?

138
00:14:54,500 --> 00:14:57,000
<p>-Non plus</p>
<p>-Pourtant le satellite est bien là ?</p>

139
00:14:57,500 --> 00:14:59,500
-Oui monsieur… 
Mais on ne reçoit rien.

140
00:15:00,000 --> 00:15:02,000
-Est-ce que quelqu’un 
a quelque chose ?

141
00:15:02,500 --> 00:15:04,000
-Non monsieur, 
rien pour le moment.

142
00:15:04,500 --> 00:15:06,500
-Allez, allez, allez… 
allez…

143
00:15:07,000 --> 00:15:09,000
-On devrait l’avoir en ligne 
de mire d’ici quelques secondes.

144
00:15:09,500 --> 00:15:12,000
-Allez mon p’tit satellite, 
ne nous lâche pas maintenant…
come on…

145
00:15:12,500 --> 00:15:14,000
-Allez allez, allez vas-y…

146
00:15:14,500 --> 00:15:17,000
-Ca va marcher, 
on va le capter ce signal…

147
00:15:17,500 --> 00:15:19,000
-Oh Jesus…

148
00:15:19,500 --> 00:15:21,500
<p class="comment">(Musique d’ambiance claire, 
douce et lumineuse.)</p>

149
00:15:22,000 --> 00:15:23,500
<p class="comment">(Des images sont transmises 
sur les écrans.)</p>

150
00:15:24,000 --> 00:15:25,000
<p class="comment">(Voix OFF Homme)</p>

151
00:15:25,500 --> 00:15:26,500
-Hey oh les gars, 
on a quelque chose !

152
00:15:27,000 --> 00:15:28,500
-On a une image !

153
00:15:29,000 --> 00:15:32,000
<p class="comment">(Voix OFF Femme) </p>
-On est en direct 
avec les Etats-Unis !

154
00:15:32,500 --> 00:15:34,000
<p class="noise">(Applaudissements)</p>

155
00:15:34,500 --> 00:15:36,000
-Mesdames, messieurs,

156
00:15:36,500 --> 00:15:39,500
nous regardons 
les 1ères images retransmises 
en direct par satellite !

157
00:15:40,000 --> 00:15:42,500
-Félicitation les gars, 
on l’a fait ! C’est génial !

158
00:15:43,000 --> 00:15:45,500
<p>-Ca marche !</p>
<p>-Oh ça marche, ça marche !</p>

159
00:15:46,000 --> 00:15:47,000
-Bravo !

160
00:15:47,500 --> 00:15:49,500
-Je vous l’avais dit 
qu’on y arriverait ! Quel succès !

161
00:15:50,000 --> 00:15:52,500
-Ca marche !
<p class="stranger">Congratulation ! congratulation !</p>

162
00:15:53,000 --> 00:15:55,500
<p>-Oh c’est génial !</p>
<p>-Ca marche !</p>
<p>-C’est une première mondiale !!!</p>

163
00:15:56,000 --> 00:15:58,000
-Allez les gars, 
on ne va pas rater ça,

164
00:15:58,500 --> 00:16:01,500
Il faut immortaliser ce moment.
Tout le monde en place pour la photo.

165
00:16:02,000 --> 00:16:04,000
Vous aussi… 
Mettez-vous bien devant l’appareil.

166
00:16:04,500 --> 00:16:07,000
<p>-Tiens, viens prêt de moi.</p>
<p>-Oui resserrez-vous sur la gauche.</p>

167
00:16:07,500 --> 00:16:09,500
<p>-Viens là.</p>
<p>-Tout le monde est prêt.</p>

168
00:16:10,000 --> 00:16:12,500
<p>-Ouais, comme ça là ?</p>
<p>-Souriez...  Trois ? deux, un …</p>

169
00:16:13,000 --> 00:16:15,000
<p class="noise">(bruit d’appareil photo)</p>
<p class="noise">(Flash lumineux de la prise de photo)</p>

170
00:16:15,500 --> 00:16:18,000
-C’est, c’est incroyable 
ce qu’il se passe…

171
00:16:18,500 --> 00:16:22,000
Non mais regarde ce qu’on a fait ! 
C’est une première dans l’histoire.

172
00:16:22,500 --> 00:16:25,000
Tu imagines le potentiel 
que ça représente !

173
00:16:25,500 --> 00:16:28,000
Ce qu’on pourra faire avec 
dans quelques années.

174
00:16:28,500 --> 00:16:30,500
J’ose à peine imaginer…

175
00:16:40,500 --> 00:16:45,000
<p class="noise">(Musique d’ambiance de plus en plus 
majestueuse, et dynamique)</p>

176
00:16:45,500 --> 00:16:55,500
Sous la voute du dôme, 
des images défilent 
au rythme du temps et de l’histoire…

177
00:17:00,000 --> 00:18:00,000
--- FIN DU SURTITRAGE ---

`