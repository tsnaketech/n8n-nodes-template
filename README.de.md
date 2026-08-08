# n8n-nodes-template

Dies ist eine **Starter-Vorlage** für n8n Community-Nodes. Sie ermöglicht es, schnell neue Nodes zu erstellen, ausgehend von einem funktionierenden Beispiel (`ExampleNode`), das eine authentifizierte HTTP-Anfrage durchführt.

[n8n](https://n8n.io/) ist eine Workflow-Automatisierungsplattform unter [Fair-Code-Lizenz](https://docs.n8n.io/reference/license/).

Andere Sprachen: [English](README.md) · [Français](README.fr.md) · [Español](README.es.md)

[Installation](#installation)
[Operationen](#operationen)
[Credentials](#credentials)
[Kompatibilität](#kompatibilität)
[Verwendung](#verwendung)
[Ressourcen](#ressourcen)
[Versionsverlauf](#versionsverlauf)
[Entwicklung](#entwicklung)

## Installation

Folgen Sie dem [Installationsleitfaden](https://docs.n8n.io/integrations/community-nodes/installation/) in der n8n-Dokumentation zu Community-Nodes.

## Operationen

- **Get** — ruft eine Ressource anhand ihrer ID von der konfigurierten API ab. Dies ist eine Platzhalter-Operation: ersetzen Sie sie durch die Operationen, die Ihr eigener Node benötigt.

## Credentials

Die Beispiel-Credentials (`ExampleApi`) benötigen eine Basis-URL und einen API-Key, der als `Authorization: Bearer`-Header gesendet wird. Ersetzen Sie die Felder und die `authenticate`-Methode in `credentials/ExampleApi.credentials.ts` durch das, was Ihr Zieldienst tatsächlich benötigt.

## Kompatibilität

Erstellt mit `n8n-workflow` ^2.16, erfordert Node.js >=20.15. Keine bekannten Inkompatibilitäten, da es sich um eine Vorlage und nicht um eine veröffentlichte Integration handelt.

## Verwendung

Dieses Repository ist eine Vorlage, keine gebrauchsfertige Integration. Siehe den Abschnitt [Entwicklung](#entwicklung) unten, um daraus ein echtes Node-Paket zu machen.

## Ressourcen

- [Dokumentation zu n8n Community-Nodes](https://docs.n8n.io/integrations/#community-nodes)
- [Dokumentation zum Erstellen von n8n-Nodes](https://docs.n8n.io/integrations/creating-nodes/)

## Versionsverlauf

- 0.1.0 — initiale Vorlage mit einem Beispiel-Node, einem Beispiel-Credential-Typ, Icons für helles/dunkles Theme, Build-/Lint-Tooling.

## Entwicklung

1. **Paket umbenennen**
   In `package.json` `name` ändern (muss mit `n8n-nodes-` beginnen), außerdem `author`, `repository`, `homepage`.

2. **Abhängigkeiten installieren**
   ```bash
   npm install
   ```

3. **Ersten Node erstellen**
   - `nodes/ExampleNode/` nach `nodes/MeinNode/` duplizieren.
   - `ExampleNode.node.ts` → `MeinNode.node.ts`, die Klasse `ExampleNode` → `MeinNode`, und `name: 'exampleNode'` → `name: 'meinNode'` umbenennen.
   - `icons/example.svg` (helles Theme) und `icons/example.dark.svg` (dunkles Theme) durch eigene Icons ersetzen (SVG oder quadratisches PNG) und die `icon: { light, dark }`-Eigenschaft des Nodes aktualisieren, falls sich die Dateinamen ändern.
   - `package.json` → `n8n.nodes` mit dem neuen Pfad `dist/nodes/MeinNode/MeinNode.node.js` aktualisieren.

4. **(Optional) Eigene Credentials erstellen**
   - `credentials/ExampleApi.credentials.ts` duplizieren, Felder und Authentifizierung (`authenticate`) anpassen und in `package.json` → `n8n.credentials` referenzieren.

5. **Build**
   ```bash
   npm run build
   ```
   Erzeugt den Ordner `dist/` (kompiliertes JS + kopierte Icons).

6. **Lint**
   ```bash
   npm run lint
   ```

### Lokal in n8n testen

Zwei Möglichkeiten:

- **Symlink (schneller Dev-Workflow)**
  ```bash
  npm run build
  npm link
  cd ~/.n8n/custom   # oder der custom-Ordner Ihrer n8n-Instanz
  npm link n8n-nodes-template
  ```
  Anschließend n8n neu starten. Der Node erscheint in der Node-Liste.

- **Direkte Installation**
  Diesen Ordner (nach `npm run build`) in das `custom`-Verzeichnis Ihrer n8n-Instanz kopieren, oder ihn auf npm veröffentlichen und über *Community Nodes* in der n8n-UI installieren.

### Veröffentlichung auf npm

```bash
npm run build
npm login
npm publish
```

Das `files`-Feld in `package.json` stellt sicher, dass nur `dist/` veröffentlicht wird.
