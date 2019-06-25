import { ESLintRules } from "./types"

export const formatting: ESLintRules = {
  indent: "off",
  "@typescript-eslint/indent": [
    "warn",
    2,
    {
      SwitchCase: 1,
      VariableDeclarator: 1,
      outerIIFEBody: 0,
      MemberExpression: 1,
      FunctionExpression: {
        body: 1,
        parameters: 1
      },
      CallExpression: {
        arguments: 1
      }
    }
  ],

  camelcase: "off",
  "@typescript-eslint/camelcase": "warn",

  semi: "off",
  "@typescript-eslint/semi": [ "warn", "never" ],

  "no-magic-numbers": "off",
  "@typescript-eslint/no-magic-numbers": [
    "warn",
    {
      ignore: [ 0, 1, 2, 10 ],
      ignoreArrayIndexes: true,
      // ignoreEnums: true,
      enforceConst: true,
      detectObjects: false
    }
  ],

  "@typescript-eslint/no-extra-parens": [
    "warn",
    "all",
    {
      conditionalAssign: true,
      nestedBinaryExpressions: false,
      returnAssign: false,
      ignoreJSX: "all",
      enforceForArrowConditionals: false
    }
  ],

  "func-call-spacing": "off",
  "@typescript-eslint/func-call-spacing": [ "warn", "never" ],

  "@typescript-eslint/class-name-casing": "warn",

  "array-bracket-spacing": [
    "warn",
    "always",
    {
      objectsInArrays: false
    }
  ],
  "arrow-parens": [ "warn", "always" ],
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
      maxEOF: 1,
      maxBOF: 0
    }
  ],
  "no-trailing-spaces": [ "warn" ],
  "no-whitespace-before-property": "warn",
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
  "space-before-function-paren": [
    "warn",
    {
      named: "never",
      anonymous: "never",
      asyncArrow: "always"
    }
  ],
  "spaced-comment": [
    "warn",
    "always",
    {
      exceptions: [ "*", "=", "-" ]
    }
  ]
}
