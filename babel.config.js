module.exports = {
  presets: [
    [ "@babel/env", { targets: { node: 8 } }],
    [ "@babel/preset-typescript", { isTSX: true, allExtensions: true }]
  ],
  plugins: [ "@babel/plugin-transform-runtime" ]
}
