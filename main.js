const io = require("socket.io-client");
import events from "events"
export let addresses = [];
export let socket = io.io("http://localhost:3000");
export const addressesEvent = new events.EventEmitter();

export default (publicKey, username) => {
    // if(location.hash.includes("a")){
    //     socket = io.io("http://192.168.1.44:3000");
    // }
    let connections = new Map();
    let sockets = [];
    socket.emit("login")
    socket.on("setup", async (config, blockchain, localAddresses) => {
        addresses = localAddresses ? localAddresses : [];
        socket.emit("address", publicKey, username)
        if(config.sockets){
        sockets = config.sockets.filter(s => s!=socket.id);
        sockets.forEach(s => {
            connections.set(s, new RTCPeerConnection())
            const connection = connections.get(s);
            let channel = connection.createDataChannel("sendChannel");
            channel.onmessage =e =>  {
                messages.innerHTML += `<p>${e.data}</p>`
            }
            channel.onopen = e => console.log("open!!!!");
            channel.onclose = e => console.log("closed!!!!!!");
            connection.channel = channel
            connection.createOffer().then(o => {
                    connection.setLocalDescription(o)
                    socket.emit("offer", o, s)
            })
        })
        }
    });
    socket.on("offer", async (offer, socketID) => {
        sockets.push(socketID);
        connections.set(socketID, new RTCPeerConnection())
        const connection = connections.get(socketID);
        connection.ondatachannel= e => {

            let channel = e.channel;
            channel.onmessage =e =>  {
                messages.innerHTML += `<p>${e.data}</p>`
            }
            channel.onopen = e => console.log("open!!!!");
            channel.onclose =e => console.log("closed!!!!!!");
            connection.channel = channel;

        }
        connection.setRemoteDescription(offer).then(() => console.log("offer added to remote description"))
        let alreadyAnswered = false;
        connection.onicecandidate = e =>  {
            if(alreadyAnswered) return;
            alreadyAnswered = true;
            socket.emit("answer", connection.localDescription, socketID)
        }
        await connection.createAnswer().then(a => {
            connection.setLocalDescription(a)
            // socket.emit("answer", a, socketID)
        })
    })
    socket.on("answer", (answer, socketID) => {

        connections.get(socketID).setRemoteDescription(answer).then(() => {
        })
    })

    // socket.on("address", (address, username) => {
    //     addresses.push({key: address, name: username})
    //     addressesEvent.emit("address", addresses)
    // })
}