import { rules as reactRules } from "eslint-config-react-app"
import { Linter } from "eslint"

import { blacklist, hasMatchingTypescriptRule, setLevel } from "../../util"

export const cra: Linter.RulesRecord = {}

const flowtypeRules = /^(flowtype\/\S+)$/

// CRA defines some deprecated rules which we filter out for our usage.
// Last tested 2020, June, 02nd
const deprecatedRules = new Set([ "no-native-reassign", "no-negated-in-lhs" ])

function merge(rules: Linter.RulesRecord): void {
  const ruleNames = Object.keys(rules)
  ruleNames.forEach((ruleName: string): void => {
    if (flowtypeRules.test(ruleName) || deprecatedRules.has(ruleName)) {
      return
    }

    let value = rules[ruleName]
    let exportName = ruleName

    // Switch rule state to "error". CRA uses "warn" for errors to
    // not break the build, but to match our infrastructure this would
    // be a bad match. As CRA only reports "error" not e.g. formatting
    // related stuff, we can assume that all the reported issues are
    // actually errors, not warnings.
    cra[exportName] = setLevel(value, "error")
  })
}

merge(reactRules)
