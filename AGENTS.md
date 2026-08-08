# AGENTS.md

Guide pour les agents IA travaillant sur ce dépôt.

## Contexte du projet

Package de nœuds communautaires n8n, écrit en TypeScript. Le dossier s'appelle
`n8n-nodes-french-company-search` (objectif visé : recherche d'entreprises françaises),
mais **le code est encore le template de départ non renommé** : `package.json` déclare
`n8n-nodes-template`, et les seuls artefacts sont `ExampleNode` / `ExampleApi`, des
placeholders qui interrogent une API fictive `https://api.example.com`.

Conséquence pratique : ne pas traiter `ExampleNode` comme du code métier. Il est là pour
être dupliqué ou remplacé. Avant d'ajouter une vraie fonctionnalité, il faut d'abord
renommer le package (`name`, `author`, `repository`, `homepage` dans `package.json`).

Le dépôt n'est pas initialisé sous git (`git init` reste à faire si besoin).

## Structure

```
nodes/ExampleNode/ExampleNode.node.ts   Nœud exemple (opération "get" via HTTP authentifié)
credentials/ExampleApi.credentials.ts   Credentials exemple (baseUrl + apiKey, Bearer)
icons/example.svg, example.dark.svg     Icônes light/dark référencées par le nœud
.github/workflows/ci.yml                lint + build sur PR et push sur main
.github/workflows/publish.yml           Publication npm avec provenance sur tag *.*.*
```

`tsconfig.json` compile `credentials/**` et `nodes/**` vers `dist/`. Les chemins déclarés
dans `package.json` → `n8n.nodes` / `n8n.credentials` pointent vers `dist/`, pas vers les
sources : **toute création ou renommage de nœud doit être répercuté dans ces deux tableaux**,
sinon n8n ne charge rien et il n'y a aucune erreur explicite.

## Commandes

```bash
npm install          # node_modules n'est pas présent dans l'arbre actuel
npm run build        # n8n-node build → dist/ (JS compilé + icônes copiées)
npm run build:watch  # tsc --watch
npm run dev          # n8n-node dev (boucle de dev avec n8n)
npm run lint         # n8n-node lint — même commande que la CI
npm run lint:fix
npm run release      # release interactive : lint, build, bump, tag, push → déclenche publish.yml
```

La CI n'exécute que `npm ci`, `npm run lint`, `npm run build`. Il n'y a **aucun test**
dans le dépôt et aucun runner de test configuré ; ne pas inventer `npm test`. Si un
changement mérite d'être vérifié, le faire via `npm run build` puis un chargement réel
dans n8n (voir README, section « Testing locally in n8n »).

## Conventions de code

- Prettier (`.prettierrc.js`) : **tabulations**, largeur 100, guillemets simples, points-virgules,
  virgules finales partout, fins de ligne LF. Attention : les fichiers `.ts` existants sont
  indentés en espaces (2), en désaccord avec cette config. Suivre l'indentation du fichier
  qu'on modifie plutôt que de reformater en masse ; un reformatage global doit être une
  tâche à part, explicitement demandée.
- ESLint : config `@n8n/node-cli/eslint`, non personnalisée. Elle impose les règles n8n sur
  le nommage des paramètres, `displayName`, l'ordre des options, etc. — ces erreurs de lint
  sont des vraies contraintes de la plateforme, ne pas les désactiver avec un commentaire
  sans raison.
- TypeScript en `strict`, avec `noUnusedLocals` et `noImplicitReturns` : du code mort ou une
  branche sans `return` casse le build.
- Importer les types depuis `n8n-workflow` en `import type`, et les valeurs
  (`NodeConnectionTypes`, `NodeOperationError`) en import normal.

## Patterns n8n à respecter

- Requêtes HTTP : passer par `this.helpers.httpRequestWithAuthentication.call(this, '<credName>', {...})`
  plutôt que `fetch`/`axios`. Cela applique les credentials et le proxy de l'instance.
- Boucle sur les items : itérer `this.getInputData()`, renseigner `pairedItem: { item: i }` sur
  chaque sortie, et honorer `this.continueOnFail()` avant de relancer l'erreur.
- Erreurs : `throw new NodeOperationError(this.getNode(), error, { itemIndex: i })`.
  Ne pas laisser remonter une `Error` brute.
- Le nœud expose `usableAsTool: true` (utilisable par les agents IA n8n) — garder les
  `description` et `action` des opérations lisibles, elles servent de doc à l'agent.

## Documentation

Quatre READMEs traduits (`README.md`, `.fr.md`, `.es.md`, `.de.md`). Un changement visible par
l'utilisateur (nouvelle opération, nouveau credential, prérequis) doit être répercuté dans
**les quatre**, sinon les traductions divergent silencieusement.

## Publication

`publish.yml` se déclenche sur un tag `*.*.*` et publie sur npm avec provenance
(exigence n8n depuis mai 2026). Nécessite `@n8n/node-cli` ≥ 0.23.0. Ne pas publier
manuellement (`npm publish`) : cela produit un package sans attestation de provenance,
que n8n refusera.
