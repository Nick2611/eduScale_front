import { fetchAuthSession } from 'aws-amplify/auth';
import { signInWithRedirect } from 'aws-amplify/auth/cognito';

const API_BASE = 'https://tuqlcfqj0l.execute-api.us-east-1.amazonaws.com/v1';

async function getIdToken() {
  try {
    const session = await fetchAuthSession();
    return session.tokens?.idToken?.toString() || null;
  } catch {
    return null;
  }
}

export async function apiFetch(path, opts = {}, auth = true) {
  const headers = new Headers(opts.headers || {});
  if (opts.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (auth) {
    const token = await getIdToken();
    if (!token) {
      try {
        await signInWithRedirect({ provider: 'COGNITO' });
      } catch (e) {
        const domain = 'eduscale.auth.us-east-1.amazoncognito.com';
        const clientId = '2lrf45k9iseeoa7umn702b4v7o';
        const redirectUri = `${window.location.origin}/`;
        const scope = encodeURIComponent('openid email profile');
        const authUrl = `https://${domain}/oauth2/authorize?client_id=${clientId}&response_type=code&scope=${scope}&redirect_uri=${encodeURIComponent(redirectUri)}`;
        window.location.assign(authUrl);
      }
      return;
    }
    headers.set('Authorization', `Bearer ${token}`);
  }
  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers, credentials: 'omit' });
  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      try {
        await signInWithRedirect({ provider: 'COGNITO' });
      } catch (e) {
        const domain = 'eduscale.auth.us-east-1.amazoncognito.com';
        const clientId = '2lrf45k9iseeoa7umn702b4v7o';
        const redirectUri = `${window.location.origin}/`;
        const scope = encodeURIComponent('openid email profile');
        const authUrl = `https://${domain}/oauth2/authorize?client_id=${clientId}&response_type=code&scope=${scope}&redirect_uri=${encodeURIComponent(redirectUri)}`;
        window.location.assign(authUrl);
      }
    }
    const text = await res.text().catch(() => '');
    throw new Error(`API ${res.status}: ${text}`);
  }
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return res.json();
  return res.text();
}

export const getEstado = () => apiFetch('/estado', { method: 'GET' }, true);
export const getTenantConfig = (institutionId) =>
  apiFetch(`/tenant-config/${institutionId}`, { method: 'GET' }, false);


