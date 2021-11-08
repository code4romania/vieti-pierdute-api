const axios = require('axios');
const queryString = require('query-string');

module.exports = async (ctx, next) => {
  const response = ctx.request.body.recaptcha;
  if (!response) {
    return ctx.badRequest('FailedCaptchaScore', {
      errors: {
        recaptcha: ['Captcha must be defined.'],
      },
    });
  }
  const secret = strapi.config.get('server.recaptchaSecret');
  const params = queryString.stringify({ secret, response });
  const url = `https://www.google.com/recaptcha/api/siteverify?${params}`;

  try {
    const { data } = await axios.post(url);
    if (data.success) {
      return next();
    } else {
      return ctx.badRequest('FailedCaptchaScore', {
        errors: {
          recaptcha: ['Recaptcha score failed.'],
        },
      });
    }
  } catch (error) {
    return ctx.badRequest('FailedCaptchaScore', {
      errors: {
        recaptcha: ['Recaptcha failed, please try again in a few minutes.'],
      },
    });
  }
};
