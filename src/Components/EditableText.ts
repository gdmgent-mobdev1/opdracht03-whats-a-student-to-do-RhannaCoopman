import Card from "./Card";

export default class Text {
  text : string;
  place : HTMLElement;
  card : Card;
  typeOfInput : string;

  div? : HTMLDivElement;
  p? : HTMLParagraphElement;
  input? : HTMLInputElement;

  saveButton? : HTMLButtonElement;

  property : {text : string, description : string, comments? : string};

  constructor(
    text : string,
    place : HTMLElement,
    card : Card,
    property: Property,
    typeOfInput : string,
  
    // div : HTMLDivElement,
    // p : HTMLParagraphElement,
    // input : HTMLInputElement,
  
    // saveButton : HTMLButtonElement,
  ) {
    this.text = text,
    this.place = place,
    this.card = card,
    this.property = property,
    this.typeOfInput = typeOfInput
  }

  render() {
    this.div = document.createElement('div');
    this.p = document.createElement('p');
    this.input.innerText = this.text;

    this.p.addEventListener('click', () => {
      this.showEditableTextAera.call(this);
    })

    this.div.append(this.p);
    this.place.append(this.div);
  }

  showEditableTextAera() {
    const prevText = this.text;

    this.input = document.createElement(this.typeOfInput);
    this.saveButton = document.createElement('button');

    this.p.remove();

    this.input.value = prevText;

    this.saveButton.innerText = 'Save';
    this.saveButton.classList.add('btn-save');
    this.input.classList.add('comment');

    this.saveButton.addEventListener('click', () => {
      if (typeOf(this.input.value) === 'string') {
        
      }

      this.text = this.input.value;
      if(this.property === 'description') {
      // this.card.state.description = this.input.value;

      };
      this.div.remove();
      this.render();

    });
  }
}