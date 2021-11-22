'use strict';
const { isDraft } = require('strapi-utils').contentTypes;
const { omit, set } = require('lodash');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async create(data, { files } = {}) {
    const storyModel =
      !data.hasLastNamePrivate && !data.victimLastName ?
        set(strapi.models.story, 'attributes.victimLastName.required', true) :
        strapi.models.story;

    const validData =
      await strapi.entityValidator.validateEntityCreation(
        storyModel,
        data,
        { isDraft: isDraft(data, storyModel) }
      );

    const entry = await strapi.query('story').create(validData);

    if (files) {
      await strapi.entityService.uploadFiles(entry, files, {
        model: 'story',
      });
      return this.findOne({ id: entry.id });
    }

    return entry;
  },

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
