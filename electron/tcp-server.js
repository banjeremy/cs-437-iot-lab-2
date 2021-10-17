const net = require("net");
const { ipcMain } = require("electron");

module.exports.start = function (win) {
  const server = net.createServer((socket) => {
    socket.on("data", (data) => {
      try {
        const message = JSON.parse(data.toString());

        for (const stat of message) {
          switch (stat.type) {
            case "stat":
              win.webContents.send("stat", stat);
              break;
            default:
              console.log(
                `don't know how to handle stat of type '${stat.type}''`
              );
          }
        }
      } catch (error) {
        console.log("got a bad message", data.toString());
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
