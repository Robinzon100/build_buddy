module.exports = {
  webpack: (config, options) => {
    config.module.rules.push(
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: [
          require.resolve('raw-loader'),
          require.resolve('glslify-loader'),
        ]
      }
    )

    return config
  },
}