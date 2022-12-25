
export default class Card {

  place : HTMLElement;

  //Constructor
  constructor(
    place : HTMLElement

    ) {
    this.place = place
    this.render();
  }

  //Functions
    //Render (make the thing)
  render() {

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card');

    cardContainer.innerHTML = `
      <h1>Card</h1>
      <p>Dit is een card. </p>
    `;

    this.place.append(cardContainer);

    return cardContainer;
  }

}