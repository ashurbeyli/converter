// Libraries
import { WebSocketServer } from "ws";

export const wss = new WebSocketServer({ port: 5001 });

wss.on("connection", (ws) => {
    console.log("Client connected");
});

export function broadcast(data: any) {
    wss.clients.forEach((client: any) => {
        if (client.readyState === 1) {
            client.send(JSON.stringify(data));
        }
    });
}


