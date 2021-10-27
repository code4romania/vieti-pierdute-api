module.exports = {
  webpack: (config, webpack) => {
    const definePlugin = new webpack.DefinePlugin({
      DATE_LA_ZI_API: JSON.stringify(process.env.DATE_LA_ZI_API),
    });
    config.plugins.push(definePlugin);
    return config;
  },
};
