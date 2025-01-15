import { API_BASE_URL } from '@/config/api';
import { RootResponse } from '@/config/api';

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch root message');
    }
    
    const data: RootResponse = await response.json();
    return Response.json(data);
  } catch {
    return Response.json({ error: 'Failed to fetch root message' }, { status: 500 });
  }
} 