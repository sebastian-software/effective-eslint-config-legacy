import { Linter } from "eslint"

interface ESLintRules {
  [name: string]: Linter.RuleLevel | Linter.RuleLevelAndOptions
}

export const quality: ESLintRules = {
  "id-length": [
    "warn",
    {
      min: 4,
      max: 40,
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
    "warn",
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
  "no-catch-shadow": "error",
  "no-confusing-arrow": "error",
  "no-div-regex": "error",
  "no-duplicate-imports": "error",
  "no-extra-semi": "error",
  "no-mixed-spaces-and-tabs": "error",
  "no-native-reassign": "error",
  "no-negated-in-lhs": "error",
  "no-nested-ternary": "error",
  "no-param-reassign": "error",
  "no-unmodified-loop-condition": "error",
  "no-unneeded-ternary": "error",
  "no-unused-vars": [
    "error",
    {
      varsIgnorePattern: "^_",
      ignoreRestSiblings: true,
      args: "none"
    }
  ],
  "no-use-before-define": [
    "error",
    {
      functions: false,
      classes: false
    }
  ]
}
