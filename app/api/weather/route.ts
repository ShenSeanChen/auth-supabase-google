import { API_BASE_URL } from '@/config/api';
import { WeatherResponse } from '@/config/api';

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/weather`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    const data: WeatherResponse = await response.json();
    return Response.json(data);
  } catch {
    return Response.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
} 