module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '6b6bbc74bfb36b525630e9c1b61527d1'),
  },
});
