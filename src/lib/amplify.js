// src/lib/amplify.js
import { Amplify } from 'aws-amplify';
import 'aws-amplify/auth/enable-oauth-listener';

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_bjEr5VsLF',
      userPoolClientId: '2lrf45k9iseeoa7umn702b4v7o',
      region: 'us-east-1',
      loginWith: {
        oauth: {
          domain: 'eduscale.auth.us-east-1.amazoncognito.com',
          scopes: ['openid', 'email', 'profile'],
          redirectSignIn: ['http://localhost:3001/', 'http://localhost:3000/', 'https://main.dh3o7wiuhouxx.amplifyapp.com/'],
          redirectSignOut: ['http://localhost:3001/', 'http://localhost:3000/', 'https://main.dh3o7wiuhouxx.amplifyapp.com/'],
          responseType: 'code'
        }
      }
    }
  }
};

Amplify.configure(amplifyConfig);

