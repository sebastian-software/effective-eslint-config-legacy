import { rules } from "eslint-config-react-app"

import { ESLintRules } from "../types"

export const cra: ESLintRules = {}

const flowtypeRules = /^(flowtype\/\S+)$/

// CRA defines some deprecated rules which we filter out for our usage.
// Last tested 2020, June, 02nd
const deprecatedRules = new Set([ "no-native-reassign", "no-negated-in-lhs" ])

// These are still defined in CRA but are replaced by TS-enhanced versions in TS parser/plugin.
const typescriptReplaced: { [key: string]: string } = {
  "no-array-constructor": "@typescript-eslint/no-array-constructor",
  "no-use-before-define": "@typescript-eslint/no-use-before-define",
  "no-unused-vars": "@typescript-eslint/no-unused-vars"
}

function merge(data: ESLintRules): void {
  const ruleNames = Object.keys(data)
  ruleNames.forEach((name: string): void => {
    if (flowtypeRules.test(name) || deprecatedRules.has(name)) {
      return
    }

    let value = data[name]

    const exportName = typescriptReplaced[name] || name

    // Switch rule state to "error". CRA uses "warn" for errors to
    // not break the build, but to match our infrastructure this would
    // be a bad match. As CRA only reports "error" not e.g. formatting
    // related stuff, we can assume that all the reported issues are
    // actually errors, not warnings.
    cra[exportName] = setLevel(value, "error")
  })
}

merge(rules)
