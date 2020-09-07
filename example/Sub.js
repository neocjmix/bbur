import {br, button, input, label} from '/src/html.js'
import withContext from "/src/withContext.js";
import sync from "/src/core/sync.js";
import {h1, section} from "../src/html.js";

const state = new Proxy({
  number: 0,
  refreshFromParent: true
}, {
  set(obj, prop, value) {
    obj[prop] = value;
    sync(refresh())
    return true;
  }
})

const [Sub, {refresh, onNewProperties}] = withContext(({number}) => (
  section({class: 'basic'})(
    h1({style: 'display:inline-block'})('Sub'),
    label(
      input({
        type: 'checkbox',
        checked: state.refreshFromParent,
        onClick: e => state.refreshFromParent = e.target.checked
      }),
      'syncronize with parent context'
    ), br,
    state.number,br,
    button({onClick: () => state.number--})('-'),
    button({onClick: () => state.number++})('+'), br, br,
    'result : ',
    `${number} + ${state.number} = ${number + state.number}`
  )
))

onNewProperties(() => state.refreshFromParent && refresh());

export default Sub;
