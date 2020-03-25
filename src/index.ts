/* eslint-disable filenames/match-exported, import/order */
import { ESLintConfig, ESLintRules } from "./types"
import { typescript } from "./modules/typescript"
import { eslint } from "./modules/eslint"
import { cra } from "./modules/cra"
import { airbnb } from "./modules/airbnb"
import { quality } from "./modules/quality"
import { formatting } from "./modules/formatting"
import { isDisabled } from "./util"

const combinedRules: ESLintRules = {
  ...typescript
}

// Relatively simple solution for having sorted JSON keys
// This is required to unify configs from different locations for correct comparison.
function sortReplacer(key, value) {
  if (value == null || value.constructor !== Object) {
    return value
  }
  return Object.keys(value)
    .sort()
    .reduce((result, name) => {
      result[name] = value[name]
      return result
    }, {})
}

function mergeWithWarnings(rules: ESLintRules, name: string) {
  for (const rule in rules) {
    if (!rules[rule]) {
      continue
    }

    if (rule in combinedRules) {
      const oldValue = JSON.stringify(combinedRules[rule], sortReplacer)
      const newValue = JSON.stringify(rules[rule], sortReplacer)

      if (newValue === oldValue) {
        continue
      }

      console.warn(`Section ${name} overrides ${rule}: ${oldValue} => ${newValue}`)
    }

    // If new and old value are both disabled, then we do not need to
    // store anything here.
    if (isDisabled(combinedRules[rule]) && isDisabled(rules[rule])) {
      console.warn(`Section ${name} defines disabled ${rule}! Dropping...`)
      continue
    }

    combinedRules[rule] = rules[rule]
  }
}

mergeWithWarnings(eslint, "eslint")
mergeWithWarnings(cra, "cra")
mergeWithWarnings(airbnb, "airbnb")
mergeWithWarnings(quality, "quality")

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
    "import/extensions": [".js", ".jsx", ".ts", ".tsx", ".mjs"],
    "import/resolver": {
      "babel-module": {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        alias: {
          "-": "./src/"
        }
      }
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    react: {
      version: "detect"
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
      files: ["*.d.ts", "*.d.tsx"],
      rules: {
        "no-undef": "off",
        "@typescript-eslint/no-unused-vars": "off"
      }
    }
  ]
}

export default config
