import {FieldNames} from "../contants.js";
import {flatten} from "../lib/util.js";
import sync from "./sync.js";

const getChildDomNodesGroups = (element, length) => {
  const childNodesGroups = new Array(length).fill().map(() => []);
  element.childNodes.forEach(childNode => {
    const childrenIndex = childNode[FieldNames.CHILDREN_INDEX];
    if (childrenIndex != null && Array.isArray(childNodesGroups[childrenIndex])) {
      childNodesGroups[childrenIndex].push(childNode)
    }
  })
  return childNodesGroups
};
const MatchNbyN = (nodes, domNodes, callback) => {
  if (nodes.length === 1 && domNodes.length <= 1) {
    return [callback(nodes[0], domNodes[0])]
  }
  //todo N:N
}
const syncChildren = (children, targetDomNode, rootDomNode) => {
  const childDomNodesGroups = getChildDomNodesGroups(targetDomNode, children.length);
  const updatedChildElementsGroup = children.map((child, childOrder) => {
    const nodes = flatten([child]);
    const childDomNodesGroup = childDomNodesGroups[childOrder];
    return MatchNbyN(nodes, childDomNodesGroup, (node, domNode) => sync(node, domNode, childOrder, rootDomNode));
  });

  flatten(updatedChildElementsGroup).reduce((prevElement, childElement) => {
    if (childElement.parentNode === targetDomNode) return childElement;
    if (prevElement && prevElement.parentNode === targetDomNode) {
      prevElement.after(childElement)
    } else {
      targetDomNode.appendChild(childElement)
    }
  }, null)
};

export default syncChildren;
