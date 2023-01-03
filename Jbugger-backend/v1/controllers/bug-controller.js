const bugService = require('../services/bug-service');

/**
 * Returns in response a list of bugs
 * @param req request
 * @param res response
 */
const getAllBugs = async (req, res) => {
    try {
        const bugs = await bugService.findAll();
        res.json(bugs);
    } catch (e) {
        console.log(e);
        res.status(400).send(null);
    }
}

/**
 * Returns a 200 OK if bug is updated successfully
 * @param req request - body contains Bug json
 * @param res response
 */
const updateBug = async (req, res) => {
    try {
        await bugService.update(req.body);
        res.status(200).send(null);
    } catch(e) {
        res.status(400).send(null);
    }
}

module.exports = {
    getAllBugs, updateBug
}