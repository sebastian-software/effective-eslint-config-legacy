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

  "comma-dangle": [ "warn", "never" ],
  "comma-style": [ "warn", "last" ],
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

  "quote-props": [ "warn", "consistent-as-needed" ],

  "linebreak-style": [ "warn", "unix" ],

  "no-trailing-spaces": [ "warn" ],
  "object-curly-spacing": [ "warn", "always" ],

  "padding-line-between-statements": [
    "warn",
    { blankLine: "always", prev: "case", next: "case" },
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

  // Prettier does not allow customization on operator linebreak
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
        "=": "before",
        "+=": "before",
        "-=": "before",
        "*=": "before",
        "**=": "before",
        "/=": "before",
        "%=": "before",
        "+": "before",
        "-": "before",
        "*": "before",
        "**": "before",
        "/": "before",
        "%": "before"
      }
    }
  ],

  // Replaced by @typescript-eslint/naming-convention
  "no-underscore-dangle": "off",

  "@typescript-eslint/space-before-function-paren": [
    "warn",
    {
      anonymous: "never",
      asyncArrow: "always",
      named: "never"
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

  "@typescript-eslint/func-call-spacing": [ "warn", "never" ],

  // The rule is broken right now. We might rely on Prettier only here instead.
  // "@typescript-eslint/indent": "off",

  // "@typescript-eslint/indent": [
  //   "warn",
  //   2,
  //   {
  //     CallExpression: {
  //       arguments: 1
  //     },
  //     FunctionExpression: {
  //       body: 1,
  //       parameters: 1
  //     },
  //     MemberExpression: 1,
  //     outerIIFEBody: 0,
  //     SwitchCase: 1,
  //     VariableDeclarator: 1
  //   }
  // ],

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
      // ignoreEnums: true,
      enforceConst: true,
      ignore: [ -1, 0, 1, 2, 10 ],
      ignoreArrayIndexes: true
    }
  ],

  "@typescript-eslint/semi": [ "warn", "never" ]
}
