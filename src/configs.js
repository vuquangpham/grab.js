/**
 * Instance classes variable
 * */
export const INSTANCE_CLASSES = {
  enabled: "grabjs-enabled",
};

/**
 * Available events type
 */
export const EVENTS = {
  down: [
    {
      eventName: "mousedown",
      type: ["all", "mouse"],
    },
    {
      eventName: "touchstart",
      type: ["all", "touch"],
    },
  ],
  move: [
    {
      eventName: "mousemove",
      type: ["all", "mouse"],
    },
    {
      eventName: "touchmove",
      type: ["all", "touch"],
    },
  ],
  up: [
    {
      eventName: "mouseup",
      type: ["all", "mouse"],
    },
    {
      eventName: "touchend",
      type: ["all", "touch"],
    },
  ],
};
