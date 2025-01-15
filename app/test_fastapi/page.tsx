'use client';

import { useState, useEffect } from 'react';
import { WeatherResponse } from '@/config/api';

export default function Home() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [greeting, setGreeting] = useState<string>('');

  useEffect(() => {
    // Fetch weather data
    const fetchWeather = async () => {
      const response = await fetch('/api/weather');
      const data = await response.json();
      setWeather(data);
    };

    // Fetch greeting
    const fetchGreeting = async () => {
      const response = await fetch('/api/greet/Sean');
      const data = await response.json();
      setGreeting(data.message);
    };

    fetchWeather();
    fetchGreeting();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p>{greeting}</p>
      {weather && (
        <div>
          <p>Weather in {weather.location}:</p>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Condition: {weather.condition}</p>
          <p>Date: {weather.date}</p>
        </div>
      )}
    </div>
  );
}
