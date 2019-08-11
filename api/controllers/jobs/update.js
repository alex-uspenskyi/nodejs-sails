module.exports = async function (req, res) {
    var data = req.allParams();
    var id = {job: data.job, user: req.me.id}

    var userJob = await UserJob.findOne({job: data.job, user: req.me.id});
    if(!userJob) {
        await UserJob.create({job: data.job, user: req.me.id, status: data.status});
    } else {
        await UserJob.updateOne({job: data.job, user: req.me.id}).set({status: data.status});
    }

    return res.json({
        success: true,
    });
}
