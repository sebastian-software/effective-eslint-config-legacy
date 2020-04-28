import { Linter } from "eslint"
import { configs } from "@typescript-eslint/eslint-plugin"

export const blockedByTS = Object.keys(configs["eslint-recommended"].overrides[0].rules)
export const replacedByTS = Object.keys(configs.recommended.rules).filter(
  (name) => !name.startsWith("@typescript-eslint")
)

export const blacklist = new Set([ ...blockedByTS, ...replacedByTS ])

export function isDisabled(value: any) {
  if (value == null) {
    return true
  }

  const toggle = Array.isArray(value) ? value[0] : value
  return toggle === "off"
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
