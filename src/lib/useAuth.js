import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const session = await Auth.currentSession();
        if (!mounted) return;
        setIdToken(session.getIdToken().getJwtToken());
        const usr = await Auth.currentAuthenticatedUser();
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

  const login = () => Auth.federatedSignIn();
  const logout = () => Auth.signOut();

  return { loading, user, idToken, login, logout };
}


