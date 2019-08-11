const jwt = require('jsonwebtoken');

module.exports = async function (req, res) {
    const data = req.allParams();

    const decoded = await jwt.verify(data.token, sails.config.custom.jwtSecret);

    loggedInUser = decoded.data;

    if (loggedInUser.isSuperAdmin) {
        const user = await User.updateOne({ emailAddress: data.user })
            .set({
                status: data.status
            });

        if (!user) {
            res.ok('User with such email was not found');
        } else {
            return res.ok();
        }
    }

    return res.ok('Unauthorized');
}
