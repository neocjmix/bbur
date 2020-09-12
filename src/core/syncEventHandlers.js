// todo : support stopPropagation
const setDelegatingEventListener = (() => {
  const registry = new Map();
  const delegatingHandler = eventName => e => {
    for (const [element, handler] of registry.get(eventName)?.entries() || []) {
      if (element === e.target || element.contains(e.target)) {
        handler.apply(element, [e])
      }
    }
  }

  return ({baseElement, targetElement, eventName, eventHandler}) => {
    if (registry.has(eventName)) {
      registry.get(eventName).set(targetElement, eventHandler);
    } else {
      registry.set(eventName, new Map([[targetElement, eventHandler]]));
      // todo : check for events which does not bubble, like 'blur', 'focus'
      baseElement.addEventListener(eventName, delegatingHandler(eventName))
    }
  };
})()

// todo : support options, optimize
const syncEventHandlers = (eventHandlers, targetElement, baseElement) => {
  Object.entries(eventHandlers)
    .forEach(([onEventName, eventHandler]) =>
      setDelegatingEventListener({
        baseElement,
        targetElement,
        eventName: onEventName.slice(2).toLowerCase(),
        eventHandler
      }));
};

export default syncEventHandlers;
