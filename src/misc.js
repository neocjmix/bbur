import {FieldNames} from "./contants.js";

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

export const classifyFields = (object, classifier) => {
  const truethyFields = {};
  const falsyFields = {};
  for (const objectKey in object) {
    if (object.hasOwnProperty(objectKey)) {
      (classifier(objectKey, object) ? truethyFields : falsyFields)[objectKey] = object[objectKey]
    }
  }
  return [truethyFields, falsyFields];
}

export const getFinalNodeData = node => {
  if (typeof node === 'function') {
    return getFinalNodeData(node());
  }
  if (node === null || node === undefined || node === false || node.length === 0) {
    return '';
  }
  return node;
};

export const isSameChildGroup = (domNode1, domNode2) => (
  domNode1 && domNode2 &&
  domNode1[FieldNames.NODE_GROUP_INDEX] === domNode2[FieldNames.NODE_GROUP_INDEX]
);

export const replaceElement = (domNode, newDomNode) => {
  domNode.after(newDomNode)
  domNode.remove();
  return newDomNode;
};
