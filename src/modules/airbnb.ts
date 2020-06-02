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
  "array-callback-return",
  "no-restricted-globals",
  "no-else-return",

  "import/prefer-default-export", // named exports are much better
  "import/no-extraneous-dependencies", // does not work well in mono repos

  "jsx-a11y/aria-role",

  "react/prefer-es6-class",
  "react/jsx-props-no-spreading",
  "react/jsx-no-bind",

  // Have different opinion here
  "no-console", // a little too strict, okay when used rarely
  "guard-for-in", // not that relevant anymore in todays JS
  "class-methods-use-this", // content too ReactJS specific
  "prefer-const", // there were some articles critical on const. TODO
  "eqeqeq", // smart mode disabled here which is not good

  // Focused on older pre-hook React
  "react/forbid-foreign-prop-types",
  "react/forbid-prop-types",
  "react/no-redundant-should-component-update",
  "react/no-unused-prop-types",
  "react/no-unused-state",
  "react/no-will-update-set-state",

  // Better solved by TS
  "consistent-return",
  "react/prop-types",
  "react/require-default-props",

  // Deprecated in ESLint v7
  "global-require",
  "no-buffer-constructor",
  "no-new-require",
  "no-path-concat",

  // Solved by Prettier
  "curly",
  "jsx-quotes",
  "vars-on-top",
  "wrap-iife",
  "yoda",
  "yield-star-spacing",
  "react/jsx-closing-bracket-location",
  "react/jsx-closing-tag-location",
  "react/jsx-curly-newline",
  "react/jsx-curly-spacing",
  "react/jsx-equals-spacing",
  "react/jsx-filename-extension",
  "react/jsx-first-prop-new-line",
  "react/jsx-indent",
  "react/jsx-indent-props",
  "react/jsx-max-props-per-line",
  "react/jsx-props-no-multi-spaces",
  "react/jsx-tag-spacing",
  "react/jsx-wrap-multilines",
  "react/sort-comp",
  "react/state-in-constructor",
  "react/static-property-placement"
])

// This list contains properties which do not add real changes. There might be some empty array here, which
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
      continue
    }

    if (isDisabled(rules[name])) {
      continue
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

console.log("XXX TEST:", airbnb["no-confusing-arrow"])
