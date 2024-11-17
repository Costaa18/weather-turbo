import { Injectable, Logger } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
    private readonly logger = new Logger(SupabaseService.name);
    private readonly client = createClient(
        process.env.supabaseUrl,
        process.env.SUPABASE_KEY
    );

    async saveWeatherData(ip: string, weatherData: WeatherData, city?: string): Promise<void> {
        try {
            const { error } = await this.client.from('logs').insert([
                {
                    ip: ip,
                    city_searched: city || "Unknown", // Default 'Unknown' if city is undefined
                    weather_data: weatherData,
                },
            ]);

            if (error) {
                this.logger.error(`Error inserting weather data for IP: ${ip}`, error.message);
                throw new Error('Unable to save the weather data to Supabase');
            }

            this.logger.log(`Weather data for IP: ${ip} saved to Supabase successfully.`);
        } catch (error) {
            this.logger.error(`Failed to save weather data for IP: ${ip}`, error.stack);
            throw new Error('Error saving data to Supabase');
        }
    }
}
