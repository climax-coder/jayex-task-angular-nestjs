import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  createList(@Body() createListDto: CreateListDto) {
    return this.listsService.createList(createListDto);
  }

  @Get()
  findAllLists() {
    return this.listsService.findAllLists();
  }

  @Get('/lowest-list')
  findFirstList() {
    return this.listsService.findLowestList();
  }

  @Get(':id')
  findListsById(@Param('id') id: string) {
    return this.listsService.findListById(id);
  }

  @Put(':id')
  updateList(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listsService.updateList(id, updateListDto);
  }

  @Delete(':id')
  removeList(@Param('id') id: string) {
    return this.listsService.deleteList(id);
  }
}
