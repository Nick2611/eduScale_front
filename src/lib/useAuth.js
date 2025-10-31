import { useEffect, useState } from 'react';
import { fetchAuthSession, getCurrentUser, signInWithRedirect, signOut } from 'aws-amplify/auth';

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const session = await fetchAuthSession();
        if (!mounted) return;
        setIdToken(session.tokens?.idToken?.toString() || null);
        const usr = await getCurrentUser();
        if (!mounted) return;
        setUser(usr);
      } catch {
        // not signed in
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const login = () => signInWithRedirect({ provider: 'COGNITO' });
  const logout = () => signOut();

  return { loading, user, idToken, login, logout };
}


