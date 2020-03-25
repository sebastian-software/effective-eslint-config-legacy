import qualityRules from 'eslint-config-airbnb-base/rules/best-practices'
import errorRules from 'eslint-config-airbnb-base/rules/errors'
import nodeRules from 'eslint-config-airbnb-base/rules/node'
// import styleRules from 'eslint-config-airbnb-base/rules/style'
import varRules from 'eslint-config-airbnb-base/rules/variables'
import es6Rules from 'eslint-config-airbnb-base/rules/es6'
// import importRules from 'eslint-config-airbnb-base/rules/imports'
import strictRules from 'eslint-config-airbnb-base/rules/strict'

import { ESLintRules } from "../types"
import { blacklist } from "../util"

const unwantedValues = new Set(["eqeqeq", "array-callback-return", "no-restricted-globals"])

const basicallyUnchanged = new Set(["no-global-assign", "no-labels"])

export const airbnb: ESLintRules = {}

function merge(rules) {
  for (const name in rules) {
    if (basicallyUnchanged.has(name) || unwantedValues.has(name)) {
      return
    }

    if (blacklist.has(name)) {
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
// merge(importRules.rules)
merge(strictRules.rules)
