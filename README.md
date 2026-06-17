# Application apprenant PPEP

Ce dossier contient le socle apprenant MVP :

- Lot 1 : acces apprenant minimal, activation manuelle et reprise de parcours.
- Lot 2 : gabarit de module guide, auto-evaluation courte, validation declarative et deblocage progressif.
- Lot 3 : parcours coeur alimente par les supports source, video de depart rassurante et fiches imprimables contextualisees.

## Demarrer localement

```bash
npm start
```

Par defaut, l'application ecoute sur `http://localhost:3000` et stocke les donnees dans `app/data/learners.json`.

La page publique de vente est servie directement à l'adresse racine, par exemple `http://localhost:3000`. L'ancienne adresse `/vente` reste disponible comme alias, et la connexion apprenant reste sur `/login`.

## Activer un apprenant

```bash
node src/admin-cli.js activate --email lea@example.com --password "mot-de-passe-test" --plan autonome --access-ends-at 2026-12-31
```

Parametres utiles :

- `--email` : identifiant personnel de l'apprenant.
- `--password` : mot de passe initial, 8 caracteres minimum.
- `--plan` : `autonome` ou `accompagnee`.
- `--access-ends-at` : date de fin d'acces, au format `YYYY-MM-DD`.
- `--status` : `active`, `inactive` ou `expired`; par defaut `active`.

## Configurer

- `PORT` : port du serveur local.
- `PPEP_DATA_FILE` : chemin du fichier JSON de stockage.
- `PPEP_SESSION_SECRET` : secret de signature des sessions.

## Parcours guide

Depuis l'accueil apprenant, le bouton principal ouvre le module courant.
Chaque module affiche :

- une zone "À faire maintenant" qui résume la tâche concrète, le livrable attendu et le moment où valider;
- objectif;
- sources pedagogiques modernisees;
- apport;
- notions cles;
- exercice;
- duree et materiel conseille;
- fiche associee;
- points d'observation;
- auto-evaluation courte;
- recommandation de rythme et defi court.

La fiche associee ouvre une page imprimable depuis le module. Ces fiches modernisent les supports coeur sans deplacer les PDF, PPTX ou XLSX du corpus source.

Les modules vidéo indiquent explicitement quoi filmer, quel sujet choisir, à qui parler et comment utiliser la vidéo comme repère. Les vidéos de 3 à 5 minutes sont des exercices d'observation : la méthode reste réutilisable pour des réunions, présentations longues, ateliers ou conférences.

La validation d'un module memorise uniquement l'etat de progression et une reponse courte d'auto-evaluation. Les notes longues restent sur papier ou dans la fiche de l'apprenant.

## Tester

```bash
npm test
```

Les tests couvrent l'activation manuelle, la connexion, le refus d'acces, la reprise de progression, le verrouillage des bonus, l'affichage du gabarit module enrichi, la fiche imprimable contextualisee, la validation declarative et le deblocage du module suivant.
