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

  "no-trailing-spaces": [ "warn" ],
  "object-curly-spacing": [ "warn", "always" ],

  "object-property-newline": [
    "warn",
    {
      allowMultiplePropertiesPerLine: true
    }
  ],

  "one-var-declaration-per-line": [ "warn", "initializations" ],
  "operator-assignment": "warn",
  "operator-linebreak": [ "warn", "after" ],

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

  "@typescript-eslint/indent": [
    "warn",
    2,
    {
      CallExpression: {
        arguments: 1
      },
      FunctionExpression: {
        body: 1,
        parameters: 1
      },
      MemberExpression: 1,
      outerIIFEBody: 0,
      SwitchCase: 1,
      VariableDeclarator: 1
    }
  ],

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
      enforceForArrowConditionals: false,
      ignoreJSX: "all",
      nestedBinaryExpressions: false,
      returnAssign: false
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
