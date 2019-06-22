# ESLint Config - Effective Project

Configuration for linting TS/JS files.

## Reasoning

The presets combines a lot of previous work into an effective configuration to work with:

- TypeScript first. Based on TypeScript ESLint parser.
- Recommended presets by ESLint, TypeScript, React(+Hooks), JSX-A11N, Import Plugin, Jest and Cypress.
- Auto environment handling for Jest tests (including relaxiation for some rules).
- Support root alias imports via `-/...`-prefix via Babel.

This all is offered by just one dependency and one `extends` and allow flexible customization via `rules`.


## Usage

[ESLint supports our scoped packages](https://eslint.org/docs/developer-guide/shareable-configs#npm-scoped-modules) by just extending from the scope like so:

```json
{
  "extends": "@effective",
  "rules": [
    ...
  ]
}
```

We also suggest adding the following scripts to the `package.json`:

TypeScript projects:

```json
"lint": "run-s \"lint:* {@}\" --",
"lint:style": "prettier --check '**/*.{js,jsx,json,md,ts,tsx}'",
"lint:script": "eslint '**/*.{js,jsx,ts,tsx}'",
"lint:types": "tsc --noEmit",
```

JS projects:

```json
"lint": "run-s \"lint:* {@}\" --",
"lint:style": "prettier --check '**/*.{js,jsx,json,md}'",
"lint:script": "eslint '**/*.{js,jsx}'",
```

## Status

- Correctly sorting unknown import types e.g. custom resolver aliases is not yet supported. I made [a small PR though for adding the capability](https://github.com/benmosher/eslint-plugin-import/pull/1375). Before this is merged auto-fixing of imports does not work well with these alias imports. Especially when combined with the `newline-between-groups` feature.
- [Alphabetize imports within groups] is not yet offered by the [Import-Plugin](https://github.com/benmosher/eslint-plugin-import). See [this PR](https://github.com/benmosher/eslint-plugin-import/pull/1105)
