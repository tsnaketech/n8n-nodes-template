# n8n-nodes-template

This is an n8n community node **starter template**. It lets you quickly scaffold new n8n nodes, using a working example (`ExampleNode`) that performs an authenticated HTTP request as a starting point.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

Other languages: [Français](README.fr.md) · [Español](README.es.md) · [Deutsch](README.de.md)

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Version history](#version-history)
[Development](#development)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

- **Get** — retrieves a resource by ID from the configured API. This is a placeholder operation: replace it with the operations your own node needs.

## Credentials

The example credentials (`ExampleApi`) require a base URL and an API key, sent as an `Authorization: Bearer` header. Replace the fields and the `authenticate` method in `credentials/ExampleApi.credentials.ts` with whatever your target service actually requires.

## Compatibility

Built against `n8n-workflow` ^2.16, requires Node.js >=20.15. No known incompatibilities, since this is a template rather than a published integration.

## Usage

This repository is a template, not a ready-to-use integration. See [Development](#development) below to turn it into a real node package.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [n8n creating nodes documentation](https://docs.n8n.io/integrations/creating-nodes/)

## Version history

- 0.1.0 — initial template with one example node, one example credential type, light/dark icons, build/lint tooling.

## Development

1. **Rename the package**
   In `package.json`, change `name` (must start with `n8n-nodes-`), `author`, `repository`, `homepage`.

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create your first node**
   - Duplicate `nodes/ExampleNode/` into `nodes/MyNode/`.
   - Rename `ExampleNode.node.ts` → `MyNode.node.ts`, the class `ExampleNode` → `MyNode`, and `name: 'exampleNode'` → `name: 'myNode'`.
   - Replace `icons/example.svg` (light theme) and `icons/example.dark.svg` (dark theme) with your own icons (SVG or square PNG), and update the node's `icon: { light, dark }` property if the filenames change.
   - Update `package.json` → `n8n.nodes` with the new path `dist/nodes/MyNode/MyNode.node.js`.

4. **(Optional) Create your credentials**
   - Duplicate `credentials/ExampleApi.credentials.ts`, adapt the fields and authentication (`authenticate`), then reference it in `package.json` → `n8n.credentials`.

5. **Build**
   ```bash
   npm run build
   ```
   Generates the `dist/` folder (compiled JS + copied icons).

6. **Lint**
   ```bash
   npm run lint
   ```

### Testing locally in n8n

Two options:

- **Symlink (fast dev loop)**
  ```bash
  npm run build
  npm link
  cd ~/.n8n/custom   # or your n8n instance's custom folder
  npm link n8n-nodes-template
  ```
  Then restart n8n. The node appears in the nodes list.

- **Direct install**
  Copy this folder (after `npm run build`) into your n8n instance's `custom` directory, or publish it to npm and install it via *Community Nodes* in the n8n UI.

### Publishing to npm

```bash
npm run build
npm login
npm publish
```

The `files` field in `package.json` ensures only `dist/` is published.
