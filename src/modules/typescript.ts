import { configs } from "@typescript-eslint/eslint-plugin"

import { ESLintRules } from "../types"

const recommended = configs.recommended.rules
const recommendedTypes = configs["recommended-requiring-type-checking"].rules

export const typescript: ESLintRules = {
  ...recommended,
  ...recommendedTypes
}
