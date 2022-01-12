import { Linter } from "eslint"
import resolve from "enhanced-resolve"

type ConfigData = {
  rules: Linter.RulesRecord
}

const req = resolve.create.sync({ exportsFields:[] })

const imported = req(__filename, "eslint/conf/eslint-recommended") as unknown as ConfigData

// From eslint recommended and not yet alternatively implemented in TS preset
export const eslint: Linter.RulesRecord = { ...imported.rules }
