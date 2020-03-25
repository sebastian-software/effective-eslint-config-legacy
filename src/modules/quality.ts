import { ESLintRules } from "../types"

const MAX_STATEMENTS = 30
const MAX_DEPTH = 4
const MAX_PARAMS = 4

export const quality: ESLintRules = {
  // Most code bases will want to enforce not using angle-bracket style because
  // it conflicts with JSX syntax, and is confusing when paired with with generic syntax.
  "@typescript-eslint/consistent-type-assertions": [ "error", { assertionStyle: "as" }],
  "@typescript-eslint/no-useless-constructor": "error",

  // We are using the import plugin with its ordering capabilities
  // for sorting declarations.
  "sort-imports": [ "error", { ignoreDeclarationSort: true }],

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

  // Don't allow dashes or underscores.
  // Replaced by "unicorn/filename-case"
  // "filenames/match-regex": [ "error", "^[a-zA-Z][a-zA-Z0-9.]+$" ],

  // Keep in sync with exported symbol name.
  "filenames/match-exported": "error",

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

  // This does not work well in JS environments.
  "@typescript-eslint/explicit-function-return-type": "off",



  // Lean Shopify Plugin Extensions
  "shopify-lean/jsx-no-complex-expressions": "error",
  "shopify-lean/jsx-no-hardcoded-content": "warn",
  "shopify-lean/prefer-class-properties": "warn",
  "shopify-lean/prefer-early-return": "warn",

  // Unicorn Plugin Extensions
  "unicorn/no-array-instanceof": "error",
  "unicorn/no-new-buffer": "error",
  "unicorn/no-unsafe-regex": "error",
  "unicorn/no-zero-fractions": "warn",
  "unicorn/prefer-includes": "warn",
  "unicorn/prefer-starts-ends-with": "warn",
  "unicorn/regex-shorthand": "warn",
  "unicorn/throw-new-error": "error",
  "unicorn/consistent-function-scoping": "warn",
  "unicorn/custom-error-definition": "error",
  "unicorn/filename-case": [
    "warn",
    {
      cases: {
        camelCase: true,
        pascalCase: true
      }
    }
  ],
  "unicorn/explicit-length-check": "warn",
  "unicorn/new-for-builtins": "error",
  "unicorn/no-nested-ternary": "warn",
  "unicorn/prefer-type-error": "error",
  "unicorn/prefer-string-slice": "warn",

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
  "no-unneeded-ternary": "error"
}
