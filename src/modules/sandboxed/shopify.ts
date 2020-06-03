import { ESLintRules } from "../../types"

export const shopify: ESLintRules = {
  // Lean Shopify Plugin Extensions
  "shopify-lean/jsx-no-complex-expressions": "error",
  "shopify-lean/jsx-no-hardcoded-content": "warn",
  "shopify-lean/prefer-class-properties": "warn",
  "shopify-lean/prefer-early-return": "warn",
  "shopify-lean/jsx-prefer-fragment-wrappers": "warn",
  "shopify-lean/no-namespace-imports": "error",
  "shopify-lean/no-useless-computed-properties": "warn",
  "shopify-lean/no-ancestor-directory-import": "warn",
  "shopify-lean/prefer-module-scope-constants": "warn",
  "shopify-lean/react-no-multiple-render-methods": "warn",
  "shopify-lean/react-prefer-private-members": "warn",
  "shopify-lean/react-type-state": "warn",
  "shopify-lean/restrict-full-import": "warn",
  "shopify-lean/strict-component-boundaries": "warn",
  "shopify-lean/typescript/prefer-singular-enums": "warn"
}
