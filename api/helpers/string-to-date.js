module.exports = {
  friendlyName: 'String to date, accepted by DB',

  sync: true,

  inputs: {
    date: {
      type: 'string'
    },
  },

  fn: function (inputs) {
    var timestamp = Date.parse(inputs.date);
    if (isNaN(timestamp) == false) {
      var date = new Date(timestamp);
      //console.log(inputs.date, timestamp, date.toISOString()), date.toLocaleTimeString();
    } else {
      //console.error('Date was not parsed', inputs.date);
      return null;
    }

    return date.toISOString();
  }

};
