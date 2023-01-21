export default class ChangeTheme {
  changeButton! : HTMLButtonElement;

  place: HTMLDivElement;


  constructor(place: HTMLDivElement) {
    this.place = place;
    this.render();
  }

  render(): void {
    this.changeButton = document.createElement('button');
    this.changeButton.innerHTML = `change to light`;

    sessionStorage.setItem('theme', "dark");
    const body = document.querySelector("body");

    this.changeButton.addEventListener('click', () => {
      
      if(sessionStorage.getItem('theme') === "light") {
        sessionStorage.setItem('theme', "dark");
        console.log('change to dark');
        this.changeButton.innerHTML = `change to light`;

        body?.classList.add("darktheme");
        body?.classList.remove("lighttheme");

        
      } else {
        sessionStorage.setItem('theme', "light");
        console.log('change to light');
        body?.classList.add("lighttheme");
        body?.classList.remove("darktheme");
        this.changeButton.innerHTML = `change to dark`;

      }
    })

    this.place.appendChild(this.changeButton);
  }
}
