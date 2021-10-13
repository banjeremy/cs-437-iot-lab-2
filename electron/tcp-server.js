const net = require("net");
const { ipcMain } = require("electron");

module.exports.start = function (win) {
  const server = net.createServer((socket) => {
    socket.on("data", (data) => {
      try {
        const message = JSON.parse(data.toString());
        switch (message.type) {
          case "stat":
            win.webContents.send("stat", message);
            break;
          default:
            console.log(
              `don't know how to handle message of type '${message.type}''`
            );
        }
      } catch (error) {
        console.log("got a bad message");
      }
    });

    ipcMain.on("command", (event, arg) => {
      socket.write(`${JSON.stringify(arg)}\n`);
    });
  });

  server.listen(1337, "0.0.0.0");

  module.exports.stop = () => server.close();

  console.log("tcp server listening on 0.0.0.0:1337");
};
