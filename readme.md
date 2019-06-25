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
  "rules": []
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

## License

[Apache License Version 2.0, January 2004](license)

## Copyright

<img src="https://cdn.rawgit.com/sebastian-software/sebastian-software-brand/0d4ec9d6/sebastiansoftware-en.svg" alt="Logo of Sebastian Software GmbH, Mainz, Germany" width="460" height="160"/>

Copyright 2019<br/>[Sebastian Software GmbH](http://www.sebastian-software.de)
