const syncAttributes = (attributes, targetDomNode) => {
  const existingAttrNames = typeof targetDomNode.getAttributeNames === 'function'
    ? targetDomNode.getAttributeNames().sort()
    : [];

  // todo: optimize
  Object.entries(attributes)
    .sort(([key1], [key2]) => key1.localeCompare(key2))
    .concat([[]]) // add sentinel for one iteration at least
    .forEach(([key, value]) => {

      // Remove old attributes that are not in the new attributes
      while (existingAttrNames[0] && existingAttrNames[0] !== key) {
        targetDomNode.removeAttribute(existingAttrNames[0]);
        existingAttrNames.shift() // todo: check performance and consider using index variable or [].pop()
      }

      // skip sentinel
      if (key === undefined) return;

      // todo: could be optimized or memoized. The result will always be the same for each element type
      if (targetDomNode[key] === undefined){
        targetDomNode.setAttribute(key, value);
      }else{
        targetDomNode[key] = value;
      }
      existingAttrNames.shift()
    })
}

export default syncAttributes
