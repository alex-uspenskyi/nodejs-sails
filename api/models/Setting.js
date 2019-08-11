module.exports = {

  attributes: {
    filterGoogleId: {
      type: 'string',
      columnType: 'varchar(100)',
      maxLength: 100,
    },
    filterLat: {
      type: 'number',
      columnType: 'float8',
    },
    filterLon: {
      type: 'number',
      columnType: 'float8',
    },
    filterMinWeight: {
      type: 'number',
      columnType: 'int',
      defaultsTo: 0,
    },
    filterMaxWeight: {
      type: 'number',
      columnType: 'int',
      defaultsTo: 5000,
    },
    filterRadius: {
      type: 'number',
      columnType: 'int',
      defaultsTo: 250,
    },
    filterPickupFrom: {
      type: 'string',
      columnType: 'varchar',
    },
    filterPickupTo: {
      type: 'string',
      columnType: 'varchar',
    },
    filterExpired: {
      type: 'boolean',
    },
    sort: {
      type: 'string',
      isIn: ['datePickup', 'dateReceived', 'distance', 'weight'],
      defaultsTo: 'datePickup',
      columnType: 'varchar(20)',
      maxLength: 20,
    },
    mailerEmail: {
      type: 'string',
      isEmail: true,
      maxLength: 200,
      columnType: 'varchar(200)',
    },
    googleApiToken: {
      type: 'string',
    },
    emailSignature: {
      type: 'string',
    },

    /*
    Relations
    */
    user: {
      model: 'user',
      required: true,
      unique: true,
    },
  },

};

