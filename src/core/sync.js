import {FieldNames} from "../contants.js";
import {classifyFields, getFinalNodeData} from '../lib/util.js';
import syncChildren from "./syncChildren.js";
import syncAttributes from "./syncAttributes.js";
import syncEventHandlers from "./syncEventHandlers.js";
import syncTextNode from "./syncTextNode.js";
import RenderContext from "./RenderContext.js";

export const syncNode = (nodeData, domNode, index, rootDomNode, context, isRoot) => {
  if (context.aborted) {
    if (!isRoot) {
      return domNode;
    }

    context.complete();
    if (context.next) {
      context.next();
    }
  }

  if (typeof nodeData === 'string') {
    return syncTextNode(nodeData, domNode, index);
  }

  const {tagName, properties, children} = nodeData;
  const [eventHandlers, attributes] = classifyFields(properties, (key) => key.match(/^on[A-Z]/))

  let targetDomNode;
  if (domNode === undefined) {
    targetDomNode = document.createElement(tagName);
  } else if (domNode.tagName !== tagName.toUpperCase()) {
    domNode.remove();
    targetDomNode = document.createElement(tagName);
  } else {
    targetDomNode = domNode;
  }

  syncEventHandlers(eventHandlers, targetDomNode, rootDomNode);
  syncAttributes(attributes, targetDomNode);
  syncChildren(children, targetDomNode, rootDomNode, context);

  nodeData.lastRenderedNode = targetDomNode;
  nodeData.lastRenderedIndex = index;
  targetDomNode[FieldNames.NODE_GROUP_INDEX] = index;

  if (attributes.key !== undefined) {
    targetDomNode[FieldNames.NODE_KEY] = attributes.key
  }

  if (!isRoot) {
    return targetDomNode;
  }

  context.complete();
  if (context.next) {
    context.next();
  }
}

let currentContext = new RenderContext(true)

const sync = (node, domNode) => {
  const nodeData = getFinalNodeData(node)
  const index = nodeData.lastRenderedIndex || 0

  if (domNode === undefined) {
    domNode = nodeData.lastRenderedNode;
  }

  const previousContext = currentContext;
  currentContext = new RenderContext();

  if (previousContext.completed) {
    syncNode(nodeData, domNode, index, domNode, currentContext, true);
  } else {
    previousContext.abort(() => syncNode(nodeData, domNode, index, domNode, currentContext, true))
  }
};

export default sync
