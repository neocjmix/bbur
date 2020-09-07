import {FieldNames} from "../contants.js";

const syncTextNode = (text, domNode = document.createTextNode(text), index = 0) => {
  const textString = text.toString();
  if (domNode.textContent !== textString) domNode.textContent = textString
  domNode[FieldNames.CHILDREN_INDEX] = index
  return domNode
}

export default syncTextNode;
