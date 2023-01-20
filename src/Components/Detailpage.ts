export default class Detailpage {
  id: string;

  constructor(id: string) {
    this.id = id;
    this.render();
  }

  render(): void {
    console.log(this.id);
  }
}