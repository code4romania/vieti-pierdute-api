module.exports = {
  webpack: (config, webpack) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        DATE_LA_ZI_API: JSON.stringify(process.env.DATE_LA_ZI_API)
      })
    );
    return config;
  },
};
