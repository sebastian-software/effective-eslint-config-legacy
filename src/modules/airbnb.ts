import qualityRules from "eslint-config-airbnb-base/rules/best-practices"
import errorRules from "eslint-config-airbnb-base/rules/errors"
import nodeRules from "eslint-config-airbnb-base/rules/node"
// import styleRules from 'eslint-config-airbnb-base/rules/style'
import varRules from "eslint-config-airbnb-base/rules/variables"
import es6Rules from "eslint-config-airbnb-base/rules/es6"
import importRules from "eslint-config-airbnb-base/rules/imports"
import strictRules from "eslint-config-airbnb-base/rules/strict"

import react from "eslint-config-airbnb/rules/react"
import reactHooks from "eslint-config-airbnb/rules/react-hooks"
import reactAccessibility from "eslint-config-airbnb/rules/react-a11y"

import { ESLintRules } from "../types"
import { blacklist, isDisabled } from "../util"

// This list contains value we do not accept. These often times overwrite values from other configs where we
// prefer the original value
const unwantedValues = new Set([
  "eqeqeq", // -> disables smart mode
  "array-callback-return",
  "no-restricted-globals",
  "jsx-a11y/aria-role",
  "jsx-quotes" // -> solved by prettier
])

// This list contains propertied which do not add real changes. There might be some empty array here, which
// is not defined in the original definition and such things. These are not changing the behavior of eslint at all.
const basicallyUnchanged = new Set([
  "no-global-assign",
  "no-labels",
  "jsx-a11y/anchor-has-content"
])

export const airbnb: ESLintRules = {}

function merge(rules: ESLintRules): void {
  for (const name in rules) {
    if (blacklist.has(name) || basicallyUnchanged.has(name) || unwantedValues.has(name)) {
      return
    }

    if (isDisabled(rules[name])) {
      return
    }

    airbnb[name] = rules[name]
  }
}

merge(qualityRules.rules)
merge(errorRules.rules)
merge(nodeRules.rules)
// merge(styleRules.rules)
merge(varRules.rules)
merge(es6Rules.rules)
merge(importRules.rules)
merge(strictRules.rules)
merge(react.rules)
merge(reactHooks.rules)
merge(reactAccessibility.rules)
