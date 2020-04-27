import { ESLintRules } from "../types"

const MAX_STATEMENTS = 30
const MAX_DEPTH = 4
const MAX_PARAMS = 4

export const quality: ESLintRules = {
  // We are using the import plugin with its ordering capabilities
  // for sorting declarations.
  "sort-imports": [ "error", { ignoreDeclarationSort: true }],

  "id-length": [
    "error",
    {
      exceptions: [
        "i",
        "l",
        "id",
        "fs"
      ],
      max: 40,
      min: 3,
      properties: "never"
    }
  ],

  "linebreak-style": [ "error", "unix" ],

  "max-depth": [
    "error",
    {
      maximum: MAX_DEPTH
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
  "no-param-reassign": "error",
  "no-unmodified-loop-condition": "error",
  "no-unneeded-ternary": "error",

  // Most code bases will want to enforce not using angle-bracket style because
  // it conflicts with JSX syntax, and is confusing when paired with with generic syntax.
  "@typescript-eslint/consistent-type-assertions": [ "error", { assertionStyle: "as" }],

  "no-useless-constructor": "off",
  "@typescript-eslint/no-useless-constructor": "error",

  "@typescript-eslint/no-unused-vars": [
    "error",
    {
      args: "none",
      ignoreRestSiblings: true,
      varsIgnorePattern: "^_"
    }
  ],

  "@typescript-eslint/no-unused-expressions": [
    "error",
    {
      allowShortCircuit: true,
      allowTernary: true,
      allowTaggedTemplates: true
    }
  ],

  "@typescript-eslint/no-use-before-define": [ "error", { classes: false, functions: false }],

  // Replaces rule by new one (original came from the recommended preset it seems)
  "@typescript-eslint/consistent-type-definitions": "error",

  // This does not work well in pure JS environments.
  "@typescript-eslint/explicit-function-return-type": "off",

  // Activate our concepts of formatting imports
  "import/order": [
    "error",
    {
      groups: [ "builtin", "external", "unknown", [ "parent", "sibling", "index" ] ],
      "newlines-between": "always"
    }
  ],

  // Order with groups are confused by our module-resolver setup.
  // It adds a newline after each import startinng with "-".
  // At very least we like to have a newline between the import and the
  // the actual implementation section.
  "import/newline-after-import": "error",

  // Keep in sync with exported symbol name.
  "filenames/match-exported": "warn"
}
