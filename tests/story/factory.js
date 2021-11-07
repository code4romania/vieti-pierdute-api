/**
 * Default data that factory use
 */
const defaultData = {
  victimFirstName: 'Tressa',
  victimLastName: 'Stefan',
  occupation: 'Senior Paradigm Coordinator',
  age: '43',
  content:
    'Sed incidunt iusto odio neque iure. Qui et vel vero deserunt ' +
    'libero qui. Quam incidunt aut odit nobis temporibus dolores error ' +
    'possimus. Suscipit optio saepe et veritatis quisquam tempore quia' +
    ' dolor. Explicabo modi molestias facilis ipsam.\n \rMinima et ' +
    'soluta voluptatibus nesciunt repudiandae quo pariatur nihil suscipit.' +
    ' Aut cupiditate doloremque. Et id corrupti fuga quam odit. Totam harum ' +
    'eligendi beatae aliquam non culpa quisquam. Quia sed libero ' +
    'repellat rerum iusto molestiae a sed et.\n \rIllum vitae non ' +
    'tempora doloremque ut necessitatibus hic. Maiores quia incidunt ' +
    'est. Quibusdam blanditiis laudantium deserunt qui accusantium eum' +
    ' porro provident. Accusantium magnam corrupti. Sit voluptate veniam ' +
    'est et expedita fugiat animi. Velit totam quo quam sequi dolor aut ' +
    'architecto iste.',
  authorFirstName: 'Carmine',
  authorLastName: 'Stoica',
  authorEmail: 'Marjolaine66@gmail.com',
  county: 'Neamt',
  city: 'Bihor',
};

/**
 * Returns random username object for user creation
 * @param {object} options that overwrites default options
 * @return {object} object that is used with
 * `strapi.plugins["story"].services.story.create`
 */
const mockStoryData = (options = {}) => {
  return {
    ...defaultData,
    ...options,
  };
};
/**
 * Creates new user in strapi database
 * @param {object} strapi, instance of strapi
 * @param {object} data that overwrites default options
 * @return {object} object of new created story, fetched from database
 */
const createStory = async (strapi, data) => {
  /** Creates a new user an push to database */
  return await strapi.plugins['story'].services.story.create({
    ...(data || mockStoryData()),
  });
};

const badRequest = (errors) => ({
  statusCode: 400,
  error: 'Bad Request',
  message: 'FailedCaptchaScore',
  data: {
    errors,
  },
});

module.exports = {
  mockStoryData,
  createStory,
  defaultData,
  badRequest,
};
