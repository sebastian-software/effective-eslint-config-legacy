// TypeScript Definitions
export const typedefOveride {
  // Definition files are typically really TS specific and
  // do not work in the same way as normal TS files.
  files: [ "*.d.ts", "*.d.tsx" ],
  rules: {
    "no-undef": "off",
    "@typescript-eslint/no-unused-vars": "off"
  }
},
