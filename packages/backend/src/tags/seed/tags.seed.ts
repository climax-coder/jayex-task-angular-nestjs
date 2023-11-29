import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag, TagDocument } from '../tag.schema';

@Injectable()
export class TagsInitializationService {
  private readonly initialTags = [
    'Feature',
    'UI',
    'PoC',
    'Frontend',
    'Backend',
    'Bug',
    'DevOps',
  ];

  constructor(
    @InjectModel(Tag.name) private readonly tagModel: Model<TagDocument>,
  ) {}

  async initializeTags(): Promise<void> {
    for (let i = 0; i < this.initialTags.length; i++) {
      const existingTag = await this.tagModel.findOne({
        name: this.initialTags[i],
      });
      if (!existingTag) {
        const newTag = new this.tagModel({ name: this.initialTags[i] });
        await newTag.save();
      }
    }
  }
}
