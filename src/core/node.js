const isBburNode = obj => (
  typeof obj.tagName === 'string' &&
  typeof obj.properties === 'object' &&
  Array.isArray(obj.children)
);

const isProperties = arg => (
  arg.length === 1 &&
  typeof arg[0] === 'object' &&
  arg[0] !== null &&
  !isBburNode(arg[0]) &&
  !(arg[0].length === 0 || arg[0][0] !== undefined)
)

const node = tagName => (...propertiesOrChildren) =>
  isProperties(propertiesOrChildren)
    ? (...children) => ({
      tagName,
      properties: propertiesOrChildren[0],
      children
    }) : {
      tagName,
      properties: {},
      children: propertiesOrChildren
    };

export default node;

