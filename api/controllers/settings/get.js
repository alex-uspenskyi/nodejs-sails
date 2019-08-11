module.exports = {

   friendlyName: 'Get settings & filters',

   exits: {
      success: {},
   },

   fn: async function (inputs, exits) {

      let filters = await Setting.findOne({ user: this.req.me.id });

      return exits.success(filters);
   }
};