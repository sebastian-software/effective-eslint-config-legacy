import { Linter } from "eslint"
import { configs } from "eslint-plugin-react"



const recommended = configs.recommended.rules

const blocked = new Set([
  // TS wins over prop types
  "react/prop-types"
])

export const react: Linter.RulesRecord = {}

for (const ruleName in recommended) {
  if (!blocked.has(ruleName)) {
    react[ruleName] = recommended[ruleName]
  }
}
