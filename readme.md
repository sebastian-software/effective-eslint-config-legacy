# ESLint Config - Effective Project

Configuration for linting TS/JS files.

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

JS projects:

```json
"lint": "run-s \"lint:* {@}\" --",
"lint:style": "prettier --check '**/*.{js,jsx,json,md}'",
"lint:script": "eslint '**/*.{js,jsx}'",
```

TypeScript projects:

```json
"lint": "run-s \"lint:* {@}\" --",
"lint:style": "prettier --check '**/*.{js,jsx,json,md,ts,tsx}'",
"lint:script": "eslint '**/*.{js,jsx,ts,tsx}'",
"lint:types": "tsc --noEmit",
```

## Status

- Correctly sorting unknown import types e.g. custom resolver aliases is not yet supported. I made [a small PR though for adding the capability](https://github.com/benmosher/eslint-plugin-import/pull/1375). Before this is merged auto-fixing of imports does not work well with these alias imports. Especially when combined with the `newline-between-groups` feature.
- [Alphabetize imports within groups] is not yet offered by the [Import-Plugin](https://github.com/benmosher/eslint-plugin-import). See [this PR](https://github.com/benmosher/eslint-plugin-import/pull/1105)
