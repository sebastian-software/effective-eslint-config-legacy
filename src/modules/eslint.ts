import { ESLintRules } from "../types"
import { blacklist } from "../util"

import recommended from "eslint/conf/eslint-recommended"

// From eslint recommended and not yet alternatively implemented in TS preset
export const eslint: ESLintRules = {}

const allRules = recommended.rules

for (const name in allRules) {
  if (!blacklist.has(name)) {
    eslint[name] = allRules[name]
  }
}
