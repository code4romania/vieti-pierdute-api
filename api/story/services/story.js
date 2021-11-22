'use strict';
const { omit } = require('lodash');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async find(params, populate) {
    const results = await strapi
      .query('story')
      .find(params, populate);

    return results.map((story) => {
      if (story.hasLastNamePrivate) {
        return omit(story, 'victimLastName');
      }
      return story;
    });
  },
};
