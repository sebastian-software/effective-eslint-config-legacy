# ESLint Config - Effective Project<br/>[![Sponsored by][sponsor-img]][sponsor] [![Version][npm-version-img]][npm] [![Downloads][npm-downloads-img]][npm] [![Build Status Unix][travis-img]][travis] [![Build Status Windows][appveyor-img]][appveyor] [![Dependencies][deps-img]][deps]

[sponsor]: https://www.sebastian-software.de
[deps]: https://david-dm.org/sebastian-software/effective-eslint-config
[npm]: https://www.npmjs.com/package/@effective/eslint-config
[travis]: https://travis-ci.org/sebastian-software/effective-eslint-config
[appveyor]: https://ci.appveyor.com/project/swernerx/effective-eslint-config/branch/master
[sponsor-img]: https://badgen.net/badge/Sponsored%20by/Sebastian%20Software/692446
[deps-img]: https://badgen.net/david/dep/sebastian-software/effective-eslint-config
[npm-downloads-img]: https://badgen.net/npm/dm/@effective/eslint-config
[npm-version-img]: https://badgen.net/npm/v/@effective/eslint-config
[travis-img]: https://badgen.net/travis/sebastian-software/effective-eslint-config?label=unix%20build
[appveyor-img]: https://badgen.net/appveyor/ci/swernerx/effective-eslint-config?label=windows%20build

Configuration for linting TS/JS files.

## Reasoning

The presets combines a lot of previous work into an effective configuration to work with:

- TypeScript first. Based on TypeScript ESLint parser and presets.
- Recommended presets by React(+Hooks), [JSX-A11N](https://github.com/evcohen/eslint-plugin-jsx-a11y), [Import](https://github.com/benmosher/eslint-plugin-import/issues), [Unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn), [Shopify](https://github.com/sebastian-software/eslint-plugin-shopify-lean) and [Jest](https://github.com/jest-community/eslint-plugin-jest).
- Auto environment handling for Jest tests (including relaxiation for some rules).
- Supports root alias imports via `-/...`-prefix via Babel.

This all is offered by just one dependency and one `extends` and allow flexible customization via `rules`.

## Installation

- `npm install -D @effective/eslint-config`
- `npm install -D eslint prettier typescript`

Note: As this is based on the TypeScript parser it even requires the TypeScript installation in JS-only projects. This typically prepares the ground for a step-by-step migration to TypeScript and generally the rules in TypeScript are more advanced than their "native" ESLint counterparts.

## Usage

[ESLint supports our scoped packages](https://eslint.org/docs/developer-guide/shareable-configs#npm-scoped-modules) by just extending from the scope like so:

```json
{
  "extends": "@effective",
  "rules": []
}
```

```yaml
extends: "@effective"
```

We also suggest adding the following scripts to the `package.json`:

TypeScript projects:

```json
"lint": "run-s \"lint:* {@}\" --",
"lint:style": "prettier --check '**/*.{js,jsx,ts,tsx,mjs,json,md}'",
"lint:script": "eslint '**/*.{js,jsx,ts,tsx,mjs}'",
"lint:types": "tsc --noEmit",
```

JS projects:

```json
"lint": "run-s \"lint:* {@}\" --",
"lint:style": "prettier --check '**/*.{js,jsx,json,md}'",
"lint:script": "eslint '**/*.{js,jsx}'",
```

Note: The `run-s` command requires installation of [NPM Run All](https://www.npmjs.com/package/npm-run-all).

## Addons

Depending on the project the following plugins might be interesting additions:

- [Compat](https://www.npmjs.com/package/eslint-plugin-compat): Validates browser support for the written code and warn on required Polyfills. Excluded by default as it requires defining a browser list and does not work well in a mixed NodeJS/Browser code environment.
- [GraphQL](https://www.npmjs.com/package/eslint-plugin-graphql): Validates usage of queries against an existing schema. Excluded by default as it requires a downloaded schema.
- [Cypress](https://github.com/cypress-io/eslint-plugin-cypress): Offers rules and presets for working with Cypress E2E solution.

## License

[Apache License Version 2.0, January 2004](license)

## Copyright

<img src="https://cdn.rawgit.com/sebastian-software/sebastian-software-brand/0d4ec9d6/sebastiansoftware-en.svg" alt="Logo of Sebastian Software GmbH, Mainz, Germany" width="460" height="160"/>

Copyright 2019<br/>[Sebastian Software GmbH](http://www.sebastian-software.de)
