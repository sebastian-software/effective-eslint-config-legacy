import { configs } from "@typescript-eslint/eslint-plugin"

import { ESLintRules } from "../types"

const allRules = configs.recommended.rules

const newRules: ESLintRules = {
  // Via: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md#enforce-the-codebase-follows-eslints-camelcase-conventions
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
  ],

  "@typescript-eslint/ban-ts-comment": "warn"
}

export const typescript: ESLintRules = {
  ...allRules,
  ...newRules
}
