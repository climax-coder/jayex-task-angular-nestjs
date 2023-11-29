import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListsModule } from './lists/lists.module';
import { TagsModule } from './tags/tags.module';
import { TicketsModule } from './tickets/tickets.module';
require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ListsModule,
    TagsModule,
    TicketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
