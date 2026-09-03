# Cap - Ma Journée

Une to-do list du jour, belle et simple, installable sur ton téléphone (PWA).
Elle fonctionne **hors-ligne** et **sans compte** : toutes les données restent sur l'appareil.

---

## Ce que fait l'app

### L'essentiel demandé
- **Objectifs de la journée** : ajout ultra-rapide, une ligne « objectif principal du jour ».
- **Taux de réussite** : anneau de progression du jour + moyennes 7 jours et 30 jours.
- **Classement par couleur** :
  - 🟢 **Vert** : pas urgent
  - 🟠 **Orange** : à traiter
  - 🔴 **Rouge** : urgent
  Les tâches sont triées automatiquement (rouge en haut) et bordées de leur couleur.

### Les fonctionnalités en plus (repérées sur les meilleures apps 2026)
- **Rappels à l'heure** : notification quand une tâche a une heure. Étiquette orange si l'échéance approche, rouge au-delà de 15 min de retard.
- **Réveil / alarmes** : plusieurs alarmes récurrentes (jours de la semaine), écran plein écran qui sonne + vibre, bouton « Rappel dans 5 min ». Plein écran seulement si l'alarme est à l'heure (±5 min) ; sinon simple notification « alarme manquée ».
- **Alarme sur une tâche** : une tâche importante peut déclencher le réveil plein écran à son heure.
- **Tâches répétées** : chaque jour / jours ouvrés / chaque semaine (la suivante se recrée à la validation, jamais dans le passé).
- **Report automatique** : le matin, les tâches non faites de la veille passent à aujourd'hui.
- **Minuteur Focus (Pomodoro)** : 25/5 réglable, longue pause toutes les 4 sessions, garde l'écran allumé, compte les pomodoros par tâche. Reste juste même écran verrouillé (basé sur l'horloge réelle).
- **Titre modifiable**, **sous-tâches**, **notes**, **dupliquer**, **repousser à demain** ou **à une date précise**.
- **Ajout par jour** directement depuis la vue Semaine.
- **Annuler** une suppression de tâche (bouton dans la notification en bas).
- **Export calendrier (.ics)** par tâche : pour un rappel système fiable même app fermée (utile sur iPhone).
- **Actions dans les notifications de rappel** : « ✓ Terminer » / « ⏰ +10 min » sans ouvrir l'app.
- **Séries (streak)** 🔥 : jours consécutifs terminés à 100 %, avec record.
- **Stats** : graphe des 14 derniers jours (valeur affichée, vert à 100 %), répartition par priorité, totaux (tâches faites, pomodoros).
- **Confettis + son** quand la journée atteint 100 %.
- **Thème clair / sombre / automatique**, **vibrations**, **sons** réglables.
- **Points de restauration** internes : instantanés de l'app (auto quotidien + avant effacement/restauration), restaurables en un tap, aucun fichier.
- **Protection anti-effacement** (stockage persistant) et **export/import fichier** pour changer de téléphone.
- **Installation** : bouton dédié dans les réglages (Android) ou instructions (iPhone), + bannière d'accueil.
- Vue **Semaine** : les 7 prochains jours + les tâches planifiées au-delà.

---

## Mettre l'app sur le téléphone

L'app est un site statique (`index.html` + quelques fichiers). Il faut la servir en HTTP(S) pour pouvoir l'« installer ».

### En ligne (déjà en place — GitHub Pages)

- **App :** https://kronos4322.github.io/cap-ma-journee/
- **Code :** https://github.com/Kronos4322/cap-ma-journee

Installer sur le téléphone : ouvre l'URL de l'app puis
- **Android / Chrome** : menu ⋮ → *Ajouter à l'écran d'accueil* (ou la bannière « Installer ») ;
- **iPhone / Safari** (pas Chrome iOS) : bouton *Partager* → *Sur l'écran d'accueil*.

L'icône apparaît comme une vraie app, en plein écran, et marche hors-ligne.

**Mettre à jour l'app en ligne :**
```bash
cd "C:\Users\CaMiL\Desktop\PROGRAMMES APPLICATIONS CLAUDE\TO DO LIST"
git add -A && git commit -m "maj" && git push
```
GitHub reconstruit la page en ~30 s. Pense à incrémenter `CACHE` dans `sw.js` (`cap-v3` → `cap-v4`…) pour que la bannière « Nouvelle version » s'affiche sur les téléphones déjà équipés.

