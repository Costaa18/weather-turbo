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

    async createUser(user: any): Promise<void> {
        try {
            const userExists = await this.client.from('users').select('*').eq('email', user.email);

            if (userExists.data.length > 0) {
                this.logger.log(`User with email: ${user.email} already exists in the database.`);
                return;
            }

            const { error } = await this.client.from('users').insert([
                {
                    email: user.email,
                },
            ]);

            if (error) {
                this.logger.error(`Error inserting user data for email: ${user.email}`, error.message);
                throw new Error('Unable to save the user data to Supabase');
            }

            this.logger.log(`User data for email: ${user.email} saved to Supabase successfully.`);
        } catch (error) {
            this.logger.error(`Failed to save user data for email: ${user.email}`, error.stack);
            throw new Error('Error saving data to Supabase');
        }
    }

    async getUserByEmail(email: string): Promise<any> {
        try {
            this.logger.debug(`Email: ${email}`);
            const { data, error } = await this.client.from('users').select('*').eq('email', email);

            if (error) {
                this.logger.error(`Error fetching user data for email: ${email}`, error.message);
                throw new Error('Unable to fetch the user data from Supabase');
            }

            if (data.length === 0) {
                this.logger.log(`User with email: ${email} not found in the database.`);
                return null;
            }

            this.logger.log(`User with email: ${email} found in the database.`);
            return data[0];
        } catch (error) {
            this.logger.error(`Failed to fetch user data for email: ${email}`, error.stack);
            throw new Error('Error fetching data from Supabase');
        }
    }
}
