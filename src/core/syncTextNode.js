import {FieldNames} from "../contants.js";
import {replaceElement} from "../misc.js";

const TEXT_NODE = 3;

const syncTextNode = (text, domNode = document.createTextNode(text), index = 0) => {
  if (domNode.nodeType !== TEXT_NODE) {
    domNode = replaceElement(domNode, document.createTextNode(text));
  } else if (domNode.textContent !== text) {
    domNode.textContent = text
  }
  domNode[FieldNames.NODE_GROUP_INDEX] = index
  return domNode
}

export default syncTextNode;
