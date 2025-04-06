class CreateBagagePlan {
  

  constructor() {
      // Seu código aqui
    }
  
    createBagage(country, days) {
      const tshirt = 0.50;
      const pants = 0.25;
      const bluse = 1; 
      switch (country) {
        case 'Brasil':
         return `Brasil, ótima escolha! Sua mochila deve ter no mínimo: ${tshirt * 6} camisetas e ${pants * 8} calças.`;
        case 'Portugal':
          return `Portugal, ótima escolha! Sua mochila deve ter no mínimo: ${tshirt * 4} camisetas e ${pants * 4} calças.`;
        case 'Japão':
          return `Japão, ótima escolha! Sua mochila deve ter no mínimo: ${tshirt * 2} camisetas e ${pants * 4} calças.`;
        default:
          return 'País desconhecido';    
      }
    }
  }
  
  // Exportando a classe
  module.exports = CreateBagagePlan;