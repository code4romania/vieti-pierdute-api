module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "put_your_secret_key_here"),
    },
  },
  cron: {
    enabled: true,
  },
  recaptchaSecret: env("RECAPTCHA_SECRET_KEY", "put_your_secret_key_here"),
});
