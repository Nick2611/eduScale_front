import { Amplify } from 'aws-amplify';
import 'aws-amplify/auth/enable-oauth-listener';

// Detectar si estamos en desarrollo o producción
const isLocalhost = 
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname === '';

const productionRedirect = 'https://main.dh3o7wiuhouxx.amplifyapp.com/';
const developmentRedirect = 
  `${window.location.protocol}//${window.location.host}/`;

const redirectSignIn = isLocalhost ? developmentRedirect : productionRedirect;
const redirectSignOut = isLocalhost ? developmentRedirect : productionRedirect;

const amplifyConfig = {
  Auth: {
    Cognito: {
      region: 'us-east-1',
      userPoolId: 'us-east-1_bjEr5VsLF',
      userPoolClientId: '2lrf45k9iseeoa7umn702b4v7o',
      loginWith: {
        oauth: {
          domain: 'eduscale.auth.us-east-1.amazoncognito.com',
          scopes: ['openid', 'email', 'profile'],
          redirectSignInUri: redirectSignIn,
          redirectSignOutUri: redirectSignOut,
          responseType: 'code'
        }
      }
    }
  }
};

Amplify.configure(amplifyConfig);


