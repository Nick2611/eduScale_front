import { fetchAuthSession, signInWithRedirect } from 'aws-amplify/auth';

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
  headers.set('Content-Type', 'application/json');
  if (auth) {
    const token = await getIdToken();
    if (!token) {
      await signInWithRedirect({ provider: 'COGNITO' });
      return;
    }
    headers.set('Authorization', `Bearer ${token}`);
  }
  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers, credentials: 'omit' });
  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      await signInWithRedirect({ provider: 'COGNITO' });
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


