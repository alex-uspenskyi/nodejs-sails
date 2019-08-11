module.exports = async function (req, res) {
    const data = req.allParams();
    var modelData = {
        status: 'bidden',
        price: Math.round(data.price),
        pricePerMile: Math.round(data.pricePerMile),
        deadMiles: Math.round(data.deadMiles),
        job: data.job, 
        user: req.me.id
    }

    const userJob = await UserJob.findOne({job: data.job, user: req.me.id});
    if(!userJob) {
        await UserJob.create(modelData);
    } else {
        await UserJob.updateOne({job: data.job, user: req.me.id}).set(modelData);
    };

    const job = await Job.findOne({id: data.job});
    const setting = await Setting.findOne({user: req.me.id});
    const to = data.testTo ? data.testTo : job.postedEmail;
    const sent = await sails.helpers.gmailSend(setting.mailerEmail, to, data.emailHeader, data.emailBody, data.apiToken);
    //var sent = true;
    
    return res.json({
        sent: sent,
    });
}
