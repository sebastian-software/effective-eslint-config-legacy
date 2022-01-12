import { Linter } from "eslint"

export const relaxed: Linter.RulesRecord = {
  "@typescript-eslint/no-unsafe-member-access": "warn",
  "@typescript-eslint/no-unsafe-assignment": "warn",
  "@typescript-eslint/no-unsafe-call": "warn",
  "@typescript-eslint/no-unsafe-return": "warn",
  "@typescript-eslint/prefer-regexp-exec": "warn",
  "react/prefer-stateless-function": "warn",
  "react/no-unescaped-entities": "warn",
  "prefer-rest-params": "warn",
  "prefer-spread": "warn"
}
