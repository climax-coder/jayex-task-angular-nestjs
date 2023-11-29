import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  createTag(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.createTag(createTagDto);
  }

  @Get()
  findAllTags() {
    return this.tagsService.findAllTags();
  }

  @Get(':id')
  findTagById(@Param('id') id: string) {
    return this.tagsService.findTagById(id);
  }

  @Put(':id')
  updateTag(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.updateTag(id, updateTagDto);
  }

  @Delete(':id')
  removeTag(@Param('id') id: string) {
    return this.tagsService.deleteTag(id);
  }
}
