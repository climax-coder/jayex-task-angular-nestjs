import { List } from './list.model';
import { Tag } from './tag.model';

export class Ticket {
  _id: string;
  title: string;
  list: List;
  tags: Tag[];
  startDate: Date;
  endDate: Date;

  constructor(
    _id: string,
    title: string,
    list: List,
    tags: Tag[],
    startDate: Date,
    endDate: Date
  ) {
    this._id = _id;
    this.title = title;
    this.list = list;
    this.tags = tags;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
