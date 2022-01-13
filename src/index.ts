/* eslint-disable filenames/match-exported */

import fs from "fs"
import path from "path"

import { Linter } from "eslint"
import findUp from "find-up"
import appRootPath from "app-root-path"

/* eslint-disable filenames/match-exported, import/order */
import {
  blacklist,
  hasMatchingTypescriptRule,
  humanifyLevel,
  isDisabled,
  mergeLevelOverrides,
  mergeWithWarnings,
  setLevel
} from "./util"
import { react } from "./modules/sandboxed/react"

import { typescript } from "./modules/collections/typescript"
import { eslint } from "./modules/collections/eslint"
import { cra } from "./modules/collections/cra"
import { airbnb } from "./modules/collections/airbnb"
import { jsdoc } from "./modules/sandboxed/jsdoc"
import { unicorn } from "./modules/sandboxed/unicorn"
import { shopify } from "./modules/sandboxed/shopify"
import { quality } from "./modules/quality"
import { formatting } from "./modules/formatting"
import { autofix } from "./modules/relax/autofix"
import { relaxed } from "./modules/relax/relaxed"

function writeDefaultProjectConfig(projectConfig: string) {
  fs.writeFileSync(
    projectConfig,
    JSON.stringify(
      {
        lib: [ "dom", "dom.iterable", "esnext" ],
        allowJs: true,
        skipLibCheck: true,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        strict: true,
        module: "esnext",
        moduleResolution: "node",
        resolveJsonModule: true,
        jsx: "react"
      },
      null,
      2
    ),
    { encoding: "utf-8" }
  )
}

const ROOT = String(appRootPath)
let projectConfig = findUp.sync([ "tsconfig.json", "jsconfig.json", "package.json" ], {
  cwd: ROOT
})
let projectRoot = ROOT

if (projectConfig == null) {
  console.warn(`Unable to find any package configuration file in the current folder: ${ROOT}!`)
} else {
  projectRoot = path.dirname(projectConfig)

  if (projectConfig.endsWith("package.json")) {
    console.warn(`Automatically creating new project configuration in ${projectRoot}...`)
    projectConfig = projectConfig.replace("package.json", "tsconfig.json")
    writeDefaultProjectConfig(projectConfig)
  }
}

const combinedRules: Linter.RulesRecord = {}

const DEBUG_ESLINT = process.env.DEBUG_ESLINT === "true"

// plugin scope only
mergeWithWarnings(combinedRules, react, "react")
mergeWithWarnings(combinedRules, jsdoc, "jsdoc")
mergeWithWarnings(combinedRules, unicorn, "unicorn")
mergeWithWarnings(combinedRules, shopify, "shopify")

// popular collections
mergeWithWarnings(combinedRules, typescript, "typescript")
mergeWithWarnings(combinedRules, eslint, "eslint")
mergeWithWarnings(combinedRules, cra, "cra")
mergeWithWarnings(combinedRules, airbnb, "airbnb")

// local settings/overrides
mergeWithWarnings(combinedRules, quality, "quality", true)
mergeWithWarnings(combinedRules, formatting, "formatting", true)

// override/relax level
mergeLevelOverrides(combinedRules, autofix, "autofix")
mergeLevelOverrides(combinedRules, relaxed, "relaxed")

const config: Linter.BaseConfig = {
  env: {
    browser: true,
    es6: true,
    node: true,
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
    react: {
      version: "17.0.0"
    },
    jest: {
      version: "27.0.0"
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
    project: projectConfig || "",
    tsconfigRootDir: projectRoot,

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
        "jest/no-test-prefixes": "warn",
        "jest/no-deprecated-functions": "warn",
        "jest/no-jasmine-globals": "warn",
        "jest/valid-title": "warn",

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
