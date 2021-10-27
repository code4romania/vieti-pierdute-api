module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '389cf8f68b0080669e4634d47577a8af'),
    },
  },
  cron: {
    enabled: true
  }
});
