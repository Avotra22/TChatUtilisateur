"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var http_1 = require("http");
var httpServer = (0, http_1.createServer)();
var io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
    },
});
io.on('connection', function (socket) {
    socket.on('message', function (data) {
        io.emit('message' + data.destination, data);
    });
    socket.on('notification', function (notif) {
        io.emit('notification', notif);
    });
    socket.on('disconnect', function () {
    });
});
httpServer.listen(3000, function () {
});
