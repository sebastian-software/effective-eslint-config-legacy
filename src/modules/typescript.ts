import { configs } from "@typescript-eslint/eslint-plugin"

import { ESLintRules } from "../types"

export const typescript: ESLintRules = {}

const allRules = configs.recommended.rules

for (const name in allRules) {
  typescript[name] = allRules[name]
}
