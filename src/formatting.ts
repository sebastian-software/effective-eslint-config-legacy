import { Linter } from "eslint"

interface ESLintRules {
  [name: string]: Linter.RuleLevel | Linter.RuleLevelAndOptions
}

export const formatting: ESLintRules = {
  "array-bracket-spacing": [
    "warn",
    "always",
    {
      objectsInArrays: false
    }
  ],
  "arrow-parens": [ "warn", "always" ],
  camelcase: "warn",
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
  indent: [
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
  "no-multiple-empty-lines": [
    "warn",
    {
      max: 4,
      maxEOF: 1,
      maxBOF: 0
    }
  ],
  "no-trailing-spaces": [ "warn" ],
  "no-unexpected-multiline": "warn",
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
  semi: [ "warn", "never" ],
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
