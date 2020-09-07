import {br, button, section} from '/src/html.js'
import sync from "../src/core/sync.js";
import Sub from "./Sub.js";
import withContext from "../src/withContext.js";
import {h1} from "../src/html.js";

let number = 0;

const setNumber = n => () => {
  number = n;
  sync(refresh());
}

const [App, {refresh}] = withContext(() => (
  section({class: "basic"})(
    h1('Main'),
    number,br,
    button({onClick: setNumber(number - 1)})('-'),
    button({onClick: setNumber(number + 1)})('+'),
    Sub({number}),
  )
));

export default App;
