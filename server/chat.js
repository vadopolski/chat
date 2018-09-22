clients = {};
messages = {};

var http = require('http');
var url = require('url');


http.createServer(function (req, res) {
    res.end('is_response');
}).listen(8080);

var ws = require('ws').Server,
    wss = new ws({port: 8081});

wss.on('connection', function (ws) {
    console.log('connected user');
    ws.on('message', function (m) {
         console.log('->>' + m);
        // ws.send('PONG');
        switch (m.op_type){
            case 'init':
                connectUser(m.user_id);
                break;
            case 'message':
                messages.push(m.message);
                for (var i in clients){
                    if(i == m.user_id)
                        continue;
                    ws.send(m.message);
                }
                break;
        }
    });
});

function connectUser(user_id) {
    clients[user_id] = {}
}