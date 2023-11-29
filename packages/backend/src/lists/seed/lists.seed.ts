import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { List, ListDocument } from '../list.schema';

@Injectable()
export class ListsInitializationService {
  private readonly initialLists = [
    'Drafts',
    'Planned',
    'Designing',
    'In Dev',
    'Done',
    'QA',
    'Complete',
  ];

  constructor(
    @InjectModel(List.name) private readonly listModel: Model<ListDocument>,
  ) {}

  async initializeLists(): Promise<void> {
    for (let i = 0; i < this.initialLists.length; i++) {
      const existingList = await this.listModel.findOne({
        name: this.initialLists[i],
      });
      if (!existingList) {
        const newList = new this.listModel({ name: this.initialLists[i] });
        await newList.save();
      }
    }
  }
}
