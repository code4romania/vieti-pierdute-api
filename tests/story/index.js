const request = require('supertest');
const axios = require('axios');
const { sanitizeEntity } = require('strapi-utils');
const { omit } = require('lodash');
const storyFactory = require('./factory');
const { grantPrivilege } = require('./../helpers/strapi');

jest.mock('axios');

beforeAll(async (done) => {
  axios.post.mockResolvedValue({ data: { success: true } });
  await Promise.all([
    grantPrivilege(
      2,
      'permissions.application.controllers.story.find'
    ),
    grantPrivilege(
      2,
      'permissions.application.controllers.story.create'
    ),
  ]);
  done();
});

it('should find stories', async (done) => {
  await request(strapi.server)
    .get('/stories')
    .expect(200)
    .then((data) => {
      expect(data.text).toBe('[]');
      done();
    });
});

it('should not return lastName if hasLastNamePrivate is true', async (done) => {
  const requestBody = storyFactory.mockStoryData();
  const expectedResponse = sanitizeEntity(
    omit(
      {
        id: 1,
        ...requestBody,
      },
      'victimLastName'
    ),
    { model: strapi.models.story }
  );
  await request(strapi.server)
    .post('/stories')
    .send({
      ...requestBody,
      hasLastNamePrivate: true,
      recaptcha: 'recaptcha code',
    })
    .then(async () => {
      await request(strapi.server)
        .get('/stories')
        .expect(200)
        .then(async (data) => {
          expect(data.text).toBe(JSON.stringify([expectedResponse]));
          done();
        });
    });
});

it('should create story if data and recaptcha are valid', async (done) => {
  const requestBody = storyFactory.mockStoryData();
  const expectedResponse = sanitizeEntity(
    {
      id: 2,
      ...requestBody,
      image: null,
    },
    { model: strapi.models.story }
  );

  await request(strapi.server)
    .post('/stories')
    .send({
      ...requestBody,
      recaptcha: 'recaptcha code',
    })
    .expect(200)
    .then(async (data) => {
      expect(data.text).toBe(JSON.stringify(expectedResponse));

      await request(strapi.server)
        .get('/stories')
        .expect(200)
        .then(async (data) => {
          expect(data.text).toBe(
            JSON.stringify([
              {
                ...omit(expectedResponse, ['victimLastName']),
                id: 1,
              },
              expectedResponse,
            ])
          );
          done();
        });
    });
});

it('should throw error when try to create story with no data', async (done) => {
  const expectedResponse = storyFactory.badRequest(
    {
      victimFirstName: ['victimFirstName must be defined.'],
      victimLastName: ['victimLastName must be defined.'],
      occupation: ['occupation must be defined.'],
      content: ['content must be defined.'],
      authorFirstName: ['authorFirstName must be defined.'],
      authorLastName: ['authorLastName must be defined.'],
      authorEmail: ['authorEmail must be defined.'],
      authorRelation: ['authorRelation must be defined.'],
      county: ['county must be defined.'],
      city: ['city must be defined.'],
    },
    'ValidationError'
  );

  await request(strapi.server)
    .post('/stories')
    .send({
      recaptcha: 'recaptcha code',
    })
    .expect(400)
    .then((data) => {
      expect(data.text).toBe(JSON.stringify(expectedResponse));
      done();
    });
});

it('should throw error if captcha code is missing', async (done) => {
  const requestBody = storyFactory.mockStoryData();
  const expectedResponse = storyFactory.badRequest(
    {
      recaptcha: ['Captcha must be defined.'],
    },
    'FailedCaptchaScore'
  );

  await request(strapi.server)
    .post('/stories')
    .send({
      requestBody,
    })
    .expect(400)
    .then((data) => {
      expect(data.text).toBe(JSON.stringify(expectedResponse));
      done();
    });
});

it('should throw error if captcha code has expired', async (done) => {
  const requestBody = storyFactory.mockStoryData();
  const expectedResponse = storyFactory.badRequest(
    {
      recaptcha: ['Recaptcha score failed.'],
    },
    'FailedCaptchaScore'
  );

  axios.post.mockResolvedValue({ data: { success: false } });

  await request(strapi.server)
    .post('/stories')
    .send({
      recaptcha: 'recaptcha code',
      ...requestBody,
    })
    .expect(400)
    .then((data) => {
      expect(data.text).toBe(JSON.stringify(expectedResponse));
      done();
    });
});

it("should throw error if google link doesn't work", async (done) => {
  const requestBody = storyFactory.mockStoryData();
  const expectedResponse = storyFactory.badRequest(
    {
      recaptcha: [
        'Recaptcha failed, please try again in a few minutes.',
      ],
    },
    'FailedCaptchaScore'
  );

  axios.post.mockReturnValue(() => {
    throw new Error();
  });

  await request(strapi.server)
    .post('/stories')
    .send({
      recaptcha: 'recaptcha code',
      ...requestBody,
    })
    .expect(400)
    .then((data) => {
      expect(data.text).toBe(JSON.stringify(expectedResponse));
      done();
    });
});
