import { overrides, rules } from "eslint-config-react-app"

import { ESLintRules } from "../types"

export const createReactApp: ESLintRules = {}

const blacklistRules = /^(flowtype\/\S+)|(no-native-reassign|no-negated-in-lhs)$/

function addNormalizedRules(data: any): void {
  const ruleNames = Object.keys(data)
  ruleNames.forEach((name): void => {
    if (!blacklistRules.test(name)) {
      let value = data[name]

      // Switch rule state to "error". CRA uses "warn" for errors to
      // not break the build, but to match our infrastructure this would
      // be a bad match. As CRA only reports "error" not e.g. formatting
      // related stuff, we can assume that all the reported issues are
      // actually errors, not warnings.
      if (value instanceof Array && value[0] === "warn") {
        value[0] = "error"
      } else if (value === "warn") {
        value = "error"
      }

      createReactApp[name] = value
    }
  })
}

addNormalizedRules(rules)

// Note: Next version of CRA will use an array, not an object (as specified by ESLint)
// https://github.com/facebook/create-react-app/commit/24489ac0a667af416f1d59dd806dfc2623aabe36
if (overrides.rules) {
  addNormalizedRules(overrides.rules)
}
