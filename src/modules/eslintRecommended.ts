import { ESLintRules } from "../types"

// From eslint recommended and not yet alternatively implemented in TS preset
export const eslintRecommended: ESLintRules = {
  "constructor-super": "error",
  "for-direction": "error",
  "no-case-declarations": "error",
  "no-class-assign": "error",
  "no-compare-neg-zero": "error",
  "no-constant-condition": "error",
  "no-debugger": "error",
  "no-empty": "warn",
  "no-extra-boolean-cast": "error",
  "no-inner-declarations": "error",
  "no-irregular-whitespace": "error",
  "no-misleading-character-class": "error",
  "no-prototype-builtins": "error",
  "no-unexpected-multiline": "error",
  "no-unsafe-finally": "error",
  "no-unsafe-negation": "error",
  "no-unused-vars": [
    "error",
    {
      args: "none",
      ignoreRestSiblings: true
    }
  ]
}
