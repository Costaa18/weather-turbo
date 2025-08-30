# 🌦️ **Weather Microservices App**

## 🚀 Overview

This is a **microservices project** built with **NestJS** and **Docker**, designed to provide real-time weather information. The system is composed of several microservices:

- **Weather Service**: Fetches weather data using the [OpenWeather API](https://openweathermap.org/).
- **Geo Service**: Retrieves user geolocation from their IP using the [IP Geolocation API](https://ip-api.com/).
- **Database Service**: Stores weather data in a Supabase database.
- **Gateway**: Acts as the central entry point for interacting with other microservices.

The project uses **Redis** as a message broker for communication between microservices and **Docker** for deployment.

---

## 📦 Technologies Used

- **NestJS** – Framework for building scalable and robust APIs.  
- **OpenWeather API** – For fetching weather data.  
- **Supabase** – Database for storing weather data.  
- **Redis** – For inter-service communication.  
- **Docker** – Containerization of services.  
- **TypeScript** – For strongly typed development.  

---

## 🛠️ Architecture

The application consists of multiple microservices that communicate with each other via **Redis** messages. Each microservice has a well-defined responsibility, while the **Gateway** orchestrates requests and coordinates with other services.

### Architecture Diagram:

![Microservices Architecture](https://docs.nestjs.com/assets/Redis_1.png)

1. **Gateway**: Receives HTTP requests from users and routes them to the appropriate microservices.  
2. **Weather Service**: Queries the external OpenWeather API for weather information.  
3. **Geo Service**: Determines the user’s geographic location based on their IP.  
4. **Database Service**: Stores weather data in the Supabase database.  

---

## 🚀 Running the Project

### Prerequisites

You need to have the following installed:

- [Docker](https://www.docker.com/products/docker-desktop)  
- [Node.js](https://nodejs.org/) (version 16 or higher recommended)  

### Clone the Repository

```bash
git clone https://github.com/Costaa18/weather-turbo.git
cd weather-microservices-app
```

### Build and Run the Docker Containers

1. Build the Docker images:

``` 
docker-compose build
```

2. Start the containers:

``` 
docker-compose up
```

### Test the Application

**Get weather by IP:**

``` 
curl http://localhost:3001/weather
```

**Get weather by city:**

``` 
curl http://localhost:3001/weather/city/Lisbon
```

Responses include weather details such as:

- Temperature
- Feels like
- Humidity
- Wind speed
- Weather description
- Corresponding weather icon

## 🔧 Environment Configuration

Set the environment variables as follows:
Gateway: 
```
GATEWAY_PORT="3000"
```

Weather:
``` 
OPEN_WEATHER_API_KEY=your-openweather-api-key
REDIS_HOST="redis"
REDIS_PORT=6379
```

Geo:
``` 
REDIS_HOST="redis"
REDIS_PORT=6379
```

Database
```
supabaseUrl="your-openweather-supabase-url"
SUPABASE_KEY="your-openweather-supabase-key"

REDIS_HOST="redis"
REDIS_PORT=6379
```


## 🔍 Project Structure

Here’s the basic structure of the project:

```
weather-microservices-app/
├── apps/
│   ├── ms-database/
│   ├────src/
│   ├────Dockerfile
│   ├── ms-weather/
│   ├────src/
│   ├────Dockerfile
│   ├── ms-geo/
│   ├────src/
│   ├────Dockerfile
│   ├── ms-gateway/
│   ├────src/
│   ├────Dockerfile
├── docker-compose.yml
└── README.md
```

## 📝 Usage Examples

### Example 1: Get Weather by IP

Request the **/weather** endpoint to get the current weather for the IP location:

```
curl http://localhost:3001/weather
```

### Example 2: Get Weather by City

Request the **/weather/city/{cidade}** endpoint to get weather for a specific city:

```
curl http://localhost:3001/weather/city/Lisbon
```

#### Example Response

```
{
  "temperature": 18.51,
  "feelsLike": 18.22,
  "tempMin": 16.75,
  "tempMax": 18.51,
  "pressure": 1019,
  "humidity": 69,
  "windSpeed": 1.35,
  "windDeg": 49,
  "weather": "Clouds",
  "description": "broken clouds",
  "city": "Lisbon",
  "country": "PT",
  "sunrise": 1731828326,
  "sunset": 1731863584,
  "icon": "04n"
}
```

## 📜 License
This project is licensed under the [MIT License](https://opensource.org/license/mit).
