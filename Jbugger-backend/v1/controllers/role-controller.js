const roleService = require('../services/role-service');

const findAll = async (req, res) => {
    try {
        const roles = await roleService.findAll();
        res.json(roles);
    } catch (err) {
        console.log(err);
        res.status(400);
        res.send(null);
    }
}

module.exports = {
    findAll
}