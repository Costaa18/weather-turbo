export interface GeoData {
    city: string;
    country: string;
  }
  
  export interface WeatherByCityDto {
    city: string;
  }
  
  export interface WeatherData {
    temperature: number;
    feelsLike: number;
    tempMin: number;
    tempMax: number;
    pressure: number;
    humidity: number;
    windSpeed: number;
    windDeg: number;
    weather: string;
    description: string;
    city: string;
    country: string;
    sunrise: number;
    sunset: number;
    icon: string;
  }
  