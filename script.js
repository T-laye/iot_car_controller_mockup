const level2 = document.querySelector(".speed-2");
const level3 = document.querySelector(".speed-3");

const buttons = {
  left: document.querySelector(".left"),
  right: document.querySelector(".right"),
  reverse: document.querySelector(".reverse"),
  forward: document.querySelector(".forward"),
  speedUp: document.querySelector(".speed-up"),
  speedDown: document.querySelector(".speed-down"),
};

const states = {
  left: "left",
  right: "right",
  reverse: "reverse",
  forward: "forward",
  straight: "straight",
  off: "stop",
};

var gateway = "ws://192.168.1.184/ws";
var websocket;

let activeTouches = {}; // Initialize speed level
let speed = 1; // Initialize speed level

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

function speedBar() {
  if (speed === 2) {
    level2.style.backgroundColor = "#00700f";
    level3.style.backgroundColor = "white";
  } else if (speed === 3) {
    level3.style.backgroundColor = "#004e0b";
    level2.style.backgroundColor = "#00700f";
  } else {
    level2.style.backgroundColor = "white";
    level3.style.backgroundColor = "white";
  }
}

function handleTouchStart(event, button) {
  const touchId = event.changedTouches[0].identifier;
  event.target.style.color = "yellow";
  activeTouches[touchId] = setTimeout(
    () => console.log(`${button} button is being held`),
    500
  );

  if (button === "speedUp" && speed < 3) {
    speed++;
    speedBar();
    changeState(`speed${speed}`);
    console.log(`speed${speed}`);
  } else if (button === "speedDown" && speed > 1) {
    speed--;
    speedBar();
    console.log(`speed${speed}`);
    changeState(`speed${speed}`);
} else {
      console.log(`speed${speed}`);
    changeState(states[button]);
  }
}

function handleTouchEnd(event, button) {
  const touchId = event.changedTouches[0].identifier;
  if (activeTouches[touchId]) {
    clearTimeout(activeTouches[touchId]);
    delete activeTouches[touchId];
  }
  event.target.style.color = "";

  if (button === "forward" || button === "reverse") {
    changeState(states.off);
  } else if (button === "right" || button === "left") {
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
