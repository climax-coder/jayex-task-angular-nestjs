import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './tag.schema';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TagsInitializationService } from './seed/tags.seed';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }])],
  providers: [TagsService, TagsInitializationService],
  controllers: [TagsController],
})
export class TagsModule implements OnModuleInit {
  constructor(
    private readonly tagsInitializationService: TagsInitializationService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.tagsInitializationService.initializeTags();
  }
}
