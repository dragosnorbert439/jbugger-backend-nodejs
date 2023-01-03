const authService = require('../services/auth-service');

/**
 * Returns a new JWT token if credentials are correct
 * @param req http request with username and password in body
 * @param res http result
 */
const logIn = async (req, res) => {
    try {
        await authService
            .logIn(
                req.body.username,
                req.body.password,
                (err, token) => {
                    if (!err && token) res.json({ token: token });
                    else res.status(500).send(null);
                }
            );
    } catch (err) {
        res.status(403).send("INCORRECT_PASSWORD");
    }
}

/**
 * TODO implement or delete
 */
const logOut = async (req, res) => {
    await authService.logOut();
    res.status(200);
    res.send(null);
}

module.exports = {
    logIn,
    logOut
}