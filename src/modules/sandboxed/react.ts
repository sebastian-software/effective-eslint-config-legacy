import { configs } from "eslint-plugin-react"

import { ESLintRules } from "../../types"

const recommended = configs.recommended.rules

const blocked = new Set([
  // TS wins over prop types
  "react/prop-types"
])

export const react: ESLintRules = {}

for (const ruleName in recommended) {
  if (!blocked.has(ruleName)) {
    react[ruleName] = recommended[ruleName]
  }
}
