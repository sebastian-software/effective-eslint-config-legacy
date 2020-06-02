import { Linter } from "eslint"
import { configs } from "@typescript-eslint/eslint-plugin"

import { ESLintRules } from "./types"

export const blockedByTS = Object.keys(configs["eslint-recommended"].overrides[0].rules)
export const replacedByTS = Object.keys(configs.recommended.rules).filter(
  (name) => !name.startsWith("@typescript-eslint")
)

export const blacklist = new Set([ ...blockedByTS, ...replacedByTS ])

export function filterWithBlacklist(rules: ESLintRules): ESLintRules {
  const result: ESLintRules = {}

  for (var rule in rules) {
    if (!blacklist.has(rule)) {
      result[rule] = rules[rule]
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
