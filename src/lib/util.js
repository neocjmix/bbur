export const range = (start, end) => new Array(end - start + 1).fill().map((d, i) => i + start)

export const isFlatMappable = object => object && object.flatMap && typeof object.flatMap === 'function'

export const flatten = maybeArray => isFlatMappable(maybeArray)
  ? maybeArray.flatMap(element => flatten(element))
  : [maybeArray];


export const deepFreeze = o => {
  if (typeof o !== 'object') return o;
  Object.freeze(o);
  Object.getOwnPropertyNames(o).forEach(prop => {
    if (o.hasOwnProperty(prop)
      && o[prop] !== null
      && (typeof o[prop] === "object" || typeof o[prop] === "function")
      && !Object.isFrozen(o[prop])) {
      deepFreeze(o[prop]);
    }
  });
  return o;
};

export const classify = (array, classifier) => array.reduce(([successes, fails], item) => {
  (classifier(item) ? successes : fails).push(item);
  return [successes, fails];
}, [[], []])
