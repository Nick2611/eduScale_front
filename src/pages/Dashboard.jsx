import React, { useState } from 'react';
import { useAuth } from '../lib/useAuth';
import { getEstado, getTenantConfig } from '../lib/api';

export default function Dashboard() {
  const { loading, user, login } = useAuth();
  const [estado, setEstado] = useState(null);
  const [tenant, setTenant] = useState(null);

  if (loading) return <p style={{ padding: 16 }}>Cargando…</p>;
  if (!user) return <button onClick={login} style={{ margin: 16 }}>Ingresar</button>;

  return (
    <div style={{ display: 'grid', gap: 16, padding: 16 }}>
      <h2>Mi Estado</h2>
      <button onClick={async () => setEstado(await getEstado())}>Cargar estado</button>
      <pre>{estado ? JSON.stringify(estado, null, 2) : '—'}</pre>

      <h2>Tenant Config (pública)</h2>
      <button onClick={async () => setTenant(await getTenantConfig('u-bue-itba'))}>
        Cargar tenant u-bue-itba
      </button>
      <pre>{tenant ? JSON.stringify(tenant, null, 2) : '—'}</pre>
    </div>
  );
}


