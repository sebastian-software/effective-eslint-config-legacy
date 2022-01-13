import { Linter } from "eslint"

import { typescript } from "./modules/collections/typescript"
import { eslint } from "./modules/collections/eslint"
import { cra } from "./modules/collections/cra"
import { airbnb } from "./modules/collections/airbnb"

import { react } from "./modules/sandboxed/react"
import { jsdoc } from "./modules/sandboxed/jsdoc"
import { unicorn } from "./modules/sandboxed/unicorn"
import { shopify } from "./modules/sandboxed/shopify"

import { quality } from "./modules/quality"
import { formatting } from "./modules/formatting"

import { autofix } from "./modules/relax/autofix"
import { relaxed } from "./modules/relax/relaxed"
import { mergeLevelOverrides, mergeWithWarnings } from "./util"

export function compileRules(): Linter.RulesRecord {
  const combinedRules = {}

  // plugin scope only
  // start with these to allow enhanced variations from collections
  mergeWithWarnings(combinedRules, react, "react")
  mergeWithWarnings(combinedRules, jsdoc, "jsdoc")
  mergeWithWarnings(combinedRules, unicorn, "unicorn")
  mergeWithWarnings(combinedRules, shopify, "shopify")

  // popular collections
  mergeWithWarnings(combinedRules, typescript, "typescript")
  mergeWithWarnings(combinedRules, eslint, "eslint")
  mergeWithWarnings(combinedRules, cra, "cra")
  mergeWithWarnings(combinedRules, airbnb, "airbnb")

  // local settings/overrides
  mergeWithWarnings(combinedRules, quality, "quality", true)
  mergeWithWarnings(combinedRules, formatting, "formatting", true)

  // override/relax level
  mergeLevelOverrides(combinedRules, autofix, "autofix")
  mergeLevelOverrides(combinedRules, relaxed, "relaxed")

  return combinedRules
}

