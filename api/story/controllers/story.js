'use strict';
const { sanitizeEntity } = require('strapi-utils');
const { omit } = require('lodash');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.story.search(ctx.query);
    } else {
      entities = await strapi.services.story.find(ctx.query);
    }

    return entities.map((entity) => {
      const story = sanitizeEntity(entity, {
        model: strapi.models.story,
      });
      if (entity.hasLastNamePrivate) {
        return omit(story, 'victimLastName');
      }
      return story;
    });
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.story.findOne({ id });
    const story = sanitizeEntity(entity, {
      model: strapi.models.story,
    });
    if (entity.hasLastNamePrivate) {
      return omit(story, 'victimLastName');
    }
    return story;
  },
};
