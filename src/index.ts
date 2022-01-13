/* eslint-disable filenames/match-exported */
import path from "path"

import { Linter } from "eslint"
import findUp from "find-up"
import appRootPath from "app-root-path"

/* eslint-disable filenames/match-exported, import/order */
import {
  writeDefaultProjectConfig
} from "./util"

import { jestOverride } from "./overrides/jest"
import { jsOverride } from "./overrides/javascript"
import { typedefOverride } from "./overrides/typedef"
import { compileRules } from "./compiler"

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

const EXTENSIONS = [ ".js", ".jsx", ".d.ts", ".ts", ".tsx", ".json" ]

const config: Linter.BaseConfig = {
  env: {
    "shared-node-browser": true
  },

  settings: {
    "import/extensions": EXTENSIONS,
    "import/resolver": {
      "babel-module": {
        extensions: EXTENSIONS,
        alias: {
          "-": "./src/"
        }
      }
    },
    react: {
      version: "17.0.0"
    }
  },

  globals: {
    process: "readonly",
    module: "readonly",
    require: "readonly"
  },

  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaVersion: "latest",
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

  plugins: [
    "@typescript-eslint",
    "import",
    "react",
    "react-hooks",
    "jsx-a11y",
    "jsdoc",
    "shopify-lean",
    "unicorn",
    "jest",
    "filenames"
  ],

  rules: compileRules(),

  overrides: [
    jestOverride,
    typedefOverride,
    jsOverride
  ]
}

export default config
