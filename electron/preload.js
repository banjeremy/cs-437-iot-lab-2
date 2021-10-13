const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  const setActiveArrow = (direction) => {
    document.querySelectorAll(".control-arrow").forEach((el) => {
      el.classList.remove("active");
      if (el.classList.contains(`control-arrow-${direction.toLowerCase()}`)) {
        el.classList.add("active");
      }
    });
  };

  ipcRenderer.on("stat", (event, stat) => {
    replaceText(`stat-${stat.name}`, stat.value);
    console.log(stat);
  });

  document.addEventListener("keydown", (event) => {
    const key = event.key.toUpperCase();
    let direction = "STOP";

    switch (key) {
      case "W":
      case "ARROWUP":
        direction = "FORWARD";
        break;

      case "A":
      case "ARROWLEFT":
        direction = "LEFT";
        break;

      case "S":
      case "ARROWDOWN":
        direction = "BACKWARD";
        break;

      case "D":
      case "ARROWRIGHT":
        direction = "RIGHT";
        break;
    }

    setActiveArrow(direction);
    replaceText("stat-direction", direction);

    const message = {
      type: "command",
      name: direction,
    };

    ipcRenderer.send("command", message);
  });
});
