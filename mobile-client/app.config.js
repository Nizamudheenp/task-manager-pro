import 'dotenv/config';

export default {
  expo: {
    name: "mobile-client",
    slug: "mobile-client",
    version: "1.0.0",
    extra: {
      BACKEND_URL: process.env.BACKEND_URL,
    },
  },
};
