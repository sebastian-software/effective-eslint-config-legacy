/* eslint-disable @typescript-eslint/naming-convention */

import { ESLintRules } from "../types"

export const formatting: ESLintRules = {
  "array-bracket-spacing": [
    "warn",
    "always",
    {
      objectsInArrays: false
    }
  ],

  "@typescript-eslint/comma-dangle": [ "warn", "never" ],
  "comma-style": [ "warn", "last" ],
  curly: [ "warn", "all" ],
  "func-names": [ "warn", "as-needed" ],

  "func-style": [
    "warn",
    "declaration",
    {
      allowArrowFunctions: true
    }
  ],

  "no-multiple-empty-lines": [
    "warn",
    {
      max: 4,
      maxBOF: 0,
      maxEOF: 1
    }
  ],

  "linebreak-style": [ "warn", "unix" ],

  "no-trailing-spaces": [ "warn" ],
  "@typescript-eslint/object-curly-spacing": [ "warn", "always" ],

  "padding-line-between-statements": [
    "warn",
    { blankLine: "always", prev: "*", next: "case" },
    { blankLine: "always", prev: "default", next: "case" },
    { blankLine: "always", prev: "case", next: "default" },
    { blankLine: "always", prev: "*", next: "try" },
    { blankLine: "always", prev: "*", next: "switch" },
    { blankLine: "always", prev: "*", next: "function" },
    { blankLine: "always", prev: "*", next: "class" },
    { blankLine: "always", prev: "*", next: "for" },
    { blankLine: "always", prev: "*", next: "while" }
  ],

  "object-property-newline": [
    "warn",
    {
      allowMultiplePropertiesPerLine: true
    }
  ],

  "one-var-declaration-per-line": [ "warn", "initializations" ],
  "operator-assignment": "warn",

  // Prettier does not allow customization on operator line break
  // The current behavior is quite discussed intensively and there
  // is some consensus that the best approach would be to follow a
  // Python-inspired behavior. This is what we implement here in ESLint.
  // https://github.com/prettier/prettier/issues/3806
  // https://www.python.org/dev/peps/pep-0008/#should-a-line-break-before-or-after-a-binary-operator
  "operator-linebreak": [
    "warn",
    "after",
    {
      overrides: {
        "+": "before",
        "-": "before",
        "*": "before",
        "**": "before",
        "/": "before",
        "%": "before",
        "?": "before",
        ":": "before"
      }
    }
  ],

  "spaced-comment": [
    "warn",
    "always",
    {
      exceptions: [ "*", "=", "-" ]
    }
  ],

  "wrap-regex": "warn",

  "@typescript-eslint/space-before-function-paren": [
    "warn",
    {
      anonymous: "never",
      asyncArrow: "always",
      named: "never"
    }
  ],

  "@typescript-eslint/func-call-spacing": [ "warn", "never" ],

  "@typescript-eslint/member-delimiter-style": [
    "warn",
    {
      multiline: {
        delimiter: "none",
        requireLast: false
      },
      singleline: {
        delimiter: "semi",
        requireLast: false
      }
    }
  ],

  "@typescript-eslint/no-extra-parens": [
    "warn",
    "all",
    {
      conditionalAssign: true,
      returnAssign: false,
      nestedBinaryExpressions: false,
      ignoreJSX: "all",
      enforceForArrowConditionals: true,
      enforceForSequenceExpressions: true
    }
  ],

  "@typescript-eslint/no-magic-numbers": [
    "warn",
    {
      detectObjects: false,
      ignoreEnums: true,
      enforceConst: true,
      ignore: [ -1, 0, 1, 2, 10 ],
      ignoreArrayIndexes: true
    }
  ],

  "@typescript-eslint/type-annotation-spacing": "warn",

  "@typescript-eslint/naming-convention": [
    "error",
    {
      selector: "default",
      format: [ "camelCase" ]
    },

    {
      selector: "function",
      format: [ "PascalCase", "camelCase" ]
    },

    {
      selector: "variable",
      format: [ "PascalCase", "camelCase", "UPPER_CASE" ]
    },

    {
      selector: "parameter",
      format: [ "PascalCase", "camelCase" ],
      leadingUnderscore: "allow"
    },

    {
      selector: "memberLike",
      format: [ "PascalCase", "camelCase", "UPPER_CASE" ]
    },

    {
      selector: "typeLike",
      format: [ "PascalCase" ]
    }
  ]
}
