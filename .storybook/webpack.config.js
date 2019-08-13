const path = require('path')
module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('awesome-typescript-loader'),
    options: { configFileName: path.resolve(__dirname, './tsconfig.json') }, // << added
  })
  config.resolve.extensions.push('.ts', '.tsx')
  // config.node = { fs: 'empty' }
  // config.target = 'node'
  return config
}
