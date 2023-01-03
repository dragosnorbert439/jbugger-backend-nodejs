const { sequelize } = require("../db/mysql/dbconnection");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const userService = require("./user-service");

/**
 * Saves a notification set to a specific user
 * @param username username of the user
 * @param notification the notification
 */
const save = async (username, notification) => {
    await sequelize.transaction( async (_transaction) => {
        const user = await userService.findByUsername(username);

        // if no such user throw error to rollback
        if (!user) throw new Error();

        notification.user_id = user.id;
        models.notifications.build(notification).save();
    });
}

/**
 * Returns the notifications assigned to a specific user
 * @param username the username of the used
 * @returns {Promise<*>} a list of notifications
 */
const findByUsername = async (username) => {
    if (!username || username.length === 0) throw new Error();

    const userData = await userService.findByUsername(username);
    const user = userData.dataValues;

    if (!user) throw new Error();

    return models.notifications.findAll({
        where: {
            user_id: user.id
        }
    })
}

const connect = (ws, req) => {
    console.log(req.path);

    ws.on('message', (msg) => {
        // ws.send('you sent: ' + msg);
        ws.send('CONNECTED');
        console.log('it works');
    });
}

// const dummySendNotification = () => {
//     router.ws('/topic/notification/dummyj', (ws, req) => {
//         console.log("Sent.");
//         ws.send('Hello from service, ' + req.params.username);
//     });
// }

module.exports = {
    save,
    findByUsername,
    connect
}