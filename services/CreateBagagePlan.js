const axios = require('axios');

class CreateBagagePlan {
  constructor() {
    this.apiKey = '71cca9df60711a884c41dede9201645b';
    this.baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  }

  async getWeather(city) {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          q: city,
          appid: this.apiKey,
          units: 'metric',
          lang: 'pt_br'
        }
      });

      // Vamos pegar a temperatura média do primeiro dia
      const forecastList = response.data.list.slice(0, 8); // 8 registros = 24h (de 3h em 3h)
      const temps = forecastList.map(item => item.main.temp);
      const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;

      return {
        cidade: response.data.city.name,
        media: avgTemp.toFixed(1),
        clima: forecastList[0].weather[0].description
      };

    } catch (error) {
      return {
        cidade: city,
        erro: 'Não foi possível obter o clima.'
      };
    }
  }

  async createBagage(city, days) {
    const tshirt = 0.5;
    const pants = 0.25;
    const bluse = 1;

    let mensagem = '';
    let cidade = city;

    

    const clima = await this.getWeather(cidade);

    return `${mensagem}<br>
    Previsão para ${clima.cidade}: ${clima.clima}, média de ${clima.media}°C.`;
  }
}

module.exports = CreateBagagePlan;
