const config = {
  common: {
    auth0: {
      auth0endpoint: process.env.AUTH0_ENDPOINT,
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      metaRedirect: process.env.META_URI,
      auth0domain: process.env.AUTH0_DOMAIN,
      auth0audience: process.env.AUTH0_AUDIENCE
    }
  }
};

module.exports = { config };
