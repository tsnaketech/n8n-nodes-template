# n8n-nodes-template

Esta es una **plantilla inicial** para nodos comunitarios de n8n. Permite crear rápidamente nuevos nodos, a partir de un ejemplo funcional (`ExampleNode`) que realiza una petición HTTP autenticada.

[n8n](https://n8n.io/) es una plataforma de automatización de workflows con [licencia fair-code](https://docs.n8n.io/reference/license/).

Otros idiomas: [English](README.md) · [Français](README.fr.md) · [Deutsch](README.de.md)

[Instalación](#instalación)
[Operaciones](#operaciones)
[Credenciales](#credenciales)
[Compatibilidad](#compatibilidad)
[Uso](#uso)
[Recursos](#recursos)
[Historial de versiones](#historial-de-versiones)
[Desarrollo](#desarrollo)

## Instalación

Sigue la [guía de instalación](https://docs.n8n.io/integrations/community-nodes/installation/) de la documentación de nodos comunitarios de n8n.

## Operaciones

- **Get** — obtiene un recurso por ID desde la API configurada. Es una operación de ejemplo: reemplázala por las operaciones que tu propio nodo necesite.

## Credenciales

Las credenciales de ejemplo (`ExampleApi`) requieren una URL base y una API key, enviada en una cabecera `Authorization: Bearer`. Reemplaza los campos y el método `authenticate` en `credentials/ExampleApi.credentials.ts` por lo que tu servicio realmente requiera.

## Compatibilidad

Construido con `n8n-workflow` ^2.16, requiere Node.js >=20.15. Sin incompatibilidades conocidas, ya que se trata de una plantilla y no de una integración publicada.

## Uso

Este repositorio es una plantilla, no una integración lista para usar. Consulta la sección [Desarrollo](#desarrollo) más abajo para convertirla en un paquete de nodo real.

## Recursos

- [Documentación de nodos comunitarios de n8n](https://docs.n8n.io/integrations/#community-nodes)
- [Documentación sobre la creación de nodos de n8n](https://docs.n8n.io/integrations/creating-nodes/)

## Historial de versiones

- 0.1.0 — plantilla inicial con un nodo de ejemplo, un tipo de credenciales de ejemplo, iconos claro/oscuro, herramientas de build/lint.

## Desarrollo

1. **Renombrar el paquete**
   En `package.json`, cambia `name` (debe empezar por `n8n-nodes-`), `author`, `repository`, `homepage`.

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Crear tu primer nodo**
   - Duplica `nodes/ExampleNode/` en `nodes/MiNodo/`.
   - Renombra `ExampleNode.node.ts` → `MiNodo.node.ts`, la clase `ExampleNode` → `MiNodo`, y `name: 'exampleNode'` → `name: 'miNodo'`.
   - Sustituye `icons/example.svg` (tema claro) e `icons/example.dark.svg` (tema oscuro) por tus propios iconos (SVG o PNG cuadrado), y actualiza la propiedad `icon: { light, dark }` del nodo si cambian los nombres de archivo.
   - Actualiza `package.json` → `n8n.nodes` con la nueva ruta `dist/nodes/MiNodo/MiNodo.node.js`.

4. **(Opcional) Crear tus credenciales**
   - Duplica `credentials/ExampleApi.credentials.ts`, adapta los campos y la autenticación (`authenticate`), y referéncialo en `package.json` → `n8n.credentials`.

5. **Compilar**
   ```bash
   npm run build
   ```
   Genera la carpeta `dist/` (JS compilado + iconos copiados).

6. **Lint**
   ```bash
   npm run lint
   ```

### Probar localmente en n8n

Dos opciones:

- **Enlace simbólico (desarrollo rápido)**
  ```bash
  npm run build
  npm link
  cd ~/.n8n/custom   # o la carpeta custom de tu instancia de n8n
  npm link n8n-nodes-template
  ```
  Luego reinicia n8n. El nodo aparecerá en la lista de nodos.

- **Instalación directa**
  Copia esta carpeta (tras `npm run build`) en el directorio `custom` de tu instancia de n8n, o publícala en npm e instálala vía *Community Nodes* en la interfaz de n8n.

### Publicación en npm

```bash
npm run build
npm login
npm publish
```

El campo `files` de `package.json` garantiza que solo se publique `dist/`.
