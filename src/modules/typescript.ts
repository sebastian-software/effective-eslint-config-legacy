import { configs } from "@typescript-eslint/eslint-plugin"

import { ESLintRules } from "../types"

export const typescript: ESLintRules = {}

const allRules = configs.recommended.rules

const oldRuleNames = new Set([
  "@typescript-eslint/camelcase",
  "@typescript-eslint/class-name-casing",
  "@typescript-eslint/interface-name-prefix",
  "@typescript-eslint/ban-ts-ignore"
])

const newRules: ESLintRules = {
  // Via: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md#enforce-the-codebase-follows-eslints-camelcase-conventions
  "@typescript-eslint/naming-convention": [
    "error",
    {
      selector: "default",
      format: [ "camelCase" ]
    },

    {
      selector: "variable",
      format: [ "camelCase", "UPPER_CASE" ]
    },
    {
      selector: "parameter",
      format: [ "camelCase" ],
      leadingUnderscore: "allow"
    },

    {
      selector: "memberLike",
      modifiers: [ "private" ],
      format: [ "camelCase" ],
      leadingUnderscore: "require"
    },

    {
      selector: "typeLike",
      format: [ "PascalCase" ]
    }
  ],

  "@typescript-eslint/ban-ts-comment": "warn"
}

for (const name in allRules) {
  // "Funnily" the recommended preset lists deprecated rules
  if (name in oldRuleNames) {
    continue
  }

  typescript[name] = allRules[name]
}

for (const name in newRules) {
  typescript[name] = newRules[name]
}
