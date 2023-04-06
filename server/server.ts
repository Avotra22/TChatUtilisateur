import { Server, Socket } from 'socket.io';
import { createServer, Server as HTTPServer } from 'http';


const httpServer: HTTPServer = createServer();
const io: Server = new Server(httpServer, {
    cors: {
        origin: '*',
    },
});
interface Mess{
    numberTicket: number,
    name: string,
    description: string,
    message:string,
    type:number,
    destination:number
  }
interface Notification {
    numberTicket: number,
    name: string,
    description: string
}
io.on('connection', (socket: Socket) => {

    socket.on('message', (data: Mess) => {
        io.emit('message'+data.destination, data);
    });
    socket.on('notification', (notif: Notification) => {
        io.emit('notification', notif);
    });
    socket.on('disconnect', () => {
    });
});

httpServer.listen(3000, () => {
});
