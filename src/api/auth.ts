export interface LoginResponse {
    token: string;
  }
  
  export async function login(
    username: string,
    password: string
  ): Promise<LoginResponse> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const payload = await res.json();
    if (!res.ok) {
      throw new Error(payload.message || 'Error al iniciar sesión');
    }
    return payload;
  }