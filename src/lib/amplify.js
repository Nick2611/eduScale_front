// src/lib/amplify.js
import { Amplify } from 'aws-amplify';
import { fetchAuthSession } from 'aws-amplify/auth';
import { getCurrentUser, signInWithRedirect, signOut } from 'aws-amplify/auth/cognito';

const localRedirect = `${window.location.origin}/`;
const prodRedirect  = 'https://main.dh3o7wiuhouxx.amplifyapp.com/';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_bjEr5VsLF',
      userPoolClientId: '2lrf45k9iseeoa7umn702b4v7o',
      region: 'us-east-1'
    },
    loginWith: {
      oauth: {
        domain: 'eduscale.auth.us-east-1.amazoncognito.com',
        scopes: ['openid', 'email', 'profile'],
        redirectSignIn: [localRedirect, prodRedirect],
        redirectSignOut: [localRedirect, prodRedirect],
        responseType: 'code'
      }
    }
  }
});

// Debug helpers sólo en desarrollo
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // eslint-disable-next-line no-underscore-dangle
  window.__amplify = Amplify;
  // eslint-disable-next-line no-underscore-dangle
  window.__getTokens = async () => (await fetchAuthSession()).tokens;
  // eslint-disable-next-line no-underscore-dangle
  window.__getIdToken = async () => (await fetchAuthSession()).tokens?.idToken?.toString() || null;
  // eslint-disable-next-line no-underscore-dangle
  window.__logout = () => signOut();
  // eslint-disable-next-line no-underscore-dangle
  window.auth = { fetchAuthSession, getCurrentUser, signInWithRedirect, signOut };
}