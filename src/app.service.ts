
import fetch from 'node-fetch';
import { Injectable } from '@nestjs/common';

const weatherapi = `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHERAPI_KEY}&q=`;

@Injectable()
export class AppService {
  async getWeather(ip: string): Promise<any> {
    return await fetch(weatherapi + ip)
      .then((res) => res.json())
      .then((res) => {
        const loc = res['location'];
        const cur = res['current'];

        const weather = {
          temp_c: cur['temp_c'],
          is_day: cur['is_day'],
          cloud: cur['cloud'],
          wind_kph: cur['wind_kph'],
          gust_kph: cur['gust_kph'],
        };

        const location = {
          lat: loc['lat'],
          lon: loc['lat'],
          localtime: loc['localtime'],
          __warning: 'Location detection is based on IP address for now.',
        };

        const data = { weather, location };

        return data;
      });
  }
}
