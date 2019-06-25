/* eslint-disable filenames/match-exported, import/order */

import { Linter } from "eslint"
import restrictedGlobals from "confusing-browser-globals"
import allTSRulesUnfiltered from "@typescript-eslint/eslint-plugin/dist/configs/all.json"

import { createReactApp } from "./cra"
import { airbnb } from "./airbnb"
import { quality } from "./quality"
import { formatting } from "./formatting"

const disabledByTS = Object.keys(allTSRulesUnfiltered.rules).filter(
  (name) => !name.startsWith("@typescript-eslint/")
)
const tsOverrideRules: any = {}
disabledByTS.forEach((name): void => {
  tsOverrideRules[name] = "off"
})

interface ESLintRules {
  [name: string]: Linter.RuleLevel | Linter.RuleLevelAndOptions;
}

interface ESLintEnv {
  [name: string]: boolean;
}

interface ESLintOverrides {
  files: string[];
  rules?: ESLintRules;
  env?: ESLintEnv;
}

interface ESLintConfig extends Linter.Config {
  root: boolean;
  plugins: string[];
  extends: string[];
  overrides: ESLintOverrides[];
}

const customRules: ESLintRules = {
  "@typescript-eslint/no-angle-bracket-type-assertion": "error",
  "@typescript-eslint/no-namespace": "error",
  "@typescript-eslint/no-array-constructor": "error",
  "@typescript-eslint/no-useless-constructor": "error",

  // We are fully in TypeScript. PropTypes are not useful anymore.
  "react/prop-types": "off",

  // These are generally a good idea but do not work well with TypeScript usage
  "import/export": "off",

  // Conflicts with TypeScript import/export e.g. interfaces
  "import/named": "off",

  "react-hooks/rules-of-hooks": "error",
  "react-hooks/exhaustive-deps": "warn",

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
  "filenames/no-index": "off"
}

const config: ESLintConfig = {
  root: true,

  env: {
    browser: true,
    es6: true,
    node: true,
    "shared-node-browser": true
  },

  settings: {
    "import/resolver": {
      "babel-module": {
        extensions: [ ".js", ".jsx", ".ts", ".tsx", ".json" ],
        alias: {
          "-": "./src/"
        }
      }
    },
    "import/parsers": {
      "@typescript-eslint/parser": [ ".ts", ".tsx" ]
    },
    react: {
      version: "detect"
    }
  },

  parser: "@typescript-eslint/parser",
  plugins: [ "@typescript-eslint", "react-hooks", "prettier", "cypress", "jest", "filenames" ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:jest/recommended",
    "plugin:cypress/recommended"
  ],

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true
    },

    // typescript-eslint specific options
    warnOnUnsupportedTypeScriptVersion: true
  },

  rules: {
    ...createReactApp,
    ...airbnb,
    ...customRules,
    ...quality,
    ...formatting,
    ...tsOverrideRules
  },

  overrides: [
    {
      // Relax a few rules inside tests
      files: [ "*.test.js", "*.test.jsx", "*.test.ts", "*.test.tsx" ],
      env: {
        jest: true,
        "jest/globals": true,
        "cypress/globals": true
      },
      rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "react/display-name": "off",
        "jsx-a11y/click-events-have-key-events": "off"
      }
    },
    {
      // Definition files are typically really TS specific and
      // do not work in the same way as normal TS files.
      files: [ "*.d.ts", "*.d.tsx" ],
      rules: {
        "no-undef": "off",
        "@typescript-eslint/no-unused-vars": "off"
      }
    }
  ]
}

export default config
