import fs from "fs"
import path from "path"

import findUp from "find-up"

/* eslint-disable filenames/match-exported, import/order */
import { blacklist, hasMatchingTypescriptRule, isDisabled, setLevel } from "./util"
import { ESLintConfig, ESLintRules, Json } from "./types"

import { typescript } from "./modules/collections/typescript"
import { eslint } from "./modules/collections/eslint"
import { cra } from "./modules/collections/cra"
import { airbnb } from "./modules/collections/airbnb"
import { jsdoc } from "./modules/sandboxed/jsdoc"
import { unicorn } from "./modules/sandboxed/unicorn"
import { shopify } from "./modules/sandboxed/shopify"
import { quality } from "./modules/quality"
import { formatting } from "./modules/formatting"
import { autofix } from "./modules/autofix"

let projectConfig = findUp.sync([ "tsconfig.json", "jsconfig.json", "package.json" ])

if (projectConfig == null) {
  throw new Error(`Unable to find any package configuration file in the current folder: ${process.cwd()}!`)
}

const ROOT = path.dirname(projectConfig)

if (projectConfig.endsWith("package.json")) {
  console.warn(`Unable to find any project configuration file in the current folder: ${ROOT}! Automatically creating empty one...`)
  projectConfig = projectConfig.replace("package.json", "tsconfig.json")
  fs.writeFileSync(projectConfig, '{}')
}

const combinedRules: ESLintRules = {}

const DEBUG_ESLINT = process.env.DEBUG_ESLINT === "true"

// Relatively simple solution for having sorted JSON keys
// This is required to unify configs from different locations for correct comparison.
function sortReplacer(key: string, value: Json): Json {
  if (value == null || value.constructor !== Object) {
    return value
  }

  const keys = Object.keys(value)
  keys.sort()

  const result: ESLintRules = {}
  keys.forEach((name) => {
    result[name] = value[name]
  })
  return result
}

function mergeWithWarnings(rules: ESLintRules, name: string, warnLocale = false) {
  for (const ruleName in rules) {
    const ruleValue = rules[ruleName]

    // Filter entries without actual value
    if (!ruleValue) {
      continue
    }

    // If new and old value are both disabled, then we do not need to
    // store anything here.
    if (isDisabled(combinedRules[ruleName]) && isDisabled(rules[ruleName])) {
      if (DEBUG_ESLINT) {
        console.log(`Module ${name}: Defines disabled ${ruleName}! Dropping...`)
      }
      continue
    }

    let exportRuleName = ruleName

    // Take care of rules blocked by TS plugin and adjust to new replaced name
    // if that is possible.
    if (hasMatchingTypescriptRule(ruleName)) {
      exportRuleName = `@typescript-eslint/${ruleName}`
      if (DEBUG_ESLINT || warnLocale) {
        console.log(`Module ${name}: Adjusting rule name: ${ruleName} => ${exportRuleName}`)
      }
    } else if (blacklist.has(ruleName)) {
      continue
    }

    if (exportRuleName in combinedRules) {
      const ruleOldValue = combinedRules[exportRuleName]

      if (ruleOldValue) {
        const oldValue = JSON.stringify(ruleOldValue, sortReplacer, 2)
        const newValue = JSON.stringify(ruleValue, sortReplacer, 2)

        if (newValue === oldValue) {
          if (warnLocale && DEBUG_ESLINT) {
            console.log(`Module ${name}: Defines identical value for ${exportRuleName}! Dropping...`)
          }
          continue
        }

        if (DEBUG_ESLINT) {
          console.log(`Module ${name}: Overrides ${exportRuleName}: ${oldValue} => ${newValue}`)
        }
      }
    }

    combinedRules[exportRuleName] = ruleValue
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
        if (DEBUG_ESLINT) {
          console.log(`Module ${name}: Level override for previously disabled rule: ${rule}. Dropping...`)
        }
        continue
      }

      combinedRules[rule] = setLevel(oldValue, rules[rule])
    } else if (DEBUG_ESLINT) {
      console.log(`Module ${name}: Level override for previously unconfigured rule: ${rule}. Dropping...`)
    }
  }
}

mergeWithWarnings(typescript, "typescript")
mergeWithWarnings(eslint, "eslint")
mergeWithWarnings(cra, "cra")

// plugin scope only
mergeWithWarnings(airbnb, "airbnb")
mergeWithWarnings(jsdoc, "jsdoc")
mergeWithWarnings(unicorn, "unicorn")

// our local settings/overrides
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
      jsx: true
    },

    // Required for linting with type information
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/TYPED_LINTING.md
    project: projectConfig,
    tsconfigRootDir: ROOT,

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
        // Reduce config from recommended to warn for auto-fixable rules
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
    },

    // Pure JavaScript files
    {
      // Definition files are typically really TS specific and
      // do not work in the same way as normal TS files.
      files: [ "*.js", "*.jsx", "*.mjs" ],
      rules: {
        // related to the 'any' type which cannot be validated for these files anyway
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/restrict-template-expressions": "off"
      }
    }
  ]
}

export default config
