import { ESLintRules } from "../types"

export const unicorn: ESLintRules = {
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
  "unicorn/prefer-string-slice": "warn"
}
