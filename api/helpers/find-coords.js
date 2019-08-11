const axios = require('axios');

module.exports = {
  friendlyName: 'Find coords by address',

  inputs: {
    address: {
      type: 'string',
      required: true
    },
  },

  fn: async function (inputs) {
    try {
      const request = `https://us1.locationiq.com/v1/search.php?key=${sails.config.custom.locationiqToken}&q=${inputs.address}&format=json`;
      const response = await axios.get(request);

      if (response.data[0]) {
        return {
          lat: response.data[0].lat,
          lon: response.data[0].lon,
        }
      } else {
        console.error('API locationiq response', response.data);
        return false;
      }
    } catch (e) {
      console.error('API locationiq response', e);
      return false;
    }
  }

};
