export default class RenderContext {
  completed = false;
  domEvents = {};
  next = null

  constructor(completed) {
    this.completed = completed;
  }

  addDomEvent(type, domNode, data) {
    if (this.domEvents[type] === undefined) {
      this.domEvents[type] = []
    }
    this.domEvents[type].push({domNode, data});
  };

  complete(){
    this.completed = true;
    for (const type in this.domEvents) {
      this.domEvents[type].forEach(({domNode, data}) => {
        domNode.dispatchEvent(new CustomEvent('bbur', {bubbles: true, detail: {type, data}}))
      })
    }
  }

  abort(next){
    this.aborted = true;
    if(next !== undefined){
      this.next = next
    }
  }
}
