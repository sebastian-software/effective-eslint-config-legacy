import { Linter } from "eslint"
import { configs } from "@typescript-eslint/eslint-plugin"

import { ESLintRules } from "./types"

const eslintRecommendedBlocked: string[] = []
const eslintRecommendedOverrides = configs["eslint-recommended"].overrides[0].rules

for (const rule in eslintRecommendedOverrides) {
  if (eslintRecommendedOverrides[rule] === "off") {
    eslintRecommendedBlocked.push(rule)
  }
}

export const tsRecommendedReplaced = Object.keys(configs.recommended.rules).filter(
  (name) => !name.startsWith("@typescript-eslint")
)

export const blacklist = new Set([ ...eslintRecommendedBlocked, ...tsRecommendedReplaced ])

export function filterWithBlacklist(rules: ESLintRules): ESLintRules {
  const result: ESLintRules = {}

  for (var rule in rules) {
    if (!blacklist.has(rule)) {
      result[rule] = rules[rule]
    } else {
      console.log("Rule:" + rule + " was filtered by blacklist")
    }
  }

  return result
}

export function isDisabled(value: any) {
  if (value == null) {
    return true
  }

  return getLevel(value) === "off"
}

export function setLevel(value: any, newLevel: Linter.RuleLevel | Linter.RuleLevelAndOptions) {
  if (Array.isArray(value)) {
    const newValue = [ ...value ]
    newValue[0] = newLevel
    return newValue
  } else if (value != null) {
    return newLevel
  }

  return value
}

export function getLevel(value: any) {
  if (!value) {
    return "off"
  }

  return Array.isArray(value) ? value[0] : value
}
