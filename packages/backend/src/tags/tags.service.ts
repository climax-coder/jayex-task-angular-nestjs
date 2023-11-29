import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag, TagDocument } from './tag.schema';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<TagDocument>) {}

  async createTag(createTagDto: CreateTagDto): Promise<Tag> {
    const existingTag = await this.tagModel.findOne({
      name: createTagDto.name,
    });

    if (existingTag) {
      throw new BadRequestException('A tag is already exists.');
    }

    const newTag = new this.tagModel(createTagDto);
    return newTag.save();
  }

  async findAllTags(): Promise<Tag[]> {
    return this.tagModel.find().exec();
  }

  async findTagById(id: string): Promise<Tag> {
    const tag = await this.tagModel.findById(id);
    if (tag) {
      throw new NotFoundException(`Tag not found with id ${id}`);
    }

    return tag;
  }

  async updateTag(id: string, updateListDto: UpdateTagDto): Promise<Tag> {
    const tag = await this.tagModel.findById(id);
    if (!tag) {
      throw new NotFoundException(`Tag not found with id ${id}`);
    }

    tag.name = updateListDto.name;
    return tag.save();
  }

  async deleteTag(id: string): Promise<Tag> {
    const deletedTag = await this.tagModel.findByIdAndDelete(id);
    if (!deletedTag) {
      throw new NotFoundException(`Could not delete tag with id ${id}`);
    }

    return deletedTag;
  }
}
