module.exports = ({ env }) => ({
  settings: {
    cache: {
      enabled: false,
      populateContext: true,
      clearRelatedCache: true,
      models: ['banners', 'pages', 'stories']
    }
  }
});
