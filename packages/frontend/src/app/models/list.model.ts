export class List {
  _id: string;
  name: string;
  order: number;

  constructor(_id: string, name: string, order: number) {
    this._id = _id;
    this.name = name;
    this.order = order;
  }
}
