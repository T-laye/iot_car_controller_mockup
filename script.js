const buttons = {
  left: document.querySelector(".left"),
  right: document.querySelector(".right"),
  reverse: document.querySelector(".reverse"),
  forward: document.querySelector(".forward"),
};

const states = {
  left: "left",
  right: "right",
  reverse: "on",
  forward: "on",
  straight: "straight",
  off: "off",
};

var gateway = "ws://192.168.1.184/ws";
var websocket;

window.addEventListener("load", initWebSocket);

function initWebSocket() {
  console.log("Trying to open a WebSocket connection...");
  websocket = new WebSocket(gateway);
  websocket.onopen = () => console.log("Connection opened");
  websocket.onclose = () => {
    console.log("Connection closed");
    setTimeout(initWebSocket, 2000);
  };
}

function changeState(state) {
  websocket.send(state);
}

let activeTouches = {};

function handleTouchStart(event, button) {
  const touchId = event.changedTouches[0].identifier;
  event.target.style.color = "yellow";
  activeTouches[touchId] = setTimeout(
    () => console.log(`${button} button is being held`),
    500
  );
  changeState(states[button]);
}

function handleTouchEnd(event, button) {
  const touchId = event.changedTouches[0].identifier;
  if (activeTouches[touchId]) {
    clearTimeout(activeTouches[touchId]);
    delete activeTouches[touchId];
  }
  event.target.style.color = "";

  console.log(button);
  if (button === "forward" || button === "reverse") {
    changeState(states.off);
  } else if (button === "left" || button === "right") {
    changeState(states.straight);
  }
}

Object.keys(buttons).forEach((button) => {
  buttons[button].addEventListener("touchstart", (event) =>
    handleTouchStart(event, button)
  );
  buttons[button].addEventListener("touchend", (event) =>
    handleTouchEnd(event, button)
  );
});
