# 🌦️ **Weather Microservices App**

## 🚀 Overview

Este é um projeto de **microserviços** construído com **NestJS** e **Docker**, projetado para fornecer informações meteorológicas em tempo real. O sistema é composto por vários microserviços:

- **Weather Service**: Fornece dados meteorológicos usando a API do OpenWeather.
- **Geo Service**: Obtém a localização geográfica a partir do IP do utilizador.
- **Database Service**: Armazena os dados meteorológicos em um base de dados Supabase.
- **Gateway**: Serve como ponto central para interagir com os outros microserviços.

Este projeto utiliza **Redis** como transportador para comunicação entre microserviços e **Docker** para facilitar a implantação.

## 📦 Tecnologias Utilizadas

- **NestJS** - Framework para construir APIs escaláveis e robustas.
- **OpenWeather API** - Para obter dados climáticos.
- **Supabase** - base de dados para armazenar os dados meteorológicos.
- **Redis** - Comunicação entre os microserviços.
- **Docker** - Containerização dos serviços.
- **TypeScript** - Para desenvolvimento com tipagem forte.

## 🛠️ Arquitetura

A aplicação é composta por vários microserviços que se comunicam entre si através de mensagens via **Redis**. Cada microserviço tem uma responsabilidade bem definida, e o **Gateway** é responsável por orquestrar as requisições e interagir com os outros serviços.

### Diagrama de Arquitetura:

![Microservices Architecture](https://docs.nestjs.com/assets/Redis_1.png)

1. **Gateway**: Recebe as requisições HTTP dos utilizadores e distribui para os microserviços correspondentes.
2. **Weather Service**: Consulta a API externa (OpenWeather) para obter informações meteorológicas.
3. **Geo Service**: Usa o IP do utilizador para determinar sua localização geográfica.
4. **Database Service**: Armazena os dados climáticos no base de dados Supabase.

## 🚀 Como Executar o Projeto

### Pré-requisitos

Antes de começar, você precisa ter o seguinte instalado:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Node.js](https://nodejs.org/) (recomendado versão 16 ou superior)

### Clonar o repositório

```bash
git clone https://github.com/Costaa18/weather-turbo.git
cd weather-microservices-app
```

### Construir e rodar os containers com Docker

1. Construir as imagens Docker:

``` 
docker-compose build
```

2. Iniciar os containers:

``` 
docker-compose up
```

### Testar a Aplicação

**Obter o clima baseado no IP:**

``` 
curl http://localhost:3001/weather
```

**Obter o clima por cidade:**

``` 
curl http://localhost:3001/weather/city/Lisbon
```

As respostas conterão os dados climáticos, como:

- Temperatura
- Sensação térmica
- Humidade
- Velocidade do vento
- Descrição do clima
- Icone consoante o clima

## 🔧 Configuração do Ambiente

Para configurar variáveis de ambiente, você pode criar um arquivo **.env** na raiz do projeto. 
Um exemplo de arquivo **.env**:

``` 
OPEN_WEATHER_API_KEY=your-openweather-api-key
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-key
REDIS_HOST=redis
REDIS_PORT=6379
```

## 🔍 Estrutura do Projeto

Aqui está a estrutura básica do projeto:

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

## 📝 Exemplos de Uso

### Exemplo 1: Obter clima pelo IP

Faça uma requisição para o endpoint **/weather** para obter o clima atual para a localização do IP.

```
curl http://localhost:3001/weather
```

### Exemplo 2: Obter clima por cidade

Para obter a previsão do tempo para uma cidade específica, faça uma requisição para o endpoint **/weather/city/{cidade}**.

```
curl http://localhost:3001/weather/city/Lisbon
```

#### Exemplo de Resposta

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

## 📜 Licença
Este projeto está licenciado sob a [MIT License](https://opensource.org/license/mit).

Feito por [Costtazzz](https://github.com/Costaa18).