import { authFetch } from "../utils/authFetch";

export interface DifferenceResponse {
    x: any[];
    y: any[];
    result: any[];
  }
  
  export async function postDifference(
    x: any[],
    y: any[]
  ): Promise<DifferenceResponse> {
    const res = await authFetch('/api/difference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ x, y }),
    });
    const payload = await res.json();
    if (!res.ok) {
      const errors = payload.error;
      const msgs: string[] = [];
      for (const key in errors) {
        msgs.push(...errors[key]._errors);
      }
      throw new Error(msgs.join(' · '));
    }
    return payload;
  }
  