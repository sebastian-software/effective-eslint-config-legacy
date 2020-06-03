import { ESLintRules } from "../../types"

export const unicorn: ESLintRules = {
  "unicorn/better-regex": "warn",
  "unicorn/consistent-function-scoping": "warn",
  "unicorn/custom-error-definition": "warn",
  "unicorn/explicit-length-check": "warn",
  "unicorn/filename-case": [ "warn", { cases: { camelCase: true, pascalCase: true } }],
  "unicorn/import-index": "warn",
  "unicorn/new-for-builtins": "error",
  "unicorn/no-array-instanceof": "error",
  "unicorn/no-nested-ternary": "warn",
  "unicorn/no-new-buffer": "error",
  "unicorn/no-unreadable-array-destructuring": "warn",
  "unicorn/no-unsafe-regex": "warn",
  "unicorn/no-zero-fractions": "warn",
  "unicorn/prefer-includes": "warn",
  "unicorn/prefer-set-has": "warn",
  "unicorn/prefer-spread": "warn",
  "unicorn/prefer-starts-ends-with": "warn",
  "unicorn/prefer-string-slice": "warn",
  "unicorn/prefer-type-error": "warn",
  "unicorn/throw-new-error": "error",
  "unicorn/prefer-optional-catch-binding": "warn",
  "unicorn/no-useless-undefined": "warn"
}
