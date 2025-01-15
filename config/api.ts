// app/types/api.ts

export interface GreetResponse {
    message: string;
  }
  
  export interface WeatherResponse {
    date: string;
    temperature: number;
    condition: string;
    location: string;
  }
  
  export interface RootResponse {
    message: string;
  }

  export const API_BASE_URL = 'https://fastapi-gcp-pro-431569812034.us-central1.run.app';