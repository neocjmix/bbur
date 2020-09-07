import {FieldNames} from "../contants.js";
import {classify} from '../lib/util.js';
import syncChildren from "./syncChildren.js";
import syncAttributes from "./syncAttributes.js";
import syncEventHandlers from "./syncEventHandlers.js";
import syncTextNode from "./syncTextNode.js";

const getFinalNodeData = node => typeof node === 'function' ? getFinalNodeData(node()) : node

const sync = (node, domNode = node.lastRenderedNode, index = (node.lastRenderedIndex || 0), rootDomNode = domNode) => {
  const nodeData = getFinalNodeData(node)

  if (!nodeData[FieldNames.IS_BBUR_NODE]) {
    return syncTextNode(nodeData, domNode, index);
  }

  const {tagName, properties, children} = nodeData;
  const [eventHandlers, attributes] = classify(Object.entries(properties), ([key]) => key.startsWith('on'))
  const targetDomNode = domNode === undefined ? document.createElement(tagName) : domNode;

  syncEventHandlers(eventHandlers, targetDomNode, rootDomNode);
  syncAttributes(attributes, targetDomNode);
  syncChildren(children, targetDomNode, rootDomNode);

  targetDomNode[FieldNames.CHILDREN_INDEX] = index
  nodeData.lastRenderedNode = targetDomNode;
  nodeData.lastRenderedIndex = index;
  return targetDomNode;
}

export default sync
