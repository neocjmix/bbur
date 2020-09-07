const WithContext = render => {
  let memoizedNode;
  let lastProps;
  let newPropertiesCallback;

  const component = props => {
    lastProps = props

    if (memoizedNode === undefined) {
      memoizedNode = render(props)
    }

    if (newPropertiesCallback !== undefined) {
      newPropertiesCallback(props);
    }

    return memoizedNode;
  };

  const refresh = () => memoizedNode = {
    ...render(lastProps),
    lastRenderedNode: memoizedNode.lastRenderedNode,
    lastRenderedIndex: memoizedNode.lastRenderedIndex,
  };

  const onNewProperties = callback => newPropertiesCallback = callback;

  return [component, {refresh, onNewProperties}];
};

export default WithContext
