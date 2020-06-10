import { ESLintRules } from "../types"

const MAX_STATEMENTS = 30
const MAX_DEPTH = 4
const MAX_PARAMS = 3
const MAX_COMPLEXITY = 15

export const quality: ESLintRules = {
  // We are using the import plugin with its ordering capabilities
  // for sorting declarations.
  "sort-imports": [ "error", { ignoreDeclarationSort: true }],

  "id-length": [
    "error",
    {
      exceptions: [ "i", "l", "id", "fs" ],
      max: 40,
      min: 3,
      properties: "never"
    }
  ],

  complexity: [ "error", { max: MAX_COMPLEXITY }],

  "max-depth": [
    "error",
    {
      maximum: MAX_DEPTH
    }
  ],

  "no-empty": [
    "error",
    {
      allowEmptyCatch: true
    }
  ],

  "max-params": [ "error", MAX_PARAMS ],

  "max-statements": [
    "error",
    MAX_STATEMENTS,
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
  "no-nested-ternary": "error",
  "no-unmodified-loop-condition": "error",
  "no-unneeded-ternary": "error",
  "no-import-assign": "error",
  "no-setter-return": "error",
  "default-case-last": "error",

  // Most code bases will want to enforce not using angle-bracket style because
  // it conflicts with JSX syntax, and is confusing when paired with with generic syntax.
  "@typescript-eslint/consistent-type-assertions": [ "error", { assertionStyle: "as" }],

  // Waiting for scope manager. Too many issues in current version.
  // As of June-2020. https://github.com/typescript-eslint/typescript-eslint/issues/1856
  "@typescript-eslint/no-unused-vars": "off",

  "@typescript-eslint/no-unused-expressions": [
    "error",
    {
      allowShortCircuit: true,
      allowTernary: true,
      allowTaggedTemplates: true
    }
  ],

  // Variable checks are mostly okay. Mix between airbnb and cra.
  "@typescript-eslint/no-use-before-define": [ "error", { classes: false, functions: false }],

  // Replaces rule by new one (original came from the recommended preset it seems)
  "@typescript-eslint/consistent-type-definitions": "error",

  // Activate our concepts of formatting imports
  "import/order": [
    "error",
    {
      groups: [ "builtin", "external", "unknown", [ "parent", "sibling", "index" ] ],
      "newlines-between": "always"
    }
  ],

  "import/extensions": [
    "error",
    "ignorePackages",
    {
      js: "never",
      jsx: "never",
      mjs: "never",
      ts: "never",
      tsx: "never"
    }
  ],

  // That rule is far to inflexible to be useful. In some
  // situations it might be a good idea to use that approach, but not
  // in all. Moving that responsibility to the developers
  "react/destructuring-assignment": "off",

  // Keep in sync with exported symbol name.
  "filenames/match-exported": "warn"
}
