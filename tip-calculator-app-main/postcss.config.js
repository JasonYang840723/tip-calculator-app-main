module.exports = {
  plugins: [
    require('postcss-preset-env')({
      browsers: 'last 2 versions',
    }),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
  ],
}
