// style
import "./style.scss";

// library
import "@/_index.js";

// package info
import packageInfo from "../package.json";

// update project information
const dataTitles = document.querySelectorAll("[data-title]");
const dataDescriptions = document.querySelectorAll("[data-description]");

// update information
dataTitles.forEach((e) => (e.innerHTML = packageInfo["prettyName"]));
dataDescriptions.forEach((e) => (e.innerHTML = packageInfo.description));

// custom code
Grab.create({
  target: document.body,

  type: "all",
  grab: true,

  events: {
    // mouse events
    mousedown: () => {},
    mousemove: () => {},
    mouseup: () => {},

    // touch events
    touchstart: () => {},
    touchmove: () => {},
    touchend: () => {},

    // shared events
    down: () => {},
    up: () => {},
    move: () => {},

    // for grab event
    grab: () => {},
  },
});
