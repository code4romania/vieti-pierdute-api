module.exports = ({ env }) => ({
  settings: {
    cache: {
      enabled: true,
      populateContext: true,
      clearRelatedCache: true,
      models: ['banners', 'pages', 'stories']
    }
  }
});
