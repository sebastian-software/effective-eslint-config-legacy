import restrictedGlobals from "confusing-browser-globals"

import { ESLintRules } from "../types"

export const quality: ESLintRules = {
  // Most code bases will want to enforce not using angle-bracket style because
  // it conflicts with JSX syntax, and is confusing when paired with with generic syntax.
  "@typescript-eslint/consistent-type-assertions": [ "error", { assertionStyle: "as" }],
  "@typescript-eslint/no-namespace": "error",
  "@typescript-eslint/no-array-constructor": "error",
  "@typescript-eslint/no-useless-constructor": "error",

  // We are fully in TypeScript. PropTypes are not useful anymore.
  "react/prop-types": "off",

  "react-hooks/rules-of-hooks": "error",
  "react-hooks/exhaustive-deps": "warn",

  // We use the new syntax even for NodeJS apps (e.g. transpiled via Rollup)
  "node/no-unsupported-features/es-syntax": "off",

  // The ESLint browser environment defines all browser globals as valid,
  // even though most people don't know some of them exist (e.g. `name` or `status`).
  // This is dangerous as it hides accidentally undefined variables.
  // We blacklist the globals that we deem potentially confusing.
  // To use them, explicitly reference them, e.g. `window.name` or `window.status`.
  "no-restricted-globals": [ "error", ...restrictedGlobals ],

  // We are using the import plugin with its ordering capabilities
  // for sorting declarations.
  "sort-imports": [ "error", { ignoreDeclarationSort: true }],

  // Activate our concepts of formatting imports
  "import/order": [
    "error",
    {
      groups: [ "builtin", "external", "unknown", "parent", "sibling", "index" ],
      "newlines-between": "always"
    }
  ],

  // Order with groups are confused by our module-resolver setup.
  // It adds a newline after each import startinng with "-".
  // At very least we like to have a newline between the import and the
  // the actual implementation section.
  "import/newline-after-import": "error",

  // Nowadays we prefer not using default exports, but named ones
  "import/default": "off",

  // Fails with <FormattedNumber style="currency" />
  "react/style-prop-object": "off",

  // Don't allow dashes or underscores.
  "filenames/match-regex": [ "error", "^[a-zA-Z][a-zA-Z0-9.]+$" ],

  // Keep in sync with exported symbol name.
  "filenames/match-exported": "error",

  // Disable don't allow index.js files as this is used for exporting libs often times.
  // Just be sure to not use them everywhere.
  "filenames/no-index": "off",

  "@typescript-eslint/no-unused-vars": [
    "error",
    {
      args: "none",
      ignoreRestSiblings: true,
      varsIgnorePattern: "^_"
    }
  ],
  "@typescript-eslint/no-use-before-define": [
    "error",
    {
      classes: false,
      functions: false
    }
  ],

  // Replaces rule by new one (original came from the recommended preset it seems)
  "@typescript-eslint/prefer-interface": "off",
  "@typescript-eslint/consistent-type-definitions": "error",

  // Disabled old rule still in 'recommended' list of TS
  "@typescript-eslint/no-triple-slash-reference": "off",

  "jsdoc/check-alignment": "warn",
  "jsdoc/check-param-names": "error",
  "jsdoc/check-tag-names": "error",
  "jsdoc/newline-after-description": "warn",
  "jsdoc/no-types": "error",
  "jsdoc/require-param": "off",
  "jsdoc/require-param-description": "warn",
  "jsdoc/require-param-name": "warn",
  "jsdoc/require-returns": "off",
  "jsdoc/require-returns-check": "warn",
  "jsdoc/require-returns-description": "warn",

  // Shopify Plugin Extensions
  "shopify/jsx-no-complex-expressions": "error",
  "shopify/jsx-no-hardcoded-content": "warn",
  "shopify/prefer-class-properties": "warn",
  "shopify/prefer-early-return": "warn",

  // Unicorn Plugin Extensions
  "unicorn/no-array-instanceof": "warn",
  "unicorn/no-new-buffer": "error",
  "unicorn/no-unsafe-regex": "error",
  "unicorn/no-zero-fractions": "warn",
  "unicorn/prefer-includes": "warn",
  "unicorn/prefer-starts-ends-with": "warn",
  "unicorn/regex-shorthand": "warn",
  "unicorn/throw-new-error": "error",

  "id-length": [
    "error",
    {
      exceptions: [
        "i",
        "l",
        "id",
        "fs",
        "url",
        "uri",
        "map",
        "env",
        "err",
        "req",
        "res",
        "now",
        "raw",
        "key",
        "val",
        "obj",
        "pos",
        "row",
        "col",
        "min",
        "max",
        "CWD",
        "pkg",
        "css",
        "app",
        "api",
        "cli",
        "App",
        "API"
      ],
      max: 40,
      min: 4,
      properties: "never"
    }
  ],
  "linebreak-style": [ "error", "unix" ],
  "max-depth": [
    "error",
    {
      maximum: 3
    }
  ],
  "max-len": [
    "error",
    {
      code: 100,
      comments: 140,
      ignoreUrls: true,
      tabWidth: 2
    }
  ],
  "max-params": [ "error", 3 ],
  "max-statements": [
    "error",
    30,
    {
      ignoreTopLevelFunctions: true
    }
  ],
  "max-statements-per-line": [
    "error",
    {
      max: 2
    }
  ],
  "no-div-regex": "error",
  "no-duplicate-imports": "error",
  "no-extra-semi": "error",
  "no-mixed-spaces-and-tabs": "error",
  "no-nested-ternary": "error",
  "no-param-reassign": "error",
  "no-unmodified-loop-condition": "error",
  "no-unneeded-ternary": "error",

  // Perfectly valid for CLI tools. Not sure about this for this reason.
  // Might be enabled where needed by the project author.
  "no-process-exit": "off"
}
