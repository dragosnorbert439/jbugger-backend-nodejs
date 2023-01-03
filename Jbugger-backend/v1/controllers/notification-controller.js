const notificationService = require('../services/notification-service');

const findByUsername = async (req, res) => {
    try {
        const notifications = await notificationService
            .findByUsername(req.params.username);
        res.json(notifications);
    } catch (err) {
        console.log(err);
        res.status(400);
        res.send(null);
    }
}

const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

const sendNotification = (ws, req) => {
    ws.on('open', (_) => {
       console.log("Connected");
       ws.send("Connected");
    });
    eventEmitter.on('sayHello', () => {
        console.log("event called");
        ws.send('Hello');
    });
    ws.on('message', (_) => {
        ws.send('Hi, ' + req.params.username);
        // console.log('it works');
        // TODO send here notification object
    });
}

const connect = (ws, req) => {
    notificationService.connect(ws, req);
}

module.exports = {
    findByUsername, sendNotification, connect
}