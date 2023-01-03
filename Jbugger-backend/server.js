const express = require ('express');
const authRoutes = require('./v1/routes/auth-route');
const userRoutes = require('./v1/routes/user-route');
const notificationRoutes = require('./v1/routes/notification-route');
const permissionRoutes = require('./v1/routes/permission-route');
const roleRouter = require('./v1/routes/role-route');
const bugRouter = require('./v1/routes/bug-route');
const cors = require('cors');
const jbugger = express();
const expressWs = require('express-ws')(jbugger);

// cors options
let corsOptions = {
    origin: 'http://localhost:4200'
}

// setup server
jbugger.use(cors(corsOptions));
jbugger.use(express.json());
jbugger.use('/', userRoutes);
jbugger.use('/', authRoutes);
jbugger.use('/', notificationRoutes);
jbugger.use('/', permissionRoutes);
jbugger.use('/', roleRouter);
jbugger.use('/', bugRouter);

// set up listener
const listener = jbugger.listen(process.env.SERVER_PORT || 8080, () => {
    console.log('JBugger back-end is listening on port ' + listener.address()['port'] + '.');
});

// jbugger.ws('/echo', (ws, req) => {
//     ws.send('CONNECTED');
//
//     ws.on('message', (msg) => {
//         ws.send('you sent: ' + msg);
//         console.log('it works');
//     });
// });


