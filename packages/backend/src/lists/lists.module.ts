import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { List, ListSchema } from './list.schema';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { ListsInitializationService } from './seed/lists.seed';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: List.name, schema: ListSchema }]),
  ],
  providers: [ListsService, ListsInitializationService],
  controllers: [ListsController],
})
export class ListsModule implements OnModuleInit {
  constructor(
    private readonly listsInitializationService: ListsInitializationService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.listsInitializationService.initializeLists();
  }
}
