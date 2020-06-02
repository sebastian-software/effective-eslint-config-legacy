/* eslint-disable filenames/match-exported, import/order */
import { ESLintConfig, ESLintRules } from "./types"
import { isDisabled, setLevel } from "./util"

import { typescript } from "./modules/typescript"
import { eslint } from "./modules/eslint"
import { cra } from "./modules/cra"
import { airbnb } from "./modules/airbnb"
import { jsdoc } from "./modules/jsdoc"
import { unicorn } from "./modules/unicorn"
import { shopify } from "./modules/shopify"
import { quality } from "./modules/quality"
import { formatting } from "./modules/formatting"
import { autofix } from "./modules/autofix"

const combinedRules: ESLintRules = {}

const DEBUG_ESLINT = process.env.DEBUG_ESLINT

// Relatively simple solution for having sorted JSON keys
// This is required to unify configs from different locations for correct comparison.
function sortReplacer(key: string, value: any) {
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

function mergeWithWarnings(rules: ESLintRules, name: string, warnSame = false) {
  for (const rule in rules) {
    if (!rules[rule]) {
      continue
    }

    if (rule in combinedRules) {
      const oldValue = JSON.stringify(combinedRules[rule], sortReplacer)
      const newValue = JSON.stringify(rules[rule], sortReplacer)

      if (newValue === oldValue) {
        if (warnSame) {
          console.log(`Section ${name} defines identical value for ${rule}! Dropping...`)
        }
        continue
      }

      if (DEBUG_ESLINT) {
        console.log(`Section ${name} overrides ${rule}: ${oldValue} => ${newValue}`)
      }
    }

    // If new and old value are both disabled, then we do not need to
    // store anything here.
    if (isDisabled(combinedRules[rule]) && isDisabled(rules[rule])) {
      console.log(`Section ${name} defines disabled ${rule}! Dropping...`)
      continue
    }

    combinedRules[rule] = rules[rule]
  }
}

function mergeLevelOverrides(rules: ESLintRules, name: string) {
  for (const rule in rules) {
    if (!rules[rule]) {
      continue
    }

    if (rule in combinedRules) {
      const oldValue = combinedRules[rule]
      if (isDisabled(oldValue)) {
        console.log(`Level override for previously disabled rule: ${rule}. Dropping...`)
        continue
      }

      combinedRules[rule] = setLevel(oldValue, rules[rule])
    } else if (DEBUG_ESLINT) {
      console.log(`Level override for previously unconfigured rule: ${rule}. Dropping...`)
    }
  }
}

mergeWithWarnings(typescript, "typescript")
mergeWithWarnings(eslint, "eslint")
mergeWithWarnings(cra, "cra")
mergeWithWarnings(airbnb, "airbnb")
mergeWithWarnings(jsdoc, "jsdoc")
mergeWithWarnings(unicorn, "unicorn")
mergeWithWarnings(shopify, "shopify")
mergeWithWarnings(quality, "quality", true)
mergeWithWarnings(formatting, "formatting", true)

mergeLevelOverrides(autofix, "autofix")

const config: ESLintConfig = {
  root: true,

  env: {
    "browser": true,
    "es6": true,
    "node": true,
    "shared-node-browser": true
  },

  settings: {
    "import/extensions": [ ".d.ts", ".js", ".jsx", ".ts", ".tsx", ".mjs", ".json" ],
    "import/resolver": {
      "babel-module": {
        extensions: [ ".js", ".jsx", ".d.ts", ".ts", ".tsx", ".mjs", ".json" ],
        alias: {
          "-": "./src/"
        }
      }
    },
    "react": {
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
    // Jest Test Runner
    {
      files: [ "*.test.{js,jsx,ts,tsx}", "**/test/**/*.{js,jsx,ts,tsx}" ],
      extends: [ "plugin:jest/recommended" ],
      rules: {
        // Reduce config from recommended to warn for autofixable rules
        "jest/no-focused-tests": "warn",
        "jest/no-test-callback": "warn",
        "jest/no-test-prefixes": "warn",

        // Relax a few rules inside tests
        "filenames/match-exported": "off",
        "@typescript-eslint/no-magic-numbers": "off",
        "no-redeclare": "off",
        "func-names": "off",
        "react/display-name": "off",
        "jsx-a11y/click-events-have-key-events": "off"
      }
    },

    // TypeScript Definitions
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
