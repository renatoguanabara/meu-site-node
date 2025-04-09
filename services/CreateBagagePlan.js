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

      
      const forecastList = response.data.list.slice(0, 8); // 8 registros = 24h (de 3h em 3h)
      const temps = forecastList.map(item => item.main.temp);
      const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;

      return {
        JSON:forecastList,
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

  async createBagage(city, days, temperatura, wheater) {
    const tshirt = 1;
    const pants = 1;
    const bluse = 1;
    const underware = 1;
    const sock = 1;
    const shoes = 1; 

    

    let mensagem = '';
    let cidade = city;

    
    
    const clima = await this.getWeather(cidade);
    console.log(clima.JSON);

    if(clima.media > 10 && clima.media < 20 ){
      return `${mensagem}<br>
      voce deve levar ${tshirt * 2} camisetas, ${pants * 1} calça <br>
      Previsão para ${clima.cidade}: ${clima.clima}, média de ${clima.media}°C.`;
    }  



    return `${mensagem}<br>
    Previsão para ${clima.cidade}: ${clima.clima}, média de ${clima.media}°C.`;
  }
}

module.exports = CreateBagagePlan;
