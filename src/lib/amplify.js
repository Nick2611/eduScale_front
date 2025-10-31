import { Amplify } from 'aws-amplify';

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
    region: 'us-east-1',
    userPoolId: 'us-east-1_bjEr5VsLF',
    userPoolWebClientId: '2lrf45k9iseeoa7umn702b4v7o',
    oauth: {
      domain: 'eduscale.auth.us-east-1.amazoncognito.com',
      scope: ['openid', 'email', 'profile'],
      redirectSignIn,
      redirectSignOut,
      responseType: 'code' // PKCE
    }
  }
};

Amplify.configure(amplifyConfig);


