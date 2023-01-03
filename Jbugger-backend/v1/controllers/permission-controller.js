const permissionService = require('../services/permission-service');

const findByUsername = async (req, res) => {
	try {
		const permissions = await permissionService
			.findByUsername(req.params.username);
		res.json(permissions);
	} catch (err) {
		console.log(err);
		res.status(400);
		res.send(null);
	}
}

module.exports = {
	findByUsername
}