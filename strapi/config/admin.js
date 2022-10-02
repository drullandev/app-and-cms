module.exports = ({ env }) => ({
  apiToken: {
    salt: env('API_TOKEN_SALT', '9gmek21dTpg6Q1iKhmvovQ=='),
  },
  auth: {
    secret: env('ADMIN_JWT_SECRET', '6b6bbc74bfb36b525630e9c1b61527d1'),
  },
});
