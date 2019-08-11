module.exports = {

  attributes: {
    dateReceived: {
      type: 'ref',
      required: true,
      columnType: 'timestamp',
    },
    dateExpires: {
      type: 'ref',
      columnType: 'timestamp',
    },
    carType: {
      type: 'string',
      columnType: 'varchar(40)',
    },
    distance: {
      type: 'number',
      required: true,
      columnType: 'smallint',
    },
    weight: {
      type: 'number',
      required: true,
      columnType: 'int',
    },
    pieces: {
      type: 'number',
      columnType: 'smallint',
    },
    dims: {
      type: 'string',
      columnType: 'varchar(40)',
    },
    stackable: {
      type: 'boolean',
    },
    fastLoad: {
      type: 'boolean',
    },
    hazardous: {
      type: 'boolean',
    },
    dockLevel: {
      type: 'boolean',
    },
    mailId: {
      type: 'string',
      maxLength: 255,
      columnType: 'varchar(255)',
    },
    postedEmail: {
      type: 'string',
      required: true,
      isEmail: true,
      maxLength: 200,
      columnType: 'varchar(200)',
    },
    postedBy: {
      type: 'string',
      maxLength: 255,
      columnType: 'varchar(255)',
    },
    notes: {
      type: 'string',
    },
    pickupIndex: {
      type: 'string',
      columnType: 'varchar(20)',
      maxLength: 20,
    },
    pickupState: {
      type: 'string',
      columnType: 'varchar(2)',
      maxLength: 2,
    },
    pickupCity: {
      type: 'string',
      required: true,
      columnType: 'varchar(100)',
      maxLength: 100,
    },
    pickupDate: {
      type: 'ref',
      required: true,
      columnType: 'timestamp',
    },
    pickupGoogleId: {
      type: 'string',
      columnType: 'varchar(100)',
      maxLength: 100,
    },
    pickupLat: {
      type: 'number',
      columnType: 'float8',
    },
    pickupLon: {
      type: 'number',
      columnType: 'float8',
    },
    deliveryIndex: {
      type: 'string',
      columnType: 'varchar(20)',
      maxLength: 20,
    },
    deliveryState: {
      type: 'string',
      columnType: 'varchar(2)',
      maxLength: 2,
    },
    deliveryCity: {
      type: 'string',
      required: true,
      columnType: 'varchar(100)',
      maxLength: 100,
    },
    deliveryDate: {
      type: 'ref',
      columnType: 'timestamp',
    },
    deliveryGoogleId: {
      type: 'string',
      columnType: 'varchar(100)',
      maxLength: 100,
    },
    deliveryLat: {
      type: 'number',
      columnType: 'float8',
    },
    deliveryLon: {
      type: 'number',
      columnType: 'float8',
    },
    price: {
      type: 'string',
      columnType: 'varchar(100)',
      maxLength: 100,
    },
    orderNumber: {
      type: 'string',
      columnType: 'varchar(100)',
      maxLength: 100,
    },

    /*
    Relations
    */
    userJobs: {
      collection: 'userJob'
    }
  },

};

