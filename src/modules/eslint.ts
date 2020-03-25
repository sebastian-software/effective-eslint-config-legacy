import { ESLintRules } from "../types"

import recommended from "eslint/conf/eslint-recommended"
import { configs } from "@typescript-eslint/eslint-plugin"

// From eslint recommended and not yet alternatively implemented in TS preset
export const eslint: ESLintRules = {}

const allRules = recommended.rules
const blockedByTS = Object.keys(configs["eslint-recommended"].overrides[0].rules)
const replacedByTS = Object.keys(configs.recommended.rules).filter((name) => !name.startsWith("@typescript-eslint"))

const blacklist = new Set([ ...blockedByTS, ...replacedByTS ])

for (const name in allRules) {
  if (!blacklist.has(name)) {
    eslint[name] = allRules[name]
  }
}
