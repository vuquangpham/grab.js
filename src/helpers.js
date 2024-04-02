import { EVENTS } from "./configs";
import { isFunction } from "./utils";

/**
 * Validate DOM element
 * @param {HTMLElement | String} target
 * @return {object || boolean}
 * */
export function validateTarget(target) {
  // validate target
  let targetErrorMessage = `Target element not found! Please use correct DOM element!`;

  // target is string
  if (typeof target === "string") {
    target = document.querySelector(target);

    // check if the target element doesn't exist
    targetErrorMessage = `Target string is not valid! Please use correct CSS selector!`;
  }

  // target not found
  if (!target) {
    console.error(targetErrorMessage);
    return false;
  }
  return target;
}

/**
 * Init options
 * @param context {Object}
 * @return {Boolean}
 * */
export function init(context) {
  // validate the id
  context.id = context.options.id;

  // init events
  initEvents(context);
  return true;
}

/**
 * Init events based on array
 * @param {Object} context
 * @param {Array} events
 * @param {Boolean} isGrabEvent
 */
const initEvents = (context) => {
  const eventType = context.options.type;

  Object.keys(EVENTS).forEach((eventKey) => {
    const filteredEvents = EVENTS[eventKey].filter((o) =>
      o.type.includes(eventType)
    );

    // switch based on event key
    switch (eventKey) {
      case "down":
        initDownEvent(context, eventKey, filteredEvents);
        break;

      case "move":
        initMoveEvent(context, eventKey, filteredEvents);
        break;

      case "up":
        initUpEvent(context, eventKey, filteredEvents);
        break;
    }
  });
};

/**
 * Trigger events
 * @param {Object} options
 * @returns {void}
 */
const triggerEvents = ({ context, eventName, eventKey, returnedParams }) => {
  // trigger event based on event name
  // for example: mousemove, touchmove
  if (eventName) {
    context.events.trigger(eventName, returnedParams);
  }

  // trigger global event
  if (eventKey) {
    context.events.trigger(eventKey, returnedParams);
  }
};

/**
 * Register callbacks
 * @param {Object} options
 * @returns {void}
 */
const registerCallbacks = ({ context, eventName, eventKey }) => {
  // doesn't have custom functions
  if (!context.options.events) return;

  // event independent
  const fn = context.options.events[eventName];
  if (isFunction(fn) && !context.events.callbacks[eventName]) {
    context.events.on(eventName, fn);
  }

  // init shared event
  const sharedFn = context.options.events[eventKey] || null;
  if (isFunction(sharedFn) && !context.events.callbacks[eventKey]) {
    context.events.on(eventKey, sharedFn);
  }
};

/**
 * Mousedown and touchstart event
 */
const initDownEvent = (context, eventKey, filteredEvents) => {
  const target = context.target;
  const isGrabEvent = context.options.grab;

  filteredEvents.forEach((event) => {
    const { eventName } = event;

    // init event listeners
    context.listeners.add(target, eventName, (e) => {
      if (isGrabEvent) {
        context.grab.isEntered = true;
      }

      // returned params
      const returnedParams = [
        context,
        {
          event: e,
          type: eventName,
        },
      ];

      // trigger events
      triggerEvents({ context, eventName, eventKey, returnedParams });
    });

    // register callbacks
    registerCallbacks({ context, eventName, eventKey });
  });
};

/**
 * Mousemove and touchmove event
 */
const initMoveEvent = (context, eventKey, filteredEvents) => {
  const target = context.target;
  const isGrabEvent = context.options.grab;

  filteredEvents.forEach((event) => {
    const { eventName } = event;
    // init event listeners
    context.listeners.add(target, eventName, (e) => {
      // returned params
      const returnedParams = [
        context,
        {
          event: e,
          type: eventName,
        },
      ];

      // trigger events
      triggerEvents({ context, eventName, eventKey, returnedParams });

      // trigger grab event
      if (isGrabEvent) {
        // not entered => return
        if (!context.grab?.isEntered) return;

        // trigger event
        triggerEvents({ context, eventName: "grab", returnedParams: {} });
      }
    });

    // register callbacks
    registerCallbacks({ context, eventName, eventKey });

    // register grab callback
    registerCallbacks({ context, eventName: "grab" });
  });
};

/**
 * Mouseup and touchup event
 */
const initUpEvent = (context, eventKey, filteredEvents) => {
  const target = context.target;
  const isGrabEvent = context.options.grab;

  filteredEvents.forEach((event) => {
    const { eventName } = event;

    // init event listeners
    context.listeners.add(target, eventName, (e) => {
      if (isGrabEvent) {
        context.grab.isEntered = false;
      }

      // returned params
      const returnedParams = [
        context,
        {
          event: e,
          type: eventName,
        },
      ];

      // trigger events
      triggerEvents({ context, eventName, eventKey, returnedParams });
    });

    // register callbacks
    registerCallbacks({ context, eventName, eventKey });
  });
};