### Variante - Depuis ton PC, sur le même Wi-Fi
```bash
cd "C:\Users\CaMiL\Desktop\PROGRAMMES APPLICATIONS CLAUDE\TO DO LIST"
python -m http.server 4173
```
Trouve l'IP locale du PC (`ipconfig` → « Adresse IPv4 », ex. `192.168.1.20`), puis sur le téléphone ouvre `http://192.168.1.20:4173`.
Limite : les notifications/alarmes en arrière-plan sont fiables seulement en HTTPS ; le PC doit rester allumé.

### Variante - Ouvrir le fichier directement
Tu peux copier `index.html` sur le téléphone et l'ouvrir : la to-do list, les stats et le minuteur marchent.
En revanche l'installation « écran d'accueil », le mode hors-ligne géré et les notifications système ne sont pas garantis en `file://`. Préfère l'URL en ligne.

### Variante - Vraie app Android (.apk / Play Store)
Va sur **https://www.pwabuilder.com**, colle l'URL `https://kronos4322.github.io/cap-ma-journee/`, et génère un paquet Android (TWA). Tu obtiens un `.apk` installable ou un `.aab` pour le Play Store.
Utile si tu veux une icône « application » officielle et un comportement un peu meilleur en arrière-plan. Sur **iPhone**, il n'y a pas d'équivalent gratuit : l'ajout à l'écran d'accueil (option A) est la seule voie, et les alarmes app fermée resteront bridées quoi qu'il arrive.

---

## Bon à savoir sur les rappels
Une app web **ne peut pas** réveiller le téléphone quand elle est complètement fermée (limite iOS surtout, mais aussi Android). C'est une limite du web, pas un bug.

Pour une fiabilité correcte :
- garde l'app ouverte en arrière-plan (onglet ou PWA installée) ;
- autorise les notifications (Réglages → *Notifications* → *Activer*) ;
- sur Android, l'installation PWA aide nettement.

Rattrapage à la réouverture :
- **rappels de tâches** : rattrapés jusqu'à 12 h après l'heure prévue ;
- **alarmes de réveil** : rattrapées jusqu'à 1 h après l'heure prévue (au-delà, une alarme n'a plus de sens).

**Pour un rappel vraiment fiable app fermée** (surtout iPhone) : ouvre les détails de la tâche → **📅 Calendrier**, et ajoute l'événement à ton agenda. Là, c'est le système qui gère la notification.

---

## Fichiers
| Fichier | Rôle |
|---|---|
| `index.html` | Toute l'app (interface + logique, autonome) |
| `manifest.json` | Déclaration PWA (nom, icônes, couleurs) |
| `sw.js` | Service worker : cache hors-ligne + clic sur notification |
| `icon-*.png`, `apple-touch-icon.png`, `favicon-32.png` | Icônes |
| `make_icons.py` | Régénère les icônes (`python make_icons.py`) |
| `.claude/launch.json` | Config de prévisualisation locale |

## Installer sur le téléphone
Depuis l'app : **Réglages → Installer sur le téléphone**.
- **Android / Chrome** : bouton « Installer » (ou la bannière en haut de la vue Aujourd'hui).
- **iPhone / Safari** : bouton *Partager* ⬆︎ → *Sur l'écran d'accueil* (rappel affiché dans les réglages).

## Ne pas perdre ses données

Tout est stocké **dans l'application, sur l'appareil** (`localStorage`). Ça survit aux mises à jour de l'app, mais pas au vidage du cache navigateur ni à un changement de téléphone.

**Points de restauration** (Réglages) — sauvegarde interne, aucun fichier ne sort :
- **＋ Enregistrer maintenant** crée un instantané de l'état complet.
- Un point est créé **automatiquement chaque jour**, et **avant chaque restauration ou effacement**.
- La liste montre date, nombre de tâches et type (auto / manuel / avant effacement…). **Restaurer** remplace l'état actuel (un point de sécurité est pris juste avant).
- « Tout effacer » garde les points → on peut annuler un effacement.
- Jusqu'à 12 points conservés (les auto sont supprimés en premier).

**Protéger de l'effacement** (Réglages) : `navigator.storage.persist()` — demande au navigateur de ne pas vider les données (souvent accordé quand l'app est installée).

**Changer de téléphone** (Réglages) : *Exporter un fichier* `.json` puis *Importer un fichier* sur l'autre appareil. C'est la seule opération qui produit un fichier.
