import graphqlConfig from './graphql';

export default {
  apiUrl: 'http://yoursite.com/api/',
};

const {
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_AUTH_CLIENT_ID,
  REACT_APP_AUTH_AUDIENCE,
} = process.env;

const siteConfig = {
  siteName: 'Admin Panel',
  siteIcon: 'ion-flash',
  footerText: '©2018 Isomorphic',
};

const language = 'english';

const Auth0Config = {
  domain: REACT_APP_AUTH_DOMAIN,
  clientID: REACT_APP_AUTH_CLIENT_ID,
  options: {
    closable: false,
    allowedConnections: ['Username-Password-Authentication'],
    auth: {
      responseType: 'token id_token',
      redirectUrl: `${window.location.origin}/auth0loginCallback`,
      audience: REACT_APP_AUTH_AUDIENCE,
    },
    database: {
      loginAfterSignUp: false,
    },
    languageDictionary: {
      title: 'Admin Panel',
      emailInputPlaceholder: 'admin@isomorphic.com',
      passwordInputPlaceholder: 'password',
    },
    theme: {
      logo: 'logo here',
    },
  },
};

export {
  siteConfig,
  language,
  Auth0Config,
  graphqlConfig,
};
