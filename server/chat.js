clients = {};
messages = {};

var ws = require('ws').Server;
var wss = new ws({port: 8001});

wss.on('connection', function (ws) {
    ws.on('message', function (m) {
        m = JSON.parse(m);
        switch (m.op_type) {
            case 'init':
                connectUser(m.user_id, ws);
                break;
            case 'message':
                for (var i in clients) {
                    if (i == m.user_id)
                        continue;
                    if (clients[i].readyState != 1)
                        continue;
                    clients[i].send(m.message);
                }
                break;
        }
    });
});

function connectUser(user_id, sock) {
    clients[user_id] = sock;
}