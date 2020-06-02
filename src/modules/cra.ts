import { rules } from "eslint-config-react-app"

import { ESLintRules } from "../types"
import { blacklist, hasMatchingTypescriptRule, setLevel } from "../util"

export const cra: ESLintRules = {}

const flowtypeRules = /^(flowtype\/\S+)$/

// CRA defines some deprecated rules which we filter out for our usage.
// Last tested 2020, June, 02nd
const deprecatedRules = new Set([ "no-native-reassign", "no-negated-in-lhs" ])

function merge(data: ESLintRules): void {
  const ruleNames = Object.keys(data)
  ruleNames.forEach((name: string): void => {
    if (flowtypeRules.test(name) || deprecatedRules.has(name)) {
      return
    }

    let value = data[name]
    let exportName = name

    if (blacklist.has(name)) {
      if (hasMatchingTypescriptRule(name)) {
        exportName = `@typescript-eslint/${name}`
      } else {
        return
      }
    }

    // Switch rule state to "error". CRA uses "warn" for errors to
    // not break the build, but to match our infrastructure this would
    // be a bad match. As CRA only reports "error" not e.g. formatting
    // related stuff, we can assume that all the reported issues are
    // actually errors, not warnings.
    cra[exportName] = setLevel(value, "error")
  })
}

merge(rules)
