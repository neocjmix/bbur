import {FieldNames} from "../contants.js";

const TEXT_NODE = 3;

const syncTextNode = (text, domNode = document.createTextNode(text), index = 0) => {
  if(domNode.nodeType !== TEXT_NODE){
    const newDomNode = document.createTextNode(text);
    domNode.after(newDomNode)
    domNode.remove();
    domNode = newDomNode;
  }
  if (domNode.textContent !== text) domNode.textContent = text
  domNode[FieldNames.NODE_GROUP_INDEX] = index
  return domNode
}

export default syncTextNode;
