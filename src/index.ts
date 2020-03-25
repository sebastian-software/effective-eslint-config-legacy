/* eslint-disable filenames/match-exported, import/order */
import { ESLintConfig, ESLintRules } from "./types"
import { typescript } from "./modules/typescript"
import { eslint } from "./modules/eslint"
import { createReactApp } from "./modules/createReactApp"
import { airbnb } from "./modules/airbnbInspired"
import { quality } from "./modules/quality"
import { formatting } from "./modules/formatting"

const combinedRules: ESLintRules = {
  ...typescript
}

function mergeWithWarnings(rules: ESLintRules, name: string) {
  for (const rule in rules) {
    if (!rules[rule]) {
      continue
    }

    if (rule in combinedRules) {
      const oldValue = JSON.stringify(combinedRules[rule])
      const newValue = JSON.stringify(rules[rule])

      if (newValue === oldValue) {
        continue
      }

      console.warn(`Section ${name} overrides ${rule}: ${oldValue} => ${newValue}`)
    }

    combinedRules[rule] = rules[rule]
  }
}

mergeWithWarnings(eslint, "eslint")
mergeWithWarnings(createReactApp, "cra")

// mergeWithWarnings(airbnb, "airbnb")
// mergeWithWarnings(quality, "quality")
// mergeWithWarnings(formatting, "formatting")

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
      version: "16.10"
    }
  },

  parser: "@typescript-eslint/parser",

  plugins: [
    "@typescript-eslint",
    "import",
    "react",
    "jsx-a11y",
    "react-hooks",
    "jsdoc",
    "shopify-lean",
    "unicorn",
    "jest",
    "filenames"
  ],

  // extends: [
  //   "plugin:@typescript-eslint/recommended",
  //   "plugin:import/errors",
  //   "plugin:import/warnings",
  //   "plugin:import/typescript",
  //   "plugin:react/recommended",
  //   "plugin:jsx-a11y/recommended",
  //   "plugin:jest/recommended"
  // ],

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

  rules: combinedRules,

  overrides: [
    {
      // Relax a few rules inside tests
      files: [
        "*.test.js",
        "*.test.jsx",
        "*.test.ts",
        "*.test.tsx",
        "**/test/**/*.{js,jsx,ts,tsx}"
      ],
      env: {
        jest: true,
        "jest/globals": true
      },
      rules: {
        "@typescript-eslint/no-magic-numbers": "off",
        "no-redeclare": "off",
        "func-names": "off",
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
