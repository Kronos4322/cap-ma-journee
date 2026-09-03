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
- **Rappels à l'heure** : notification quand une tâche a une heure (option « advance » possible dans le code).
- **Réveil / alarmes** : plusieurs alarmes récurrentes (jours de la semaine), écran plein écran qui sonne + vibre, bouton « Rappel dans 5 min ».
- **Alarme sur une tâche** : une tâche importante peut déclencher le réveil plein écran à son heure.
- **Tâches répétées** : chaque jour / jours ouvrés / chaque semaine (la suivante se recrée à la validation).
- **Report automatique** : le matin, les tâches non faites de la veille passent à aujourd'hui.
- **Minuteur Focus (Pomodoro)** : 25/5 réglable, longue pause toutes les 4 sessions, garde l'écran allumé, compte les pomodoros par tâche.
- **Sous-tâches**, **notes**, **dupliquer**, **repousser à demain** ou **à une date précise**.
- **Annuler** une suppression de tâche (bouton dans la notification en bas).
- **Export calendrier (.ics)** par tâche : pour un rappel système fiable même app fermée (utile sur iPhone).
- **Actions dans les notifications de rappel** : « ✓ Terminer » / « ⏰ +10 min » sans ouvrir l'app.
- **Séries (streak)** 🔥 : jours consécutifs terminés à 100 %, avec record.
- **Stats** : graphe des 14 derniers jours, répartition par priorité, totaux (tâches faites, pomodoros).
- **Confettis + son** quand la journée atteint 100 %.
- **Thème clair / sombre / automatique**, **vibrations**, **sons** réglables.
- **Sauvegarde** : export / import d'un fichier `.json`, et « tout effacer ».
- Vue **Semaine** : les 14 prochains jours.

---

## Mettre l'app sur le téléphone

L'app est un site statique (`index.html` + quelques fichiers). Il faut la servir en HTTP(S) pour pouvoir l'« installer ». Trois options, de la plus simple à la plus autonome.

### Option A - Hébergement gratuit en 2 minutes (recommandé)
1. Va sur **https://app.netlify.com/drop**.
2. Glisse-dépose **tout le dossier `TO DO LIST`** dans la page.
3. Netlify donne une URL du type `https://truc-machin.netlify.app`.
4. Ouvre cette URL sur le téléphone :
   - **Android / Chrome** : menu ⋮ → *Ajouter à l'écran d'accueil* (ou une bannière « Installer »).
   - **iPhone / Safari** : bouton *Partager* → *Sur l'écran d'accueil*.
5. L'icône apparaît comme une vraie app, en plein écran, et marche hors-ligne.

> GitHub Pages, Cloudflare Pages ou Vercel font pareil si tu préfères.

### Option B - Depuis ton PC, sur le même Wi-Fi
```bash
cd "C:\Users\CaMiL\Desktop\PROGRAMMES APPLICATIONS CLAUDE\TO DO LIST"
python -m http.server 4173
```
Trouve l'IP locale du PC (`ipconfig` → « Adresse IPv4 », ex. `192.168.1.20`), puis sur le téléphone ouvre `http://192.168.1.20:4173`.
Limite : les notifications/alarmes en arrière-plan sont fiables seulement en HTTPS ; le PC doit rester allumé.

### Option C - Ouvrir le fichier directement
Tu peux copier `index.html` sur le téléphone et l'ouvrir : la to-do list, les stats et le minuteur marchent.
En revanche l'installation « écran d'accueil », le mode hors-ligne géré et les notifications système ne sont pas garantis en `file://`. Préfère l'option A.

### Option D - Vraie app Android (.apk / Play Store)
Une fois l'app en ligne (option A), va sur **https://www.pwabuilder.com**, colle l'URL, et génère un paquet Android (TWA). Tu obtiens un `.apk` installable ou un `.aab` pour le Play Store.
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

## Sauvegarde des données
Les données vivent dans le `localStorage` du navigateur où l'app est installée.
Pense à faire **Réglages → Sauvegarde → Exporter** de temps en temps, surtout avant de changer de téléphone ou de vider le cache.
