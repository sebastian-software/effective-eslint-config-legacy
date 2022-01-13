import { Linter } from "eslint"
import resolve from "enhanced-resolve"

type ConfigData = {
  rules: Linter.RulesRecord
}

const req = resolve.create.sync({ exportsFields: [] })
const resolved = req(__filename, "eslint/conf/eslint-recommended")

if (!resolved) {
  throw new Error("Unable to load eslint:recommended preset!")
}

// eslint-disable-next-line import/no-dynamic-require, @typescript-eslint/no-var-requires
const parsed: ConfigData = require(resolved)

// From eslint recommended and not yet alternatively implemented in TS preset
export const eslint: Linter.RulesRecord = parsed.rules
