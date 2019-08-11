module.exports = async function (req, res) {
   const data = req.allParams();
   delete data.user;

   const settings = await Setting.updateOne({user: req.me.id}).set(data);
   
   return res.json(settings);
}
