import sync from "../core/sync.js";

const createUpdater = node => {
  let _container

  const update = (func) => {
    const possiblePromise = typeof func === "function" && func();
    if (possiblePromise && possiblePromise.then) {
      possiblePromise.then(() => sync(node, _container))
    } else {
      sync(node, _container);
    }
  };

  const bind = htmlElement => {
    _container = htmlElement;
    update()
  };

  return {update, bind};
};

export default createUpdater
