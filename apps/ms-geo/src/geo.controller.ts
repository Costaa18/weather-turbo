import { Controller, Logger } from '@nestjs/common';
import { GeoService } from './geo.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class GeoController {
  private readonly logger = new Logger(GeoController.name);

  constructor(private readonly geoService: GeoService) { }

  @EventPattern('get_geo')
  async getGeoData(ip: string): Promise<GeoData> {
    this.logger.log(`Received 'get_geo' event for IP: ${ip}`);
    try {
      const geoData = await this.geoService.getGeoByIP(ip);
      this.logger.log(`Geo data successfully processed for IP: ${ip}`);
      return geoData;
    } catch (error) {
      this.logger.error(`Failed to process geo data for IP: ${ip}`, error.stack || error.message);
      throw error;
    }
  }
}
