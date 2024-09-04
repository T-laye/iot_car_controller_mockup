const left = document.querySelector(".left");
const right = document.querySelector(".right");
const reverse = document.querySelector(".reverse");
const forward = document.querySelector(".forward");

left.addEventListener("mousedown", () => {
  console.log("Left button pressed and held");
});

left.addEventListener("mouseup", () => {
  console.log("Left button released");
});

right.addEventListener("mousedown", () => {
  console.log("Right button pressed and held");
});

right.addEventListener("mouseup", () => {
  console.log("Right button released");
});

reverse.addEventListener("mousedown", () => {
  console.log("Reverse button pressed and held");
});

reverse.addEventListener("mouseup", () => {
  console.log("Reverse button released");
});

forward.addEventListener("mousedown", () => {
  console.log("Forward button pressed and held");
});

forward.addEventListener("mouseup", () => {
  console.log("Forward button released");
});




function onHold() {
  console.log("Button is being held");
}

left.addEventListener("touchstart", () => {
  console.log("Left button touched");
  
});

left.addEventListener("touchend", () => {
  console.log("Left button released");
  clearTimeout(holdTimer);
});

right.addEventListener("touchstart", () => {
  console.log("Right button touched");
 
});

right.addEventListener("touchend", () => {
  console.log("Right button released");
  clearTimeout(holdTimer);
});

reverse.addEventListener("touchstart", () => {
  console.log("Reverse button touched");
 
});

reverse.addEventListener("touchend", () => {
  console.log("Reverse button released");
  clearTimeout(holdTimer);
});

forward.addEventListener("touchstart", () => {
  console.log("Forward button touched");
 
});

forward.addEventListener("touchend", () => {
  console.log("Forward button released");
  clearTimeout(holdTimer);
});