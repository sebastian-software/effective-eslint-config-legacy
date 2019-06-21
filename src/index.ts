import { Linter } from "eslint"
import restrictedGlobals from "confusing-browser-globals"

import { cra } from "./cra"
import { es6, essential, imports, node, react, variables } from "./airbnb"
import { quality } from "./quality"
import { formatting } from "./formatting"

interface ESLintRules {
  [name: string]: Linter.RuleLevel | Linter.RuleLevelAndOptions
}

interface ESLintEnv {
  [name: string]: boolean
}

interface ESLintOverrides {
  files: string[]
  rules?: ESLintRules
  env?: ESLintEnv
}

interface ESLintConfig extends Linter.Config {
  root: boolean
  plugins: string[]
  extends: string[]
  overrides: ESLintOverrides[]
}

// Add TypeScript specific rules (and turn off ESLint equivalents)
// Via: https://github.com/facebook/create-react-app/blob/7548281aa5a9096f09cd5c9447cb4c21fa96ed4d/packages/eslint-config-react-app/index.js#L71
const tsImprovedCRARules: ESLintRules = {
  "@typescript-eslint/no-angle-bracket-type-assertion": "warn",

  "no-array-constructor": "off",
  "@typescript-eslint/no-array-constructor": "warn",

  "@typescript-eslint/no-namespace": "error",

  "no-use-before-define": "off",
  "@typescript-eslint/no-use-before-define": [
    "warn",
    {
      functions: false,
      classes: false,
      variables: false,
      typedefs: false
    }
  ],

  "no-unused-vars": "off",
  "@typescript-eslint/no-unused-vars": [
    "warn",
    {
      args: "none",
      ignoreRestSiblings: true
    }
  ],

  "no-useless-constructor": "off",
  "@typescript-eslint/no-useless-constructor": "warn"
}

const reactHooksRecommended: ESLintRules = {
  "react-hooks/rules-of-hooks": "error",
  "react-hooks/exhaustive-deps": "warn"
}

const preferFormattingPrettier = [ "prettier", "prettier/@typescript-eslint", "prettier/react" ]

const tsInterationFixes: ESLintRules = {
  // We are fully in TypeScript. PropTypes are not useful anymore.
  "react/prop-types": "off",

  // These are generally a good idea but do not work well with TypeScript usage
  "import/export": "off",
  "no-unexpected-multiline": "off",

  // Conflicts with TypeScript import/export e.g. interfaces
  "import/named": "off"
}

const customRules: ESLintRules = {
  // The ESLint browser environment defines all browser globals as valid,
  // even though most people don't know some of them exist (e.g. `name` or `status`).
  // This is dangerous as it hides accidentally undefined variables.
  // We blacklist the globals that we deem potentially confusing.
  // To use them, explicitly reference them, e.g. `window.name` or `window.status`.
  "no-restricted-globals": [ "error", ...restrictedGlobals ],

  // We are using the import plugin with its ordering capabilities
  // for sorting declarations.
  "sort-imports": [ "error", { ignoreDeclarationSort: true }],

  // Activate our concepts of formatting imports
  "import/order": [
    "error"
    // Disabled for now as it breaks with unknown types (e.g. aliases) right now.
    // See our PR: https://github.com/benmosher/eslint-plugin-import/pull/1375
    // { 'newlines-between': 'always' }
  ],

  // Order with groups are confused by our module-resolver setup.
  // It adds a newline after each import startinng with "-".
  // At very least we like to have a newline between the import and the
  // the actual implementation section.
  "import/newline-after-import": "error",

  // Nowadays we prefer not using default exports, but named ones
  "import/default": "off",

  // Fails with <FormattedNumber style="currency" />
  "react/style-prop-object": "off",

  // This does not help with finding bugs and causes a lot of useless re-ordering.
  "@typescript-eslint/no-use-before-define": "off",

  // This detects the React global as false-positive and doesn't properly
  // understand deliberate exclusions from destructuring.
  "@typescript-eslint/no-unused-vars": "off",

  // This if often necessary in order to initialize typed objects.
  "@typescript-eslint/no-object-literal-type-assertion": "off"
}

const config: ESLintConfig = {
  root: true,

  env: {
    browser: true,
    es6: true,
    node: true,
    "shared-node-browser": true
  },

  settings: {
    "import/resolver": {
      "babel-module": {
        extensions: [ ".js", ".jsx", ".ts", ".tsx", ".json" ],
        alias: {
          "-": "./src/"
        }
      }
    },
    "import/parsers": {
      "@typescript-eslint/parser": [ ".ts", ".tsx" ]
    },
    react: {
      version: "detect"
    }
  },

  parser: "@typescript-eslint/parser",
  plugins: [ "@typescript-eslint", "react-hooks", "prettier", "cypress", "jest" ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:jest/recommended",
    "plugin:cypress/recommended",

    ...preferFormattingPrettier
  ],

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true
    },

    // typescript-eslint specific options
    warnOnUnsupportedTypeScriptVersion: true
  },

  rules: {
    ...reactHooksRecommended,
    ...cra,
    ...essential,
    ...es6,
    ...imports,
    ...node,
    ...variables,
    ...quality,
    ...formatting,
    ...react,
    ...tsImprovedCRARules,
    ...tsInterationFixes,
    ...customRules
  },

  overrides: [
    {
      // Relax a few rules inside tests
      files: [ "*.test.js", "*.test.jsx", "*.test.ts", "*.test.tsx" ],
      env: {
        jest: true,
        "jest/globals": true,
        "cypress/globals": true
      },
      rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "react/display-name": "off",
        "jsx-a11y/click-events-have-key-events": "off"
      }
    },
    {
      // Definition files are typically really TS specific and
      // do not work in the same way as normal TS files.
      files: [ "*.d.ts", "*.d.tsx" ],
      rules: {
        "no-undef": "off",
        "@typescript-eslint/no-unused-vars": "off"
      }
    }
  ]
}

export default config
