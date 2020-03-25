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

This preset is based on the excellent work of the many developers of the following projects:

- [ESLint TypeScript](https://github.com/typescript-eslint/typescript-eslint): This preset is TypeScript-focused and uses the significantly extended rules from the TypeScript ecosystem whenever possible.
- [ESLint Recommended](https://eslint.org/docs/rules/): Recommendations from the ESLint core package that have not yet been geared towards TypeScript are added.
- [Create React App](https://github.com/facebook/create-react-app/tree/master/packages/eslint-config-react-app): This project's settings combine everything that the developers of Create React App consider critical code base issues for general JavaScript, ReactJS (including hooks and accessibility).
- [Airbnb](https://github.com/airbnb/javascript): As one of the most widely used standards, it would probably not have been wise to leave out the know-how of the Airbnb developers. We use all the knowledge from the rules, which have not been covered differently so far, to be able to offer much more extensive checks.
- [JSDoc](https://github.com/gajus/eslint-plugin-jsdoc): This plugin provides some good options to check the content of JSDoc comments. We have deliberately chosen to use only those rules that make sense in TypeScript typed projects.
- [Unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn) + [Shopify](https://github.com/sebastian-software/eslint-plugin-shopify-lean): Both are a wonderful collection of really smart additional self-implemented rules. We're using the best of these two projects to make some great additions to the ruleset.
- [Jest](https://github.com/jest-community/eslint-plugin-jest): The TestRunner of choice is directly supported by the preset. We recognize test files by the "test" folder or by the component ".test." in the file name. Only here we activate the recommended preset of Jest and deactivate some of our stricter rules, which are often harder to follow in tests.
- [Babel](https://github.com/tleunen/eslint-import-resolver-babel-module): By using the Babel resolver, we have created an alias `-` that points to the `src` folder. This is useful in more deeply structured projects, since you don't have to shimmy along the parent folders as often via `...`.

And it combines them in an intelligent and harmonious way to create a modern, high-performance linting infrastructure. The preset provides the best building block for the development of modern JavaScript applications

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

- [Node](https://github.com/mysticatea/eslint-plugin-node): Adds additional capabilities for NodeJS scripts e.g. server-side applications.
- [Compat](https://www.npmjs.com/package/eslint-plugin-compat): Validates browser support for the written code and warn on required Polyfills. Excluded by default as it requires defining a browser list and does not work well in a mixed NodeJS/Browser code environment.
- [GraphQL](https://www.npmjs.com/package/eslint-plugin-graphql): Validates usage of queries against an existing schema. Excluded by default as it requires a downloaded schema.
- [Cypress](https://github.com/cypress-io/eslint-plugin-cypress): Offers rules and presets for working with Cypress E2E solution.

## License

[Apache License Version 2.0, January 2004](license)

## Copyright

<img src="https://cdn.rawgit.com/sebastian-software/sebastian-software-brand/0d4ec9d6/sebastiansoftware-en.svg" alt="Logo of Sebastian Software GmbH, Mainz, Germany" width="460" height="160"/>

Copyright 2019-2020<br/>[Sebastian Software GmbH](http://www.sebastian-software.de)
