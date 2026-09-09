# node-red-jnkr

A suite of custom Node-RED nodes for home automation, published as individual npm packages.

## Packages

| Package | Description |
| --- | --- |
| [node-red-contrib-minimum-on-time](packages/node-red-contrib-minimum-on-time) | Holds a `true` state for a minimum duration before allowing `false` through. |

## Repository layout

This is an npm workspaces monorepo — each folder under `packages/` is an independently versioned, independently published npm package.

```
packages/
  node-red-contrib-minimum-on-time/
    package.json
    <node>.js
    <node>.html
```

## Adding a new node

1. Create a new folder under `packages/`, named after the npm package (e.g. `node-red-contrib-my-node`).
2. Add its `package.json` (with a `node-red.nodes` entry pointing at the node's `.js` file), the node's `.js`/`.html` files, and a `README.md`.
3. Run `npm install` at the repo root to wire up the workspace.
4. Add a changeset describing the change: `npx changeset` (pick `minor` for a brand-new package's first release).

## Releasing

Releases are automated with [Changesets](https://github.com/changesets/changesets):

1. After making changes to a package, run `npx changeset` and describe the change. Commit the generated file under `.changeset/`.
2. Push/merge to `main`. The `Release` GitHub Actions workflow opens (or updates) a "Version Packages" pull request that bumps versions and changelogs.
3. Merging that PR triggers the workflow again, which runs `npm publish` for every package whose version changed.

### One-time setup required

- Create an npm access token (Automation type) at [npmjs.com](https://www.npmjs.com/) for the account that will own these packages.
- Add it as a repository secret named `NPM_TOKEN` in GitHub (**Settings → Secrets and variables → Actions**).

## Using these nodes in Node-RED

Once a package is published to npm, install it from the Node-RED editor: **Menu → Manage palette → Install**, then search for the package name (e.g. `node-red-contrib-minimum-on-time`). This works the same way whether Node-RED runs natively or in Docker, as long as the container's `~/.node-red` (or mapped user directory) has network access to the npm registry.
