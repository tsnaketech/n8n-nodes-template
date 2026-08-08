# n8n-nodes-template

Ceci est un **template de démarrage** pour nœuds communautaires n8n. Il permet de créer rapidement de nouveaux nœuds, à partir d'un exemple fonctionnel (`ExampleNode`) qui effectue une requête HTTP authentifiée.

[n8n](https://n8n.io/) est une plateforme d'automatisation de workflows sous [licence fair-code](https://docs.n8n.io/reference/license/).

Autres langues : [English](README.md) · [Español](README.es.md) · [Deutsch](README.de.md)

[Installation](#installation)
[Opérations](#opérations)
[Credentials](#credentials)
[Compatibilité](#compatibilité)
[Utilisation](#utilisation)
[Ressources](#ressources)
[Historique des versions](#historique-des-versions)
[Développement](#développement)

## Installation

Suivez le [guide d'installation](https://docs.n8n.io/integrations/community-nodes/installation/) de la documentation n8n sur les nœuds communautaires.

## Opérations

- **Get** — récupère une ressource par ID depuis l'API configurée. C'est une opération d'exemple : remplacez-la par les opérations dont votre propre nœud a besoin.

## Credentials

Les credentials d'exemple (`ExampleApi`) nécessitent une URL de base et une clé API, envoyée dans un header `Authorization: Bearer`. Remplacez les champs et la méthode `authenticate` dans `credentials/ExampleApi.credentials.ts` par ce que votre service cible requiert réellement.

## Compatibilité

Construit avec `n8n-workflow` ^2.16, nécessite Node.js >=20.15. Aucune incompatibilité connue, puisqu'il s'agit d'un template et non d'une intégration publiée.

## Utilisation

Ce dépôt est un template, pas une intégration prête à l'emploi. Voir la section [Développement](#développement) ci-dessous pour en faire un véritable package de nœud.

## Ressources

- [Documentation des nœuds communautaires n8n](https://docs.n8n.io/integrations/#community-nodes)
- [Documentation sur la création de nœuds n8n](https://docs.n8n.io/integrations/creating-nodes/)

## Historique des versions

- 0.1.0 — template initial avec un nœud d'exemple, un type de credentials d'exemple, icônes clair/sombre, outils de build/lint.

## Développement

1. **Renommer le package**
   Dans `package.json`, changez `name` (doit commencer par `n8n-nodes-`), `author`, `repository`, `homepage`.

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Créer votre premier nœud**
   - Dupliquez `nodes/ExampleNode/` en `nodes/MonNoeud/`.
   - Renommez `ExampleNode.node.ts` → `MonNoeud.node.ts`, la classe `ExampleNode` → `MonNoeud`, et `name: 'exampleNode'` → `name: 'monNoeud'`.
   - Remplacez `icons/example.svg` (thème clair) et `icons/example.dark.svg` (thème sombre) par vos propres icônes (SVG ou PNG carré), et mettez à jour la propriété `icon: { light, dark }` du nœud si les noms de fichiers changent.
   - Mettez à jour `package.json` → `n8n.nodes` avec le nouveau chemin `dist/nodes/MonNoeud/MonNoeud.node.js`.

4. **(Optionnel) Créer vos credentials**
   - Dupliquez `credentials/ExampleApi.credentials.ts`, adaptez les champs et l'authentification (`authenticate`), puis référencez-le dans `package.json` → `n8n.credentials`.

5. **Builder**
   ```bash
   npm run build
   ```
   Génère le dossier `dist/` (JS compilé + icônes copiées).

6. **Lint**
   ```bash
   npm run lint
   ```

### Tester localement dans n8n

Deux options :

- **Lien symbolique (dev rapide)**
  ```bash
  npm run build
  npm link
  cd ~/.n8n/custom   # ou le dossier custom de votre installation n8n
  npm link n8n-nodes-template
  ```
  Puis redémarrez n8n. Le nœud apparaît dans la liste des nœuds.

- **Installation directe**
  Copiez/collez ce dossier (après `npm run build`) dans le répertoire `custom` de votre instance n8n, ou publiez-le sur npm et installez-le via *Community Nodes* dans l'UI n8n.

### Publication sur npm

```bash
npm run build
npm login
npm publish
```

Le champ `files` du `package.json` garantit que seul `dist/` est publié.
