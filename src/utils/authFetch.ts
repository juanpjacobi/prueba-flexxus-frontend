export async function authFetch(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<Response> {
    const token = localStorage.getItem('token');
    const headers = {
      ...(init?.headers as Record<string, string>),
      Authorization: token ? `Bearer ${token}` : '',
    };
    return fetch(input, { ...init, headers });
  }