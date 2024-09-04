const left = document.querySelector(".left");
const right = document.querySelector(".right");
const reverse = document.querySelector(".reverse");
const forward = document.querySelector(".forward");

var gateway = "ws://192.168.1.184/ws";
var websocket;

window.addEventListener("load", onLoad);
function initWebSocket() {
  console.log("Trying to open a WebSocket connection...");
  websocket = new WebSocket(gateway);
  websocket.onopen = onOpen;
}
function onOpen(event) {
  console.log("Connection opened");
}
function onClose(event) {
  console.log("Connection closed");
  setTimeout(initWebSocket, 2000);
}

function onLoad(event) {
  initWebSocket();
//   initButton();
}
// function initButton() {
//   document
//     .getElementById("btn.on")
//     .addEventListener("click", () => changeState("on"));
//   document
//     .getElementById("btn.off")
//     .addEventListener("click", () => changeState("off"));
// }
function changeState(state) {
  websocket.send(state);
}

let activeTouches = {}; // Object to track active touches

function onHold(button) {
//   console.log(`${button} button is being held`);
}

// Function to handle touch start
function handleTouchStart(event, button) {
//   console.log(`${button} button touched`);
  const touchId = event.changedTouches[0].identifier;

  // Change button color to yellow
  event.target.style.color = "yellow";

  // Start the hold timer for this specific touch
  activeTouches[touchId] = setTimeout(() => onHold(button), 500);
}

// Function to handle touch end
function handleTouchEnd(event) {
  const touchId = event.changedTouches[0].identifier;

  // Clear the hold timer for this specific touch
  if (activeTouches[touchId]) {
    clearTimeout(activeTouches[touchId]);
    delete activeTouches[touchId];
  }

  // Revert button color to original (assumed white)
  event.target.style.color = ""; // Empty string resets to original color

  console.log(`${event.target.className} button released`);
}

// Adding touch event listeners
left.addEventListener("touchstart", (event) => handleTouchStart(event, "Left"));
left.addEventListener("touchend", handleTouchEnd);

right.addEventListener("touchstart", (event) =>
  handleTouchStart(event, "Right")
);
right.addEventListener("touchend", handleTouchEnd);

reverse.addEventListener("touchstart", (event) => {
  handleTouchStart(event, "Reverse");
});
reverse.addEventListener("touchend", handleTouchEnd);

forward.addEventListener("touchstart", (event) => {
  handleTouchStart(event, "Forward");
  changeState("on");
});

forward.addEventListener("touchend", (e) => {
  changeState("off");
  handleTouchEnd();
});

left.addEventListener("mousedown", () => {
  console.log("Left button pressed and held");
  left.style.color = "yellow";
});

left.addEventListener("mouseup", () => {
  console.log("Left button released");
  left.style.color = ""; // Reset to original color
});

right.addEventListener("mousedown", () => {
  console.log("Right button pressed and held");
  right.style.color = "yellow";
});

right.addEventListener("mouseup", () => {
  console.log("Right button released");
  right.style.color = ""; // Reset to original color
});

reverse.addEventListener("mousedown", () => {
  console.log("Reverse button pressed and held");
  reverse.style.color = "yellow";
});

reverse.addEventListener("mouseup", () => {
  console.log("Reverse button released");
  reverse.style.color = ""; // Reset to original color
});

forward.addEventListener("mousedown", () => {
  console.log("Forward button pressed and held");
  forward.style.color = "yellow";
});

forward.addEventListener("mouseup", () => {
  console.log("Forward button released");
  forward.style.color = ""; // Reset to original color
});
