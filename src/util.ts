import fs from "fs"

import { Linter } from "eslint"
import { configs, rules as tsrules } from "@typescript-eslint/eslint-plugin"

const DEBUG_ESLINT = process.env.DEBUG_ESLINT

const eslintRecommendedBlocked: string[] = []
const eslintRecommendedOverrides = configs["eslint-recommended"]?.overrides

if (eslintRecommendedOverrides) {
  const overrideRules = eslintRecommendedOverrides[0].rules
  if (overrideRules) {
    for (const rule in eslintRecommendedOverrides) {
      if (overrideRules[rule] === "off") {
        eslintRecommendedBlocked.push(rule)
      }
    }
  }
}

export const tsRecommendedReplaced = Object.keys(configs.recommended.rules || {}).filter(
  (name) => !name.startsWith("@typescript-eslint")
)

export const blacklist = new Set([ ...eslintRecommendedBlocked, ...tsRecommendedReplaced ])

export function hasMatchingTypescriptRule(name: string): boolean {
  return !!tsrules[name]
}

export function filterWithBlacklist(rules: Linter.RulesRecord): Linter.RulesRecord {
  const result: Linter.RulesRecord = {}

  for (let rule in rules) {
    if (!blacklist.has(rule)) {
      result[rule] = rules[rule]
    } else if (DEBUG_ESLINT) {
      // console.log(`Rule ${rule} was filtered by blacklist!`)
    }
  }

  return result
}

export function setLevel(value: any, newLevel: Linter.RuleLevel | Linter.RuleLevelAndOptions) {
  if (Array.isArray(value)) {
    const newValue = [ ...value ]
    newValue[0] = newLevel
    return newValue
  }
  if (value != null) {
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

type LevelMap = {
  [key: number]: Linter.RuleLevel
}

const levelMap: LevelMap = {
  0: "off",
  1: "warn",
  2: "error"
}

export function humanifyLevel(value: any) {
  const oldLevel = getLevel(value)
  if (typeof oldLevel === "string") {
    return value
  }

  const newLevel = levelMap[oldLevel]
  return newLevel ? setLevel(value, levelMap[oldLevel]) : value
}

export function isDisabled(value: any) {
  if (value == null) {
    return true
  }

  return getLevel(value) === "off"
}

type Dict = { [key: string]: any }

// Relatively simple solution for having sorted JSON keys
// This is required to unify configs from different locations for correct comparison.
export function sortReplacer(key: string, value: Dict): Dict {
  if (value == null || value.constructor !== Object) {
    return value
  }

  const keys = Object.keys(value)
  keys.sort()

  const result: Dict = {}
  keys.forEach((name) => {
    result[name] = value[name]
  })
  return result
}

// eslint-disable-next-line complexity
export function mergeWithWarnings(combinedRules: Linter.RulesRecord, rules: Partial<Linter.RulesRecord> | undefined, name: string, warnLocale = false) {
  if (!rules) {
    throw new Error("Invalid rules to merge!")
  }

  for (const ruleName in rules) {
    let ruleValue = rules[ruleName]

    // Filter entries without actual value
    if (!ruleValue) {
      continue
    }

    // Simplify value
    if (Array.isArray(ruleValue) && ruleValue.length === 1) {
      ruleValue = ruleValue[0]
    }

    // If new and old value are both disabled, then we do not need to
    // store anything here.
    if (isDisabled(combinedRules[ruleName]) && isDisabled(rules[ruleName])) {
      if (DEBUG_ESLINT) {
        console.log(`Module ${name}: Defines disabled ${ruleName}! Dropping...`)
      }
      continue
    }

    let exportRuleName = ruleName

    // Take care of rules blocked by TS plugin and adjust to new replaced name
    // if that is possible.
    if (hasMatchingTypescriptRule(ruleName)) {
      exportRuleName = `@typescript-eslint/${ruleName}`
      if (DEBUG_ESLINT || warnLocale) {
        console.log(`Module ${name}: Adjusting rule name: ${ruleName} => ${exportRuleName}`)
      }
    } else if (blacklist.has(ruleName)) {
      continue
    }

    if (exportRuleName in combinedRules) {
      const ruleOldValue = combinedRules[exportRuleName]

      if (ruleOldValue) {
        const oldValue = JSON.stringify(ruleOldValue, sortReplacer, 2)
        const newValue = JSON.stringify(ruleValue, sortReplacer, 2)

        if (newValue === oldValue) {
          if (warnLocale && DEBUG_ESLINT) {
            console.log(
              `Module ${name}: Defines identical value for ${exportRuleName}! Dropping...`
            )
          }
          continue
        }

        if (DEBUG_ESLINT) {
          console.log(
            `Module ${name}: Overrides ${exportRuleName}: ${oldValue} => ${newValue}`
          )
        }
      }
    }

    combinedRules[exportRuleName] = humanifyLevel(ruleValue)
  }
}

export function mergeLevelOverrides(combinedRules: Linter.RulesRecord, rules: Linter.RulesRecord, name: string) {
  for (const rule in rules) {
    if (!rules[rule]) {
      continue
    }

    if (rule in combinedRules) {
      const oldValue = combinedRules[rule]
      if (isDisabled(oldValue)) {
        if (DEBUG_ESLINT) {
          console.log(
            `Module ${name}: Level override for previously disabled rule: ${rule}. Dropping...`
          )
        }
        continue
      }

      combinedRules[rule] = setLevel(oldValue, rules[rule])
    } else if (DEBUG_ESLINT) {
      console.log(
        `Module ${name}: Level override for previously unconfigured rule: ${rule}. Dropping...`
      )
    }
  }
}

export function writeDefaultProjectConfig(projectConfig: string) {
  fs.writeFileSync(
    projectConfig,
    JSON.stringify(
      {
        lib: [ "dom", "dom.iterable", "esnext" ],
        allowJs: true,
        skipLibCheck: true,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        strict: true,
        module: "esnext",
        moduleResolution: "node",
        resolveJsonModule: true,
        jsx: "react"
      },
      null,
      2
    ),
    { encoding: "utf-8" }
  )
}
