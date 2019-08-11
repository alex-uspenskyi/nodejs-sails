module.exports = {

    attributes: {
      status: {
        type: 'string',
        isIn: ['received', 'bidden', 'rejected'],
        defaultsTo: 'received',
        columnType: 'varchar(20)',
      },
      price: { 
        type: 'number',
        columnType: 'smallint',
      },
      pricePerMile: { 
        type: 'number',
        columnType: 'smallint',
      },
      deadMiles: {
        type: 'number',
        isInteger: true,
        columnType: 'smallint',
      },
  
      /*
      Relations
      */
      job: {
        model: 'job',
        required: true,
      },
      user: {
        model: 'user',
        required: true,
      },
    },
  
  };
  
  