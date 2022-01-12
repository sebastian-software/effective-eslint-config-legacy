import { Linter } from "eslint"
import { configs } from "@typescript-eslint/eslint-plugin"

const recommended = configs.recommended.rules || {}
const recommendedTypes = configs["recommended-requiring-type-checking"].rules || {}

export const typescript = {
  ...recommended,
  ...recommendedTypes
} as Linter.RulesRecord
