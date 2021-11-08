const axios = require('axios');
const API = process.env.DATE_LA_ZI_API;

module.exports = async (ctx) => {
  const [store] = await strapi.services.store.find();
  if(store){
    axios.get(API)
      .then(async (res)=> {
          const numberDeceased = res.data.currentDayStats.numberDeceased.toString();
          if (store.victims !== numberDeceased) {
            await strapi.services.store.update({id: store.id}, {victims: numberDeceased})
            // strapi.middleware.cache.bust({ model: 'pages' });
          }
        }
      ).catch((e)=>{
      console.error(e.toString())
    })
  }
};
