# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Build & Deploy

```bash
npm run build       # type-check + vite build (SPA only)
npm run build:seo   # type-check + vite build + headless-Chrome prerender
                    # Writes per-route index.html, sitemap.xml, robots.txt into dist/.
npm run prerender   # run the prerender step against an existing dist/
```

The prerender step (`scripts/prerender.mjs`) launches a local headless Chrome, navigates to each static + project route, captures the rendered `<head>` (title, description, OG, Twitter, JSON-LD via `useRouteSeo`), and persists it as static HTML so crawlers see route-specific meta before any JS executes. It requires `google-chrome` on `PATH`.
