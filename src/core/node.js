import {FieldNames} from "../contants.js";

const isProperties = args => (
  args.length === 1 &&
  typeof args[0] === 'object' &&
  !args[0][FieldNames.IS_BBUR_NODE]
);

const node = tagName => (...propertiesOrChildren) =>
  isProperties(propertiesOrChildren)
    ? (...children) => ({
      [FieldNames.IS_BBUR_NODE]: true,
      tagName,
      properties: propertiesOrChildren[0],
      children
    }) : {
      [FieldNames.IS_BBUR_NODE]: true,
      tagName,
      properties: {},
      children: propertiesOrChildren
    };

export default node;

