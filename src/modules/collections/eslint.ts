import { readFileSync } from "fs"

import { Linter } from "eslint"
import resolve from "enhanced-resolve"

type ConfigData = {
  rules?: Linter.RulesRecord
}

const req = resolve.create.sync({ exportsFields: [] })

const resolved = req(__filename, "eslint/conf/eslint-recommended")
const parsed: ConfigData = resolved
  ? (JSON.parse(readFileSync(resolved, "utf-8")) as ConfigData)
  : {}
const rules: Linter.RulesRecord = parsed.rules || {}

// From eslint recommended and not yet alternatively implemented in TS preset
export const eslint: Linter.RulesRecord = rules
