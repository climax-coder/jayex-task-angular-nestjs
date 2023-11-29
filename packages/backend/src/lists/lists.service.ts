import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { List, ListDocument } from './list.schema';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Injectable()
export class ListsService {
  constructor(@InjectModel(List.name) private listModel: Model<ListDocument>) {}
  async createList(createListDto: CreateListDto): Promise<List> {
    const existingList = await this.listModel.findOne({
      name: createListDto.name,
    });

    if (existingList) {
      throw new BadRequestException('A list already exists.');
    }

    const newList = new this.listModel({
      name: createListDto.name,
    });

    return newList.save();
  }

  async findAllLists(): Promise<List[]> {
    return this.listModel.find().exec();
  }

  async findListById(id: string): Promise<List> {
    const list = await this.listModel.findById(id);

    if (!list) {
      throw new NotFoundException(`List not found with id ${id}`);
    }

    return list;
  }

  async findLowestList(): Promise<List> {
    const list = await this.listModel.findOne();
    if (!List) {
      throw new NotFoundException('No list found');
    }

    return list;
  }

  async updateList(id: string, updateListDto: UpdateListDto): Promise<List> {
    const list = await this.listModel.findById(id);
    if (!list) {
      throw new NotFoundException(`List not found with id ${id}`);
    }

    list.name = updateListDto.name;
    return list.save();
  }

  async deleteList(id: string): Promise<List> {
    const deletedList = await this.listModel.findByIdAndDelete(id);
    if (!deletedList) {
      throw new NotFoundException(`Could not delete list with id ${id}`);
    }
    return deletedList;
  }
}
