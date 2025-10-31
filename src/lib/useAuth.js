import { useEffect, useState } from 'react';
import { fetchAuthSession, getCurrentUser, fetchUserAttributes, signOut, signInWithRedirect } from 'aws-amplify/auth';

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // Si venimos de un redirect con ?code, esperar a que se intercambie
        const urlParams = new URLSearchParams(window.location.search);
        const hasCode = !!urlParams.get('code');
        let session = null;
        if (hasCode) {
          for (let i = 0; i < 60; i++) {
            try {
              session = await fetchAuthSession();
              if (session?.tokens?.idToken) break;
            } catch {}
            await new Promise(r => setTimeout(r, 200));
          }
          // limpiar el code de la URL
          if (session?.tokens?.idToken) {
            window.history.replaceState({}, document.title, window.location.pathname);
          }
        } else {
          session = await fetchAuthSession();
        }
        if (!mounted) return;
        setIdToken(session.tokens?.idToken?.toString() || null);
        const usr = await getCurrentUser().catch(() => null);
        if (!mounted) return;
        if (usr) {
          const attrs = await fetchUserAttributes().catch(() => null);
          setUser(attrs ? { attributes: attrs, username: usr.username, signInDetails: usr.signInDetails } : usr);
        } else {
          setUser(null);
        }
      } catch {
        // not signed in
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const login = async () => {
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
  };
  const logout = () => signOut();

  return { loading, user, idToken, login, logout };
}


