const API_URL = 'https://fastapi-gcp-pro-431569812034.us-central1.run.app';

export async function GET(
  _request: Request,
  context: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await context.params;
    
    const url = new URL(`/greet/${name}`, API_URL);
    const response = await fetch(url);
    
    if (!response.ok) {
      return Response.json(
        { error: 'Failed to fetch greeting' }, 
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return Response.json(data);
  } catch {
    return Response.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
} 