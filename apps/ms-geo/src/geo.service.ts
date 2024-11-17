import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GeoService {
  private readonly logger = new Logger(GeoService.name);

  constructor(private readonly httpService: HttpService) { }

  async getGeoByIP(ip: string): Promise<GeoData> {
    this.logger.log(`Fetching geo data for IP: ${ip}`);

    try {
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.get(`http://ip-api.com/json/${ip}`),
      );

      // Verifica se o status da resposta da API é "success"
      if (response.data.status !== 'success') {
        this.logger.error(`Geo API error for IP ${ip}: ${response.data.message || 'Unknown error'}`);
        throw new BadRequestException('Failed to fetch geo data for the provided IP.');
      }

      const geoData: GeoData = {
        ip: response.data.query,
        status: response.data.status,
        city: response.data.city,
        country: response.data.country,
      };

      this.logger.log(`Geo data fetched successfully for IP: ${ip}`);
      return geoData;
    } catch (error) {
      this.logger.error(`Error fetching location for IP: ${ip}`, error.stack || error.message);
      throw new BadRequestException('Unable to get the location by IP.');
    }
  }
}
