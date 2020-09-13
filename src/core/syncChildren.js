import {FieldNames} from "../contants.js";
import {flatten, getFinalNodeData, isSameChildGroup} from "../misc.js";
import {syncNode} from "./sync.js";

const getChildDomNodesGroups = (element, length) => {
  const childNodesGroups = new Array(length).fill().map(() => []);
  element.childNodes.forEach(childNode => {
    const nodeGroupIndex = childNode[FieldNames.NODE_GROUP_INDEX];
    if (nodeGroupIndex != null && Array.isArray(childNodesGroups[nodeGroupIndex])) {
      childNodesGroups[nodeGroupIndex].push(childNode)
    }
  })
  return childNodesGroups
};

// todo: optimize
const MatchByKey = (nodes, domNodes) => {
  const domNodesWithKeys = {}
  const domNodesWithoutKeys = []

  domNodes.forEach(domNode => {
    const nodeKey = domNode[FieldNames.NODE_KEY];
    if (nodeKey === undefined) {
      domNodesWithoutKeys.push(domNode)
    } else {
      domNodesWithKeys[nodeKey] = domNode
    }
  })

  return nodes.map(node =>
    node?.properties?.key === undefined
      ? [node, domNodesWithoutKeys.shift()]
      : [node, domNodesWithKeys[node.properties.key]]);
}

const syncChildren = (children, targetDomNode, rootDomNode, syncContext = {}) => {
  const childDomNodesGroups = getChildDomNodesGroups(targetDomNode, children.length);

  const updatedChildDomNodesGroup = children.map((child, childOrder) => {
    const nodes = flatten([child]);
    const childDomNodesGroup = childDomNodesGroups[childOrder];
    return MatchByKey(nodes, childDomNodesGroup)
      .map(([node, domNode]) => syncNode(getFinalNodeData(node), domNode, childOrder, rootDomNode, syncContext))
      .filter(childDomNode => childDomNode !== undefined); // when syncing is aborted, remaining updatedChildDomNode could be undefined.
  });

  const updatedChildDomNodes = flatten(updatedChildDomNodesGroup)

  if (updatedChildDomNodes.length === 0) {
    targetDomNode.innerHTML = ''
  }

  // todo: optimize
  updatedChildDomNodes
    .reduce((prevDomNode, childDomNode, index, {length}, isLast = (index === length - 1)) => {
      if (childDomNode.parentNode !== targetDomNode) {
        if (prevDomNode && prevDomNode.parentNode === targetDomNode) {
          prevDomNode.after(childDomNode)
        } else {
          targetDomNode.appendChild(childDomNode)
        }
        syncContext.addDomEvent("connect", childDomNode)
      }

      // todo: caching removed nodes
      while (childDomNode.previousSibling && childDomNode.previousSibling !== prevDomNode) {
        childDomNode.previousSibling.remove();
      }

      if (isLast) {
        while (isSameChildGroup(childDomNode, childDomNode.nextSibling)) {
          childDomNode.nextSibling.remove()
        }
      }

      return childDomNode;
    }, null)
};

export default syncChildren;
