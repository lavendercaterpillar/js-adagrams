const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
      corejs: "3.8.0",
    },
  ],
];

const plugins = [
  ["module-resolver", {
    "root": ["./src"]
  }]
];

module.exports = { presets, plugins };
// export default { presets, plugins };
