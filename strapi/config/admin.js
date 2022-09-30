module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '1429fd1dfa337b2d51bfec6458f0b967'),
  },
});
